import type { Metadata } from 'next'
import Script from 'next/script'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { GlobalJsonLd } from '@/components/seo/JsonLd'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://culturalinnovationlab.org'),
  title: {
    default: 'Cultural Innovation Lab | Building Economies from Heritage',
    template: '%s | CIL',
  },
  description: 'Heritage is not a museum. It is an economy waiting to be built. We research, build, and connect the global ecosystem of cultural entrepreneurs.',
  keywords: [
    'cultural innovation',
    'cultural entrepreneurship',
    'indigenous entrepreneurship',
    'heritage economy',
    'cultural innovation lab',
    'cultural preservation',
    'sustainable development',
    'community resilience',
  ],
  authors: [{ name: 'Cultural Innovation Lab' }],
  creator: 'Cultural Innovation Lab',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Cultural Innovation Lab',
    title: 'Cultural Innovation Lab | Building Economies from Heritage',
    description: 'Heritage is not a museum. It is an economy waiting to be built. We research, build, and connect the global ecosystem of cultural entrepreneurs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cultural Innovation Lab | Building Economies from Heritage',
    description: 'Heritage is not a museum. It is an economy waiting to be built.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        {/* Load Razorpay after page is interactive to ensure payment button works */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        {/* Global JSON-LD structured data for SEO */}
        <GlobalJsonLd />
      </head>
      <body>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-ink focus:text-pearl focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
        >
          Skip to main content
        </a>

        <AuthProvider>
          <ToastProvider>
            <Header />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />

            {/* Live region for screen reader announcements */}
            <div
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
              id="announcer"
            />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
