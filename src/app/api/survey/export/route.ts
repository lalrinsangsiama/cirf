import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { errorResponse } from '@/lib/api/response'

export async function GET(request: NextRequest) {
  try {
    // Auth check — admin only
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Check admin role from JWT metadata
    const isAdmin = user.app_metadata?.role === 'admin'
    if (!isAdmin) {
      return new Response('Forbidden', { status: 403 })
    }

    const format = request.nextUrl.searchParams.get('format') || 'json'
    const statusFilter = request.nextUrl.searchParams.get('status') || 'completed'

    // Query with admin RLS policy
    let query = supabase
      .from('survey_responses')
      .select('*')
      .order('created_at', { ascending: false })

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter)
    }

    const { data, error } = await query

    if (error) throw error

    if (format === 'csv') {
      const csv = convertToCSV(data || [])
      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="cirf-survey-responses-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      })
    }

    return Response.json({ success: true, count: data?.length || 0, data })
  } catch (err) {
    return errorResponse(err)
  }
}

function convertToCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return ''

  // Flatten answers JSONB into columns
  const flatRows = rows.map((row) => {
    const answers = (row.answers || {}) as Record<string, unknown>
    const flat: Record<string, string> = {
      id: String(row.id || ''),
      session_id: String(row.session_id || ''),
      status: String(row.status || ''),
      consent_given: String(row.consent_given || ''),
      started_at: String(row.started_at || ''),
      completed_at: String(row.completed_at || ''),
      completion_time_seconds: String(row.completion_time_seconds || ''),
      ip_hash: String(row.ip_hash || ''),
    }

    // Flatten each answer
    for (const [qId, answer] of Object.entries(answers)) {
      if (answer === null || answer === undefined) {
        flat[qId] = ''
      } else if (typeof answer === 'string' || typeof answer === 'boolean' || typeof answer === 'number') {
        flat[qId] = String(answer)
      } else if (typeof answer === 'object' && 'value' in (answer as Record<string, unknown>)) {
        // SingleSelectAnswer
        const a = answer as { value: string; otherText?: string }
        flat[qId] = a.value
        if (a.otherText) flat[`${qId}_other`] = a.otherText
      } else if (typeof answer === 'object' && 'values' in (answer as Record<string, unknown>)) {
        // MultiSelectAnswer
        const a = answer as { values: string[]; otherText?: string }
        flat[qId] = a.values.join('; ')
        if (a.otherText) flat[`${qId}_other`] = a.otherText
      } else if (typeof answer === 'object') {
        // LikertMatrix, TripleRating, Ranking — flatten nested
        const obj = answer as Record<string, unknown>
        for (const [subKey, subVal] of Object.entries(obj)) {
          if (typeof subVal === 'object' && subVal !== null) {
            // TripleRating: { indicatorId: { dimId: rating } }
            for (const [dimKey, dimVal] of Object.entries(subVal as Record<string, unknown>)) {
              flat[`${qId}_${subKey}_${dimKey}`] = String(dimVal ?? '')
            }
          } else {
            flat[`${qId}_${subKey}`] = String(subVal ?? '')
          }
        }
      }
    }

    return flat
  })

  // Collect all unique column headers
  const allKeys = new Set<string>()
  flatRows.forEach((row) => Object.keys(row).forEach((k) => allKeys.add(k)))
  const headers = Array.from(allKeys)

  // Build CSV
  const escape = (val: string) => {
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`
    }
    return val
  }

  const lines = [
    headers.map(escape).join(','),
    ...flatRows.map((row) => headers.map((h) => escape(row[h] || '')).join(',')),
  ]

  return lines.join('\n')
}
