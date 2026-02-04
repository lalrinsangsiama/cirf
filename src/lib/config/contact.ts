/**
 * Centralized contact information
 * Single source of truth for all contact emails and info
 */

export const CONTACT_INFO = {
  // Primary contact email for general inquiries
  email: 'contact@cirf-framework.org',

  // Support email for customer/payment issues
  supportEmail: 'support@cirf-framework.org',

  // Admin email for notifications (form submissions, etc.)
  adminEmail: process.env.ADMIN_EMAIL || 'contact@cirf-framework.org',

  // Organization info
  organization: 'Cultural Innovation Lab',
  organizationShort: 'CIL',

  // Social links (add as needed)
  social: {
    twitter: '', // Add when available
    linkedin: '', // Add when available
    github: '', // Add when available
  },

  // Website URLs
  urls: {
    base: process.env.NEXT_PUBLIC_BASE_URL || 'https://cirf-framework.org',
    contact: '/about#contact',
    pricing: '/pricing',
    support: '/about#contact',
  },
} as const

export type ContactInfo = typeof CONTACT_INFO
