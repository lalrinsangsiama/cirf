'use client'

import Link from 'next/link'

export function ThankYouScreen() {
  return (
    <div className="text-center py-16 animate-fade-in-up">
      {/* Checkmark */}
      <div className="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(90, 175, 110, 0.1), rgba(74, 173, 224, 0.08))' }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white"
          style={{ background: 'linear-gradient(135deg, #5aaf6e, #4aade0)', boxShadow: '0 6px 24px rgba(90, 175, 110, 0.25)' }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-3xl font-serif font-semibold mb-4" style={{ color: '#1a3a2a' }}>
        Thank You for Your Invaluable Contribution
      </h2>

      <p className="text-[15px] leading-relaxed max-w-lg mx-auto mb-6" style={{ color: '#5a7a6a' }}>
        Your expertise is helping to build the first unified framework for cultural innovation
        as a driver of economic resilience. Your responses have been securely recorded.
      </p>

      {/* Unlocked content */}
      <div
        className="inline-block px-8 py-6 rounded-2xl text-left mb-10 w-full max-w-md"
        style={{ background: 'linear-gradient(135deg, rgba(26, 138, 125, 0.06), rgba(212, 168, 67, 0.04))', border: '1px solid rgba(26, 138, 125, 0.15)' }}
      >
        <p className="text-sm font-semibold mb-4" style={{ color: '#1A8A7D' }}>
          🎉 You&apos;ve unlocked the full platform:
        </p>
        <div className="space-y-2.5">
          <Link href="/assessment" className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/60 group">
            <span className="text-lg">📊</span>
            <div>
              <span className="text-sm font-semibold block" style={{ color: '#0D1B2A' }}>CIRF Self-Assessment Tool</span>
              <span className="text-xs" style={{ color: '#4a5568' }}>Assess your cultural innovation initiative</span>
            </div>
            <svg className="w-4 h-4 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/framework" className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/60 group">
            <span className="text-lg">🏛️</span>
            <div>
              <span className="text-sm font-semibold block" style={{ color: '#0D1B2A' }}>The CIRF Framework</span>
              <span className="text-xs" style={{ color: '#4a5568' }}>Four pillars of cultural innovation</span>
            </div>
            <svg className="w-4 h-4 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/evidence" className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/60 group">
            <span className="text-lg">🌍</span>
            <div>
              <span className="text-sm font-semibold block" style={{ color: '#0D1B2A' }}>Global Evidence</span>
              <span className="text-xs" style={{ color: '#4a5568' }}>12 case studies from 6 continents</span>
            </div>
            <svg className="w-4 h-4 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/about" className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/60 group">
            <span className="text-lg">👩‍🔬</span>
            <div>
              <span className="text-sm font-semibold block" style={{ color: '#0D1B2A' }}>About the Research</span>
              <span className="text-xs" style={{ color: '#4a5568' }}>The researcher and methodology</span>
            </div>
            <svg className="w-4 h-4 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      {/* Researcher info */}
      <div className="inline-block px-6 py-4 rounded-xl text-left space-y-2 mb-6" style={{ backgroundColor: 'rgba(245, 240, 232, 0.5)' }}>
        <p className="text-[13px]" style={{ color: '#5a7a6a' }}>
          <span className="font-medium" style={{ color: '#3a5a4a' }}>Researcher:</span> Lalrinngheti Sangsiama
        </p>
        <p className="text-[13px]" style={{ color: '#5a7a6a' }}>
          <span className="font-medium" style={{ color: '#3a5a4a' }}>Programme:</span> Doctor of Business Administration
        </p>
        <p className="text-[13px]" style={{ color: '#5a7a6a' }}>
          <span className="font-medium" style={{ color: '#3a5a4a' }}>Institution:</span> Swiss School of Business and Management Geneva
        </p>
        <p className="text-[13px]" style={{ color: '#5a7a6a' }}>
          <span className="font-medium" style={{ color: '#3a5a4a' }}>Contact:</span>{' '}
          <a href="mailto:hello@culturalinnovationlab.org" style={{ color: '#4aade0' }} className="hover:underline">
            hello@culturalinnovationlab.org
          </a>
        </p>
      </div>
    </div>
  )
}
