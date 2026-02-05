import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { validateInput } from '@/lib/validation'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'
import { AssessmentType } from '@/lib/data/assessmentConfig'

// Request schema for saving draft
const saveDraftSchema = z.object({
  assessmentType: z.enum(['cirf', 'cimm', 'cira', 'tbl', 'ciss', 'pricing']),
  answers: z.record(z.string(), z.union([z.number(), z.string(), z.array(z.string())])),
  currentSection: z.string().optional(),
})

// GET: Retrieve a user's draft assessment
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized('You must be logged in to access drafts'))
    }

    // Get assessment type from query params
    const searchParams = request.nextUrl.searchParams
    const assessmentType = searchParams.get('type') as AssessmentType | null

    if (!assessmentType) {
      return errorResponse(Errors.badRequest('Assessment type is required'))
    }

    // Get the draft
    const serviceClient = await createServiceClient()
    const { data: drafts, error: draftError } = await serviceClient
      .from('assessment_drafts')
      .select('id, answers, current_section, updated_at')
      .eq('user_id', user.id)
      .eq('assessment_type', assessmentType)
      .limit(1)

    if (draftError) {
      logger.error('Failed to get assessment draft', {
        userId: user.id,
        assessmentType,
        error: draftError.message,
      })
      return errorResponse(Errors.database('Failed to retrieve draft'))
    }

    const draft = drafts?.[0]

    if (!draft) {
      return successResponse({
        hasDraft: false,
        draft: null,
      }, 'No draft found')
    }

    return successResponse({
      hasDraft: true,
      draft: {
        id: draft.id,
        answers: draft.answers,
        currentSection: draft.current_section,
        updatedAt: draft.updated_at,
      },
    }, 'Draft retrieved successfully')

  } catch (error) {
    logger.error('Get draft error', {
      path: '/api/assessments/draft',
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to get draft')
    )
  }
}

// POST: Save or update a draft assessment
export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized('You must be logged in to save drafts'))
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(saveDraftSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { assessmentType, answers, currentSection } = validation.data

    // Save the draft using the RPC function
    const serviceClient = await createServiceClient()
    const { data: draftId, error: saveError } = await serviceClient
      .rpc('save_assessment_draft', {
        p_user_id: user.id,
        p_assessment_type: assessmentType,
        p_answers: answers,
        p_current_section: currentSection || null,
      })

    if (saveError) {
      logger.error('Failed to save assessment draft', {
        userId: user.id,
        assessmentType,
        error: saveError.message,
        durationMs: Date.now() - startTime,
      })
      return errorResponse(Errors.database('Failed to save draft'))
    }

    logger.info('Assessment draft saved', {
      userId: user.id,
      assessmentType,
      draftId,
      answerCount: Object.keys(answers).length,
      currentSection,
      durationMs: Date.now() - startTime,
    })

    return successResponse({
      draftId,
      savedAt: new Date().toISOString(),
    }, 'Draft saved successfully')

  } catch (error) {
    logger.error('Save draft error', {
      path: '/api/assessments/draft',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to save draft')
    )
  }
}

// DELETE: Remove a draft (called when assessment is completed)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized('You must be logged in to delete drafts'))
    }

    // Get assessment type from query params
    const searchParams = request.nextUrl.searchParams
    const assessmentType = searchParams.get('type') as AssessmentType | null

    if (!assessmentType) {
      return errorResponse(Errors.badRequest('Assessment type is required'))
    }

    // Delete the draft
    const serviceClient = await createServiceClient()
    const { error: deleteError } = await serviceClient
      .rpc('delete_assessment_draft', {
        p_user_id: user.id,
        p_assessment_type: assessmentType,
      })

    if (deleteError) {
      logger.error('Failed to delete assessment draft', {
        userId: user.id,
        assessmentType,
        error: deleteError.message,
      })
      return errorResponse(Errors.database('Failed to delete draft'))
    }

    logger.info('Assessment draft deleted', {
      userId: user.id,
      assessmentType,
    })

    return successResponse({
      deleted: true,
    }, 'Draft deleted successfully')

  } catch (error) {
    logger.error('Delete draft error', {
      path: '/api/assessments/draft',
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to delete draft')
    )
  }
}
