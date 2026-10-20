import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

export const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-starter-kit-mu-wine.vercel.app'
).replace(/\/$/, '')

export default async function sitemap() {
  const posts = await client.fetch(postsQuery)
  let blogs = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
