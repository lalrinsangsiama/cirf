'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { LoginButton } from '@/components/auth/LoginButton'

const navigation = [
  { name: 'Framework', href: '/framework' },
  { name: 'Research', href: '/research' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Tools', href: '/tools' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null)

  // Check if current page is an auth page (don't show header on auth pages)
  const isAuthPage = pathname?.startsWith('/auth')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus()
    }
  }, [isMobileMenuOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Focus trap for mobile menu
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return

    const focusableElements = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    )
    if (!focusableElements || focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }, [])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Don't render header on auth pages
  if (isAuthPage) {
    return null
  }

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled
          ? 'py-4 px-6 md:px-16 bg-pearl/95 backdrop-blur-xl border-b border-ink/5'
          : 'py-6 md:py-12 px-6 md:px-16 mix-blend-difference'
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}
    >
      <nav className="flex justify-between items-center max-w-[1800px] mx-auto" aria-label="Main navigation">
        <Link
          href="/"
          className={cn(
            'font-serif text-2xl md:text-3xl font-extralight tracking-tight',
            isScrolled ? 'text-ink' : 'text-pearl'
          )}
          aria-label="CIL - Home"
        >
          CIL
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-12" role="menubar">
          {navigation.map((item) => (
            <li key={item.name} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className={cn(
                  'nav-link text-sm font-normal tracking-wide transition-colors duration-300',
                  isScrolled ? 'text-ink' : 'text-pearl',
                  pathname === item.href && 'active'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons - Desktop */}
        <div className={cn(
          'hidden lg:block',
          !isScrolled && 'mix-blend-normal'
        )}>
          {isScrolled ? (
            <LoginButton />
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-normal tracking-wide text-pearl hover:text-gold transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          className="lg:hidden p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className={cn('w-6 h-6', isScrolled ? 'text-ink' : 'text-pearl')} aria-hidden="true" />
          ) : (
            <Menu className={cn('w-6 h-6', isScrolled ? 'text-ink' : 'text-pearl')} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu with backdrop */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-0 z-40 transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onKeyDown={handleKeyDown}
          className={cn(
            'absolute top-0 right-0 h-screen w-full max-w-sm bg-pearl shadow-2xl',
            'transform transition-transform duration-300 ease-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Close button inside menu */}
          <div className="flex justify-end p-6">
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-ink/5 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-ink" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-6" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-2" role="menu">
              {navigation.map((item, index) => (
                <li key={item.name} role="none">
                  <Link
                    ref={index === 0 ? firstMenuItemRef : index === navigation.length - 1 ? lastMenuItemRef : undefined}
                    href={item.href}
                    role="menuitem"
                    className={cn(
                      'block py-3 px-4 text-lg text-ink rounded-lg transition-colors',
                      'hover:bg-sand focus:bg-sand focus:outline-none',
                      pathname === item.href && 'font-medium bg-sand'
                    )}
                    onClick={closeMobileMenu}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="px-6 mt-8 pt-6 border-t border-ink/10">
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/login"
                className="block py-3 px-4 text-center text-ink text-lg rounded-lg hover:bg-sand transition-colors"
                onClick={closeMobileMenu}
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="block py-3 px-4 text-center bg-ink text-pearl text-lg font-medium rounded-full hover:bg-ink/90 transition-colors"
                onClick={closeMobileMenu}
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
