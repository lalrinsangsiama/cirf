import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { validateInput } from '@/lib/validation'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'
import { checkRateLimit, authRateLimit } from '@/lib/rateLimit'

// Request schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name too long'),
  organization: z.string().max(200, 'Organization name too long').optional(),
  role: z.enum(['researcher', 'practitioner', 'community_leader', 'policymaker', 'other']).optional(),
  redirectTo: z.string().optional(),
})

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Apply rate limiting - more strict for auth endpoints
    const rateLimitResult = checkRateLimit(request, authRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('Signup rate limit exceeded', {
        path: '/api/auth/signup',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        authRateLimit.message
      )
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(signupSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { email, password, fullName, organization, role, redirectTo } = validation.data

    // Determine the redirect URL for email confirmation
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const emailRedirectTo = `${origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo || '/dashboard')}`

    // Create account with Supabase
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          organization: organization || null,
          role: role || 'researcher',
        },
        emailRedirectTo,
      },
    })

    if (error) {
      logger.auth('Signup failed', {
        email,
        error: error.message,
        durationMs: Date.now() - startTime,
      })

      // Map common Supabase errors to user-friendly messages
      if (error.message.includes('already registered')) {
        return errorResponse(Errors.conflict('An account with this email already exists'))
      }

      return errorResponse(Errors.badRequest(error.message))
    }

    // Check if email confirmation is required
    const requiresEmailConfirmation = data.user?.identities?.length === 0 ||
      data.user?.email_confirmed_at === null

    logger.auth('Signup successful', {
      userId: data.user?.id,
      email,
      requiresEmailConfirmation,
      durationMs: Date.now() - startTime,
    })

    return successResponse({
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      requiresEmailConfirmation,
    }, requiresEmailConfirmation
      ? 'Account created. Please check your email to verify your account.'
      : 'Account created successfully')

  } catch (error) {
    logger.error('Signup error', {
      path: '/api/auth/signup',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Signup failed')
    )
  }
}
