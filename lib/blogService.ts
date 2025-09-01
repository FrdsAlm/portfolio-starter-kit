import { storage } from './kv';

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

  // Get all blog posts
  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      const postIds = await storage.smembers(this.BLOG_INDEX_KEY);
      if (!postIds || postIds.length === 0) {
        return [];
      }

      const posts = await Promise.all(
        postIds.map(async (id) => {
          const post = await storage.get<BlogPost>(`${this.BLOG_PREFIX}${id}`);
          return post;
        })
      );

      // Filter out null posts and sort by publishedAt
      const validPosts = posts.filter((post): post is BlogPost => post !== null);
      return validPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch (error) {
      console.error('Error fetching all posts:', error);
      return [];
    }
  }

  // Get a single blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const postIds = await storage.smembers(this.BLOG_INDEX_KEY);
      for (const id of postIds) {
        const post = await storage.get<BlogPost>(`${this.BLOG_PREFIX}${id}`);
        if (post && post.slug === slug) {
          return post;
        }
      }
      return null;
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

  // Migrate existing MDX files to KV (for development)
  static async migrateFromFiles(): Promise<void> {
    // This would be used to migrate existing MDX files to KV
    // Implementation depends on your specific needs
    console.log('Migration function - implement as needed');
  }
}
