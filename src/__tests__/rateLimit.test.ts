import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import {
  checkRateLimit,
  apiRateLimit,
  authRateLimit,
  contactRateLimit,
  aiRateLimit,
} from '@/lib/rateLimit'

// Helper to create mock NextRequest
function createMockRequest(path: string, ip = '127.0.0.1'): NextRequest {
  const url = `http://localhost:3000${path}`
  const request = new NextRequest(url, {
    headers: {
      'x-forwarded-for': ip,
    },
  })
  return request
}

describe('Rate Limiting', () => {
  beforeEach(() => {
    // Reset any rate limit state by using different IPs/paths for each test
    vi.useFakeTimers()
  })

  describe('checkRateLimit', () => {
    it('allows requests under the limit', () => {
      const request = createMockRequest('/api/test', '1.1.1.1')
      const config = { windowMs: 60000, maxRequests: 5 }

      const result = checkRateLimit(request, config)

      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(4)
    })

    it('blocks requests over the limit', () => {
      const config = { windowMs: 60000, maxRequests: 3 }

      // Make 4 requests from the same IP
      for (let i = 0; i < 3; i++) {
        const request = createMockRequest('/api/blocked', '2.2.2.2')
        checkRateLimit(request, config)
      }

      const request = createMockRequest('/api/blocked', '2.2.2.2')
      const result = checkRateLimit(request, config)

      expect(result.allowed).toBe(false)
      expect(result.remaining).toBe(0)
    })

    it('tracks different paths separately', () => {
      const config = { windowMs: 60000, maxRequests: 2 }

      const request1 = createMockRequest('/api/path1', '3.3.3.3')
      const request2 = createMockRequest('/api/path2', '3.3.3.3')

      const result1 = checkRateLimit(request1, config)
      const result2 = checkRateLimit(request2, config)

      expect(result1.allowed).toBe(true)
      expect(result2.allowed).toBe(true)
    })

    it('tracks different IPs separately', () => {
      const config = { windowMs: 60000, maxRequests: 1 }

      const request1 = createMockRequest('/api/ip-test', '4.4.4.4')
      const request2 = createMockRequest('/api/ip-test', '5.5.5.5')

      const result1 = checkRateLimit(request1, config)
      const result2 = checkRateLimit(request2, config)

      expect(result1.allowed).toBe(true)
      expect(result2.allowed).toBe(true)
    })

    it('resets after window expires', () => {
      const config = { windowMs: 1000, maxRequests: 1 }

      const request = createMockRequest('/api/reset-test', '6.6.6.6')

      // First request - allowed
      let result = checkRateLimit(request, config)
      expect(result.allowed).toBe(true)

      // Second request - blocked
      result = checkRateLimit(request, config)
      expect(result.allowed).toBe(false)

      // Advance time past window
      vi.advanceTimersByTime(1500)

      // Third request - should be allowed again
      result = checkRateLimit(request, config)
      expect(result.allowed).toBe(true)
    })

    it('returns correct reset time', () => {
      const config = { windowMs: 60000, maxRequests: 5 }
      const now = Date.now()

      const request = createMockRequest('/api/reset-time', '7.7.7.7')
      const result = checkRateLimit(request, config)

      expect(result.resetTime).toBeGreaterThan(now)
      expect(result.resetTime).toBeLessThanOrEqual(now + config.windowMs)
    })

    it('accepts custom identifier', () => {
      const config = { windowMs: 60000, maxRequests: 1 }

      const request = createMockRequest('/api/custom-id', '8.8.8.8')

      // Use custom identifier instead of IP
      const result1 = checkRateLimit(request, config, 'user-123')
      const result2 = checkRateLimit(request, config, 'user-456')

      expect(result1.allowed).toBe(true)
      expect(result2.allowed).toBe(true)
    })
  })

  describe('Preconfigured Rate Limiters', () => {
    it('apiRateLimit allows 60 requests per minute', () => {
      expect(apiRateLimit.maxRequests).toBe(60)
      expect(apiRateLimit.windowMs).toBe(60 * 1000)
    })

    it('authRateLimit allows 5 attempts per 15 minutes', () => {
      expect(authRateLimit.maxRequests).toBe(5)
      expect(authRateLimit.windowMs).toBe(15 * 60 * 1000)
    })

    it('contactRateLimit allows 5 submissions per hour', () => {
      expect(contactRateLimit.maxRequests).toBe(5)
      expect(contactRateLimit.windowMs).toBe(60 * 60 * 1000)
    })

    it('aiRateLimit allows 3 requests per minute', () => {
      expect(aiRateLimit.maxRequests).toBe(3)
      expect(aiRateLimit.windowMs).toBe(60 * 1000)
    })
  })
})
