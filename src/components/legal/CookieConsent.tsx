'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Cookie, X, Settings } from 'lucide-react'
import Link from 'next/link'

const CONSENT_KEY = 'cirf-cookie-consent'
const CONSENT_VERSION = 1

interface ConsentPreferences {
  version: number
  essential: boolean // Always true
  analytics: boolean
  timestamp: string
}

function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored) as ConsentPreferences
    if (parsed.version !== CONSENT_VERSION) return null

    return parsed
  } catch {
    return null
  }
}

function setStoredConsent(preferences: ConsentPreferences): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences))
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    version: CONSENT_VERSION,
    essential: true,
    analytics: false,
    timestamp: '',
  })

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
    setPreferences(stored)
  }, [])

  const acceptAll = () => {
    const newPreferences: ConsentPreferences = {
      version: CONSENT_VERSION,
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    }
    setPreferences(newPreferences)
    setStoredConsent(newPreferences)
    setShowBanner(false)
    setShowSettings(false)

    // Initialize analytics
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: newPreferences }))
  }

  const acceptEssential = () => {
    const newPreferences: ConsentPreferences = {
      version: CONSENT_VERSION,
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString(),
    }
    setPreferences(newPreferences)
    setStoredConsent(newPreferences)
    setShowBanner(false)
    setShowSettings(false)

    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: newPreferences }))
  }

  const savePreferences = () => {
    const newPreferences: ConsentPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    setStoredConsent(newPreferences)
    setShowBanner(false)
    setShowSettings(false)

    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: newPreferences }))
  }

  if (!showBanner) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6',
        'bg-pearl border-t border-ink/10 shadow-lg'
      )}
    >
      <div className="max-w-4xl mx-auto">
        {!showSettings ? (
          // Main banner
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Cookie className="w-8 h-8 text-gold flex-shrink-0 hidden md:block" />

            <div className="flex-1">
              <h2 className="font-medium text-ink mb-1">We value your privacy</h2>
              <p className="text-sm text-stone">
                We use essential cookies to make our site work. With your consent, we may also use
                analytics cookies to understand how you interact with our site and improve your
                experience.{' '}
                <Link href="/privacy" className="text-ocean hover:underline">
                  Learn more
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(true)}
                icon={Settings}
              >
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={acceptEssential}>
                Essential only
              </Button>
              <Button variant="primary" size="sm" onClick={acceptAll}>
                Accept all
              </Button>
            </div>
          </div>
        ) : (
          // Settings panel
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-ink">Cookie Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-ink/5 rounded"
                aria-label="Close settings"
              >
                <X className="w-5 h-5 text-stone" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Essential cookies */}
              <div className="p-4 bg-sand/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-ink">Essential Cookies</h3>
                  <span className="text-xs bg-sage/20 text-sage px-2 py-0.5 rounded">
                    Always active
                  </span>
                </div>
                <p className="text-sm text-stone">
                  These cookies are necessary for the website to function and cannot be switched
                  off. They are usually set in response to actions you take, such as logging in or
                  setting privacy preferences.
                </p>
              </div>

              {/* Analytics cookies */}
              <div className="p-4 border border-ink/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-ink">Analytics Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-ink/10 peer-focus:ring-2 peer-focus:ring-ink/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ocean"></div>
                    <span className="sr-only">Toggle analytics cookies</span>
                  </label>
                </div>
                <p className="text-sm text-stone">
                  These cookies help us understand how visitors interact with our website. All
                  data is anonymized and used to improve our services.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={savePreferences}>
                Save preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Hook to check consent status
export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null)

  useEffect(() => {
    setConsent(getStoredConsent())

    const handleUpdate = (event: CustomEvent<ConsentPreferences>) => {
      setConsent(event.detail)
    }

    window.addEventListener('cookie-consent-updated', handleUpdate as EventListener)
    return () => {
      window.removeEventListener('cookie-consent-updated', handleUpdate as EventListener)
    }
  }, [])

  return consent
}
