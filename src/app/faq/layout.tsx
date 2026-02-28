import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description: 'Find answers to common questions about the Cultural Innovation Lab framework, assessments, pricing, and how CIL can help your cultural innovation initiative.',
  openGraph: {
    title: 'FAQ - Frequently Asked Questions',
    description: 'Find answers to common questions about the Cultural Innovation Lab framework, assessments, pricing, and how CIL can help your cultural innovation initiative.',
  },
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
