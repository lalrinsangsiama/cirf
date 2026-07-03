import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { successResponse, errorResponse, parseJsonBody, validationErrorResponse } from '@/lib/api/response'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'

const SUBMIT_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000,
  maxRequests: 3,
  message: 'Too many submissions. Please try again later.',
}

export async function POST(request: NextRequest) {
  const rateCheck = checkRateLimit(request, SUBMIT_RATE_LIMIT)
  if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetTime, SUBMIT_RATE_LIMIT.message)

  try {
    const { data: body, error: parseErr } = await parseJsonBody<{
      sessionId: string
      answers: Record<string, unknown>
      startedAt: string
    }>(request)

    if (parseErr) return parseErr

    if (!body.sessionId || !body.answers) {
      return validationErrorResponse('sessionId and answers are required')
    }

    // Validate consent
    if (body.answers.consent !== true) {
      return validationErrorResponse('Consent must be given to submit the survey')
    }

    // Hash IP for duplicate detection
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    const encoder = new TextEncoder()
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(ip + 'cirf-salt'))
    const ipHash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')

    const supabase = await createServiceClient()
    const now = new Date().toISOString()

    // Calculate completion time
    const startedAt = body.startedAt ? new Date(body.startedAt) : new Date()
    const completionSeconds = Math.round((Date.now() - startedAt.getTime()) / 1000)

    // Check if this session already has a completed submission
    const { data: existingComplete } = await supabase
      .from('survey_responses')
      .select('id')
      .eq('session_id', body.sessionId)
      .eq('status', 'completed')
      .maybeSingle()

    if (existingComplete) {
      return validationErrorResponse('This survey has already been submitted from this session')
    }

    // Update existing draft to completed, or insert new completed response
    const { data: draft } = await supabase
      .from('survey_responses')
      .select('id')
      .eq('session_id', body.sessionId)
      .eq('status', 'in_progress')
      .maybeSingle()

    if (draft) {
      const { error } = await supabase
        .from('survey_responses')
        .update({
          answers: body.answers,
          status: 'completed',
          consent_given: true,
          completed_at: now,
          last_saved_at: now,
          updated_at: now,
          ip_hash: ipHash,
          user_agent: request.headers.get('user-agent') || null,
          completion_time_seconds: completionSeconds,
        })
        .eq('id', draft.id)

      if (error) throw error

      return successResponse({ responseId: draft.id, submitted: true })
    } else {
      const { data: inserted, error } = await supabase
        .from('survey_responses')
        .insert({
          session_id: body.sessionId,
          answers: body.answers,
          status: 'completed',
          consent_given: true,
          started_at: body.startedAt || now,
          completed_at: now,
          last_saved_at: now,
          ip_hash: ipHash,
          user_agent: request.headers.get('user-agent') || null,
          completion_time_seconds: completionSeconds,
        })
        .select('id')
        .single()

      if (error) throw error

      return successResponse({ responseId: inserted.id, submitted: true })
    }
  } catch (err) {
    return errorResponse(err)
  }
}
