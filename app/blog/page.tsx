import { BlogList } from 'app/components/BlogList'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Page() {
  const posts = await client.fetch(postsQuery)

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogList posts={posts} />
    </section>
  )
}
