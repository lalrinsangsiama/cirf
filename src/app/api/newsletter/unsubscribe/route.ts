import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkRateLimit, newsletterRateLimit } from '@/lib/rateLimit'
import { successResponse, errorResponse, rateLimitErrorResponse, parseJsonBody } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'
import { z } from 'zod'

const unsubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(request, newsletterRateLimit)
    if (!rateLimitResult.allowed) {
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        newsletterRateLimit.message
      )
    }

    const { data: body, error: jsonError } = await parseJsonBody(request)
    if (jsonError) return jsonError
    const parsed = unsubscribeSchema.safeParse(body)

    if (!parsed.success) {
      return errorResponse(Errors.validation('Invalid email address'))
    }

    const { email } = parsed.data
    const supabase = await createServiceClient()

    const { data: subscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id, subscribed')
      .eq('email', email)
      .single()

    if (!subscriber) {
      // Don't reveal whether the email exists - return success either way
      return successResponse(undefined, 'If you were subscribed, you have been unsubscribed.')
    }

    if (!subscriber.subscribed) {
      return successResponse(undefined, 'You are already unsubscribed.')
    }

    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({ subscribed: false })
      .eq('id', subscriber.id)

    if (updateError) {
      logger.error('Failed to unsubscribe', {
        error: updateError.message,
        email,
      })
      return errorResponse(Errors.database('Failed to unsubscribe'))
    }

    logger.info('Newsletter unsubscribed', { email })

    return successResponse(undefined, 'You have been successfully unsubscribed.')
  } catch (error) {
    logger.error('Newsletter unsubscribe error', {
      path: '/api/newsletter/unsubscribe',
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to unsubscribe')
    )
  }
}
