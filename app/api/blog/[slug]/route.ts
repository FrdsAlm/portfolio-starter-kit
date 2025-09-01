import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAccessFromRequest } from '../../../../lib/auth';
import { validateBlogPost } from '../../../../lib/validation';
import { BlogService } from '../../../../lib/blogService';

// Force dynamic rendering to prevent static optimization issues
export const dynamic = 'force-dynamic';

// Get blog post for editing
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!checkAdminAccessFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const post = await BlogService.getPostBySlug(params.slug);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      publishedAt: post.publishedAt,
      content: post.content
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load post' }, { status: 500 });
  }
}

// Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
    
    // Update post using KV service
    const updatedPost = await BlogService.updatePost(params.slug, {
      title,
      summary,
      content,
      publishedAt
    });

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ 
      error: 'Failed to update post',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

// Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!checkAdminAccessFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete post using KV service
    const success = await BlogService.deletePost(params.slug);
    
    if (!success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ 
      error: 'Failed to delete post',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
