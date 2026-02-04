'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-terracotta" />
        </div>

        <h1 className="text-3xl font-serif font-medium text-ink mb-2">
          Something went wrong
        </h1>

        <p className="text-stone mb-6">
          We apologize for the inconvenience. An unexpected error has occurred.
          Please try again or return to the home page.
        </p>

        {error.digest && (
          <p className="text-xs text-stone/60 mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="primary"
            icon={RefreshCw}
          >
            Try again
          </Button>

          <Link href="/">
            <Button variant="outline" icon={Home}>
              Go home
            </Button>
          </Link>
        </div>

        <p className="text-sm text-stone mt-8">
          If the problem persists, please{' '}
          <Link href="/about#contact" className="text-ocean hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
