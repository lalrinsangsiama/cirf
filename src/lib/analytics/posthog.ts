'use client'

import posthog from 'posthog-js'
import { features } from '../env'

let initialized = false

export function initPostHog() {
  if (typeof window === 'undefined') return
  if (initialized) return
  if (!features.analytics) return

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (!key || !host) return

  posthog.init(key, {
    api_host: host,
    person_profiles: 'identified_only',
    capture_pageview: false, // We handle this manually
    capture_pageleave: true,
    autocapture: {
      dom_event_allowlist: ['click', 'submit'],
      element_allowlist: ['button', 'a', 'form'],
    },
    loaded: (ph) => {
      // Disable in development
      if (process.env.NODE_ENV === 'development') {
        ph.opt_out_capturing()
      }
    },
  })

  initialized = true
}

export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  if (!features.analytics) return
  posthog.identify(userId, properties)
}

export function resetUser() {
  if (!features.analytics) return
  posthog.reset()
}

// Track page views
export function trackPageView(url: string) {
  if (!features.analytics) return
  posthog.capture('$pageview', {
    $current_url: url,
  })
}

// Track custom events
export function trackEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  if (!features.analytics) return
  posthog.capture(event, properties)
}

// ===== Domain-specific tracking functions =====

export function trackAssessmentStarted(userId?: string) {
  trackEvent('assessment_started', {
    user_id: userId,
    timestamp: new Date().toISOString(),
  })
}

export function trackAssessmentCompleted(
  score: number,
  level: string,
  userId?: string
) {
  trackEvent('assessment_completed', {
    score,
    level,
    user_id: userId,
    timestamp: new Date().toISOString(),
  })
}

export function trackCreditPurchaseStarted(
  packId: string,
  credits: number,
  amount: number,
  currency: string
) {
  trackEvent('credit_purchase_started', {
    pack_id: packId,
    credits,
    amount,
    currency,
    timestamp: new Date().toISOString(),
  })
}

export function trackPaymentSuccessful(
  orderId: string,
  packId: string,
  credits: number,
  amount: number,
  currency: string
) {
  trackEvent('payment_successful', {
    order_id: orderId,
    pack_id: packId,
    credits,
    amount,
    currency,
    timestamp: new Date().toISOString(),
  })
}

export function trackPaymentFailed(
  orderId: string,
  packId: string,
  error?: string
) {
  trackEvent('payment_failed', {
    order_id: orderId,
    pack_id: packId,
    error,
    timestamp: new Date().toISOString(),
  })
}

export function trackNewsletterSignup(source?: string) {
  trackEvent('newsletter_signup', {
    source: source || 'unknown',
    timestamp: new Date().toISOString(),
  })
}

export function trackContactSubmitted() {
  trackEvent('contact_submitted', {
    timestamp: new Date().toISOString(),
  })
}

export function trackResourceDownload(resourceName: string, resourceType: string) {
  trackEvent('resource_download', {
    resource_name: resourceName,
    resource_type: resourceType,
    timestamp: new Date().toISOString(),
  })
}

export function trackBlogPostViewed(slug: string, title: string, category: string) {
  trackEvent('blog_post_viewed', {
    slug,
    title,
    category,
    timestamp: new Date().toISOString(),
  })
}

export function trackCaseStudyViewed(caseStudyId: string, title: string) {
  trackEvent('case_study_viewed', {
    case_study_id: caseStudyId,
    title,
    timestamp: new Date().toISOString(),
  })
}

export function trackSignup(method: string) {
  trackEvent('user_signup', {
    method,
    timestamp: new Date().toISOString(),
  })
}

export function trackLogin(method: string) {
  trackEvent('user_login', {
    method,
    timestamp: new Date().toISOString(),
  })
}

export function trackWaitlistJoined(source?: string) {
  trackEvent('waitlist_joined', {
    source: source || 'platform_page',
    timestamp: new Date().toISOString(),
  })
}

// Feature flags
export function getFeatureFlag(key: string): boolean {
  if (!features.analytics) return false
  return posthog.isFeatureEnabled(key) ?? false
}

// A/B testing
export function getFeatureFlagPayload<T>(key: string): T | undefined {
  if (!features.analytics) return undefined
  return posthog.getFeatureFlagPayload(key) as T | undefined
}
