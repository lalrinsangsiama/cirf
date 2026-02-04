import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assessment Tool | Measure Your Cultural Innovation Resilience',
  description: 'Take the CIL Assessment to evaluate your cultural enterprise across 13 key dimensions. Get personalized insights and recommendations for strengthening your economic resilience.',
  keywords: [
    'CIL assessment',
    'cultural innovation assessment',
    'resilience measurement',
    'heritage enterprise evaluation',
    'community assessment tool',
  ],
  openGraph: {
    title: 'Assessment Tool | Measure Your Cultural Innovation Resilience',
    description: 'Evaluate your cultural enterprise across 13 key dimensions with the CIL Assessment.',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
