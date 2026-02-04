'use client'

import { useState, useEffect, Suspense } from 'react'
import type { Metadata } from 'next'

// Note: Metadata export must be in a server component parent or layout
// This will be handled by a parent layout or separate metadata file
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { CREDIT_PACKS, Currency, getPackPriceDisplay, getPackPerCredit, getPackSavings } from '@/lib/razorpay/client-config'
import { RazorpayButton } from '@/components/payment/RazorpayButton'
import { Check, Sparkles, AlertCircle, Globe } from 'lucide-react'

function PricingContent() {
  const searchParams = useSearchParams()
  const { user, profile } = useAuth()
  const [currency, setCurrency] = useState<Currency>('INR')
  const [error, setError] = useState<string | null>(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(true)

  const paymentCancelled = searchParams.get('payment') === 'cancelled'

  // Auto-detect currency based on user location
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // Use a free IP geolocation API
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()

        // Default to INR for India, USD for others
        if (data.country_code === 'IN') {
          setCurrency('INR')
        } else {
          setCurrency('USD')
        }
      } catch (error) {
        // Default to INR if detection fails
        console.warn('IP geolocation failed, defaulting to INR:', error)
        setCurrency('INR')
      } finally {
        setIsDetectingLocation(false)
      }
    }

    detectCurrency()
  }, [])

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <main className="min-h-screen bg-pearl pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto">
            Purchase assessment credits to evaluate your cultural innovation initiatives.
            Each credit allows you to complete one full CIL assessment.
          </p>
        </div>

        {/* Currency Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full p-1 border border-stone/20">
            <button
              onClick={() => setCurrency('INR')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currency === 'INR'
                  ? 'bg-ink text-pearl'
                  : 'text-stone hover:text-ink'
              }`}
            >
              <span>🇮🇳</span> INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currency === 'USD'
                  ? 'bg-ink text-pearl'
                  : 'text-stone hover:text-ink'
              }`}
            >
              <span>🌐</span> USD
            </button>
          </div>
          {isDetectingLocation && (
            <div className="ml-3 flex items-center text-sm text-stone">
              <Globe className="w-4 h-4 animate-pulse mr-1" />
              Detecting location...
            </div>
          )}
        </div>

        {/* Current Balance */}
        {user && profile && (
          <div className="max-w-md mx-auto mb-12 bg-gold/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-stone mb-1">Your current balance</p>
            <p className="text-3xl font-bold text-gold">{profile.credits} credits</p>
          </div>
        )}

        {/* Alerts */}
        {paymentCancelled && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-stone/10 border border-stone/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-stone flex-shrink-0 mt-0.5" />
            <p className="text-sm text-stone">Payment was cancelled. You can try again when you&apos;re ready.</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
            <p className="text-sm text-terracotta">{error}</p>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative bg-white rounded-2xl shadow-sm border ${
                pack.popular ? 'border-gold ring-2 ring-gold/20' : 'border-stone/10'
              } overflow-hidden`}
            >
              {pack.popular && (
                <div className="absolute top-0 right-0 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-semibold text-ink mb-2">{pack.name}</h3>
                <p className="text-sm text-stone mb-6">{pack.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-ink">
                    {getPackPriceDisplay(pack, currency)}
                  </span>
                  {getPackSavings(pack, currency) && (
                    <span className="ml-2 text-sm text-sage font-medium">
                      {getPackSavings(pack, currency)}
                    </span>
                  )}
                </div>

                <div className="text-sm text-stone mb-6">
                  {getPackPerCredit(pack, currency)} per assessment
                </div>

                <RazorpayButton
                  pack={pack}
                  currency={currency}
                  onError={handleError}
                  className={
                    pack.popular
                      ? 'bg-gold text-white hover:bg-gold/90'
                      : 'bg-ink text-pearl hover:bg-ink/90'
                  }
                />
              </div>

              <div className="px-8 pb-8">
                <div className="border-t border-stone/10 pt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-ink">
                    <Check className="w-4 h-4 text-sage" />
                    {pack.credits} full CIL assessments
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink">
                    <Check className="w-4 h-4 text-sage" />
                    Detailed score interpretation
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink">
                    <Check className="w-4 h-4 text-sage" />
                    Matched case studies
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink">
                    <Check className="w-4 h-4 text-sage" />
                    Saved assessment history
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Credit Banner */}
        {!user && (
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-gold/10 to-sage/10 rounded-2xl p-8 text-center mb-16">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>
            <h2 className="text-xl font-semibold text-ink mb-2">
              New to CIL? Try it free
            </h2>
            <p className="text-stone mb-6">
              Create an account and get 1 free assessment credit to evaluate your first initiative.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
            >
              Sign up free
            </Link>
          </div>
        )}

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-ink mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">What is a credit?</h3>
              <p className="text-stone text-sm">
                One credit allows you to complete one full CIL assessment for a cultural innovation
                initiative. The assessment includes 13 questions, score interpretation, and matched
                case study recommendations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">Do credits expire?</h3>
              <p className="text-stone text-sm">
                No, your credits never expire. Use them whenever you&apos;re ready to assess an initiative.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">What payment methods are accepted?</h3>
              <p className="text-stone text-sm">
                We accept all major credit/debit cards, UPI, net banking, and wallets through Razorpay.
                {currency === 'INR' && ' Indian customers can also use UPI for instant payments.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">Can I get a refund?</h3>
              <p className="text-stone text-sm">
                Unused credits can be refunded within 30 days of purchase. Contact us at{' '}
                <a href="mailto:support@cirf-framework.org" className="text-gold hover:underline">
                  support@cirf-framework.org
                </a>{' '}
                for refund requests.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">Is there a team or enterprise plan?</h3>
              <p className="text-stone text-sm">
                Yes! For organizations needing more than 50 assessments, we offer custom plans with
                volume discounts and additional features.{' '}
                <Link href="/about" className="text-gold hover:underline">
                  Contact us
                </Link>{' '}
                to discuss your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-pearl pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-12 bg-stone/20 rounded w-64 mx-auto mb-4" />
            <div className="h-6 bg-stone/10 rounded w-96 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 h-96" />
              <div className="bg-white rounded-2xl p-8 h-96" />
              <div className="bg-white rounded-2xl p-8 h-96" />
            </div>
          </div>
        </div>
      </main>
    }>
      <PricingContent />
    </Suspense>
  )
}
