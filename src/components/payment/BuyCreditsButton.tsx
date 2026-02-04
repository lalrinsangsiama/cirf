'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { CreditCard, ArrowRight } from 'lucide-react'
import { CREDIT_PACKS, type CreditPack } from '@/lib/razorpay/config'

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

interface BuyCreditsButtonProps {
  packId?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
  onSuccess?: () => void
}

export function BuyCreditsButton({
  packId = 'pack_15',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onSuccess,
}: BuyCreditsButtonProps) {
  const router = useRouter()
  const { user, profile, refreshProfile } = useAuth()
  const [loading, setLoading] = useState(false)

  const pack = CREDIT_PACKS.find(p => p.id === packId) as CreditPack

  const handleClick = async () => {
    if (!user) {
      router.push('/auth/signup?redirectTo=/pricing')
      return
    }

    setLoading(true)

    try {
      // Create Razorpay order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId, currency: 'INR' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      // Load Razorpay checkout
      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'Cultural Innovation Lab',
        description: `${pack?.credits || data.pack?.credits} Assessment Credits`,
        order_id: data.orderId,
        handler: async (paymentResponse: RazorpayResponse) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                packId,
                credits: pack?.credits || data.pack?.credits,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || 'Payment verification failed')
            }

            // Refresh profile to update credits display
            await refreshProfile()
            onSuccess?.()
            router.push(`/dashboard?payment=success&credits=${pack?.credits || data.pack?.credits}`)
          } catch (error) {
            console.error('Payment verification error:', error)
            router.push('/dashboard?payment=error')
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
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Error creating order:', error)
      setLoading(false)
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  const variantClasses = {
    primary: 'bg-gold text-white hover:bg-gold/90',
    secondary: 'bg-ink text-pearl hover:bg-ink/90',
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : (
        <>
          {children || (
            <>
              <CreditCard className="w-4 h-4" />
              Buy Credits
            </>
          )}
        </>
      )}
    </button>
  )
}
