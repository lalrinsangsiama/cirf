import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CIL Framework | 13-Component Cultural Innovation Model',
  description: 'Explore the Cultural Innovation Lab - a comprehensive 13-component model that explains how communities transform indigenous wisdom into economic resilience. Learn about protective, adaptive, transformative, and generative capacities.',
  keywords: [
    'CIL framework',
    'cultural innovation model',
    'economic resilience',
    'indigenous entrepreneurship',
    'heritage economy',
    'cultural preservation',
    'community development',
    '13-component model',
  ],
  openGraph: {
    title: 'CIL Framework | 13-Component Cultural Innovation Model',
    description: 'A comprehensive model explaining how communities transform indigenous wisdom into economic resilience.',
  },
}

export default function FrameworkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
