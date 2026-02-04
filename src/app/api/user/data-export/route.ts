import { NextRequest } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { successResponse, errorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized())
    }

    const serviceClient = await createServiceClient()

    // Fetch all user data
    const [profileResult, assessmentsResult, transactionsResult, newsletterResult] = await Promise.all([
      serviceClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single(),
      serviceClient
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      serviceClient
        .from('credit_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      serviceClient
        .from('newsletter_subscribers')
        .select('*')
        .eq('email', user.email)
        .single(),
    ])

    const exportData = {
      exportDate: new Date().toISOString(),
      userId: user.id,
      email: user.email,
      profile: profileResult.data || null,
      assessments: assessmentsResult.data || [],
      creditTransactions: transactionsResult.data || [],
      newsletterSubscription: newsletterResult.data || null,
      metadata: {
        totalAssessments: assessmentsResult.data?.length || 0,
        totalTransactions: transactionsResult.data?.length || 0,
        accountCreated: profileResult.data?.created_at,
      },
    }

    logger.info('User data export requested', {
      userId: user.id,
      assessmentCount: exportData.metadata.totalAssessments,
      transactionCount: exportData.metadata.totalTransactions,
    })

    return successResponse({ data: exportData })
  } catch (error) {
    logger.error('Data export error', {
      path: '/api/user/data-export',
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error ? error : Errors.internal('Failed to export data')
    )
  }
}
