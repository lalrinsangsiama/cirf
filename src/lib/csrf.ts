import { cookies } from 'next/headers'
import crypto from 'crypto'

// CSRF Token Configuration
const CSRF_TOKEN_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours
const SECRET_KEY = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET || 'fallback-secret-change-in-production'

/**
 * Generate a CSRF token with timestamp
 */
export function generateCsrfToken(): string {
  const timestamp = Date.now().toString(36)
  const randomBytes = crypto.randomBytes(32).toString('hex')
  const data = `${timestamp}.${randomBytes}`

  // Create HMAC signature
  const hmac = crypto.createHmac('sha256', SECRET_KEY)
  hmac.update(data)
  const signature = hmac.digest('hex')

  return `${data}.${signature}`
}

/**
 * Validate a CSRF token
 */
export function validateCsrfToken(token: string): {
  valid: boolean
  error?: string
} {
  if (!token) {
    return { valid: false, error: 'Missing CSRF token' }
  }

  const parts = token.split('.')
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid CSRF token format' }
  }

  const [timestamp, randomBytes, signature] = parts

  // Verify signature
  const data = `${timestamp}.${randomBytes}`
  const hmac = crypto.createHmac('sha256', SECRET_KEY)
  hmac.update(data)
  const expectedSignature = hmac.digest('hex')

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return { valid: false, error: 'Invalid CSRF token signature' }
  }

  // Check token expiry
  const tokenTime = parseInt(timestamp, 36)
  if (Date.now() - tokenTime > TOKEN_EXPIRY_MS) {
    return { valid: false, error: 'CSRF token expired' }
  }

  return { valid: true }
}

/**
 * Get or create CSRF token from cookies (server-side)
 */
export async function getOrCreateCsrfToken(): Promise<string> {
  const cookieStore = await cookies()
  const existingToken = cookieStore.get(CSRF_TOKEN_NAME)?.value

  // Validate existing token
  if (existingToken) {
    const validation = validateCsrfToken(existingToken)
    if (validation.valid) {
      return existingToken
    }
  }

  // Generate new token
  const newToken = generateCsrfToken()

  // Set cookie with secure options
  cookieStore.set(CSRF_TOKEN_NAME, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  })

  return newToken
}

/**
 * Validate CSRF token from request header against cookie
 */
export async function validateRequestCsrf(request: Request): Promise<{
  valid: boolean
  error?: string
}> {
  const headerToken = request.headers.get(CSRF_HEADER_NAME)
  const cookieStore = await cookies()
  const cookieToken = cookieStore.get(CSRF_TOKEN_NAME)?.value

  if (!headerToken) {
    return { valid: false, error: 'Missing CSRF token in header' }
  }

  if (!cookieToken) {
    return { valid: false, error: 'Missing CSRF token in cookie' }
  }

  // Compare tokens using timing-safe comparison
  if (headerToken.length !== cookieToken.length) {
    return { valid: false, error: 'CSRF token mismatch' }
  }

  if (!crypto.timingSafeEqual(Buffer.from(headerToken), Buffer.from(cookieToken))) {
    return { valid: false, error: 'CSRF token mismatch' }
  }

  // Validate token integrity
  return validateCsrfToken(cookieToken)
}

/**
 * Check if route should be exempt from CSRF validation
 */
export function isCsrfExempt(pathname: string): boolean {
  const exemptRoutes = [
    // Webhooks use signature verification instead of CSRF
    '/api/razorpay/webhook',
    // OAuth callbacks are protected by state parameter
    '/auth/callback',
    // Health check is read-only
    '/api/health',
  ]

  return exemptRoutes.some(route => pathname.startsWith(route))
}

/**
 * Check if HTTP method requires CSRF protection
 */
export function requiresCsrf(method: string): boolean {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS']
  return !safeMethods.includes(method.toUpperCase())
}

// Export constants for use in other modules
export const CSRF_CONSTANTS = {
  TOKEN_NAME: CSRF_TOKEN_NAME,
  HEADER_NAME: CSRF_HEADER_NAME,
} as const
