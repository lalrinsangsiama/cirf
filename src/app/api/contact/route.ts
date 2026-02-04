import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendContactNotification, sendContactConfirmation } from '@/lib/email/resend'
import { contactFormSchema, validateInput } from '@/lib/validation'
import { checkRateLimit, contactRateLimit } from '@/lib/rateLimit'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check rate limit
    const rateLimitResult = checkRateLimit(request, contactRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('Contact rate limit exceeded', {
        path: '/api/contact',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        contactRateLimit.message
      )
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(contactFormSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { name, email, subject, message } = validation.data

    // Store in database
    const supabase = await createServiceClient()

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        subject: subject || null,
        message,
        status: 'new',
      })

    if (dbError) {
      logger.error('Failed to store contact submission', {
        error: dbError.message,
        email,
      })
      // Continue anyway to try sending email
    }

    // Send notification to admin - this is critical
    const notificationResult = await sendContactNotification({
      name,
      email,
      subject,
      message,
    })

    if (!notificationResult.success) {
      logger.error('Failed to send admin notification', {
        error: notificationResult.error,
        email,
      })
      // Return error if admin notification fails - we need to receive the message
      return errorResponse(
        Errors.internal('Your message was saved but we encountered an issue. Please try again or email us directly.')
      )
    }

    // Send confirmation to user - nice to have but not critical
    const confirmationResult = await sendContactConfirmation({
      email,
      name,
    })

    if (!confirmationResult.success) {
      logger.error('Failed to send user confirmation', {
        error: confirmationResult.error,
        email,
      })
      // Don't fail the request - admin got the notification
    }

    logger.info('Contact form submitted', {
      email,
      hasSubject: !!subject,
      durationMs: Date.now() - startTime,
    })

    return successResponse(
      undefined,
      "Thank you for your message! We'll get back to you soon."
    )
  } catch (error) {
    logger.error('Contact form error', {
      path: '/api/contact',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to submit contact form')
    )
  }
}
