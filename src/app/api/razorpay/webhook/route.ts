import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'
import { checkRateLimit, webhookRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'

// UUID validation schema
const uuidSchema = z.string().uuid()

/**
 * Timing-safe comparison to prevent timing attacks on signature verification
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Use constant-time comparison even for length mismatch
    // by padding the shorter string - but still return the actual comparison result
    const maxLength = Math.max(a.length, b.length)
    const paddedA = a.padEnd(maxLength, '\0')
    const paddedB = b.padEnd(maxLength, '\0')
    return crypto.timingSafeEqual(Buffer.from(paddedA), Buffer.from(paddedB))
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

/**
 * Retry logic with exponential backoff for database operations
 */
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelayMs = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxRetries - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt)
        logger.warn('Webhook operation retry', {
          attempt: attempt + 1,
          maxRetries,
          delayMs: delay,
          error: lastError.message,
        })
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  // Check rate limit (more permissive for webhooks)
  const rateLimitResult = checkRateLimit(request, webhookRateLimit)
  if (!rateLimitResult.allowed) {
    logger.warn('Webhook rate limit exceeded', {
      path: '/api/razorpay/webhook',
      resetTime: rateLimitResult.resetTime,
    })
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('x-razorpay-signature')

  if (!signature) {
    logger.warn('Webhook missing signature header')
    return NextResponse.json(
      { error: 'Missing signature header' },
      { status: 400 }
    )
  }

  // Verify webhook signature using timing-safe comparison
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!webhookSecret) {
    logger.error('RAZORPAY_WEBHOOK_SECRET not configured')
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    )
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex')

  if (!timingSafeEqual(expectedSignature, signature)) {
    logger.error('Webhook signature verification failed', {
      receivedSignatureLength: signature.length,
    })
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  let event: { event: string; payload: Record<string, unknown> }
  try {
    event = JSON.parse(body)
  } catch {
    logger.error('Failed to parse webhook body')
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  logger.info('Webhook received', {
    eventType: event.event,
    timestamp: new Date().toISOString(),
  })

  // Handle different event types
  switch (event.event) {
    case 'payment.captured': {
      const payment = (event.payload.payment as { entity: Record<string, unknown> }).entity
      const orderId = payment.order_id as string
      const paymentId = payment.id as string

      // Get order details from notes
      const notes = (payment.notes || {}) as Record<string, string>
      const userId = notes.userId
      const rawCredits = notes.credits
      const credits = parseInt(rawCredits || '0', 10)
      const packId = notes.packId

      // Validate credits is a valid positive number
      if (!userId || !rawCredits || isNaN(credits) || credits <= 0) {
        logger.error('Missing metadata in payment webhook', {
          paymentId,
          hasUserId: !!userId,
          hasCredits: !!credits,
        })
        return NextResponse.json(
          { error: 'Missing metadata' },
          { status: 400 }
        )
      }

      // Validate userId is a valid UUID
      const userIdValidation = uuidSchema.safeParse(userId)
      if (!userIdValidation.success) {
        logger.error('Invalid user ID format in webhook', {
          paymentId,
          userId,
        })
        return NextResponse.json(
          { error: 'Invalid user ID format' },
          { status: 400 }
        )
      }

      try {
        await withRetry(async () => {
          const supabase = await createServiceClient()

          // Use atomic function that handles idempotency and order update
          const { data: result, error: rpcError } = await supabase.rpc('add_credits_with_order_update', {
            user_uuid: userId,
            credit_amount: credits,
            payment_id: paymentId,
            order_id: orderId,
            pack_id: packId || null,
          })

          if (rpcError) {
            // Log the failed transaction for manual review
            await supabase.from('credit_transactions').insert({
              user_id: userId,
              amount: credits,
              type: 'purchase',
              description: `WEBHOOK FAILED: ${credits} credits (${packId})`,
              razorpay_payment_id: paymentId,
              razorpay_order_id: orderId,
              metadata: { error: rpcError.message },
            })
            throw new Error(`Failed to add credits: ${rpcError.message}`)
          }

          const creditResult = result?.[0]
          if (!creditResult?.success) {
            const errorMsg = creditResult?.error_message || 'Unknown error'
            if (errorMsg !== 'Payment already processed') {
              throw new Error(`Failed to add credits: ${errorMsg}`)
            }
            logger.info('Payment already processed (idempotent)', { paymentId })
            return
          }

          logger.payment('Webhook: Credits added successfully', {
            userId,
            paymentId,
            orderId,
            credits,
            packId,
            newBalance: creditResult.new_balance,
          })
        })
      } catch (error) {
        logger.error('Webhook processing failed after retries', {
          paymentId,
          orderId,
          userId,
          error: error instanceof Error ? error.message : String(error),
          durationMs: Date.now() - startTime,
        })
        return NextResponse.json(
          { error: 'Error processing webhook' },
          { status: 500 }
        )
      }
      break
    }

    case 'payment.failed': {
      const payment = (event.payload.payment as { entity: Record<string, unknown> }).entity
      const paymentId = payment.id as string
      const errorDescription = payment.error_description as string

      logger.payment('Payment failed', {
        paymentId,
        errorDescription,
      })
      break
    }

    case 'order.paid': {
      const order = (event.payload.order as { entity: Record<string, unknown> }).entity
      logger.payment('Order paid (backup confirmation)', {
        orderId: order.id,
      })
      break
    }

    case 'refund.created':
    case 'refund.processed': {
      const refund = (event.payload.refund as { entity: Record<string, unknown> }).entity
      logger.payment('Refund event received', {
        eventType: event.event,
        refundId: refund.id,
        paymentId: refund.payment_id,
        amount: refund.amount,
      })
      break
    }

    default:
      logger.info('Unhandled webhook event', { eventType: event.event })
  }

  logger.info('Webhook processed', {
    eventType: event.event,
    durationMs: Date.now() - startTime,
  })

  return NextResponse.json({ received: true })
}
