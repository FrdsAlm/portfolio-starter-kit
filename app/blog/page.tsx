import { BlogList } from 'app/components/BlogList'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default async function Page() {
  const posts = await client.fetch(postsQuery, {}, { next: { tags: ['portfolio'] } })

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-[var(--text-primary)]">My Blog</h1>
      <BlogList posts={posts} />
    </section>
  )
}
