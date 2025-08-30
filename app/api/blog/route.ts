import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { checkAdminAccess } from '../../../lib/auth';
import { validateBlogPost } from '../../../lib/validation';
import { writeFileSync } from 'fs';

const POSTS_DIR = join(process.cwd(), 'app', 'blog', 'posts');

// Create new blog post
export async function POST(request: NextRequest) {
  if (!checkAdminAccess()) {
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
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
