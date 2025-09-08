import { storage } from './kv';
import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export class BlogService {
  private static readonly BLOG_PREFIX = 'blog:';
  private static readonly BLOG_INDEX_KEY = 'blog:index';
  private static readonly DYNAMIC_POSTS_FILE = path.join(process.cwd(), 'data', 'dynamic-posts.json');
  private static readonly IS_SERVERLESS = process.env.VERCEL === '1' || process.env.NEXT_RUNTIME === 'edge' || process.env.AWS_LAMBDA_FUNCTION_NAME;

  // Get all blog posts (hybrid: KV + file-based)
  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      // Try KV first
      if (storage !== this.getFileStorage()) {
        const postIds = await storage.smembers(this.BLOG_INDEX_KEY);
        if (postIds && postIds.length > 0) {
          const posts = await Promise.all(
            postIds.map(async (id) => {
              const post = await storage.get<BlogPost>(`${this.BLOG_PREFIX}${id}`);
              return post;
            })
          );
          const validPosts = posts.filter((post): post is BlogPost => post !== null);
          return validPosts.sort((a, b) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
        }
      }

      // Fallback to file-based storage
      return this.getFileBasedPosts();
    } catch (error) {
      console.error('Error fetching all posts:', error);
      return this.getFileBasedPosts();
    }
  }

  // Get a single blog post by slug (hybrid: KV + file-based)
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // Try KV first
      if (storage !== this.getFileStorage()) {
        const postIds = await storage.smembers(this.BLOG_INDEX_KEY);
        for (const id of postIds) {
          const post = await storage.get<BlogPost>(`${this.BLOG_PREFIX}${id}`);
          if (post && post.slug === slug) {
            return post;
          }
        }
      }

      // Fallback to file-based storage
      const posts = await this.getFileBasedPosts();
      return posts.find(post => post.slug === slug) || null;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  }

  // Create a new blog post
  static async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    try {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      
      const newPost: BlogPost = {
        ...postData,
        id,
        createdAt: now,
        updatedAt: now
      };

      // Store the post
      await storage.set(`${this.BLOG_PREFIX}${id}`, newPost);
      
      // Add to index
      await storage.sadd(this.BLOG_INDEX_KEY, id);

      return newPost;
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  // Update an existing blog post
  static async updatePost(slug: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'slug'>>): Promise<BlogPost | null> {
    try {
      const existingPost = await this.getPostBySlug(slug);
      if (!existingPost) {
        return null;
      }

      const updatedPost: BlogPost = {
        ...existingPost,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      // Update the post
      await storage.set(`${this.BLOG_PREFIX}${existingPost.id}`, updatedPost);

      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update post');
    }
  }

  // Delete a blog post
  static async deletePost(slug: string): Promise<boolean> {
    try {
      const existingPost = await this.getPostBySlug(slug);
      if (!existingPost) {
        return false;
      }

      // Remove from index
      await storage.srem(this.BLOG_INDEX_KEY, existingPost.id);
      
      // Delete the post
      await storage.del(`${this.BLOG_PREFIX}${existingPost.id}`);

      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }

  // File-based storage methods
  private static getFileStorage() {
    return {
      get: async <T>(key: string): Promise<T | null> => {
        try {
          const data = await this.readDynamicPosts();
          return data[key] || null;
        } catch {
          return null;
        }
      },
      set: async (key: string, value: any): Promise<void> => {
        const data = await this.readDynamicPosts();
        data[key] = value;
        await this.writeDynamicPosts(data);
      },
      del: async (key: string): Promise<void> => {
        const data = await this.readDynamicPosts();
        delete data[key];
        await this.writeDynamicPosts(data);
      },
      smembers: async (key: string): Promise<string[]> => {
        if (key === this.BLOG_INDEX_KEY) {
          const data = await this.readDynamicPosts();
          return data[this.BLOG_INDEX_KEY] || [];
        }
        return [];
      },
      sadd: async (key: string, member: string): Promise<void> => {
        if (key === this.BLOG_INDEX_KEY) {
          const data = await this.readDynamicPosts();
          if (!data[this.BLOG_INDEX_KEY]) {
            data[this.BLOG_INDEX_KEY] = [];
          }
          if (!data[this.BLOG_INDEX_KEY].includes(member)) {
            data[this.BLOG_INDEX_KEY].push(member);
          }
          await this.writeDynamicPosts(data);
        }
      },
      srem: async (key: string, member: string): Promise<void> => {
        if (key === this.BLOG_INDEX_KEY) {
          const data = await this.readDynamicPosts();
          if (data[this.BLOG_INDEX_KEY]) {
            data[this.BLOG_INDEX_KEY] = data[this.BLOG_INDEX_KEY].filter((id: string) => id !== member);
          }
          await this.writeDynamicPosts(data);
        }
      }
    };
  }

  private static async readDynamicPosts(): Promise<any> {
    try {
      // In serverless (e.g., Vercel) do not attempt filesystem access
      if (this.IS_SERVERLESS) {
        return {};
      }

      // Ensure data directory exists (development only)
      const dataDir = path.dirname(this.DYNAMIC_POSTS_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      if (fs.existsSync(this.DYNAMIC_POSTS_FILE)) {
        const content = fs.readFileSync(this.DYNAMIC_POSTS_FILE, 'utf-8');
        return JSON.parse(content);
      }
      return {};
    } catch (error) {
      console.error('Error reading dynamic posts:', error);
      return {};
    }
  }

  private static async writeDynamicPosts(data: any): Promise<void> {
    try {
      // No-op on serverless to avoid ENOENT (fallback only used locally)
      if (this.IS_SERVERLESS) {
        return;
      }

      // Ensure data directory exists (development only)
      const dataDir = path.dirname(this.DYNAMIC_POSTS_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(this.DYNAMIC_POSTS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing dynamic posts:', error);
      throw error;
    }
  }

  private static async getFileBasedPosts(): Promise<BlogPost[]> {
    try {
      const data = await this.readDynamicPosts();
      const postIds = data[this.BLOG_INDEX_KEY] || [];
      
      const posts = postIds.map((id: string) => data[`${this.BLOG_PREFIX}${id}`]).filter(Boolean);
      
      return posts.sort((a: BlogPost, b: BlogPost) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch (error) {
      console.error('Error getting file-based posts:', error);
      return [];
    }
  }

  // Migrate existing MDX files to dynamic storage
  static async migrateFromFiles(): Promise<void> {
    try {
      const { getBlogPosts } = await import('../app/blog/utils');
      const mdxPosts = getBlogPosts();
      
      for (const mdxPost of mdxPosts) {
        const existingPost = await this.getPostBySlug(mdxPost.slug);
        if (!existingPost) {
          await this.createPost({
            slug: mdxPost.slug,
            title: mdxPost.metadata.title,
            summary: mdxPost.metadata.summary,
            content: mdxPost.content,
            publishedAt: mdxPost.metadata.publishedAt
          });
        }
      }
      console.log(`Migrated ${mdxPosts.length} MDX posts to dynamic storage`);
    } catch (error) {
      console.error('Error migrating from files:', error);
    }
  }
}
