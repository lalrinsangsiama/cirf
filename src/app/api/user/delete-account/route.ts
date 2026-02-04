import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { validateInput } from '@/lib/validation'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

const deleteAccountSchema = z.object({
  confirmation: z.literal('DELETE', {
    error: 'Please type DELETE to confirm',
  }),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized())
    }

    // Validate confirmation
    const body = await request.json()
    const validation = validateInput(deleteAccountSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const serviceClient = await createServiceClient()

    logger.info('Account deletion requested', { userId: user.id })

    // Use atomic database function to delete all user data in a single transaction
    // This prevents partial deletion leaving orphaned data
    const { data: deleteResult, error: deleteDataError } = await serviceClient
      .rpc('delete_user_account', { user_uuid: user.id })
      .single<{ success: boolean; error_message: string | null }>()

    if (deleteDataError) {
      logger.error('Failed to delete user data atomically', {
        userId: user.id,
        error: deleteDataError.message,
      })
      return errorResponse(Errors.internal('Failed to delete account data. Please contact support.'))
    }

    // Check if the atomic function returned an error
    if (deleteResult && !deleteResult.success) {
      logger.error('Atomic deletion failed', {
        userId: user.id,
        error: deleteResult.error_message,
      })
      return errorResponse(Errors.internal('Failed to delete account. Please contact support.'))
    }

    // Delete the auth user (this requires admin API and must be done after data cleanup)
    const { error: authDeleteError } = await serviceClient.auth.admin.deleteUser(user.id)

    if (authDeleteError) {
      logger.error('Failed to delete auth user', {
        userId: user.id,
        error: authDeleteError.message,
      })
      // Log this as a critical issue since user data is already deleted
      logger.error('CRITICAL: User data deleted but auth user deletion failed', {
        userId: user.id,
      })
      return errorResponse(Errors.internal('Failed to complete account deletion. Please contact support.'))
    }

    logger.info('Account deleted successfully', { userId: user.id })

    return successResponse(undefined, 'Account deleted successfully')
  } catch (error) {
    logger.error('Account deletion error', {
      path: '/api/user/delete-account',
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to delete account')
    )
  }
}
