import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendNewsletterWelcome } from '@/lib/email/resend'
import { newsletterSchema, validateInput } from '@/lib/validation'
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
      logger.warn('Newsletter rate limit exceeded', {
        path: '/api/newsletter',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        newsletterRateLimit.message
      )
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(newsletterSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { email, name } = validation.data
    const supabase = await createServiceClient()

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, subscribed')
      .eq('email', email)
      .single()

    if (existing) {
      if (existing.subscribed) {
        logger.info('Newsletter already subscribed', { email })
        return successResponse(
          { alreadySubscribed: true },
          "You're already subscribed to our newsletter!"
        )
      } else {
        // Resubscribe
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ subscribed: true, name: name || null })
          .eq('id', existing.id)

        if (updateError) {
          logger.error('Failed to resubscribe', {
            error: updateError.message,
            email,
          })
          return errorResponse(Errors.database('Failed to resubscribe'))
        }

        // Send welcome email
        await sendNewsletterWelcome({ email, name })

        logger.info('Newsletter resubscribed', {
          email,
          durationMs: Date.now() - startTime,
        })

        return successResponse(
          undefined,
          "Welcome back! You've been resubscribed to our newsletter."
        )
      }
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        name: name || null,
        subscribed: true,
      })

    if (insertError) {
      logger.error('Failed to add newsletter subscriber', {
        error: insertError.message,
        email,
      })
      return errorResponse(Errors.database('Failed to subscribe'))
    }

    // Send welcome email - this is critical for user experience
    const emailResult = await sendNewsletterWelcome({
      email,
      name,
    })

    if (!emailResult.success) {
      logger.error('Failed to send welcome email', {
        error: emailResult.error,
        email,
      })
      // Return error since confirmation email is critical for newsletter signup
      return errorResponse(
        Errors.internal('Subscription saved but failed to send confirmation email. Please contact support.')
      )
    }

    logger.info('Newsletter subscribed', {
      email,
      durationMs: Date.now() - startTime,
    })

    return successResponse(
      undefined,
      'Thank you for subscribing! Check your inbox for a welcome email.'
    )
  } catch (error) {
    logger.error('Newsletter subscription error', {
      path: '/api/newsletter',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to subscribe')
    )
  }
}
