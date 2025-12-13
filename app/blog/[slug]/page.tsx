import { notFound } from 'next/navigation'
import { formatDate } from 'app/blog/date'
import { baseUrl } from 'app/sitemap'
import { client } from '@/sanity/lib/client'
import { postQuery } from '@/sanity/lib/queries'
import PortableText from 'app/components/PortableText'
import SanityImage from 'app/components/SanityImage'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug }, { next: { tags: ['portfolio'] } })
  if (!post) return {}
  const { title, description, publishedAt: publishedTime } = post
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
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug }, { next: { tags: ['portfolio'] } })
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
            description: post.description,
            image: `/og?title=${encodeURIComponent(post.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: { '@type': 'Person', name: post.author?.name || 'My Portfolio' },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter text-[var(--text-primary)]">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-[var(--text-muted)]">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      {post.categories && post.categories.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {post.categories.map(cat => (
            <span key={cat} className="text-xs bg-[var(--bg-subtle)] text-[var(--text-muted)] px-2 py-0.5 rounded">
              #{cat}
            </span>
          ))}
        </div>
      )}

      {post.mainImage && (
        <div className={`mb-8 ${post.mainImage.style === 'half' ? 'max-w-2xl' :
          post.mainImage.style === 'small' ? 'max-w-md' :
            'w-full'
          }`}>
          <SanityImage
            asset={post.mainImage}
            alt={post.title}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      )}

      <article className="prose prose-neutral dark:prose-invert">
        <PortableText value={post.body} />
      </article>
    </section>
  )
}
