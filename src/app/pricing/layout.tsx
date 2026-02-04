import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Assessment Credits',
  description: 'Purchase assessment credits to evaluate your cultural innovation initiatives. Simple, transparent pricing with credits that never expire.',
  openGraph: {
    title: 'Pricing - CIL Assessment Credits',
    description: 'Purchase assessment credits to evaluate your cultural innovation initiatives. Simple, transparent pricing.',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
