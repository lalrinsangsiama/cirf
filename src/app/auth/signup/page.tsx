'use client'

import { useState, Suspense, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCsrf } from '@/hooks/useCsrf'
import { Mail, Lock, User, Building2, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { validateRedirectUrl } from '@/lib/utils/validateRedirect'

// Password strength calculation
function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
  suggestions: string[]
} {
  let score = 0
  const suggestions: string[] = []

  if (!password) {
    return { score: 0, label: '', color: '', suggestions: [] }
  }

  // Length checks
  if (password.length >= 6) score += 1
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1

  // Character variety
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 1

  // Suggestions
  if (password.length < 8) suggestions.push('Use at least 8 characters')
  if (!/[A-Z]/.test(password)) suggestions.push('Add uppercase letters')
  if (!/[0-9]/.test(password)) suggestions.push('Add numbers')
  if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push('Add special characters')

  // Convert to 0-4 scale
  const normalizedScore = Math.min(Math.floor(score / 2), 4)

  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['bg-terracotta', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-sage']

  return {
    score: normalizedScore,
    label: labels[normalizedScore],
    color: colors[normalizedScore],
    suggestions: suggestions.slice(0, 2),
  }
}

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = validateRedirectUrl(searchParams.get('redirectTo'))

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    organization: '',
    role: 'researcher',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  )

  const { getCsrfHeaders } = useCsrf()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Use rate-limited API endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: getCsrfHeaders(),
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          organization: formData.organization || undefined,
          role: formData.role,
          redirectTo,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          setError(result.error?.message || 'Too many signup attempts. Please try again later.')
          setLoading(false)
          return
        }
        setError(result.error?.message || result.message || 'Signup failed')
        setLoading(false)
        return
      }

      setSuccess(true)
      setLoading(false)
    } catch {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-sage" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-ink mb-2">Check your email</h1>
        <p className="text-stone mb-6">
          We&apos;ve sent a confirmation link to <strong>{formData.email}</strong>.
          Click the link to activate your account.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-gold font-medium hover:underline"
        >
          Back to login
        </Link>
      </div>
    )
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
        <h1 className="text-3xl font-serif font-bold text-ink mb-2">Create your account</h1>
        <p className="text-stone">
          Start with a free assessment — no credit card needed
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

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-ink mb-1.5">
              Full name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full pl-11 pr-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
                minLength={6}
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
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-1.5 bg-stone/20 rounded-full overflow-hidden flex gap-0.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-colors ${
                          i < passwordStrength.score ? passwordStrength.color : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${
                    passwordStrength.score >= 3 ? 'text-sage' :
                    passwordStrength.score >= 2 ? 'text-yellow-600' : 'text-terracotta'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                {passwordStrength.suggestions.length > 0 && (
                  <p className="text-xs text-stone">
                    {passwordStrength.suggestions.join(' • ')}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-ink mb-1.5">
              Organization <span className="text-stone">(optional)</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Your organization"
                className="w-full pl-11 pr-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-ink mb-1.5">
              I am a
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors bg-white"
            >
              <option value="researcher">Researcher</option>
              <option value="practitioner">Practitioner</option>
              <option value="community_leader">Community Leader</option>
              <option value="policymaker">Policymaker</option>
              <option value="other">Other</option>
            </select>
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
                Create account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-stone mt-6">
          Already have an account?{' '}
          <Link href={`/auth/login${redirectTo !== '/dashboard' ? `?redirectTo=${redirectTo}` : ''}`} className="text-gold font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Terms */}
      <p className="mt-6 text-center text-xs text-stone">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="underline">Terms of Service</Link>
        {' '}and{' '}
        <Link href="/privacy" className="underline">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-pearl flex items-center justify-center py-12 px-4">
      <Suspense fallback={
        <div className="w-full max-w-md animate-pulse">
          <div className="h-8 bg-stone/20 rounded w-32 mx-auto mb-8" />
          <div className="bg-white rounded-2xl p-8 space-y-4">
            <div className="h-12 bg-stone/10 rounded" />
            <div className="h-12 bg-stone/10 rounded" />
            <div className="h-12 bg-stone/10 rounded" />
            <div className="h-12 bg-stone/10 rounded" />
          </div>
        </div>
      }>
        <SignupForm />
      </Suspense>
    </main>
  )
}
