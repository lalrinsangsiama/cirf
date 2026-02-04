import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies - Stories of Transformation',
  description: 'Eight verified case studies demonstrating how communities worldwide achieve cultural innovation resilience. Each case includes CIL scoring and source documentation.',
  openGraph: {
    title: 'Case Studies - CIL',
    description: 'Verified case studies demonstrating cultural innovation resilience from communities worldwide.',
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
