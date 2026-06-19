'use client'

// DEPRECATED (cil-cleanup-pass): No longer used. The (site) pages are now public,
// so this survey-completion gate was unwired from src/app/(site)/layout.tsx.
// Kept for reference rather than deleted; safe to remove if the public-pages
// decision is permanent.

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const SURVEY_STORAGE_KEY = 'cirf-survey-state'

export function SurveyGate({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false)
  const [completed, setCompleted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SURVEY_STORAGE_KEY)
      if (saved) {
        const state = JSON.parse(saved)
        if (state.isComplete) {
          setCompleted(true)
          setChecked(true)
          return
        }
      }
    } catch {
      // ignore
    }
    // Not completed — redirect to survey
    setChecked(true)
    router.replace('/survey')
  }, [router, pathname])

  if (!checked) {
    // Brief loading state while checking localStorage
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="text-center animate-fade-in">
          <div className="w-10 h-10 rounded-full mx-auto mb-4" style={{ border: '3px solid #e0dbd4', borderTopColor: '#1A8A7D', animation: 'spin 0.8s linear infinite' }} />
          <p className="text-sm" style={{ color: '#4a5568' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!completed) return null // Redirecting...

  return <>{children}</>
}
