import { NextRequest } from 'next/server'
import { z } from 'zod'
import { getRazorpay } from '@/lib/razorpay/config'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { validateInput } from '@/lib/validation'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

const refundSchema = z.object({
  paymentId: z.string().min(1, 'Payment ID is required'),
  amount: z.number().int().positive().optional(), // Optional for partial refunds
  reason: z.string().max(500).optional(),
})

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized())
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      logger.warn('Non-admin attempted refund', {
        userId: user.id,
        role: profile?.role,
      })
      return errorResponse(Errors.forbidden('Admin access required'))
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(refundSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { paymentId, amount, reason } = validation.data
    const serviceClient = await createServiceClient()

    // Get the payment order
    const { data: order, error: orderError } = await serviceClient
      .from('payment_orders')
      .select('*')
      .eq('payment_id', paymentId)
      .single()

    if (orderError || !order) {
      logger.warn('Refund attempted for unknown payment', { paymentId })
      return errorResponse(Errors.notFound('Payment order'))
    }

    if (order.status === 'refunded') {
      return errorResponse(Errors.badRequest('Payment has already been refunded'))
    }

    if (order.status !== 'paid') {
      return errorResponse(Errors.badRequest('Payment is not in a refundable state'))
    }

    // Process refund via Razorpay
    const razorpay = getRazorpay()
    const refundAmount = amount || order.amount // Full refund if no amount specified

    logger.info('Processing refund', {
      paymentId,
      orderId: order.order_id,
      originalAmount: order.amount,
      refundAmount,
      adminId: user.id,
    })

    const refund = await razorpay.payments.refund(paymentId, {
      amount: refundAmount,
      notes: {
        reason: reason || 'Admin initiated refund',
        adminId: user.id,
        orderId: order.order_id,
      },
    })

    // Update database using the stored procedure
    const { data: refundResult, error: refundError } = await serviceClient.rpc('process_refund', {
      p_order_id: order.order_id,
      p_refund_id: refund.id,
      p_refund_amount: refundAmount,
      p_reason: reason || 'Admin initiated refund',
    })

    if (refundError) {
      logger.error('Failed to update database after refund', {
        paymentId,
        refundId: refund.id,
        error: refundError.message,
      })
      // Refund was processed at Razorpay, but DB update failed
      // Return error with refund details so admin can manually reconcile
      return errorResponse(Errors.database(
        `Refund processed at Razorpay (ID: ${refund.id}) but database update failed. Manual reconciliation required.`
      ))
    }

    const dbResult = refundResult?.[0]
    if (!dbResult?.success) {
      logger.error('Refund database operation failed', {
        paymentId,
        refundId: refund.id,
        error: dbResult?.error_message,
      })
      return errorResponse(Errors.database(
        `Refund processed at Razorpay (ID: ${refund.id}) but database update failed: ${dbResult?.error_message}. Manual reconciliation required.`
      ))
    }

    logger.payment('Refund processed successfully', {
      paymentId,
      refundId: refund.id,
      refundAmount,
      adminId: user.id,
      durationMs: Date.now() - startTime,
    })

    return successResponse({
      refundId: refund.id,
      paymentId,
      amount: refundAmount,
      status: refund.status,
    }, 'Refund processed successfully')
  } catch (error) {
    logger.error('Refund processing error', {
      path: '/api/razorpay/refund',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    // Check for Razorpay specific errors
    if (error instanceof Error && error.message.includes('razorpay')) {
      return errorResponse(Errors.paymentFailed(`Razorpay error: ${error.message}`))
    }

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to process refund')
    )
  }
}
