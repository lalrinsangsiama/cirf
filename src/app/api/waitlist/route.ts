import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { waitlistSchema, validateInput } from '@/lib/validation'
import { checkRateLimit, newsletterRateLimit } from '@/lib/rateLimit'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check rate limit
    const rateLimitResult = checkRateLimit(request, newsletterRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('Waitlist rate limit exceeded', {
        path: '/api/waitlist',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        'Too many signup attempts. Please try again later.'
      )
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(waitlistSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { email, name, organization, interest } = validation.data
    const supabase = await createServiceClient()

    // Check if already on waitlist
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id, status')
      .eq('email', email)
      .single()

    if (existing) {
      logger.info('Waitlist duplicate signup', { email, status: existing.status })
      return successResponse(
        { alreadyOnList: true },
        "You're already on our waitlist! We'll be in touch soon."
      )
    }

    // Insert new waitlist entry
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({
        email,
        name: name || null,
        organization: organization || null,
        interest: interest || null,
        status: 'pending',
      })

    if (insertError) {
      logger.error('Failed to add to waitlist', {
        error: insertError.message,
        email,
      })
      return errorResponse(Errors.database('Failed to join waitlist'))
    }

    logger.info('Waitlist signup', {
      email,
      hasName: !!name,
      hasOrganization: !!organization,
      hasInterest: !!interest,
      durationMs: Date.now() - startTime,
    })

    return successResponse(
      undefined,
      "You're on the list! We'll notify you when the platform launches."
    )
  } catch (error) {
    logger.error('Waitlist error', {
      path: '/api/waitlist',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to join waitlist')
    )
  }
}
