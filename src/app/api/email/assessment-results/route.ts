import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { sendAssessmentResults } from '@/lib/email/resend'
import { AssessmentType, ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'
import { SECTION_META } from '@/lib/data/assessmentQuestions'
import { checkRateLimit } from '@/lib/rateLimit'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

// Lazy-initialize admin client to avoid build-time errors when env vars are missing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabaseAdmin: any = null

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Missing Supabase admin credentials')
    }
    supabaseAdmin = createClient(url, key)
  }
  return supabaseAdmin
}

interface AssessmentEmailRequest {
  assessmentId: string
  userId: string
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 emails per 15 minutes per user
    const rateLimitResult = checkRateLimit(request, {
      windowMs: 15 * 60 * 1000,
      maxRequests: 5,
      message: 'Too many email requests. Please try again later.',
    })

    if (!rateLimitResult.allowed) {
      return rateLimitErrorResponse(
        Date.now() + 15 * 60 * 1000,
        'Too many email requests. Please try again later.'
      )
    }

    // Verify the requesting user is authenticated
    const supabase = await createServerClient()
    const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !currentUser) {
      return errorResponse(Errors.unauthorized('Unauthorized - please log in'))
    }

    const body: AssessmentEmailRequest = await request.json()
    const { assessmentId, userId } = body

    if (!assessmentId || !userId) {
      return validationErrorResponse('Missing required fields: assessmentId and userId')
    }

    // Verify the requesting user owns this assessment
    if (currentUser.id !== userId) {
      return errorResponse(Errors.forbidden('You can only email your own assessment results'))
    }

    const admin = getSupabaseAdmin()

    // Fetch the assessment to verify ownership
    const { data: assessment, error: assessmentError } = await admin
      .from('assessments')
      .select('*')
      .eq('id', assessmentId)
      .eq('user_id', userId)
      .single()

    if (assessmentError || !assessment) {
      return errorResponse(Errors.notFound('Assessment'))
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single()

    if (profileError || !profile?.email) {
      return errorResponse(Errors.notFound('User profile or email'))
    }

    // Parse assessment data
    const assessmentType = (assessment.assessment_type || 'cirf') as AssessmentType
    const score = assessment.score
    const interpretation = assessment.interpretation || {
      level: 'Unknown',
      description: 'Assessment interpretation not available.',
      color: 'gray',
    }
    const answers = assessment.answers || {}

    // Calculate section scores from answers
    const sectionScores = calculateSectionScores(answers, assessmentType)

    // Generate recommendations based on lowest scoring sections
    const recommendations = generateRecommendations(sectionScores, assessmentType)

    // Check for newly unlocked assessments
    const { data: unlocks } = await admin
      .from('assessment_unlocks')
      .select('assessment_type')
      .eq('user_id', userId)
      .eq('unlocked_by_assessment_id', assessmentId)

    const unlockedAssessments = unlocks?.map((u: { assessment_type: string }) => u.assessment_type as AssessmentType) || []

    // Send the email
    const emailResult = await sendAssessmentResults({
      email: profile.email,
      name: profile.full_name || undefined,
      assessmentType,
      score,
      interpretation,
      sectionScores,
      recommendations,
      unlockedAssessments: unlockedAssessments.length > 0 ? unlockedAssessments : undefined,
      assessmentId,
    })

    if (!emailResult.success) {
      // Log the failure
      await admin.from('email_logs').insert({
        user_id: userId,
        email_type: 'assessment_results',
        recipient_email: profile.email,
        subject: `Assessment Results - ${ASSESSMENT_CONFIGS[assessmentType].name}`,
        assessment_id: assessmentId,
        status: 'failed',
        metadata: { error: emailResult.error },
      })

      logger.error('Failed to send assessment results email', {
        userId,
        assessmentId,
        error: emailResult.error,
      })

      return errorResponse(Errors.emailFailed('Failed to send assessment results email'))
    }

    // Log successful send
    await admin.from('email_logs').insert({
      user_id: userId,
      email_type: 'assessment_results',
      recipient_email: profile.email,
      subject: `Assessment Results - ${ASSESSMENT_CONFIGS[assessmentType].name}`,
      assessment_id: assessmentId,
      status: 'sent',
      metadata: { score, interpretation: interpretation.level },
    })

    logger.email('Assessment results sent', { userId, assessmentId, assessmentType })

    return successResponse(
      { sent: true },
      'Assessment results email sent successfully'
    )
  } catch (error) {
    logger.error('Error sending assessment results email', {
      path: '/api/email/assessment-results',
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to send assessment results email')
    )
  }
}

/**
 * Explicit mapping of CIRF section names to their question key prefixes
 * This prevents fragile string matching that could match wrong sections
 */
const CIRF_SECTION_PREFIXES: Record<string, string> = {
  culturalCapital: 'cc-',
  innovationActivities: 'ia-',
  organizationalCapacities: 'oc-',
  economicResilience: 'er-',
}

// Helper function to calculate section scores from answers
function calculateSectionScores(
  answers: Record<string, unknown>,
  assessmentType: AssessmentType
): Record<string, { score: number; label: string }> {
  const config = ASSESSMENT_CONFIGS[assessmentType]
  const sectionScores: Record<string, { score: number; label: string }> = {}

  // For CIRF, use the explicit section prefix mapping
  if (assessmentType === 'cirf') {
    const sections = ['culturalCapital', 'innovationActivities', 'organizationalCapacities', 'economicResilience']

    for (const section of sections) {
      const sectionMeta = SECTION_META[section as keyof typeof SECTION_META]
      const prefix = CIRF_SECTION_PREFIXES[section]

      // Use explicit prefix matching instead of fragile substring matching
      const sectionAnswers = Object.entries(answers)
        .filter(([key]) => key.startsWith(prefix))
        .map(([_, value]) => Number(value) || 0)

      if (sectionAnswers.length > 0) {
        const avgScore = sectionAnswers.reduce((a, b) => a + b, 0) / sectionAnswers.length
        // Convert from 1-7 scale to 0-100
        const normalizedScore = ((avgScore - 1) / 6) * 100
        sectionScores[section] = {
          score: Math.round(normalizedScore),
          label: sectionMeta?.label || section,
        }
      }
    }
  } else {
    // For other assessments, use section config with explicit id prefix matching
    for (const section of config.sections) {
      // Use the section.id directly as the prefix to match (e.g., "depth-", "integrity-")
      const prefix = `${section.id.toLowerCase()}-`
      const sectionAnswers = Object.entries(answers)
        .filter(([key]) => key.toLowerCase().startsWith(prefix))
        .map(([_, value]) => Number(value) || 0)

      if (sectionAnswers.length > 0) {
        const avgScore = sectionAnswers.reduce((a, b) => a + b, 0) / sectionAnswers.length
        const normalizedScore = ((avgScore - 1) / 6) * 100
        sectionScores[section.id] = {
          score: Math.round(normalizedScore),
          label: section.name,
        }
      } else {
        sectionScores[section.id] = {
          score: 0,
          label: section.name,
        }
      }
    }
  }

  return sectionScores
}

// Helper function to generate recommendations based on scores
function generateRecommendations(
  sectionScores: Record<string, { score: number; label: string }>,
  assessmentType: AssessmentType
): string[] {
  const recommendations: string[] = []

  // Sort sections by score (ascending) to prioritize lowest scores
  const sortedSections = Object.entries(sectionScores)
    .sort(([, a], [, b]) => a.score - b.score)

  // Generate recommendations based on lowest scoring sections
  for (const [sectionId, data] of sortedSections.slice(0, 3)) {
    if (data.score < 40) {
      recommendations.push(
        `Focus on strengthening your ${data.label.toLowerCase()} - this area needs significant attention.`
      )
    } else if (data.score < 60) {
      recommendations.push(
        `Continue developing your ${data.label.toLowerCase()} capabilities for better overall resilience.`
      )
    } else if (data.score < 80) {
      recommendations.push(
        `Your ${data.label.toLowerCase()} is solid - focus on optimization and consistency.`
      )
    }
  }

  // Add general recommendations based on assessment type
  if (assessmentType === 'cirf') {
    if (recommendations.length < 3) {
      recommendations.push(
        'Consider completing the specialized assessments (CIMM, CIRA, TBL, CISS, Pricing) for deeper insights.'
      )
    }
  }

  // Ensure we have at least 3 recommendations
  while (recommendations.length < 3) {
    recommendations.push(
      'Continue monitoring and tracking your progress with regular assessments.'
    )
  }

  return recommendations.slice(0, 5) // Return top 5 recommendations
}
