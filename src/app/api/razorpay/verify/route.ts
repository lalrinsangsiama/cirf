import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { verifyPaymentSchema, validateInput } from '@/lib/validation'
import { checkRateLimit, paymentRateLimit } from '@/lib/rateLimit'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

/**
 * Timing-safe comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check rate limit
    const rateLimitResult = checkRateLimit(request, paymentRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('Payment verification rate limit exceeded', {
        path: '/api/razorpay/verify',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        paymentRateLimit.message
      )
    }

    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized('You must be logged in to verify payment'))
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(verifyPaymentSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      packId,
      credits,
    } = validation.data

    // Verify the payment signature using timing-safe comparison
    const signatureBody = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(signatureBody)
      .digest('hex')

    if (!timingSafeEqual(expectedSignature, razorpay_signature)) {
      logger.error('Payment signature verification failed', {
        userId: user.id,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      })
      return errorResponse(Errors.paymentVerificationFailed())
    }

    // Payment verified, add credits to user using atomic function
    const serviceClient = await createServiceClient()

    // Use atomic function that handles idempotency and order update
    const { data: result, error: rpcError } = await serviceClient.rpc('add_credits_with_order_update', {
      user_uuid: user.id,
      credit_amount: credits,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      pack_id: packId || null,
    })

    if (rpcError) {
      logger.error('Failed to add credits after payment verification', {
        userId: user.id,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        credits,
        error: rpcError.message,
      })

      // Log the failed transaction for manual review
      await serviceClient.from('credit_transactions').insert({
        user_id: user.id,
        amount: credits,
        type: 'purchase',
        description: `FAILED: ${credits} credits (${packId})`,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        metadata: { error: rpcError.message },
      })

      return errorResponse(Errors.database('Failed to add credits'))
    }

    const creditResult = result?.[0]
    if (!creditResult?.success) {
      const errorMsg = creditResult?.error_message || 'Unknown error'
      if (errorMsg === 'Payment already processed') {
        logger.info('Payment already processed (idempotent)', {
          userId: user.id,
          paymentId: razorpay_payment_id,
        })
        return successResponse(
          { credits, alreadyProcessed: true },
          'Payment was already processed'
        )
      }

      logger.error('Failed to add credits after payment verification', {
        userId: user.id,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        credits,
        error: errorMsg,
      })
      return errorResponse(Errors.database('Failed to add credits'))
    }

    logger.payment('Payment verified and credits added', {
      userId: user.id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      packId,
      credits,
      durationMs: Date.now() - startTime,
    })

    return successResponse(
      { credits },
      `Successfully added ${credits} credits to your account`
    )
  } catch (error) {
    logger.error('Payment verification error', {
      path: '/api/razorpay/verify',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.paymentVerificationFailed()
    )
  }
}
