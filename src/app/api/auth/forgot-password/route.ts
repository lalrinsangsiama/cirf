import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { validateInput } from '@/lib/validation'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'
import { checkRateLimit, authRateLimit } from '@/lib/rateLimit'

// Request schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Apply rate limiting - more strict for auth endpoints
    const rateLimitResult = checkRateLimit(request, authRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('Forgot password rate limit exceeded', {
        path: '/api/auth/forgot-password',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        'Too many password reset attempts. Please try again in 15 minutes.'
      )
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(forgotPasswordSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { email } = validation.data

    // Determine the redirect URL for password reset
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const redirectTo = `${origin}/auth/reset-password`

    // Request password reset
    const supabase = await createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (error) {
      logger.auth('Password reset request failed', {
        email,
        error: error.message,
        durationMs: Date.now() - startTime,
      })

      // Don't reveal whether the email exists or not
      // Always return success to prevent email enumeration
      logger.info('Password reset requested (email may not exist)', { email })
    } else {
      logger.auth('Password reset email sent', {
        email,
        durationMs: Date.now() - startTime,
      })
    }

    // Always return success to prevent email enumeration attacks
    return successResponse(
      { email },
      'If an account exists with this email, a password reset link has been sent.'
    )

  } catch (error) {
    logger.error('Forgot password error', {
      path: '/api/auth/forgot-password',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    // Still return success to prevent information leakage
    return successResponse(
      {},
      'If an account exists with this email, a password reset link has been sent.'
    )
  }
}
