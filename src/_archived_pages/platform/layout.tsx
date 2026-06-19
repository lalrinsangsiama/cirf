import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform - Cultural Innovation Lab',
  description: 'Explore the CIL platform features: research-backed assessments, actionable insights, progress tracking, and tools for cultural entrepreneurs.',
  openGraph: {
    title: 'Platform - Cultural Innovation Lab',
    description: 'Explore the CIL platform features: research-backed assessments, actionable insights, progress tracking, and tools for cultural entrepreneurs.',
  },
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
