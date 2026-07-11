import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'

// Note: these pages (/about, /framework, /evidence, /assessment) are intentionally
// public and indexable. The survey gate was removed so funders, peers, and search
// engines can reach the Lab's thought-leadership content without completing the survey.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#FAF7F2', color: '#0D1B2A', minHeight: '100vh' }}>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  )
}
