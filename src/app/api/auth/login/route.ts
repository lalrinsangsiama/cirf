import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { validateInput } from '@/lib/validation'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'
import { checkRateLimit, authRateLimit } from '@/lib/rateLimit'

// Request schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Apply rate limiting - more strict for auth endpoints
    const rateLimitResult = checkRateLimit(request, authRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('Login rate limit exceeded', {
        path: '/api/auth/login',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        authRateLimit.message
      )
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(loginSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { email, password } = validation.data

    // Attempt login with Supabase
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      logger.auth('Login failed', {
        email,
        error: error.message,
        durationMs: Date.now() - startTime,
      })

      // Return generic error to avoid revealing whether email exists
      if (error.message === 'Invalid login credentials') {
        return errorResponse(Errors.unauthorized('Invalid email or password'))
      }

      return errorResponse(Errors.unauthorized(error.message))
    }

    logger.auth('Login successful', {
      userId: data.user?.id,
      email,
      durationMs: Date.now() - startTime,
    })

    return successResponse({
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    }, 'Login successful')

  } catch (error) {
    logger.error('Login error', {
      path: '/api/auth/login',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Login failed')
    )
  }
}
