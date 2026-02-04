import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research | Evidence-Based Cultural Innovation Findings',
  description: 'Discover our research methodology and findings from analyzing 362+ case studies of cultural innovation worldwide. Statistical analysis showing 3.2x higher survival rates for CIL-aligned enterprises.',
  keywords: [
    'cultural innovation research',
    'case study analysis',
    'indigenous economy research',
    'heritage entrepreneurship data',
    'economic resilience statistics',
  ],
  openGraph: {
    title: 'Research | Evidence-Based Cultural Innovation Findings',
    description: 'Research findings from analyzing 362+ case studies of cultural innovation worldwide.',
  },
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
