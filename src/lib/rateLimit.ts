import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  message?: string // Custom error message
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store for rate limiting
// WARNING: This in-memory Map doesn't work across multiple server instances.
// For production at scale with multiple instances, migrate to Redis/Upstash:
// - Upstash: https://upstash.com/docs/redis/sdks/ratelimit
// - Redis: Use ioredis with a rate limiting library like 'rate-limiter-flexible'
const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries periodically
const CLEANUP_INTERVAL = 60000 // 1 minute
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return

  lastCleanup = now
  rateLimitStore.forEach((entry, key) => {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  })
}

/**
 * Get client identifier for rate limiting
 */
function getClientId(request: NextRequest): string {
  // Try to get real IP from various headers (in order of reliability)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')

  // Use the first IP from X-Forwarded-For if available
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (cfConnectingIp) return cfConnectingIp
  if (realIp) return realIp

  // Fallback to a default (shouldn't happen in production)
  return 'unknown'
}

/**
 * Check rate limit for a request
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig,
  identifier?: string
): { allowed: boolean; remaining: number; resetTime: number } {
  cleanup()

  const clientId = identifier || getClientId(request)
  const key = `${clientId}:${request.nextUrl.pathname}`
  const now = Date.now()

  let entry = rateLimitStore.get(key)

  // Create new entry or reset if window expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    rateLimitStore.set(key, entry)
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: entry.resetTime,
    }
  }

  // Increment count
  entry.count++

  if (entry.count > config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  }
}

/**
 * Create rate limit error response
 */
export function rateLimitResponse(
  resetTime: number,
  message?: string
): NextResponse {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)

  return NextResponse.json(
    {
      error: message || 'Too many requests. Please try again later.',
      retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Reset': new Date(resetTime).toISOString(),
      },
    }
  )
}

/**
 * Rate limit middleware wrapper
 */
export function withRateLimit(
  config: RateLimitConfig,
  handler: (request: NextRequest) => Promise<NextResponse>,
  getIdentifier?: (request: NextRequest) => string
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const identifier = getIdentifier?.(request)
    const result = checkRateLimit(request, config, identifier)

    if (!result.allowed) {
      return rateLimitResponse(result.resetTime, config.message)
    }

    const response = await handler(request)

    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
    response.headers.set(
      'X-RateLimit-Reset',
      new Date(result.resetTime).toISOString()
    )

    return response
  }
}

// ===== Preconfigured Rate Limiters =====

/**
 * API rate limiter: 60 requests per minute
 */
export const apiRateLimit: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60,
  message: 'Too many API requests. Please slow down.',
}

/**
 * Auth rate limiter: 5 attempts per 15 minutes
 */
export const authRateLimit: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  message: 'Too many login attempts. Please try again in 15 minutes.',
}

/**
 * Contact form rate limiter: 5 submissions per hour
 */
export const contactRateLimit: RateLimitConfig = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,
  message: 'Too many contact submissions. Please try again later.',
}

/**
 * Newsletter rate limiter: 3 subscriptions per hour
 */
export const newsletterRateLimit: RateLimitConfig = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
  message: 'Too many subscription attempts. Please try again later.',
}

/**
 * AI generation rate limiter: 3 requests per minute
 */
export const aiRateLimit: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 3,
  message: 'AI generation rate limit reached. Please wait a moment.',
}

/**
 * Payment rate limiter: 10 orders per hour
 */
export const paymentRateLimit: RateLimitConfig = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
  message: 'Too many payment attempts. Please try again later.',
}

/**
 * Webhook rate limiter: 100 per minute (more permissive for Razorpay)
 */
export const webhookRateLimit: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
}
