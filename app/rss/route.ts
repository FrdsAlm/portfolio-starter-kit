import { baseUrl } from 'app/sitemap'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export async function GET() {
  const allBlogs = await client.fetch(postsQuery)

  const itemsXml = allBlogs
    .sort((a, b) => (new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1))
    .map(
      (post) =>
        `<item>
          <title>${escapeXml(post.title || '')}</title>
          <link>${escapeXml(`${baseUrl}/blog/${post.slug}`)}</link>
          <description>${escapeXml(post.description || '')}</description>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>My Portfolio</title>
        <link>${baseUrl}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
