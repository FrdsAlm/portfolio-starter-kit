import Link from 'next/link';
import { BlogPosts } from 'app/components/posts';

export function BlogSection({ posts }: { posts: any[] }) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
        <Link
          href="/blog"
          className="text-[var(--text-highlight)] hover:underline text-sm"
        >
          View all posts →
        </Link>
      </div>
      <BlogPosts posts={posts} />
    </section>
  );
}
