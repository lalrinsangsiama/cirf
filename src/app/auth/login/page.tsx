'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useCsrf } from '@/hooks/useCsrf'
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { validateRedirectUrl } from '@/lib/utils/validateRedirect'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = validateRedirectUrl(searchParams.get('redirectTo'))

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const { getCsrfHeaders } = useCsrf()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Use rate-limited API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: getCsrfHeaders(),
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          setError(result.error?.message || 'Too many login attempts. Please try again later.')
          setLoading(false)
          return
        }
        setError(result.error?.message || result.message || 'Login failed')
        setLoading(false)
        return
      }

      // Complete the sign-in on client side to set cookies
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      router.push(redirectTo)
      router.refresh()
    } catch {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex flex-col items-center leading-none mb-6">
          <span className="text-[0.55rem] md:text-[0.6rem] tracking-[0.25em] uppercase font-sans font-medium text-ink">
            Cultural Innovation
          </span>
          <span className="font-serif text-xl md:text-2xl font-extralight tracking-tight leading-none -mt-[1px] text-ink">
            Lab
          </span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-ink mb-2">Welcome back</h1>
        <p className="text-stone">
          Sign in to access your assessments and credits
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

        <form onSubmit={handleLogin} className="space-y-5">
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-11 pr-12 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link href="/auth/forgot-password" className="text-sm text-gold hover:underline">
                Forgot password?
              </Link>
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
                Sign in
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-stone mt-6">
          Don&apos;t have an account?{' '}
          <Link href={`/auth/signup${redirectTo !== '/dashboard' ? `?redirectTo=${redirectTo}` : ''}`} className="text-gold font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </div>

      {/* Benefits reminder */}
      <div className="mt-6 text-center text-sm text-stone">
        <p>Get 1 free assessment credit when you sign up</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-pearl flex items-center justify-center py-12 px-4">
      <Suspense fallback={
        <div className="w-full max-w-md animate-pulse">
          <div className="h-8 bg-stone/20 rounded w-32 mx-auto mb-8" />
          <div className="bg-white rounded-2xl p-8 space-y-4">
            <div className="h-12 bg-stone/10 rounded" />
            <div className="h-12 bg-stone/10 rounded" />
            <div className="h-12 bg-stone/10 rounded" />
          </div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </main>
  )
}
