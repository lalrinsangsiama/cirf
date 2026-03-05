import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// CSRF Configuration
const CSRF_TOKEN_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours

function getCsrfSecret(): string {
  const secret = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === 'production') {
    throw new Error('[SECURITY] CSRF_SECRET or NEXTAUTH_SECRET must be set in production')
  }
  return 'dev-only-csrf-secret'
}

/**
 * Routes that are exempt from CSRF validation
 * - Webhooks use signature verification
 * - OAuth callbacks use state parameter
 * - Health check is read-only
 */
const CSRF_EXEMPT_ROUTES = [
  '/auth/callback',
  '/api/health',
  '/api/blog/seed', // Uses Bearer token authentication
]

/**
 * HTTP methods that require CSRF protection
 */
const CSRF_REQUIRED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']

// --- Web Crypto helpers (edge-compatible) ---

const encoder = new TextEncoder()

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return toHex(arr.buffer)
}

/**
 * Generate a CSRF token
 */
async function generateCsrfToken(): Promise<string> {
  const secret = getCsrfSecret()
  const timestamp = Date.now().toString(36)
  const random = randomHex(32)
  const data = `${timestamp}.${random}`

  const key = await getHmacKey(secret)
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  const signature = toHex(sig)

  return `${data}.${signature}`
}

/**
 * Validate a CSRF token
 */
async function validateCsrfToken(token: string): Promise<boolean> {
  if (!token) return false

  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [timestamp, randomBytes, signature] = parts

  // Verify signature
  const secret = getCsrfSecret()
  const data = `${timestamp}.${randomBytes}`
  const key = await getHmacKey(secret)
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    hexToBuffer(signature),
    encoder.encode(data)
  )

  if (!valid) return false

  // Check token expiry
  const tokenTime = parseInt(timestamp, 36)
  if (Date.now() - tokenTime > TOKEN_EXPIRY_MS) {
    return false
  }

  return true
}

function hexToBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes.buffer
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
      if (headerToken !== cookieToken || !(await validateCsrfToken(cookieToken))) {
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
  const tokenValid = existingToken && (await validateCsrfToken(existingToken))

  if (!tokenValid) {
    const newToken = await generateCsrfToken()
    response.cookies.set(CSRF_TOKEN_NAME, newToken, {
      httpOnly: false, // Double-submit cookie pattern: JS reads cookie to send as X-CSRF-TOKEN header
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
