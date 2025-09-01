import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAccessFromRequest } from '../../../lib/auth';
import { validateBlogPost } from '../../../lib/validation';
import { BlogService } from '../../../lib/blogService';

// Force dynamic rendering to prevent static optimization issues
export const dynamic = 'force-dynamic';

// Get all blog posts
export async function GET() {
  try {
    const posts = await BlogService.getAllPosts();
    
    // Transform to match the expected format
    const transformedPosts = posts.map(post => ({
      slug: post.slug,
      metadata: {
        title: post.title,
        publishedAt: post.publishedAt,
        summary: post.summary
      }
    }));
    
    return NextResponse.json({ posts: transformedPosts });
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
    
    // Create post using KV service
    const newPost = await BlogService.createPost({
      slug,
      title,
      summary,
      content,
      publishedAt: publishedAt || new Date().toISOString().split('T')[0]
    });

    return NextResponse.json({ success: true, slug: newPost.slug });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ 
      error: 'Failed to create post',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
