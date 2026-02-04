'use client'

import { useState, useEffect, useCallback } from 'react'

const CSRF_TOKEN_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'

/**
 * Hook to get CSRF token for client-side requests
 *
 * Usage:
 * ```tsx
 * const { csrfToken, getCsrfHeaders, csrfFetch } = useCsrf()
 *
 * // Option 1: Get headers for manual fetch
 * fetch('/api/endpoint', {
 *   method: 'POST',
 *   headers: getCsrfHeaders(),
 *   body: JSON.stringify(data),
 * })
 *
 * // Option 2: Use wrapped fetch
 * csrfFetch('/api/endpoint', {
 *   method: 'POST',
 *   body: JSON.stringify(data),
 * })
 * ```
 */
export function useCsrf() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  // Get CSRF token from cookie on mount
  useEffect(() => {
    const getToken = () => {
      // Parse cookies to find CSRF token
      const cookies = document.cookie.split(';')
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=')
        if (name === CSRF_TOKEN_NAME) {
          setCsrfToken(decodeURIComponent(value))
          return
        }
      }
      // If no token found, trigger a refresh by calling an endpoint
      refreshToken()
    }

    getToken()
  }, [])

  // Refresh CSRF token
  const refreshToken = useCallback(async () => {
    try {
      // Call an endpoint that will set the CSRF cookie
      const response = await fetch('/api/health', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        // Re-read the cookie
        const cookies = document.cookie.split(';')
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split('=')
          if (name === CSRF_TOKEN_NAME) {
            setCsrfToken(decodeURIComponent(value))
            return
          }
        }
      }
    } catch (error) {
      console.warn('Failed to refresh CSRF token:', error)
    }
  }, [])

  // Get headers object with CSRF token
  const getCsrfHeaders = useCallback((): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (csrfToken) {
      headers[CSRF_HEADER_NAME] = csrfToken
    }
    return headers
  }, [csrfToken])

  // Wrapped fetch with CSRF token automatically included
  const csrfFetch = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const headers = new Headers(options.headers)

    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    if (csrfToken) {
      headers.set(CSRF_HEADER_NAME, csrfToken)
    }

    return fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Ensure cookies are sent
    })
  }, [csrfToken])

  return {
    csrfToken,
    getCsrfHeaders,
    csrfFetch,
    refreshToken,
    CSRF_HEADER_NAME,
  }
}

export default useCsrf
