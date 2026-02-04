'use client'

import { useState } from 'react'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export function BlogNewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }>({ type: 'idle' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus({ type: 'loading' })

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus({ type: 'success', message: data.message })
      setEmail('')
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
      })
    }
  }

  return (
    <div className="mt-16 bg-gradient-to-r from-ink to-ink/90 rounded-2xl p-8 md:p-12 text-center">
      <h3 className="text-2xl font-serif font-bold text-pearl mb-4">
        Stay updated on cultural innovation research
      </h3>
      <p className="text-pearl/70 mb-6 max-w-xl mx-auto">
        Get the latest research findings, case studies, and practical insights
        delivered to your inbox.
      </p>

      {status.type === 'success' ? (
        <div className="flex items-center justify-center gap-3 text-sage">
          <CheckCircle className="w-5 h-5" />
          <p>{status.message}</p>
        </div>
      ) : (
        <>
          {status.type === 'error' && (
            <div className="flex items-center justify-center gap-2 text-terracotta mb-4">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">{status.message}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-pearl placeholder:text-pearl/50 focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="px-6 py-3 bg-gold text-white rounded-lg font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status.type === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
