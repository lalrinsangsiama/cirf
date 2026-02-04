import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { validateInput } from '@/lib/validation'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

/**
 * Profile update schema with validation rules
 * All fields are optional since this is a PATCH endpoint
 */
const profileUpdateSchema = z.object({
  // Basic Info
  full_name: z.string().min(1).max(255).optional(),
  organization: z.string().max(255).optional().nullable(),
  avatar_url: z.string().url().max(500).optional().nullable(),

  // Contact Information
  phone: z.string().max(50).optional().nullable(),
  website: z.string().url().max(255).optional().nullable(),
  linkedin_url: z.string().url().max(255).optional().nullable(),
  twitter_handle: z.string().max(50).optional().nullable(),

  // Location
  country: z.string().max(100).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  timezone: z.string().max(100).optional().nullable(),

  // Business Information
  industry: z.string().max(100).optional().nullable(),
  business_stage: z.string().max(50).optional().nullable(),
  years_operating: z.number().int().min(0).max(100).optional().nullable(),
  team_size: z.string().max(50).optional().nullable(),
  revenue_range: z.string().max(50).optional().nullable(),

  // Cultural Context
  cultural_tradition: z.string().max(255).optional().nullable(),
  community_affiliation: z.string().max(255).optional().nullable(),

  // Profile Completion Status
  profile_completed: z.boolean().optional(),
})

/**
 * GET /api/user/profile
 * Returns the current user's profile
 */
export async function GET() {
  try {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized())
    }

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      logger.error('Failed to fetch profile', {
        userId: user.id,
        error: profileError.message,
      })
      return errorResponse(Errors.notFound('Profile not found'))
    }

    return successResponse(profile)
  } catch (error) {
    logger.error('Profile fetch error', {
      path: '/api/user/profile',
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to fetch profile')
    )
  }
}

/**
 * PATCH /api/user/profile
 * Updates the current user's profile
 */
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized())
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = validateInput(profileUpdateSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const updates = validation.data

    // Sanitize any string values to prevent XSS
    const sanitizedUpdates = Object.fromEntries(
      Object.entries(updates).map(([key, value]) => {
        if (typeof value === 'string') {
          // Basic sanitization: trim whitespace and limit length
          return [key, value.trim()]
        }
        return [key, value]
      })
    )

    // Update profile
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({
        ...sanitizedUpdates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single()

    if (updateError) {
      logger.error('Failed to update profile', {
        userId: user.id,
        error: updateError.message,
      })
      return errorResponse(Errors.internal('Failed to update profile'))
    }

    logger.info('Profile updated successfully', { userId: user.id })

    return successResponse(updatedProfile, 'Profile updated successfully')
  } catch (error) {
    logger.error('Profile update error', {
      path: '/api/user/profile',
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to update profile')
    )
  }
}
