import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJtest'
process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = 'rzp_test_123'

// MSW handlers for API mocking
export const handlers = [
  // Mock Supabase auth
  http.post('https://test.supabase.co/auth/v1/token', () => {
    return HttpResponse.json({
      access_token: 'test-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'test-refresh',
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
      },
    })
  }),

  // Mock Supabase user
  http.get('https://test.supabase.co/auth/v1/user', () => {
    return HttpResponse.json({
      id: 'test-user-id',
      email: 'test@example.com',
    })
  }),
]

// Setup MSW server
export const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = () => null
  disconnect = () => null
  unobserve = () => null
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

// Mock ResizeObserver
class MockResizeObserver {
  observe = () => null
  disconnect = () => null
  unobserve = () => null
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
})

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
})
