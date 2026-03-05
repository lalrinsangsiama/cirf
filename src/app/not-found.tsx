'use client'

import Link from 'next/link'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-stone" />
        </div>

        <h1 className="text-6xl font-serif font-light text-ink mb-2">404</h1>

        <h2 className="text-xl font-medium text-ink mb-2">
          Page not found
        </h2>

        <p className="text-stone mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-ink text-pearl hover:bg-ink/90 focus:ring-ink/20 px-4 py-2.5 text-sm gap-2"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-transparent text-ink border border-ink/20 hover:bg-ink/5 hover:border-ink/40 focus:ring-ink/10 px-4 py-2.5 text-sm gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse blog
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10">
          <p className="text-sm text-stone mb-4">
            Looking for something specific?
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/framework" className="text-ocean hover:underline">
              Framework
            </Link>
            <Link href="/tools" className="text-ocean hover:underline">
              Assessment Tool
            </Link>
            <Link href="/resources" className="text-ocean hover:underline">
              Resources
            </Link>
            <Link href="/blog" className="text-ocean hover:underline">
              Blog
            </Link>
            <Link href="/about#contact" className="text-ocean hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
