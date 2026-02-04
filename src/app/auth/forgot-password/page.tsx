'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Use rate-limited API endpoint
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          setError(result.error?.message || 'Too many password reset attempts. Please try again later.')
          setLoading(false)
          return
        }
        // For other errors, still show success to prevent email enumeration
      }

      setSuccess(true)
      setLoading(false)
    } catch {
      // Even on error, show success to prevent email enumeration
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-pearl flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-sage" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-ink mb-2">Check your email</h1>
          <p className="text-stone mb-6">
            We&apos;ve sent a password reset link to <strong>{email}</strong>.
            Click the link in the email to reset your password.
          </p>
          <p className="text-sm text-stone mb-6">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setSuccess(false)}
              className="text-gold font-medium hover:underline"
            >
              try again
            </button>
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-gold font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-pearl flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-serif font-bold text-ink">CIL</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-ink mb-2">Reset your password</h1>
          <p className="text-stone">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone/10 p-8">
          {error && (
            <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
              <p className="text-sm text-terracotta">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-pearl py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-pearl/30 border-t-pearl rounded-full animate-spin" />
              ) : (
                'Send reset link'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-stone mt-6">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-gold font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
