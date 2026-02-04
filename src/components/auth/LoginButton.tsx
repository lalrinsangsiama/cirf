'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { User, LogOut, LayoutDashboard, ChevronDown, CreditCard } from 'lucide-react'

export function LoginButton() {
  const { user, profile, loading, signOut } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (loading) {
    return (
      <div className="w-20 h-10 bg-stone/20 rounded-full animate-pulse" />
    )
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className="text-sm font-medium hover:text-gold transition-colors"
        >
          Log in
        </Link>
        <Link
          href="/auth/signup"
          className="bg-ink text-pearl px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors"
        >
          Sign up
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
            <User className="w-4 h-4 text-gold" />
          </div>
          <span className="hidden sm:inline">{profile?.full_name || 'Account'}</span>
          {profile && (
            <span className="bg-gold/20 text-gold px-2 py-0.5 rounded-full text-xs font-semibold">
              {profile.credits} credits
            </span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-pearl rounded-lg shadow-lg border border-stone/10 py-2 z-50">
            <div className="px-4 py-2 border-b border-stone/10">
              <p className="text-sm font-medium truncate">{profile?.full_name || 'User'}</p>
              <p className="text-xs text-stone truncate">{user.email}</p>
            </div>

            <Link
              href="/dashboard"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-sand transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              href="/pricing"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-sand transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              Buy Credits
              <span className="ml-auto text-xs text-stone">{profile?.credits || 0} remaining</span>
            </Link>

            <div className="border-t border-stone/10 mt-2 pt-2">
              <button
                onClick={() => {
                  setDropdownOpen(false)
                  signOut()
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-terracotta hover:bg-sand transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
