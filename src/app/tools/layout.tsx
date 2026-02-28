import { Suspense } from 'react'
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

function ToolsLoading() {
  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone">Loading assessment tools...</p>
      </div>
    </div>
  )
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<ToolsLoading />}>
      {children}
    </Suspense>
  )
}
