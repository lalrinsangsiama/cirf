'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }>({ type: 'idle' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'loading' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || undefined,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error?.message || data?.error || 'Failed to send your message')
      }

      setStatus({
        type: 'success',
        message: data.message || "Thank you — we've received your message and will be in touch.",
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    }
  }

  if (status.type === 'success') {
    return (
      <div className="flex items-start gap-3 p-5 rounded-2xl" style={{ backgroundColor: 'rgba(168,181,160,0.12)', border: '1px solid rgba(168,181,160,0.4)' }}>
        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#1A8A7D' }} />
        <p className="text-sm" style={{ color: '#0D1B2A' }}>{status.message}</p>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.type === 'error' && (
        <div className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(198,117,87,0.1)', border: '1px solid rgba(198,117,87,0.3)' }}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c67557' }} />
          <p className="text-sm" style={{ color: '#c67557' }}>{status.message}</p>
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5" style={{ color: '#0D1B2A' }}>
          Name <span style={{ color: '#c67557' }}>*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          aria-required="true"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
          style={{ borderColor: 'rgba(13,27,42,0.15)' }}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5" style={{ color: '#0D1B2A' }}>
          Email <span style={{ color: '#c67557' }}>*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          aria-required="true"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
          style={{ borderColor: 'rgba(13,27,42,0.15)' }}
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5" style={{ color: '#0D1B2A' }}>
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          maxLength={200}
          placeholder="What is this about? (optional)"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={inputClass}
          style={{ borderColor: 'rgba(13,27,42,0.15)' }}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5" style={{ color: '#0D1B2A' }}>
          Message <span style={{ color: '#c67557' }}>*</span>
        </label>
        <textarea
          id="contact-message"
          required
          aria-required="true"
          rows={6}
          placeholder="How can we help?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={inputClass}
          style={{ borderColor: 'rgba(13,27,42,0.15)' }}
        />
      </div>

      <button
        type="submit"
        disabled={status.type === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        style={{ backgroundColor: '#1A8A7D' }}
      >
        {status.type === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  )
}
