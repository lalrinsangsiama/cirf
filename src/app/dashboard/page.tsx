'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  CreditCard,
  ClipboardCheck,
  TrendingUp,
  Calendar,
  ArrowRight,
  Plus,
  FileText,
  User,
  Building2,
  Mail,
  ChevronRight,
  Lock,
  Unlock,
  CheckCircle2,
  Globe,
  Phone,
  Linkedin,
  Twitter,
  Sparkles,
  Calculator,
} from 'lucide-react'
import { getAssessmentProgressSummary, getUserUnlockStatus, type UserUnlocks } from '@/lib/services/assessmentUnlockService'
import { AssessmentType, ASSESSMENT_CONFIGS, TOOL_CONFIGS } from '@/lib/data/assessmentConfig'
import { logger } from '@/lib/logger'
import { getAssessmentRecommendations, getRecommendationBadge, type AssessmentRecommendation } from '@/lib/data/assessmentRecommendations'
import { calculateAssessmentResult } from '@/lib/assessment/scoring'
import { questionConfig } from '@/lib/data/assessmentQuestions'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Assessment {
  id: string
  score: number
  assessment_type: string
  interpretation: {
    level: string
    successRate: string
    description: string
    constructScores?: Record<string, number>
  }
  created_at: string
}

interface Transaction {
  id: string
  amount: number
  type: string
  description: string
  created_at: string
}

export default function DashboardPage() {
  const { user, profile, loading, refreshProfile } = useAuth()
  const searchParams = useSearchParams()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [showEarnedBanner, setShowEarnedBanner] = useState(false)
  const [earnedFromType, setEarnedFromType] = useState<string | null>(null)
  const [progressSummary, setProgressSummary] = useState<{
    totalAssessments: number
    completedAssessments: number
    unlockedAssessments: number
    completionPercentage: number
    assessmentStatuses: Record<AssessmentType, {
      isUnlocked: boolean
      isCompleted: boolean
      latestScore?: number
      completionCount: number
    }>
  } | null>(null)
  const [unlockStatus, setUnlockStatus] = useState<UserUnlocks | null>(null)
  const [dataError, setDataError] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<AssessmentRecommendation[]>([])
  const [unlockedToolIds, setUnlockedToolIds] = useState<Set<string>>(new Set())

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setLoadingData(true)
      setDataError(null)

      try {
        // Fetch assessments
        const { data: assessmentsData, error: assessmentError } = await supabase
          .from('assessments')
          .select('id, score, interpretation, created_at, assessment_type')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10)

        if (assessmentError) {
          logger.error('Error fetching assessments', { error: assessmentError.message })
          throw new Error('Failed to load assessments')
        }

        if (assessmentsData) {
          setAssessments(assessmentsData)
        }

        // Fetch transactions
        const { data: transactionsData, error: transactionError } = await supabase
          .from('credit_transactions')
          .select('id, amount, type, description, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)

        if (transactionError) {
          logger.error('Error fetching transactions', { error: transactionError.message })
        }

        if (transactionsData) {
          setTransactions(transactionsData)
        }

        // Fetch progress summary, unlock status, and tool access
        const [progress, unlocks] = await Promise.all([
          getAssessmentProgressSummary(user.id),
          getUserUnlockStatus(user.id),
        ])
        setProgressSummary(progress)
        setUnlockStatus(unlocks)

        // Fetch tool access
        const { data: toolAccess } = await supabase
          .from('tool_access')
          .select('tool_id')
          .eq('user_id', user.id)

        if (toolAccess) {
          setUnlockedToolIds(new Set(toolAccess.map(t => t.tool_id)))
        }

        // Fetch CIL construct scores for recommendations
        if (progress.assessmentStatuses.cil?.isCompleted) {
          const { data: cilAssessment } = await supabase
            .from('assessments')
            .select('interpretation, answers')
            .eq('user_id', user.id)
            .eq('assessment_type', 'cil')
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          if (cilAssessment) {
            let constructScores = cilAssessment.interpretation?.constructScores
            if (!constructScores && cilAssessment.answers) {
              const result = calculateAssessmentResult(cilAssessment.answers, questionConfig)
              constructScores = {}
              for (const section of result.sectionScores) {
                Object.assign(constructScores, section.constructScores)
              }
            }
            if (constructScores) {
              setRecommendations(getAssessmentRecommendations(constructScores))
            }
          }
        }
      } catch (error) {
        logger.error('Error fetching dashboard data', {}, error instanceof Error ? error : undefined)
        setDataError(
          error instanceof Error
            ? error.message
            : 'Failed to load dashboard data. Please try refreshing the page.'
        )
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabase])

  // Show credit earned banner from search params
  useEffect(() => {
    if (searchParams.get('earned') === '1') {
      setShowEarnedBanner(true)
      setEarnedFromType(searchParams.get('from'))
    }
  }, [searchParams])

  if (loading) {
    return (
      <main className="min-h-screen bg-sand pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-stone/20 rounded w-48 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-stone/20 rounded-2xl" />
              <div className="h-32 bg-stone/20 rounded-2xl" />
              <div className="h-32 bg-stone/20 rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-sand pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-ink mb-4">Please log in</h1>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
          >
            Log in
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getScoreColor = (score: number, maxScore: number = 100) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 70) return 'text-sage'
    if (percentage >= 50) return 'text-gold'
    return 'text-terracotta'
  }

  const getAssessmentName = (type: string) => {
    const config = ASSESSMENT_CONFIGS[type as AssessmentType]
    return config?.name || 'CIL'
  }

  const allTools = Object.values(TOOL_CONFIGS)

  // Top 1-2 recommendations (CIL done, secondaries remaining)
  const topRecommendations = recommendations
    .filter(r => r.level !== 'optional')
    .filter(r => !progressSummary?.assessmentStatuses[r.assessmentType]?.isCompleted)
    .slice(0, 2)

  return (
    <main className="min-h-screen bg-sand pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-ink mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-stone">
            Manage your assessments, tools, and credits
          </p>
        </div>

        {/* Credit Earned Banner */}
        {showEarnedBanner && (
          <div className="mb-8 p-4 bg-sage/10 border border-sage/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0" />
              <p className="text-sage font-medium">
                +1 credit earned{earnedFromType ? ` from completing ${getAssessmentName(earnedFromType)}` : ''}! You now have {profile?.credits || 0} credit{(profile?.credits || 0) !== 1 ? 's' : ''}.
              </p>
            </div>
            <button
              onClick={() => setShowEarnedBanner(false)}
              className="text-sage/60 hover:text-sage transition-colors ml-4"
              aria-label="Dismiss"
            >
              &times;
            </button>
          </div>
        )}

        {/* Error Display */}
        {dataError && (
          <div className="mb-8 p-4 bg-terracotta/10 border border-terracotta/20 rounded-xl flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5 rotate-180" />
            <div>
              <p className="font-medium text-terracotta">Unable to load some data</p>
              <p className="text-sm text-terracotta/80">{dataError}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-terracotta font-medium hover:underline"
              >
                Refresh page
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-gold" />
              </div>
              <span className="text-sm text-stone">
                Free
              </span>
            </div>
            <p className="text-3xl font-bold text-ink mb-1">{profile?.credits || 0}</p>
            <p className="text-sm text-stone">Credits available</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-sage" />
              </div>
            </div>
            <p className="text-3xl font-bold text-ink mb-1">
              {progressSummary?.completedAssessments || 0}/6
            </p>
            <p className="text-sm text-stone">Assessments completed</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-ocean/10 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-ocean" />
              </div>
            </div>
            <p className="text-3xl font-bold text-ink mb-1">
              {unlockedToolIds.size}/{allTools.length}
            </p>
            <p className="text-sm text-stone">Tools unlocked</p>
          </div>
        </div>

        {/* Journey Visualization */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden mb-8">
          <div className="p-6 border-b border-stone/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-ink">Your Journey</h2>
                <p className="text-sm text-stone">
                  Complete CIL (free) → earn 1 credit → take any assessment → earn it back → repeat
                </p>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 text-sm text-gold font-medium hover:underline"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="p-6">
            {/* Journey Pipeline */}
            <div className="relative">
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {/* CIL */}
              {(() => {
                const cilStatus = progressSummary?.assessmentStatuses?.cil
                return (
                  <Link
                    href="/tools?start=cil"
                    className={cn(
                      'flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all min-w-[100px] text-center',
                      cilStatus?.isCompleted
                        ? 'bg-sage/10 border-sage/30'
                        : 'bg-gold/5 border-gold/30 hover:border-gold'
                    )}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone">CIL</p>
                    {cilStatus?.latestScore !== undefined ? (
                      <p className={cn('text-xl font-bold', getScoreColor(cilStatus.latestScore))}>{cilStatus.latestScore}</p>
                    ) : (
                      <p className="text-xs text-gold mt-1">Start here</p>
                    )}
                  </Link>
                )
              })()}

              <ChevronRight className="w-5 h-5 text-stone/40 flex-shrink-0" />

              {/* Secondary assessments */}
              {(['cimm', 'cira', 'tbl', 'ciss', 'pricing'] as AssessmentType[]).map((type, i) => {
                const config = ASSESSMENT_CONFIGS[type]
                const status = progressSummary?.assessmentStatuses?.[type]
                const isUnlocked = status?.isUnlocked ?? false
                const isCompleted = status?.isCompleted ?? false

                return (
                  <div key={type} className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={isUnlocked ? `/assessments/${type}` : '/tools'}
                      className={cn(
                        'px-3 py-3 rounded-xl border transition-all min-w-[80px] text-center',
                        isCompleted
                          ? 'bg-sage/10 border-sage/30'
                          : isUnlocked
                            ? 'bg-gold/5 border-gold/30 hover:border-gold'
                            : 'bg-sand/50 border-stone/20 opacity-60'
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone">{config.name}</p>
                      {status?.latestScore !== undefined ? (
                        <p className={cn('text-lg font-bold', getScoreColor(status.latestScore))}>{status.latestScore}</p>
                      ) : isUnlocked ? (
                        <p className="text-xs text-gold mt-1">Ready</p>
                      ) : (
                        <Lock className="w-3 h-3 text-stone/50 mx-auto mt-1" />
                      )}
                    </Link>
                    {i < 4 && <ChevronRight className="w-4 h-4 text-stone/30 flex-shrink-0" />}
                  </div>
                )
              })}
            </div>
            {/* Scroll fade indicator */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
            </div>

            {/* Tools Summary */}
            <div className="border-t border-stone/10 pt-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-stone">Tools Unlocked</p>
                <Link href="/tools/calculators" className="text-sm text-gold hover:underline">
                  View All →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTools.map((tool) => {
                  const isUnlocked = unlockedToolIds.has(tool.id)
                  return (
                    <Link
                      key={tool.id}
                      href={isUnlocked ? `/tools/${tool.id}` : '/tools/calculators'}
                      className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors',
                        isUnlocked
                          ? 'bg-sage/10 text-sage hover:bg-sage/20'
                          : 'bg-sand text-stone/50'
                      )}
                    >
                      {isUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      {tool.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Next - shown when CIL done but secondaries remain */}
        {topRecommendations.length > 0 && (
          <div className="bg-gradient-to-r from-gold/10 to-ocean/10 border border-gold/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="font-semibold text-ink">Recommended Next</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topRecommendations.map((rec) => {
                const config = ASSESSMENT_CONFIGS[rec.assessmentType]
                const badge = getRecommendationBadge(rec.level)
                return (
                  <Link
                    key={rec.assessmentType}
                    href={`/assessments/${rec.assessmentType}`}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-all border border-stone/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{config.name}</h4>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full border', badge.className)}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-sm text-stone mb-2">{rec.forYouIf}</p>
                    <p className="text-xs text-gold">{rec.benefit}</p>
                    <div className="flex items-center gap-1 mt-3 text-sm text-gold font-medium">
                      Start Assessment
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Assessments */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden">
            <div className="p-6 border-b border-stone/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Recent Assessments</h2>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 text-sm text-gold font-medium hover:underline"
              >
                <Plus className="w-4 h-4" />
                New assessment
              </Link>
            </div>

            {loadingData ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-16 bg-stone/10 rounded-lg" />
                  <div className="h-16 bg-stone/10 rounded-lg" />
                </div>
              </div>
            ) : assessments.length === 0 ? (
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">Welcome to CIL!</h3>
                  <p className="text-stone text-sm max-w-md mx-auto">
                    Start your journey by taking the CIL Assessment — it takes about 10 minutes and unlocks personalized tools and insights.
                  </p>
                </div>

                {/* 3-step journey visual */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  {[
                    { step: '1', label: 'Assess', desc: 'Take CIL Assessment' },
                    { step: '2', label: 'Unlock', desc: 'Get tools & resources' },
                    { step: '3', label: 'Apply', desc: 'Grow your initiative' },
                  ].map((item, i) => (
                    <div key={item.step} className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-sm font-bold text-gold">{item.step}</span>
                        </div>
                        <p className="text-xs font-medium text-ink">{item.label}</p>
                        <p className="text-[10px] text-stone">{item.desc}</p>
                      </div>
                      {i < 2 && <ChevronRight className="w-4 h-4 text-stone/30 mt-[-16px]" />}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href="/tools?start=cil"
                    className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
                  >
                    Take CIL Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-stone/10">
                {assessments.slice(0, 5).map((assessment) => {
                  const assessmentType = assessment.assessment_type || 'cil'
                  return (
                    <div key={assessment.id} className="p-4 hover:bg-sand/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center px-2 py-0.5 bg-ink/10 text-ink text-xs font-medium rounded">
                              {getAssessmentName(assessmentType)}
                            </span>
                            <p className={`text-lg font-semibold ${getScoreColor(assessment.score)}`}>
                              {assessment.score}/100
                            </p>
                          </div>
                          <p className="text-sm text-stone">
                            {assessment.interpretation?.level || 'Assessment completed'}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-stone">
                            <Calendar className="w-4 h-4" />
                            {formatDate(assessment.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Profile & Transactions */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden">
              <div className="p-6 border-b border-stone/10 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-ink">Profile</h2>
                <div className="flex items-center gap-2">
                  {profile?.profile_completed && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Complete
                    </span>
                  )}
                  <Link
                    href="/dashboard/profile"
                    className="text-sm text-gold font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{profile?.full_name || 'User'}</p>
                    <p className="text-sm text-stone capitalize">{profile?.role?.replace('_', ' ') || 'Member'}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-stone/10">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-stone" />
                    <span className="text-ink">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="w-4 h-4 text-stone" />
                    {profile?.organization ? (
                      <span className="text-ink">{profile.organization}</span>
                    ) : (
                      <span className="text-stone/50 italic">Not set</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-stone" />
                    {profile?.phone ? (
                      <span className="text-ink">{profile.phone}</span>
                    ) : (
                      <span className="text-stone/50 italic">Not set</span>
                    )}
                  </div>
                  {profile?.website && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-stone" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                        {profile.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  {profile?.linkedin_url && (
                    <div className="flex items-center gap-3 text-sm">
                      <Linkedin className="w-4 h-4 text-stone" />
                      <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  {profile?.twitter_handle && (
                    <div className="flex items-center gap-3 text-sm">
                      <Twitter className="w-4 h-4 text-stone" />
                      <span className="text-ink">@{profile.twitter_handle}</span>
                    </div>
                  )}
                  {!profile?.organization && !profile?.phone && (
                    <Link
                      href="/dashboard/profile"
                      className="text-xs text-gold hover:underline mt-1 inline-block"
                    >
                      Complete your profile →
                    </Link>
                  )}
                </div>

                {/* Business Info */}
                {(profile?.industry || profile?.business_stage || profile?.country) && (
                  <div className="pt-4 border-t border-stone/10">
                    <p className="text-xs uppercase tracking-wide text-stone mb-2">Business Info</p>
                    <div className="flex flex-wrap gap-2">
                      {profile?.industry && (
                        <span className="inline-flex items-center px-2 py-1 bg-sand text-stone text-xs rounded">
                          {profile.industry}
                        </span>
                      )}
                      {profile?.business_stage && (
                        <span className="inline-flex items-center px-2 py-1 bg-sand text-stone text-xs rounded capitalize">
                          {profile.business_stage}
                        </span>
                      )}
                      {profile?.country && (
                        <span className="inline-flex items-center px-2 py-1 bg-sand text-stone text-xs rounded">
                          {profile.country}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Cultural Context */}
                {(profile?.cultural_tradition || profile?.community_affiliation) && (
                  <div className="pt-4 border-t border-stone/10">
                    <p className="text-xs uppercase tracking-wide text-stone mb-2">Cultural Context</p>
                    {profile?.cultural_tradition && (
                      <p className="text-sm text-ink mb-1">
                        <span className="text-stone">Tradition:</span> {profile.cultural_tradition}
                      </p>
                    )}
                    {profile?.community_affiliation && (
                      <p className="text-sm text-ink">
                        <span className="text-stone">Community:</span> {profile.community_affiliation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Credit History */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden">
              <div className="p-6 border-b border-stone/10">
                <h2 className="text-lg font-semibold text-ink">Credit History</h2>
              </div>

              {loadingData ? (
                <div className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-stone/10 rounded-lg" />
                    <div className="h-12 bg-stone/10 rounded-lg" />
                  </div>
                </div>
              ) : transactions.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-stone text-sm">No transactions yet</p>
                </div>
              ) : (
                <div className="divide-y divide-stone/10">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {transaction.description || transaction.type}
                        </p>
                        <p className="text-xs text-stone">
                          {formatDate(transaction.created_at)}
                        </p>
                      </div>
                      <span className={`font-semibold ${transaction.amount > 0 ? 'text-sage' : 'text-terracotta'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/tools"
            className="bg-white rounded-xl p-4 shadow-sm border border-stone/10 hover:border-gold/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">Take Assessment</p>
                <p className="text-sm text-stone">Evaluate your initiative</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone group-hover:text-gold transition-colors" />
            </div>
          </Link>

          <Link
            href="/tools/calculators"
            className="bg-white rounded-xl p-4 shadow-sm border border-stone/10 hover:border-gold/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">Calculators</p>
                <p className="text-sm text-stone">Use your unlocked tools</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone group-hover:text-gold transition-colors" />
            </div>
          </Link>

          <Link
            href="/framework"
            className="bg-white rounded-xl p-4 shadow-sm border border-stone/10 hover:border-gold/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">Framework</p>
                <p className="text-sm text-stone">Explore the CIL framework</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone group-hover:text-gold transition-colors" />
            </div>
          </Link>

          <Link
            href="/resources"
            className="bg-white rounded-xl p-4 shadow-sm border border-stone/10 hover:border-gold/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">Resources</p>
                <p className="text-sm text-stone">Downloadable guides</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone group-hover:text-gold transition-colors" />
            </div>
          </Link>
        </div>

        {/* Account Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/dashboard/profile"
            className="text-sm text-stone hover:text-ink transition-colors"
          >
            Edit Profile
          </Link>
          <span className="text-stone/30">|</span>
          <Link
            href="/dashboard/settings"
            className="text-sm text-stone hover:text-ink transition-colors"
          >
            Account Settings
          </Link>
        </div>
      </div>
    </main>
  )
}
