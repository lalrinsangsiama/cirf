import type { Metadata } from 'next'

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
  return children
}
