import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About CIL - The Story Behind Cultural Innovation Lab',
  description: 'Learn about the Cultural Innovation Lab, our mission to transform indigenous wisdom into economic resilience, and the research behind the CIL framework.',
  openGraph: {
    title: 'About CIL - The Story Behind Cultural Innovation Lab',
    description: 'Learn about the Cultural Innovation Lab, our mission to transform indigenous wisdom into economic resilience, and the research behind the CIL framework.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
