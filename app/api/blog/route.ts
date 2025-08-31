import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { checkAdminAccessFromRequest } from '../../../lib/auth';
import { validateBlogPost } from '../../../lib/validation';
import { writeFileSync } from 'fs';

// Force dynamic rendering to prevent static optimization issues
export const dynamic = 'force-dynamic';

const POSTS_DIR = join(process.cwd(), 'app', 'blog', 'posts');

// Get all blog posts
export async function GET() {
  try {
    const files = await readdir(POSTS_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = join(POSTS_DIR, file);
        const content = await readFile(filePath, 'utf8');
        
        // Parse frontmatter manually - more flexible regex
        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n\s*---/);
        if (!frontmatterMatch) {
          console.log('No frontmatter found in:', file);
          return null;
        }
        
        const frontmatterText = frontmatterMatch[1];
        const metadata: any = {};
        
        // Parse YAML-like frontmatter
        frontmatterText.split('\n').forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine) {
            // Handle both quoted and unquoted values
            const match = trimmedLine.match(/^(\w+):\s*(.+)$/);
            if (match) {
              let value = match[2].trim();
              // Remove quotes if present
              if ((value.startsWith("'") && value.endsWith("'")) || 
                  (value.startsWith('"') && value.endsWith('"'))) {
                value = value.slice(1, -1);
              }
              metadata[match[1]] = value;
            }
          }
        });
        
        const slug = file.replace('.mdx', '');
        
        return {
          slug,
          metadata
        };
      })
    );
    
    // Filter out null entries and sort by date
    const validPosts = posts.filter((post): post is NonNullable<typeof post> => {
      return post !== null && post.metadata.publishedAt;
    });
    
    validPosts.sort((a, b) => {
      const dateA = new Date(a.metadata.publishedAt).getTime();
      const dateB = new Date(b.metadata.publishedAt).getTime();
      return dateB - dateA;
    });
    
    return NextResponse.json({ posts: validPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ posts: [] });
  }
}

// Create new blog post
export async function POST(request: NextRequest) {
  // Only check admin access for POST requests (creating/editing posts)
  if (!checkAdminAccessFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { title, summary, content, publishedAt } = data;
    
    // Validate input
    const validation = validateBlogPost(data);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Create frontmatter
    const frontmatter = `---
title: '${title}'
publishedAt: '${publishedAt || new Date().toISOString().split('T')[0]}'
summary: '${summary}'
---

${content}`;

    // Write file
    const filePath = join(POSTS_DIR, `${slug}.mdx`);
    writeFileSync(filePath, frontmatter);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ 
      error: 'Failed to create post',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
