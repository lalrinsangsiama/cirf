import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: 'Resources & Downloads',
  description: 'Access research documents, templates, data repositories, and implementation guides to support your cultural innovation work.',
  openGraph: {
    title: 'Resources & Downloads - CIL',
    description: 'Access research documents, templates, data repositories, and implementation guides for cultural innovation.',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
