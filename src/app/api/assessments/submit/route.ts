import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { validateInput } from '@/lib/validation'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'
import { checkRateLimit, apiRateLimit } from '@/lib/rateLimit'
import { AssessmentType, ASSESSMENT_CONFIGS, getScoreInterpretation } from '@/lib/data/assessmentConfig'
import { handleAssessmentCompletion } from '@/lib/services/assessmentUnlockService'

// Scoring utilities for server-side calculation
import {
  questionConfig,
  likertQuestions,
  culturalCapitalQuestions,
  innovationActivitiesQuestions,
  organizationalCapacitiesQuestions,
  economicResilienceQuestions,
} from '@/lib/data/assessmentQuestions'

// Import secondary assessment questions
import { cimmQuestions } from '@/lib/data/cimmQuestions'
import { ciraQuestions } from '@/lib/data/ciraQuestions'
import { tblQuestions } from '@/lib/data/tblQuestions'
import { cissQuestions } from '@/lib/data/cissQuestions'
import { pricingQuestions } from '@/lib/data/pricingQuestions'

// Request schema for assessment submission
const assessmentSubmitSchema = z.object({
  assessmentType: z.enum(['cirf', 'cimm', 'cira', 'tbl', 'ciss', 'pricing']),
  answers: z.record(z.string(), z.union([z.number(), z.string()])), // Question ID -> answer (number for Likert, string for demographics)
})

// Question interface for scoring
interface QuestionWithSection {
  id: string
  section: string
  construct: string
  weight: number
  reverse?: boolean
}

/**
 * Get questions for an assessment type
 */
function getQuestionsForType(type: AssessmentType): QuestionWithSection[] {
  switch (type) {
    case 'cirf':
      return [
        ...culturalCapitalQuestions,
        ...innovationActivitiesQuestions,
        ...organizationalCapacitiesQuestions,
        ...economicResilienceQuestions,
      ] as QuestionWithSection[]
    case 'cimm':
      return cimmQuestions as QuestionWithSection[]
    case 'cira':
      return ciraQuestions as QuestionWithSection[]
    case 'tbl':
      return tblQuestions as QuestionWithSection[]
    case 'ciss':
      return cissQuestions as QuestionWithSection[]
    case 'pricing':
      return pricingQuestions as QuestionWithSection[]
    default:
      return []
  }
}

/**
 * Calculate score server-side from answers
 * This ensures scores cannot be manipulated by clients
 */
function calculateScore(
  answers: Record<string, number | string>,
  assessmentType: AssessmentType
): {
  overallScore: number
  sectionScores: Record<string, number>
} {
  const questions = getQuestionsForType(assessmentType)

  // Filter to only numeric answers (Likert scale questions)
  const numericAnswers: Record<string, number> = {}
  for (const [key, value] of Object.entries(answers)) {
    if (typeof value === 'number') {
      numericAnswers[key] = value
    }
  }

  if (Object.keys(numericAnswers).length === 0) {
    return { overallScore: 0, sectionScores: {} }
  }

  // Calculate weighted scores
  let totalWeight = 0
  let weightedSum = 0
  const sectionSums: Record<string, { sum: number; weight: number; count: number }> = {}

  for (const q of questions) {
    const answer = numericAnswers[q.id]
    if (answer == null) continue

    // Validate answer is in valid range (1-7)
    if (answer < 1 || answer > 7) continue

    let rawScore = answer
    if (q.reverse) {
      rawScore = 8 - rawScore // Reverse 1-7 scale
    }

    // Normalize to 0-100
    const normalizedScore = ((rawScore - 1) / 6) * 100
    const weightedScore = normalizedScore * q.weight

    weightedSum += weightedScore
    totalWeight += q.weight

    // Track section scores
    const section = q.section
    if (!sectionSums[section]) {
      sectionSums[section] = { sum: 0, weight: 0, count: 0 }
    }
    sectionSums[section].sum += normalizedScore
    sectionSums[section].count++
  }

  const overallScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0

  // Calculate section averages
  const sectionScores: Record<string, number> = {}
  for (const [section, data] of Object.entries(sectionSums)) {
    sectionScores[section] = data.count > 0 ? Math.round(data.sum / data.count) : 0
  }

  return { overallScore, sectionScores }
}

/**
 * Validate that answers contain expected question IDs
 */
function validateAnswers(
  answers: Record<string, number | string>,
  assessmentType: AssessmentType
): { valid: boolean; error?: string } {
  const questions = getQuestionsForType(assessmentType)
  const validIds = new Set(questions.map(q => q.id))

  // Check that at least some answers are for valid questions
  const validAnswerCount = Object.keys(answers).filter(id => validIds.has(id)).length
  const totalQuestions = questions.length

  // Require at least 50% completion
  if (validAnswerCount < totalQuestions * 0.5) {
    return {
      valid: false,
      error: `Assessment requires at least ${Math.ceil(totalQuestions * 0.5)} questions answered (got ${validAnswerCount})`,
    }
  }

  // Validate answer values are in range
  for (const [id, value] of Object.entries(answers)) {
    if (validIds.has(id) && typeof value === 'number') {
      if (value < 1 || value > 7) {
        return {
          valid: false,
          error: `Invalid answer value for question ${id}: must be between 1 and 7`,
        }
      }
    }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Rate limiting
    const rateLimitResult = checkRateLimit(request, apiRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('Assessment submission rate limit exceeded', {
        path: '/api/assessments/submit',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        'Too many assessment submissions. Please try again later.'
      )
    }

    // Check authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized('You must be logged in to submit an assessment'))
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(assessmentSubmitSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { assessmentType, answers } = validation.data

    // Validate assessment type exists
    const config = ASSESSMENT_CONFIGS[assessmentType]
    if (!config) {
      return errorResponse(Errors.badRequest(`Invalid assessment type: ${assessmentType}`))
    }

    // Validate answers
    const answersValidation = validateAnswers(answers, assessmentType)
    if (!answersValidation.valid) {
      return errorResponse(Errors.validation(answersValidation.error || 'Invalid answers'))
    }

    // Calculate score server-side (never trust client-calculated scores)
    const { overallScore, sectionScores } = calculateScore(answers, assessmentType)
    const interpretation = getScoreInterpretation(overallScore)

    // Determine if this assessment requires credits
    const requiresCredit = config.creditCost > 0

    // Use service client for database operations
    const serviceClient = await createServiceClient()

    // Use atomic function to save assessment and deduct credit in one transaction
    const { data: result, error: rpcError } = await serviceClient.rpc('save_assessment_with_credit', {
      p_user_id: user.id,
      p_assessment_type: assessmentType,
      p_answers: answers,
      p_score: overallScore,
      p_interpretation: {
        level: interpretation.level,
        description: interpretation.description,
        color: interpretation.color,
        sectionScores,
      },
      p_requires_credit: requiresCredit,
    })

    if (rpcError) {
      logger.error('Failed to save assessment atomically', {
        userId: user.id,
        assessmentType,
        error: rpcError.message,
        durationMs: Date.now() - startTime,
      })
      return errorResponse(Errors.database('Failed to save assessment'))
    }

    const saveResult = result?.[0]
    if (!saveResult?.success) {
      const errorMsg = saveResult?.error_message || 'Unknown error'

      if (errorMsg === 'Insufficient credits') {
        logger.info('Assessment submission failed - insufficient credits', {
          userId: user.id,
          assessmentType,
        })
        return errorResponse(Errors.insufficientCredits())
      }

      logger.error('Assessment save failed', {
        userId: user.id,
        assessmentType,
        error: errorMsg,
        durationMs: Date.now() - startTime,
      })
      return errorResponse(Errors.database(`Failed to save assessment: ${errorMsg}`))
    }

    const assessmentId = saveResult.assessment_id
    const newBalance = saveResult.new_balance

    // Handle assessment completion (unlock new assessments, grant tools)
    let unlockedAssessments: AssessmentType[] = []
    let grantedTools: string[] = []
    let grantedResources: string[] = []

    try {
      const completionResult = await handleAssessmentCompletion(
        user.id,
        assessmentType,
        assessmentId
      )
      unlockedAssessments = completionResult.unlockedAssessments
      grantedTools = completionResult.grantedTools
      grantedResources = completionResult.grantedResources
    } catch (completionError) {
      // Log but don't fail the submission - assessment is already saved
      logger.warn('Failed to handle assessment completion', {
        userId: user.id,
        assessmentType,
        assessmentId,
        error: completionError instanceof Error ? completionError.message : String(completionError),
      })
    }

    logger.info('Assessment submitted successfully', {
      userId: user.id,
      assessmentType,
      assessmentId,
      score: overallScore,
      creditsUsed: requiresCredit ? 1 : 0,
      newBalance,
      unlockedAssessments,
      grantedTools,
      durationMs: Date.now() - startTime,
    })

    return successResponse({
      assessmentId,
      score: overallScore,
      interpretation: {
        level: interpretation.level,
        description: interpretation.description,
        color: interpretation.color,
      },
      sectionScores,
      newBalance,
      unlockedAssessments,
      grantedTools,
      grantedResources,
    }, 'Assessment submitted successfully')

  } catch (error) {
    logger.error('Assessment submission error', {
      path: '/api/assessments/submit',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to submit assessment')
    )
  }
}
