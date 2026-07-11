import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { PostHogProvider } from '@/components/analytics/PostHogProvider'
import { CookieConsent } from '@/components/legal/CookieConsent'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://culturalinnovationlab.org'),
  title: {
    default: 'Cultural Innovation Lab',
    template: '%s | Cultural Innovation Lab',
  },
  description: 'Assess your cultural innovation initiative with the CIRF Framework — built from global research into cultural innovation and economic resilience.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Cultural Innovation Lab',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-pearl"
        >
          Skip to main content
        </a>
        {children}
        {/* Analytics page-view tracking — isolated in Suspense (useSearchParams)
            so it doesn't force the static pages to render dynamically. Self-gates
            on PostHog env keys, so it's a no-op when analytics is disabled. */}
        <Suspense fallback={null}>
          <PostHogProvider />
        </Suspense>
        <CookieConsent />
      </body>
    </html>
  )
}
