'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Use rate-limited API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-6">
          <span className="text-2xl font-serif font-bold text-ink">CIL</span>
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-stone">or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-stone/20 py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-sand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

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
