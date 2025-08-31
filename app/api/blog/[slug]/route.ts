import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, readFile } from 'fs/promises';
import { join } from 'path';
import { checkAdminAccessFromRequest } from '../../../../lib/auth';
import { validateBlogPost } from '../../../../lib/validation';
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';

// Force dynamic rendering to prevent static optimization issues
export const dynamic = 'force-dynamic';

const POSTS_DIR = join(process.cwd(), 'app', 'blog', 'posts');

// Get blog post for editing
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!checkAdminAccessFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const filePath = join(POSTS_DIR, `${params.slug}.mdx`);
    
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const content = readFileSync(filePath, 'utf-8');
    
    // Parse frontmatter
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(content);
    const frontMatterBlock = match![1];
    const postContent = content.replace(frontmatterRegex, '').trim();
    
    const metadata: any = {};
    frontMatterBlock.trim().split('\n').forEach((line) => {
      const [key, ...valueArr] = line.split(': ');
      let value = valueArr.join(': ').trim();
      value = value.replace(/^['"](.*)['"]$/, '$1');
      metadata[key.trim()] = value;
    });

    return NextResponse.json({
      slug: params.slug,
      title: metadata.title,
      summary: metadata.summary,
      publishedAt: metadata.publishedAt,
      content: postContent
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
    
    const frontmatter = `---
title: '${title}'
publishedAt: '${publishedAt}'
summary: '${summary}'
---

${content}`;

    const filePath = join(POSTS_DIR, `${params.slug}.mdx`);
    writeFileSync(filePath, frontmatter);

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
    const filePath = join(POSTS_DIR, `${params.slug}.mdx`);
    
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ 
      error: 'Failed to delete post',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
