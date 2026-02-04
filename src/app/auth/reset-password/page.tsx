'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null)

  const supabase = createClient()

  // Check if user has a valid recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      // The user should have a session from clicking the email link
      // Supabase handles the recovery code automatically
      if (session) {
        setIsValidSession(true)
      } else {
        // Check if there's an error in the URL (from Supabase redirect)
        const errorDescription = searchParams.get('error_description')
        if (errorDescription) {
          setError(decodeURIComponent(errorDescription))
          setIsValidSession(false)
        } else {
          // No session yet - Supabase might still be processing the recovery
          // Give it a moment and check again
          setTimeout(async () => {
            const { data: { session: retrySession } } = await supabase.auth.getSession()
            setIsValidSession(!!retrySession)
            if (!retrySession) {
              setError('Invalid or expired reset link. Please request a new one.')
            }
          }, 1000)
        }
      }
    }

    checkSession()

    // Listen for auth state changes (recovery session)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    // Sign out and redirect to login after a delay
    setTimeout(async () => {
      await supabase.auth.signOut()
      router.push('/auth/login?message=Password reset successful. Please sign in with your new password.')
    }, 2000)
  }

  // Loading state while checking session
  if (isValidSession === null) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="w-12 h-12 border-4 border-stone/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone">Verifying reset link...</p>
      </div>
    )
  }

  // Invalid/expired link state
  if (isValidSession === false) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-terracotta" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-ink mb-2">Reset link expired</h1>
        <p className="text-stone mb-6">
          {error || 'This password reset link has expired or is invalid.'}
        </p>
        <Link
          href="/auth/forgot-password"
          className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
        >
          Request new link
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  // Success state
  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-sage" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-ink mb-2">Password reset successful</h1>
        <p className="text-stone mb-6">
          Your password has been updated. Redirecting you to login...
        </p>
        <div className="w-8 h-8 border-4 border-stone/20 border-t-gold rounded-full animate-spin mx-auto" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-6">
          <span className="text-2xl font-serif font-bold text-ink">CIL</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-ink mb-2">Set new password</h1>
        <p className="text-stone">
          Enter your new password below.
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
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
              New password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
                className="w-full pl-11 pr-12 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink mb-1.5">
              Confirm new password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
                className="w-full pl-11 pr-12 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
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
              <>
                Reset password
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-pearl flex items-center justify-center py-12 px-4">
      <Suspense fallback={
        <div className="w-full max-w-md text-center">
          <div className="w-12 h-12 border-4 border-stone/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone">Loading...</p>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </main>
  )
}
