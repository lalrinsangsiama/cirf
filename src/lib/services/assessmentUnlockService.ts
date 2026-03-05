// Assessment Unlock Service
// Handles the tiered assessment unlock system and tool access
//
// Functions called from server (API routes) accept a SupabaseClient parameter.
// Functions called from client components use createClient() internally.

import { createClient } from '@/lib/supabase/client'
import { type SupabaseClient } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'
import {
  AssessmentType,
  ASSESSMENT_CONFIGS,
  getAssessmentConfig,
  TOOL_CONFIGS,
} from '@/lib/data/assessmentConfig'
import { getResourceToolAccessIds } from '@/lib/data/resourcesConfig'

export interface UnlockStatus {
  isUnlocked: boolean
  unlockedAt?: string
  unlockedByAssessmentId?: string
}

export interface UserUnlocks {
  assessments: Record<AssessmentType, UnlockStatus>
  tools: Record<string, { grantedAt: string; grantedByAssessmentType: string }>
}

export interface AssessmentCompletion {
  id: string
  assessmentType: AssessmentType
  score: number
  completedAt: string
}

// Check if a user has access to a specific assessment
export async function checkAssessmentAccess(
  userId: string,
  assessmentType: AssessmentType
): Promise<boolean> {
  // CIL is always accessible
  if (assessmentType === 'cil') {
    return true
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from('assessment_unlocks')
    .select('id')
    .eq('user_id', userId)
    .eq('assessment_type', assessmentType)
    .single()

  if (error && error.code !== 'PGRST116') {
    logger.error('Error checking assessment access', { userId, assessmentType, error: error.message })
  }

  return !!data
}

// Get all unlocked assessments for a user
export async function getUserUnlockedAssessments(userId: string): Promise<AssessmentType[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('assessment_unlocks')
    .select('assessment_type')
    .eq('user_id', userId)

  if (error) {
    logger.error('Error fetching unlocked assessments', { userId, error: error.message })
    return ['cil'] // CIL is always available
  }

  const unlocked = data?.map(d => d.assessment_type as AssessmentType) || []
  return ['cil', ...unlocked]
}

// Get full unlock status for all assessments
export async function getUserUnlockStatus(userId: string): Promise<UserUnlocks> {
  const supabase = createClient()

  // Fetch assessment unlocks
  const { data: assessmentUnlocks, error: assessmentError } = await supabase
    .from('assessment_unlocks')
    .select('assessment_type, unlocked_at, unlocked_by_assessment_id')
    .eq('user_id', userId)

  if (assessmentError) {
    logger.error('Error fetching assessment unlocks', { userId, error: assessmentError.message })
  }

  // Fetch tool access
  const { data: toolAccess, error: toolError } = await supabase
    .from('tool_access')
    .select('tool_id, granted_at, granted_by_assessment_type')
    .eq('user_id', userId)

  if (toolError) {
    logger.error('Error fetching tool access', { userId, error: toolError.message })
  }

  // Build assessment unlocks map
  const assessments: Record<AssessmentType, UnlockStatus> = {
    cil: { isUnlocked: true }, // Always unlocked
    cimm: { isUnlocked: false },
    cira: { isUnlocked: false },
    tbl: { isUnlocked: false },
    ciss: { isUnlocked: false },
    pricing: { isUnlocked: false },
  }

  assessmentUnlocks?.forEach(unlock => {
    const type = unlock.assessment_type as AssessmentType
    if (type in assessments) {
      assessments[type] = {
        isUnlocked: true,
        unlockedAt: unlock.unlocked_at,
        unlockedByAssessmentId: unlock.unlocked_by_assessment_id,
      }
    }
  })

  // Build tool access map
  const tools: Record<string, { grantedAt: string; grantedByAssessmentType: string }> = {}
  toolAccess?.forEach(access => {
    tools[access.tool_id] = {
      grantedAt: access.granted_at,
      grantedByAssessmentType: access.granted_by_assessment_type,
    }
  })

  return { assessments, tools }
}

// Unlock assessments after completing CIL
export async function unlockAssessmentsOnCompletion(
  userId: string,
  completedAssessmentType: AssessmentType,
  completedAssessmentId: string,
  supabase?: SupabaseClient
): Promise<AssessmentType[]> {
  const config = getAssessmentConfig(completedAssessmentType)
  const assessmentsToUnlock = config.unlocksAssessments

  if (assessmentsToUnlock.length === 0) {
    return []
  }

  const client = supabase || createClient()
  const unlockedAssessments: AssessmentType[] = []

  for (const assessmentType of assessmentsToUnlock) {
    const { error } = await client
      .from('assessment_unlocks')
      .upsert(
        {
          user_id: userId,
          assessment_type: assessmentType,
          unlocked_by_assessment_id: completedAssessmentId,
        },
        {
          onConflict: 'user_id,assessment_type',
          ignoreDuplicates: true,
        }
      )

    if (!error) {
      unlockedAssessments.push(assessmentType)
    } else {
      logger.error(`Error unlocking ${assessmentType}`, { userId, assessmentType, error: error.message })
    }
  }

  return unlockedAssessments
}

// Grant resource access after completing any assessment
export async function grantResourceAccess(
  userId: string,
  completedAssessmentType: AssessmentType,
  supabase?: SupabaseClient
): Promise<string[]> {
  const resourceToolAccessIds = getResourceToolAccessIds(completedAssessmentType)

  if (resourceToolAccessIds.length === 0) {
    return []
  }

  const client = supabase || createClient()
  const grantedResources: string[] = []

  for (const toolAccessId of resourceToolAccessIds) {
    const { error } = await client
      .from('tool_access')
      .upsert(
        {
          user_id: userId,
          tool_id: toolAccessId,
          granted_by_assessment_type: completedAssessmentType,
        },
        {
          onConflict: 'user_id,tool_id',
          ignoreDuplicates: true,
        }
      )

    if (!error) {
      grantedResources.push(toolAccessId)
    } else {
      logger.error(`Error granting resource access ${toolAccessId}`, { userId, toolAccessId, error: error.message })
    }
  }

  return grantedResources
}

// Grant credits after completing an assessment
export async function grantCreditsOnCompletion(
  userId: string,
  assessmentType: AssessmentType,
  supabase?: SupabaseClient
): Promise<number> {
  const config = getAssessmentConfig(assessmentType)
  const creditsToGrant = config.creditsGranted

  if (creditsToGrant <= 0) {
    return 0
  }

  const client = supabase || createClient()

  // Add credits to user profile
  const { error: profileError } = await client.rpc('increment_credits', {
    user_id_input: userId,
    amount: creditsToGrant,
  })

  if (profileError) {
    // Fallback: manual update if RPC doesn't exist
    const { data: profile } = await client
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single()

    const currentCredits = profile?.credits || 0
    const { error: updateError } = await client
      .from('profiles')
      .update({ credits: currentCredits + creditsToGrant })
      .eq('id', userId)

    if (updateError) {
      logger.error('Error granting credits', { userId, assessmentType, error: updateError.message })
      return 0
    }
  }

  // Record transaction
  await client.from('credit_transactions').insert({
    user_id: userId,
    amount: creditsToGrant,
    type: 'earned',
    description: `Completed ${config.name} assessment`,
    reference_id: assessmentType,
  })

  return creditsToGrant
}

// Grant tool access after completing an assessment
export async function grantToolAccess(
  userId: string,
  assessmentType: AssessmentType,
  supabase?: SupabaseClient
): Promise<string[]> {
  const config = getAssessmentConfig(assessmentType)
  const toolsToGrant = config.grantsToolAccess

  if (toolsToGrant.length === 0) {
    return []
  }

  const client = supabase || createClient()
  const grantedTools: string[] = []

  for (const toolId of toolsToGrant) {
    const { error } = await client
      .from('tool_access')
      .upsert(
        {
          user_id: userId,
          tool_id: toolId,
          granted_by_assessment_type: assessmentType,
        },
        {
          onConflict: 'user_id,tool_id',
          ignoreDuplicates: true,
        }
      )

    if (!error) {
      grantedTools.push(toolId)
    } else {
      logger.error(`Error granting tool access ${toolId}`, { userId, toolId, error: error.message })
    }
  }

  return grantedTools
}

// Check if user has access to a specific tool
export async function checkToolAccess(userId: string, toolId: string): Promise<boolean> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tool_access')
    .select('id')
    .eq('user_id', userId)
    .eq('tool_id', toolId)
    .single()

  if (error && error.code !== 'PGRST116') {
    logger.error('Error checking tool access', { userId, toolId, error: error.message })
  }

  return !!data
}

// Get user's assessment completion history
export async function getUserAssessmentHistory(userId: string): Promise<AssessmentCompletion[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('assessments')
    .select('id, assessment_type, score, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    logger.error('Error fetching assessment history', { userId, error: error.message })
    return []
  }

  return (
    data?.map(a => ({
      id: a.id,
      assessmentType: (a.assessment_type || 'cil') as AssessmentType,
      score: a.score,
      completedAt: a.created_at,
    })) || []
  )
}

// Get assessment completion counts by type
export async function getAssessmentCompletionCounts(
  userId: string
): Promise<Record<AssessmentType, number>> {
  const history = await getUserAssessmentHistory(userId)

  const counts: Record<AssessmentType, number> = {
    cil: 0,
    cimm: 0,
    cira: 0,
    tbl: 0,
    ciss: 0,
    pricing: 0,
  }

  history.forEach(a => {
    if (a.assessmentType in counts) {
      counts[a.assessmentType]++
    }
  })

  return counts
}

// Handle full assessment completion flow (unlocks + tool grants + resource grants + credits)
// Pass a SupabaseClient (service role) when calling from server-side API routes
export async function handleAssessmentCompletion(
  userId: string,
  assessmentType: AssessmentType,
  assessmentId: string,
  supabase?: SupabaseClient
): Promise<{
  unlockedAssessments: AssessmentType[]
  grantedTools: string[]
  grantedResources: string[]
  creditsEarned: number
}> {
  // Run all grants in parallel for speed
  const [unlockedAssessments, grantedTools, grantedResources, creditsEarned] =
    await Promise.all([
      // Unlock assessments (for CIL completion)
      unlockAssessmentsOnCompletion(userId, assessmentType, assessmentId, supabase),
      // Grant tool access (for secondary assessment completion)
      grantToolAccess(userId, assessmentType, supabase),
      // Grant resource access (for any assessment completion)
      grantResourceAccess(userId, assessmentType, supabase),
      // Grant credits (for any assessment completion)
      grantCreditsOnCompletion(userId, assessmentType, supabase),
    ])

  return {
    unlockedAssessments,
    grantedTools,
    grantedResources,
    creditsEarned,
  }
}

// Get assessment progress summary for dashboard
export async function getAssessmentProgressSummary(userId: string): Promise<{
  totalAssessments: number
  completedAssessments: number
  unlockedAssessments: number
  completionPercentage: number
  assessmentStatuses: Record<
    AssessmentType,
    {
      isUnlocked: boolean
      isCompleted: boolean
      latestScore?: number
      completionCount: number
    }
  >
}> {
  const [unlocks, history] = await Promise.all([
    getUserUnlockStatus(userId),
    getUserAssessmentHistory(userId),
  ])

  // Build assessment statuses
  const assessmentStatuses: Record<
    AssessmentType,
    {
      isUnlocked: boolean
      isCompleted: boolean
      latestScore?: number
      completionCount: number
    }
  > = {} as Record<
    AssessmentType,
    {
      isUnlocked: boolean
      isCompleted: boolean
      latestScore?: number
      completionCount: number
    }
  >

  const assessmentTypes: AssessmentType[] = ['cil', 'cimm', 'cira', 'tbl', 'ciss', 'pricing']

  for (const type of assessmentTypes) {
    const completions = history.filter(h => h.assessmentType === type)
    assessmentStatuses[type] = {
      isUnlocked: unlocks.assessments[type].isUnlocked,
      isCompleted: completions.length > 0,
      latestScore: completions[0]?.score,
      completionCount: completions.length,
    }
  }

  const completedCount = assessmentTypes.filter(t => assessmentStatuses[t].isCompleted).length
  const unlockedCount = assessmentTypes.filter(t => assessmentStatuses[t].isUnlocked).length

  return {
    totalAssessments: assessmentTypes.length,
    completedAssessments: completedCount,
    unlockedAssessments: unlockedCount,
    completionPercentage: Math.round((completedCount / assessmentTypes.length) * 100),
    assessmentStatuses,
  }
}

// Get tools that user can access
export async function getUserAccessibleTools(userId: string): Promise<string[]> {
  const unlocks = await getUserUnlockStatus(userId)
  return Object.keys(unlocks.tools)
}

// Get assessment requirement message
export function getUnlockRequirementMessage(assessmentType: AssessmentType): string {
  const config = getAssessmentConfig(assessmentType)

  if (!config.unlockRequirement) {
    return 'This assessment is available to all users.'
  }

  const requiredConfig = getAssessmentConfig(config.unlockRequirement)
  return `Complete the ${requiredConfig.name} assessment to unlock this assessment.`
}

// Get tool requirement message
export function getToolRequirementMessage(toolId: string): string {
  const toolConfig = TOOL_CONFIGS[toolId]
  if (!toolConfig) {
    return 'Unknown tool.'
  }

  const assessmentConfig = getAssessmentConfig(toolConfig.unlockedByAssessment)
  return `Complete the ${assessmentConfig.name} assessment to unlock this tool.`
}
