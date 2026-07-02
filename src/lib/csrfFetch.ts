/**
 * Client-side fetch wrapper that attaches the CSRF token required by
 * middleware.ts for all non-exempt POST/PUT/PATCH/DELETE requests to /api/*.
 *
 * Reads the double-submit cookie at call time (no hook state to go stale).
 * If the cookie is missing (first visit, expired token), primes it via
 * /api/health — the middleware sets a fresh token on every response.
 */

const CSRF_TOKEN_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'

function readCsrfCookie(): string | null {
  if (typeof document === 'undefined') return null
  for (const cookie of document.cookie.split(';')) {
    const eq = cookie.indexOf('=')
    if (eq === -1) continue
    const name = cookie.slice(0, eq).trim()
    if (name === CSRF_TOKEN_NAME) {
      return decodeURIComponent(cookie.slice(eq + 1))
    }
  }
  return null
}

export async function csrfFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = readCsrfCookie()
  if (!token) {
    try {
      await fetch('/api/health', { credentials: 'include' })
    } catch {
      // Network failure — the actual request below will surface the error
    }
    token = readCsrfCookie()
  }

  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set(CSRF_HEADER_NAME, token)
  }

  return fetch(url, { ...options, headers, credentials: 'include' })
}
