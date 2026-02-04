import { NextRequest } from 'next/server'
import { getRazorpay, getCreditPack, getPackPrice, CreditPackId, Currency } from '@/lib/razorpay/config'
import { createClient } from '@/lib/supabase/server'
import { createOrderSchema, validateInput } from '@/lib/validation'
import { checkRateLimit, paymentRateLimit } from '@/lib/rateLimit'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check rate limit
    const rateLimitResult = checkRateLimit(request, paymentRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('Payment rate limit exceeded', {
        path: '/api/razorpay/create-order',
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
      return errorResponse(Errors.unauthorized('You must be logged in to purchase credits'))
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(createOrderSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { packId, currency } = validation.data
    const pack = getCreditPack(packId as CreditPackId)

    if (!pack) {
      return errorResponse(Errors.invalidPack())
    }

    const validCurrency = currency as Currency
    const amount = getPackPrice(pack, validCurrency)

    // Create Razorpay order
    const razorpay = getRazorpay()
    const order = await razorpay.orders.create({
      amount: amount,
      currency: validCurrency,
      receipt: `receipt_${user.id}_${Date.now()}`,
      notes: {
        userId: user.id,
        packId: pack.id,
        credits: pack.credits.toString(),
        userEmail: user.email || '',
      },
    })

    logger.payment('Order created', {
      orderId: order.id,
      userId: user.id,
      packId: pack.id,
      credits: pack.credits,
      amount,
      currency: validCurrency,
      durationMs: Date.now() - startTime,
    })

    return successResponse({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      pack: {
        id: pack.id,
        name: pack.name,
        credits: pack.credits,
      },
    })
  } catch (error) {
    logger.error('Razorpay create order error', {
      path: '/api/razorpay/create-order',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.paymentFailed('Failed to create order')
    )
  }
}
