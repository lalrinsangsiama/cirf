import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { successResponse, errorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'

/**
 * GET /api/tools/access
 * Returns all tool IDs the current user has access to.
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized('You must be logged in'))
    }

    const { data: toolAccess, error: queryError } = await supabase
      .from('tool_access')
      .select('tool_id, granted_at, granted_by_assessment_type')
      .eq('user_id', user.id)

    if (queryError) {
      return errorResponse(Errors.database('Failed to fetch tool access'))
    }

    const toolIds = (toolAccess || []).map(t => t.tool_id)

    return successResponse({
      tools: toolAccess || [],
      toolIds,
    })
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to fetch tool access')
    )
  }
}
