'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { CreditCard, Plus } from 'lucide-react'

interface CreditBalanceProps {
  showBuyButton?: boolean
  variant?: 'default' | 'compact'
}

export function CreditBalance({ showBuyButton = true, variant = 'default' }: CreditBalanceProps) {
  const { profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-stone/20 rounded w-20" />
      </div>
    )
  }

  if (!profile) {
    return null
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <span className="bg-gold/20 text-gold px-2 py-0.5 rounded-full text-xs font-semibold">
          {profile.credits} credits
        </span>
        {showBuyButton && profile.credits < 3 && (
          <Link
            href="/pricing"
            className="text-xs text-gold hover:underline"
          >
            Get more
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-gold" />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{profile.credits}</p>
          <p className="text-xs text-stone">credits</p>
        </div>
      </div>

      {showBuyButton && (
        <Link
          href="/pricing"
          className="flex items-center gap-1 text-sm text-gold font-medium hover:underline"
        >
          <Plus className="w-4 h-4" />
          Buy more
        </Link>
      )}
    </div>
  )
}
