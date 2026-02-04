'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { CreditPack, Currency, getPackPriceDisplay } from '@/lib/razorpay/config'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill: {
    name?: string
    email?: string
  }
  theme: {
    color: string
  }
  modal?: {
    ondismiss?: () => void
  }
}

interface RazorpayInstance {
  open: () => void
  close: () => void
}

interface RazorpayResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface RazorpayButtonProps {
  pack: CreditPack
  currency: Currency
  onSuccess?: () => void
  onError?: (error: string) => void
  className?: string
}

export function RazorpayButton({
  pack,
  currency,
  onSuccess,
  onError,
  className = '',
}: RazorpayButtonProps) {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    if (!user) {
      router.push(`/auth/signup?redirectTo=/pricing`)
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Create order on server
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packId: pack.id, currency }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      // Initialize Razorpay checkout
      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'CIL',
        description: `${pack.name} - ${pack.credits} assessment credits`,
        order_id: data.orderId,
        handler: async function (response: RazorpayResponse) {
          // Verify payment on server
          try {
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                packId: pack.id,
                credits: pack.credits,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || 'Payment verification failed')
            }

            // Payment successful
            onSuccess?.()
            router.push(`/dashboard?payment=success&credits=${pack.credits}`)
          } catch (error) {
            console.error('Payment verification error:', error)
            onError?.(error instanceof Error ? error.message : 'Payment verification failed')
          }
        },
        prefill: {
          name: profile?.full_name || '',
          email: user.email || '',
        },
        theme: {
          color: '#D4A574', // gold color
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      const message = error instanceof Error ? error.message : 'Something went wrong'
      setErrorMessage(message)
      onError?.(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="mb-3 p-3 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
          <p className="text-sm text-terracotta">{errorMessage}</p>
        </div>
      )}
      <button
      onClick={handlePayment}
      disabled={loading || isLoading}
      className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : (
        <>
          Buy now
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
    </div>
  )
}
