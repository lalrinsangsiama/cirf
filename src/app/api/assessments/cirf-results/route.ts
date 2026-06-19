import { NextRequest } from 'next/server'
import { z } from 'zod'
import { emailSchema, validateInput } from '@/lib/validation'
import {
  CIRF_PILLARS,
  getOverallLabel,
  getPillarInterpretation,
} from '@/lib/data/cirfAssessmentData'
import { sendCIRFResultsEmail } from '@/lib/email/resend'
import { checkRateLimit, contactRateLimit } from '@/lib/rateLimit'
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitErrorResponse,
  parseJsonBody,
} from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

// Emails the free /assessment results + Strategy Toolkit link (anonymous lead-capture).
// Scores are recomputed server-side from the raw answers — the client score is not trusted.
const cirfResultsSchema = z.object({
  email: emailSchema,
  name: z.string().max(100).optional(),
  answers: z.record(z.string(), z.number().int().min(1).max(5)),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(request, contactRateLimit)
    if (!rateLimitResult.allowed) {
      return rateLimitErrorResponse(rateLimitResult.resetTime, contactRateLimit.message)
    }

    const { data: body, error: jsonError } = await parseJsonBody(request)
    if (jsonError) return jsonError

    const validation = validateInput(cirfResultsSchema, body)
    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { email, name, answers } = validation.data

    // Recompute scores authoritatively from the framework definition
    const pillarScores = CIRF_PILLARS.map((p) => ({
      pillar: p,
      score: p.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0),
    }))
    const totalScore = pillarScores.reduce((sum, p) => sum + p.score, 0)
    const overall = getOverallLabel(totalScore)

    const pillars = pillarScores.map((ps) => ({
      title: ps.pillar.title,
      score: ps.score,
      level: getPillarInterpretation(ps.score).level,
    }))

    // Generic focus-area guidance (case-specific recommendations are withheld
    // pending re-verification of the case studies).
    const weakest = pillarScores.reduce(
      (min, p) => (p.score < min.score ? p : min),
      pillarScores[0]
    )
    const interp = getPillarInterpretation(weakest.score)
    const recommendations = [
      `Your biggest growth area is ${weakest.pillar.title}. ${interp.description}`,
      'Download the Cultural Innovation Strategy Toolkit below for practical, sector-specific next steps.',
    ]

    const emailResult = await sendCIRFResultsEmail({
      email,
      name,
      totalScore,
      overallLabel: overall.label,
      pillars,
      recommendations,
    })

    if (!emailResult.success) {
      logger.error('Failed to send CIRF results email', { error: emailResult.error })
      return errorResponse(Errors.internal('Could not send your results email. Please try again.'))
    }

    logger.info('CIRF results email sent', { totalScore })
    return successResponse(undefined, 'Your results are on their way to your inbox.')
  } catch (error) {
    logger.error('CIRF results email error', { path: '/api/assessments/cirf-results' },
      error instanceof Error ? error : undefined)
    return errorResponse(error instanceof Error ? error : Errors.internal('Failed to send results'))
  }
}
