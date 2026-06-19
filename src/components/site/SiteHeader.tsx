'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/framework', label: 'Framework' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(250, 247, 242, 0.9)', borderBottom: '1px solid rgba(13, 27, 42, 0.06)' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A8A7D, #0D1B2A)' }}>
            <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight" style={{ color: '#0D1B2A', fontFamily: "'Playfair Display', serif" }}>
            Cultural Innovation Lab
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
              style={{ color: '#0D1B2A' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            className="text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: '#1A8A7D', boxShadow: '0 2px 8px rgba(26, 138, 125, 0.2)' }}
          >
            Take Assessment
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#0D1B2A' }}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 animate-fade-in-up">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-base font-medium py-2"
              style={{ color: '#0D1B2A' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            className="block text-center text-sm font-semibold px-5 py-3 rounded-full text-white"
            style={{ backgroundColor: '#1A8A7D' }}
            onClick={() => setMobileOpen(false)}
          >
            Take Assessment
          </Link>
        </div>
      )}
    </header>
  )
}
