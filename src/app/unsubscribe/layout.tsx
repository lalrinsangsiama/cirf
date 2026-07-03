import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Unsubscribe from Cultural Innovation Lab newsletter emails.',
  robots: { index: false, follow: false },
}

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
  return children
}
