import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { AdminControls } from '../../../components/admin/AdminControls'
import { BlogService } from '../../../lib/blogService'

export const dynamic = 'force-dynamic'

// Do not pre-generate params; fetch dynamically from KV

export async function generateMetadata({ params }) {
  const post = await BlogService.getPostBySlug(params.slug)
  if (!post) return {}
  const { title, summary: description, publishedAt: publishedTime } = post
  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }) {
  const post = await BlogService.getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            description: post.summary,
            image: `/og?title=${encodeURIComponent(post.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: { '@type': 'Person', name: 'My Portfolio' },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      <AdminControls slug={post.slug} />
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
