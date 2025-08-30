import { ProfileHeader } from '../components/sections/ProfileHeader'
import { WorkHistory } from '../components/sections/WorkHistory'
import { Skills } from '../components/sections/Skills'
import { Technologies } from '../components/sections/Technologies'
import { BlogSection } from '../components/sections/BlogSection'

export default function Page() {
  return (
    <div className="space-y-16">
      <ProfileHeader />
      <WorkHistory />
      <Skills />
      <Technologies />
      <BlogSection />
    </div>
  )
}
