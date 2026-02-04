import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import crypto from 'crypto'

// CSRF Configuration
const CSRF_TOKEN_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours
const SECRET_KEY = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET || 'fallback-secret-change-in-production'

/**
 * Routes that are exempt from CSRF validation
 * - Webhooks use signature verification
 * - OAuth callbacks use state parameter
 * - Health check is read-only
 */
const CSRF_EXEMPT_ROUTES = [
  '/api/razorpay/webhook',
  '/auth/callback',
  '/api/health',
]

/**
 * HTTP methods that require CSRF protection
 */
const CSRF_REQUIRED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']

/**
 * Generate a CSRF token
 */
function generateCsrfToken(): string {
  const timestamp = Date.now().toString(36)
  const randomBytes = crypto.randomBytes(32).toString('hex')
  const data = `${timestamp}.${randomBytes}`

  const hmac = crypto.createHmac('sha256', SECRET_KEY)
  hmac.update(data)
  const signature = hmac.digest('hex')

  return `${data}.${signature}`
}

/**
 * Validate a CSRF token
 */
function validateCsrfToken(token: string): boolean {
  if (!token) return false

  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [timestamp, randomBytes, signature] = parts

  // Verify signature
  const data = `${timestamp}.${randomBytes}`
  const hmac = crypto.createHmac('sha256', SECRET_KEY)
  hmac.update(data)
  const expectedSignature = hmac.digest('hex')

  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return false
    }
  } catch {
    return false
  }

  // Check token expiry
  const tokenTime = parseInt(timestamp, 36)
  if (Date.now() - tokenTime > TOKEN_EXPIRY_MS) {
    return false
  }

  return true
}

/**
 * Check if route should skip CSRF validation
 */
function isCsrfExempt(pathname: string): boolean {
  return CSRF_EXEMPT_ROUTES.some(route => pathname.startsWith(route))
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Run Supabase session update first
  const response = await updateSession(request)

  // Only apply CSRF to API routes
  if (!pathname.startsWith('/api')) {
    return response
  }

  // Check if this request requires CSRF protection
  const requiresCsrf = CSRF_REQUIRED_METHODS.includes(request.method.toUpperCase())
  const isExempt = isCsrfExempt(pathname)

  if (requiresCsrf && !isExempt) {
    const headerToken = request.headers.get(CSRF_HEADER_NAME)
    const cookieToken = request.cookies.get(CSRF_TOKEN_NAME)?.value

    // Validate CSRF token
    if (!headerToken || !cookieToken) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CSRF_MISSING',
            message: 'CSRF token missing',
          },
        },
        { status: 403 }
      )
    }

    // Compare tokens
    try {
      if (headerToken !== cookieToken || !validateCsrfToken(cookieToken)) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'CSRF_INVALID',
              message: 'Invalid CSRF token',
            },
          },
          { status: 403 }
        )
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CSRF_VALIDATION_ERROR',
            message: 'CSRF token validation failed',
          },
        },
        { status: 403 }
      )
    }
  }

  // Ensure CSRF token cookie exists for all requests
  const existingToken = request.cookies.get(CSRF_TOKEN_NAME)?.value
  const tokenValid = existingToken && validateCsrfToken(existingToken)

  if (!tokenValid) {
    const newToken = generateCsrfToken()
    response.cookies.set(CSRF_TOKEN_NAME, newToken, {
      httpOnly: false, // Must be readable by JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
