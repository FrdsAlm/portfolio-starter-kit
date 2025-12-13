import { client } from '@/sanity/lib/client'
import { portfolioQuery } from '@/sanity/lib/queries'
import { ProfileHeader } from '../../components/sections/ProfileHeader'
import { WorkHistory } from '../../components/sections/WorkHistory'
import { Skills } from '../../components/sections/Skills'
import { Technologies } from '../../components/sections/Technologies'
import { BlogSection } from '../../components/sections/BlogSection'

export default async function Page() {
  const data = await client.fetch(portfolioQuery, {}, { next: { tags: ['portfolio'] } });

  return (
    <div className="space-y-16">
      <ProfileHeader profile={data.profile} />
      <WorkHistory jobs={data.jobs} />
      <Skills skills={data.skills} />
      <Technologies domains={data.domains} />
      <BlogSection posts={data.posts} />
    </div>
  )
}
