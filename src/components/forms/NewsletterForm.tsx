'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface NewsletterFormProps {
  showRole?: boolean
  showName?: boolean
  className?: string
  variant?: 'default' | 'compact'
}

export function NewsletterForm({
  showRole = true,
  showName = true,
  className = '',
  variant = 'default',
}: NewsletterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  })
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }>({ type: 'idle' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'loading' })

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus({ type: 'success', message: data.message })
      setFormData({ name: '', email: '', role: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
      })
    }
  }

  if (status.type === 'success') {
    return (
      <div className={`flex items-start gap-3 p-4 bg-sage/10 border border-sage/20 rounded-lg ${className}`}>
        <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
        <p className="text-sage">{status.message || 'Successfully subscribed!'}</p>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="flex-1 px-4 py-2 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
          required
        />
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="px-4 py-2 bg-ink text-pearl rounded-lg font-medium hover:bg-ink/90 transition-colors disabled:opacity-50"
        >
          {status.type === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {status.type === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
          <p className="text-sm text-terracotta">{status.message}</p>
        </div>
      )}

      {showName && (
        <input
          type="text"
          placeholder="Your name (optional)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      )}

      <input
        type="email"
        placeholder="Your email *"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
        required
      />

      {showRole && (
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
        >
          <option value="">I am a...</option>
          <option value="researcher">Researcher</option>
          <option value="practitioner">Practitioner</option>
          <option value="policymaker">Policymaker</option>
          <option value="community">Community member</option>
          <option value="other">Other</option>
        </select>
      )}

      <button
        type="submit"
        disabled={status.type === 'loading'}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
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

      <p className="text-xs text-stone text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  )
}
