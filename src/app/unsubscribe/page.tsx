'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

function UnsubscribeForm() {
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') || ''

  const [email, setEmail] = useState(emailParam)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleUnsubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You have been successfully unsubscribed.')
      } else {
        setStatus('error')
        setMessage(data.error?.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-sage mx-auto mb-6" />
        <h1 className="text-2xl font-semibold text-ink mb-4">Unsubscribed</h1>
        <p className="text-ink/70 mb-8">{message}</p>
        <p className="text-sm text-ink/50 mb-6">
          Changed your mind? You can always resubscribe from our homepage.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-pearl rounded-lg hover:bg-ink/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Mail className="w-16 h-16 text-stone mx-auto mb-6" />
      <h1 className="text-2xl font-semibold text-ink mb-4">Unsubscribe from Newsletter</h1>
      <p className="text-ink/70 mb-8">
        We&apos;re sorry to see you go. Enter your email below to unsubscribe from our newsletter.
      </p>

      <form onSubmit={handleUnsubscribe} className="max-w-sm mx-auto space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Email address"
          className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
        />

        {status === 'error' && (
          <div className="flex items-center gap-2 text-terracotta text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="w-full px-6 py-3 bg-ink text-pearl rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Unsubscribing...
            </>
          ) : (
            'Unsubscribe'
          )}
        </button>
      </form>

      <p className="mt-8 text-sm text-ink/50">
        If you didn&apos;t request this, you can safely ignore this page.
      </p>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <main className="min-h-screen bg-pearl flex items-center justify-center px-4">
      <div className="max-w-md w-full py-16">
        <Suspense fallback={
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-stone mx-auto" />
          </div>
        }>
          <UnsubscribeForm />
        </Suspense>
      </div>
    </main>
  )
}
