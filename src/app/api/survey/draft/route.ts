import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { successResponse, errorResponse, parseJsonBody, validationErrorResponse } from '@/lib/api/response'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'

const DRAFT_RATE_LIMIT = {
  windowMs: 60 * 1000,
  maxRequests: 15,
  message: 'Too many save requests. Please slow down.',
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id')
    if (!sessionId) {
      return validationErrorResponse('session_id is required')
    }

    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('session_id', sessionId)
      .eq('status', 'in_progress')
      .maybeSingle()

    if (error) throw error

    return successResponse({
      hasDraft: !!data,
      draft: data ? { answers: data.answers, currentScreen: data.current_screen } : null,
    })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function POST(request: NextRequest) {
  const rateCheck = checkRateLimit(request, DRAFT_RATE_LIMIT)
  if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetTime)

  try {
    const { data: body, error: parseErr } = await parseJsonBody<{
      sessionId: string
      answers: Record<string, unknown>
      currentScreen: number
    }>(request)

    if (parseErr) return parseErr
    if (!body.sessionId || !body.answers) {
      return validationErrorResponse('sessionId and answers are required')
    }

    const supabase = await createServiceClient()

    // Upsert: update existing draft or create new one
    const { data: existing } = await supabase
      .from('survey_responses')
      .select('id')
      .eq('session_id', body.sessionId)
      .eq('status', 'in_progress')
      .maybeSingle()

    if (existing) {
      const { error } = await supabase
        .from('survey_responses')
        .update({
          answers: body.answers,
          current_screen: body.currentScreen,
          last_saved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)

      if (error) throw error
    } else {
      const { error } = await supabase
        .from('survey_responses')
        .insert({
          session_id: body.sessionId,
          answers: body.answers,
          current_screen: body.currentScreen,
          status: 'in_progress',
          consent_given: (body.answers as Record<string, unknown>).consent === true,
          last_saved_at: new Date().toISOString(),
        })

      if (error) throw error
    }

    return successResponse({ saved: true })
  } catch (err) {
    return errorResponse(err)
  }
}
