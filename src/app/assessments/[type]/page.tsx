'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  AssessmentType,
  ASSESSMENT_CONFIGS,
  TOOL_CONFIGS,
  SCORE_THRESHOLDS,
  getAssessmentConfig,
  getScoreInterpretation,
} from '@/lib/data/assessmentConfig'
import {
  checkAssessmentAccess,
  getUserUnlockStatus,
} from '@/lib/services/assessmentUnlockService'
import { cn } from '@/lib/utils'
import { logger } from '@/lib/logger'
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Info,
  Loader2,
  RotateCcw,
  Download,
  Share2,
  Mail,
  Sparkles,
  Save,
  Lightbulb,
} from 'lucide-react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { LikertScale } from '@/components/assessment/LikertScale'
import UnlockCelebration from '@/components/assessment/UnlockCelebration'
import AssessmentIntroScreen from '@/components/assessment/AssessmentIntroScreen'
import { getResourceByToolAccessId } from '@/lib/data/resourcesConfig'
import { getSectionRecommendation } from '@/lib/data/secondaryRecommendations'
import { trackAssessmentStarted, trackAssessmentCompleted } from '@/lib/analytics/posthog'

// Import question sets
import { cimmQuestions, CIMM_SECTION_META } from '@/lib/data/cimmQuestions'
import { ciraQuestions, CIRA_SECTION_META } from '@/lib/data/ciraQuestions'
import { tblQuestions, TBL_SECTION_META } from '@/lib/data/tblQuestions'
import { cissQuestions, CISS_SECTION_META } from '@/lib/data/cissQuestions'
import { pricingQuestions, PRICING_SECTION_META } from '@/lib/data/pricingQuestions'

interface PageProps {
  params: { type: string }
}

// Section meta type
interface SectionMetaItem {
  label: string
  shortLabel: string
  description: string
  estimatedMinutes: number
}

// Get questions for an assessment type
function getQuestionsForType(type: AssessmentType): {
  questions: QuestionWithSection[]
  sectionMeta: Record<string, SectionMetaItem>
} {
  switch (type) {
    case 'cimm':
      return {
        questions: cimmQuestions as QuestionWithSection[],
        sectionMeta: CIMM_SECTION_META as Record<string, SectionMetaItem>
      }
    case 'cira':
      return {
        questions: ciraQuestions as QuestionWithSection[],
        sectionMeta: CIRA_SECTION_META as Record<string, SectionMetaItem>
      }
    case 'tbl':
      return {
        questions: tblQuestions as QuestionWithSection[],
        sectionMeta: TBL_SECTION_META as Record<string, SectionMetaItem>
      }
    case 'ciss':
      return {
        questions: cissQuestions as QuestionWithSection[],
        sectionMeta: CISS_SECTION_META as Record<string, SectionMetaItem>
      }
    case 'pricing':
      return {
        questions: pricingQuestions as QuestionWithSection[],
        sectionMeta: PRICING_SECTION_META as Record<string, SectionMetaItem>
      }
    default:
      return { questions: [], sectionMeta: {} }
  }
}

// Question type with section
interface QuestionWithSection {
  id: string
  section: string
  construct: string
  question: string
  helpText?: string
  weight: number
  reverse?: boolean
}

// Calculate score for secondary assessments
function calculateSecondaryAssessmentScore(
  answers: Record<string, number | string>,
  questions: QuestionWithSection[]
): {
  overallScore: number
  sectionScores: Record<string, number>
} {
  const answeredQuestions = questions.filter(q => typeof answers[q.id] === 'number')

  if (answeredQuestions.length === 0) {
    return { overallScore: 0, sectionScores: {} }
  }

  // Calculate weighted scores
  let totalWeight = 0
  let weightedSum = 0
  const sectionSums: Record<string, { sum: number; count: number }> = {}

  for (const q of answeredQuestions) {
    let rawScore = answers[q.id] as number
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
      sectionSums[section] = { sum: 0, count: 0 }
    }
    sectionSums[section].sum += normalizedScore
    sectionSums[section].count++
  }

  const overallScore = Math.round(weightedSum / totalWeight)

  // Calculate section averages
  const sectionScores: Record<string, number> = {}
  for (const [section, data] of Object.entries(sectionSums)) {
    sectionScores[section] = Math.round(data.sum / data.count)
  }

  return { overallScore, sectionScores }
}

export default function AssessmentPage({ params }: PageProps) {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | string>>({})
  const [showResults, setShowResults] = useState(false)
  const [saving, setSaving] = useState(false)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false)
  const [grantedTools, setGrantedTools] = useState<string[]>([])
  const [grantedResources, setGrantedResources] = useState<string[]>([])
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [hasDraft, setHasDraft] = useState(false)
  const [draftLoaded, setDraftLoaded] = useState(false)
  const [hasExistingSubmission, setHasExistingSubmission] = useState(false)
  const [existingScore, setExistingScore] = useState<number | null>(null)
  const [existingDate, setExistingDate] = useState<string | null>(null)
  const autoSaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSavedAnswersRef = useRef<string>('')

  const supabase = createClient()

  const assessmentType = params.type as AssessmentType
  const config = ASSESSMENT_CONFIGS[assessmentType]

  // Redirect if invalid assessment type
  useEffect(() => {
    if (!config) {
      router.push('/tools')
    }
  }, [config, router])

  // Check access and existing submission
  useEffect(() => {
    async function checkAccessAndExisting() {
      if (!user || authLoading) return

      const access = await checkAssessmentAccess(user.id, assessmentType)
      setHasAccess(access)

      // Check if user already completed this assessment (1 response per person)
      const { data: existing } = await supabase
        .from('assessments')
        .select('id, score, interpretation, created_at')
        .eq('user_id', user.id)
        .eq('assessment_type', assessmentType)
        .maybeSingle()

      if (existing) {
        setHasExistingSubmission(true)
        setExistingScore(existing.score)
        setExistingDate(existing.created_at)
        setAssessmentId(existing.id)
        // Show results view with existing data
        setShowResults(true)
      }
    }

    if (user) {
      checkAccessAndExisting()
    } else if (!authLoading) {
      setHasAccess(false)
    }
  }, [user, authLoading, assessmentType])

  // Auto-save to server (debounced)
  const saveToServer = useCallback(async () => {
    if (!user || !config) return

    const answersString = JSON.stringify(answers)
    if (answersString === lastSavedAnswersRef.current) return

    setAutoSaveStatus('saving')
    try {
      const response = await fetch('/api/assessments/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentType,
          answers,
          currentSection: config.sections[currentSection]?.id,
        }),
      })

      if (response.ok) {
        lastSavedAnswersRef.current = answersString
        setAutoSaveStatus('saved')
        setHasDraft(true)
        setTimeout(() => setAutoSaveStatus('idle'), 2000)
      } else {
        setAutoSaveStatus('error')
      }
    } catch (error) {
      logger.error('Auto-save failed', {}, error instanceof Error ? error : undefined)
      setAutoSaveStatus('error')
    }
  }, [user, answers, assessmentType, currentSection, config])

  // Load draft on mount
  useEffect(() => {
    const loadDraft = async () => {
      if (!user || draftLoaded || !config) return

      try {
        const response = await fetch(`/api/assessments/draft?type=${assessmentType}`)
        const result = await response.json()

        if (result.data?.hasDraft && result.data.draft) {
          const draft = result.data.draft
          setAnswers(draft.answers)
          if (draft.currentSection) {
            const sectionIndex = config.sections.findIndex(
              (s: { id: string }) => s.id === draft.currentSection
            )
            if (sectionIndex >= 0) {
              setCurrentSection(sectionIndex)
            }
          }
          setHasDraft(true)
          lastSavedAnswersRef.current = JSON.stringify(draft.answers)
        }
      } catch (error) {
        logger.error('Failed to load draft', {}, error instanceof Error ? error : undefined)
      }
      setDraftLoaded(true)
    }

    loadDraft()
  }, [user, draftLoaded, assessmentType, config])

  // Auto-save on answer/section change (2s debounce)
  useEffect(() => {
    if (!user || Object.keys(answers).length === 0 || showResults) return

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveToServer()
    }, 2000)

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [answers, currentSection, user, showResults, saveToServer])

  // Delete draft
  const deleteDraft = useCallback(async () => {
    if (!user || !hasDraft) return

    try {
      await fetch(`/api/assessments/draft?type=${assessmentType}`, {
        method: 'DELETE',
      })
      setHasDraft(false)
    } catch (error) {
      logger.error('Failed to delete draft', {}, error instanceof Error ? error : undefined)
    }
  }, [user, hasDraft, assessmentType])

  if (!config) {
    return null
  }

  const { questions, sectionMeta } = getQuestionsForType(assessmentType)
  const sections = config.sections

  // Get questions for current section
  const currentSectionQuestions = questions.filter(
    q => q.section === sections[currentSection]?.id
  )

  // Calculate progress
  const answeredCount = Object.keys(answers).length
  const totalQuestions = questions.length

  // Handle answer
  const handleAnswer = (questionId: string, value: number | string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  // Navigation
  const handleNext = async () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Complete assessment
      if (!user) {
        router.push('/auth/login?redirectTo=' + encodeURIComponent(`/assessments/${assessmentType}`))
        return
      }

      // Prevent multiple submissions
      if (isSubmitting) return
      setIsSubmitting(true)
      setError(null)
      setSaving(true)

      try {
        // Submit assessment via atomic API endpoint
        // This handles credit deduction and assessment saving in a single transaction
        const response = await fetch('/api/assessments/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessmentType,
            answers,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          // Handle specific error cases
          if (result.error?.code === 'INSUFFICIENT_CREDITS') {
            setError('You do not have enough credits to complete this assessment. Credits are granted when you complete other assessments.')
            setSaving(false)
            setIsSubmitting(false)
            return
          }
          if (result.error?.code === 'CONFLICT') {
            setError('You have already completed this assessment. Each assessment can only be taken once.')
            setHasExistingSubmission(true)
            setSaving(false)
            setIsSubmitting(false)
            return
          }
          throw new Error(result.error?.message || result.message || 'Failed to submit assessment')
        }

        // Extract results from API response
        const { assessmentId: newAssessmentId, score, interpretation, sectionScores: apiSectionScores, grantedTools: tools, grantedResources: resources } = result.data

        setAssessmentId(newAssessmentId)

        // Update local state with server-calculated scores
        // Note: The local calculateSecondaryAssessmentScore is still used for preview during assessment
        // but final scores come from the server

        if (tools?.length > 0 || resources?.length > 0) {
          setGrantedTools(tools || [])
          setGrantedResources(resources || [])
          setShowUnlockCelebration(true)
        }

        setShowResults(true)
        trackAssessmentCompleted(score, interpretation, user?.id)

        // Delete draft after successful submission
        await deleteDraft()
      } catch (err) {
        logger.error('Error completing assessment', {}, err instanceof Error ? err : undefined)
        setError(err instanceof Error ? err.message : 'Failed to complete assessment. Please try again.')
      } finally {
        setSaving(false)
        setIsSubmitting(false)
      }
    }
  }

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleReset = () => {
    if (hasExistingSubmission) return // Cannot reset a completed assessment
    setShowResetConfirm(true)
  }

  const confirmReset = () => {
    setAnswers({})
    setCurrentSection(0)
    setShowResults(false)
    setAssessmentId(null)
    setEmailSent(false)
    setCooldownSeconds(0)
    setShowIntro(true)
    deleteDraft()
    lastSavedAnswersRef.current = ''
    setShowResetConfirm(false)
  }

  // Email results with cooldown
  const handleEmailResults = async () => {
    if (!user || !assessmentId || sendingEmail || cooldownSeconds > 0) return

    setSendingEmail(true)
    try {
      const response = await fetch('/api/email/assessment-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId,
          userId: user.id,
        }),
      })

      if (response.ok) {
        setEmailSent(true)
        setCooldownSeconds(60)
        const interval = setInterval(() => {
          setCooldownSeconds(prev => {
            if (prev <= 1) {
              clearInterval(interval)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    } catch (error) {
      logger.error('Error sending email', {}, error instanceof Error ? error : undefined)
    }
    setSendingEmail(false)
  }

  // Check if can proceed
  const canProceed = currentSectionQuestions.filter(q => answers[q.id] != null).length >=
    Math.ceil(currentSectionQuestions.length * 0.5)

  // Loading state
  if (authLoading || hasAccess === null) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    )
  }

  // Access denied
  if (!hasAccess) {
    const requirement = config.unlockRequirement
      ? ASSESSMENT_CONFIGS[config.unlockRequirement]
      : null

    return (
      <div className="min-h-screen bg-pearl">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-ink/40" />
            </div>
            <h1 className="text-2xl font-serif text-ink mb-4">Assessment Locked</h1>
            <p className="text-stone mb-6">
              The {config.name} assessment is locked.
              {requirement && (
                <> Complete the {requirement.name} assessment first to unlock it.</>
              )}
              {!user && <> Please sign in to access this assessment.</>}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <Link
                  href={`/auth/login?redirectTo=${encodeURIComponent(`/assessments/${assessmentType}`)}`}
                  className="btn-primary"
                >
                  Sign In
                </Link>
              ) : requirement ? (
                <Link href="/tools" className="btn-primary">
                  Take {requirement.name} Assessment
                </Link>
              ) : null}
              <Link href="/tools" className="btn-secondary">
                Back to Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Calculate results for display
  const { overallScore, sectionScores } = calculateSecondaryAssessmentScore(
    answers,
    questions as QuestionWithSection[]
  )
  const interpretation = getScoreInterpretation(overallScore)

  // Radar chart data
  const radarData = sections.map(section => {
    const meta = sectionMeta[section.id]
    return {
      dimension: meta?.shortLabel || section.name,
      score: sectionScores[section.id] || 0,
    }
  })

  // Determine if this is a secondary assessment (needs intro screen)
  const isSecondary = assessmentType !== 'cil'
  const showIntroScreen = isSecondary && showIntro && !showResults && Object.keys(answers).length === 0

  return (
    <div className="min-h-screen bg-pearl py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Reset Confirmation Dialog */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
              onClick={() => setShowResetConfirm(false)}
            />
            <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
              <h3 className="text-lg font-serif font-medium mb-2">Reset Assessment?</h3>
              <p className="text-stone mb-6">
                Are you sure? This will clear all your answers and you&apos;ll need to start over.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-sm text-stone hover:text-ink transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReset}
                  className="px-4 py-2 bg-terracotta text-pearl text-sm rounded-full hover:bg-terracotta/90 transition-colors"
                >
                  Reset Assessment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-ink rounded-t-2xl py-6 px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/tools"
                className="text-pearl/60 text-sm hover:text-pearl transition-colors mb-2 inline-block"
              >
                ← Back to Tools
              </Link>
              <h1 className="text-2xl font-serif text-pearl">{config.fullName}</h1>
              <p className="text-pearl/70 text-sm flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3" />
                ~{config.estimatedMinutes} minutes • {config.questionCount} questions
                {config.creditCost === 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-sage/20 text-sage text-xs rounded-full ml-2">
                    FREE
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {!showResults && !showIntroScreen && (
          <div className="bg-white border-b border-ink/10 px-8 py-4">
            <div className="flex items-center gap-2 mb-2">
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  className={cn(
                    'flex-1 h-2 rounded-full transition-colors',
                    i < currentSection
                      ? 'bg-sage'
                      : i === currentSection
                        ? 'bg-gold'
                        : 'bg-sand'
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-stone">
              <span>{sectionMeta[sections[currentSection]?.id]?.label || sections[currentSection]?.name}</span>
              <div className="flex items-center gap-3">
                {user && autoSaveStatus === 'saving' && (
                  <span className="flex items-center gap-1 text-stone">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Saving...
                  </span>
                )}
                {user && autoSaveStatus === 'saved' && (
                  <span className="flex items-center gap-1 text-sage">
                    <CheckCircle2 className="w-3 h-3" />
                    Saved
                  </span>
                )}
                {user && autoSaveStatus === 'error' && (
                  <span className="flex items-center gap-1 text-terracotta">
                    <Info className="w-3 h-3" />
                    Save failed
                  </span>
                )}
                <span>{answeredCount}/{totalQuestions} questions answered</span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-b-2xl shadow-lg">
          {/* Error display */}
          {error && (
            <div className="mx-8 mt-8 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-start gap-3">
              <Info className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
              <p className="text-sm text-terracotta">{error}</p>
            </div>
          )}

          {/* Secondary Assessment Intro Screen */}
          {showIntroScreen ? (
            <div className="p-8">
              <AssessmentIntroScreen
                config={config}
                user={user}
                profileName={profile?.full_name}
                credits={profile?.credits || 0}
                authLoading={authLoading}
                hasDraft={hasDraft}
                hasExistingSubmission={hasExistingSubmission}
                existingDate={existingDate}
                existingScore={existingScore}
                onStart={() => { trackAssessmentStarted(user?.id); setShowIntro(false) }}
              />
            </div>
          ) : !showResults ? (
            <div className="p-8">
              {/* Resume Draft Notice */}
              {user && hasDraft && draftLoaded && (
                <div className="mb-6 p-4 rounded-lg border border-ocean/30 bg-ocean/10">
                  <div className="flex items-start gap-3">
                    <Save className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">You have saved progress</h4>
                      <p className="text-sm text-stone">
                        Your previous answers have been restored. You can continue where you left off.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Section header */}
              <div className="mb-8">
                <h2 className="text-xl font-serif mb-2">
                  {sectionMeta[sections[currentSection]?.id]?.label || sections[currentSection]?.name}
                </h2>
                <p className="text-stone">
                  {sectionMeta[sections[currentSection]?.id]?.description}
                </p>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {currentSectionQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className={cn(
                      'border rounded-lg p-6 transition-all',
                      answers[question.id] != null
                        ? 'border-gold/50 bg-gold/5'
                        : 'border-ink/10'
                    )}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-sm text-stone font-medium shrink-0">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="font-medium mb-1">{question.question}</p>
                        {question.helpText && (
                          <p className="text-sm text-stone flex items-start gap-1">
                            <Info className="w-3 h-3 mt-0.5 shrink-0" />
                            {question.helpText}
                          </p>
                        )}
                      </div>
                    </div>
                    <LikertScale
                      value={answers[question.id] || null}
                      onChange={(value) => handleAnswer(question.id, value)}
                      variant="horizontal"
                      size="md"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-8 border-t border-ink/10">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-stone hover:text-ink transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>

                <div className="flex gap-4">
                  {currentSection > 0 && (
                    <button onClick={handlePrev} className="btn-secondary flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!canProceed || saving}
                    className={cn(
                      'btn-primary flex items-center gap-2',
                      (!canProceed || saving) && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : currentSection === sections.length - 1 ? (
                      <>
                        View Results
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Next Section
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results */
            <div className="p-8 space-y-8">
              {/* Already completed notice */}
              {hasExistingSubmission && (
                <div className="p-4 rounded-lg border border-gold/30 bg-gold/10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Assessment Already Completed</h4>
                      <p className="text-sm text-stone">
                        You completed this assessment{existingDate ? ` on ${new Date(existingDate).toLocaleDateString()}` : ''}. Each assessment can only be taken once. Below are your saved results.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Thank You Banner */}
              {!hasExistingSubmission && (
                <div className="bg-sage/10 border border-sage/30 p-6 rounded-lg text-center">
                  <h3 className="font-serif text-xl mb-2">Thank you for completing the {config.fullName}!</h3>
                  <p className="text-sm text-stone mb-4">
                    Your responses contribute to research on cultural innovation and economic resilience.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => {
                        const text = `I just completed the ${config.name} assessment on CIL! Discover your cultural innovation potential: ${window.location.origin}/tools`
                        if (navigator.share) {
                          navigator.share({ title: `${config.name} Assessment`, text }).catch(() => {})
                        } else {
                          navigator.clipboard.writeText(text)
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-sage text-white rounded-full text-sm hover:bg-sage/90 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share with a friend
                    </button>
                  </div>
                </div>
              )}

              {/* What You Just Unlocked */}
              {!hasExistingSubmission && (grantedTools.length > 0 || grantedResources.length > 0) && (
                <div className="bg-gold/5 border border-gold/20 p-6 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    What you just unlocked
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {grantedTools.map(tool => {
                      const toolConfig = TOOL_CONFIGS[tool]
                      return (
                        <Link
                          key={tool}
                          href={`/tools/${tool}`}
                          className="flex items-center gap-2 p-3 bg-white rounded-lg border border-sage/20 hover:bg-sage/5 transition-colors text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0" />
                          <span className="font-medium">{toolConfig?.name || tool}</span>
                        </Link>
                      )
                    })}
                    {grantedResources.map(resourceId => {
                      const resource = getResourceByToolAccessId(resourceId)
                      return resource ? (
                        <Link
                          key={resourceId}
                          href="/resources"
                          className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gold/20 hover:bg-gold/5 transition-colors text-sm"
                        >
                          <Download className="w-4 h-4 text-gold flex-shrink-0" />
                          <span className="font-medium">{resource.title}</span>
                        </Link>
                      ) : null
                    })}
                  </div>
                </div>
              )}

              {/* Score Summary */}
              <div className="text-center p-8 bg-gradient-to-br from-sand to-pearl rounded-lg">
                <p className="text-sm uppercase tracking-[0.2em] text-stone mb-2">
                  {config.name} Score
                </p>
                <p className={cn('font-serif text-7xl mb-2', `text-${interpretation.color}`)}>
                  {overallScore}
                </p>
                <p className={cn('text-xl font-medium', `text-${interpretation.color}`)}>
                  {interpretation.level}
                </p>
                <p className="text-sm text-stone mt-4">{interpretation.description}</p>

                {/* Score Context Bar */}
                <div className="mt-6 max-w-md mx-auto">
                  <div className="relative h-3 rounded-full overflow-hidden flex">
                    {Object.values(SCORE_THRESHOLDS).map((tier) => (
                      <div
                        key={tier.label}
                        className={cn(
                          'h-full',
                          `bg-${tier.color}`
                        )}
                        style={{ width: `${tier.max - tier.min}%` }}
                      />
                    ))}
                    {/* Score marker */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-ink rounded-full border-2 border-white shadow"
                      style={{ left: `${Math.min(overallScore, 100)}%`, transform: 'translate(-50%, -50%)' }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {Object.values(SCORE_THRESHOLDS).map((tier) => (
                      <span key={tier.label} className={cn('text-[10px]', `text-${tier.color}`)}>
                        {tier.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* What's Next? Section — positioned early for immediate actionable direction */}
              <div className="bg-ocean/10 border border-ocean/20 p-6 rounded-lg">
                <h4 className="font-medium mb-3">What&apos;s Next?</h4>
                <div className="space-y-3">
                  {grantedTools.length > 0 && (
                    <Link
                      href="/tools/calculators"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-ocean/10 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Try Your New Tools</p>
                        <p className="text-xs text-stone">Use the calculators you just unlocked</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone" />
                    </Link>
                  )}
                  {(['cimm', 'cira', 'tbl', 'ciss', 'pricing'] as AssessmentType[])
                    .filter(type => type !== assessmentType)
                    .slice(0, 2)
                    .map(type => {
                      const assessmentConfig = ASSESSMENT_CONFIGS[type]
                      return (
                        <Link
                          key={type}
                          href={`/assessments/${type}`}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-ocean/10 transition-colors"
                        >
                          <div className="w-8 h-8 bg-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ClipboardCheck className="w-4 h-4 text-sage" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">Take {assessmentConfig.name}</p>
                            <p className="text-xs text-stone">{assessmentConfig.questionCount} questions • Free</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone" />
                        </Link>
                      )
                    })}
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-ocean/10 transition-colors"
                  >
                    <div className="w-8 h-8 bg-ocean/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-4 h-4 text-ocean" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Return to Dashboard</p>
                      <p className="text-xs text-stone">View your progress and all results</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone" />
                  </Link>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="bg-sand/50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Section Profile</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="dimension" className="text-xs" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#C5A572"
                        fill="#C5A572"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Section Breakdown */}
              <div className="bg-sand/50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Section Scores</h3>
                <div className="space-y-4">
                  {sections.map(section => (
                    <div key={section.id}>
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="text-sm font-medium truncate">{section.name}</span>
                        <span className="text-sm text-stone flex-shrink-0">{sectionScores[section.id] || 0}%</span>
                      </div>
                      <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            (sectionScores[section.id] || 0) >= 70
                              ? 'bg-sage'
                              : (sectionScores[section.id] || 0) >= 50
                                ? 'bg-gold'
                                : 'bg-terracotta'
                          )}
                          style={{ width: `${sectionScores[section.id] || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Recommendations */}
              <div className="bg-gold/5 border border-gold/20 p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-gold" />
                  <h3 className="font-medium">Recommendations</h3>
                </div>
                <div className="space-y-4">
                  {sections.map(section => {
                    const score = sectionScores[section.id] || 0
                    const rec = getSectionRecommendation(assessmentType, section.id, score)
                    if (!rec) return null
                    return (
                      <div key={section.id} className="bg-white p-4 rounded-lg">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-sm font-medium">{section.name}</h4>
                          <span className={cn(
                            'text-xs px-2 py-0.5 rounded-full whitespace-nowrap',
                            rec.level === 'thriving' && 'bg-sage/20 text-sage',
                            rec.level === 'established' && 'bg-ocean/20 text-ocean',
                            rec.level === 'developing' && 'bg-gold/20 text-gold',
                            rec.level === 'emerging' && 'bg-terracotta/20 text-terracotta',
                          )}>
                            {rec.level.charAt(0).toUpperCase() + rec.level.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-ink/70 mb-2">{rec.summary}</p>
                        <ul className="space-y-1">
                          {rec.actions.map((action, i) => (
                            <li key={i} className="text-sm text-ink/60 flex items-start gap-2">
                              <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0 text-gold" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Tools Unlocked */}
              {grantedTools.length > 0 && (
                <div className="bg-sage/10 border border-sage/30 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-sage flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">New Tools Unlocked!</h4>
                      <p className="text-sm text-stone mb-4">
                        By completing this assessment, you&apos;ve unlocked these tools:
                      </p>
                      <div className="space-y-3">
                        {grantedTools.map(tool => {
                          const toolConfig = TOOL_CONFIGS[tool]
                          return (
                            <Link
                              key={tool}
                              href={`/tools/${tool}`}
                              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-sage/20 hover:bg-sage/5 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">
                                  {toolConfig?.name || tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </p>
                                {toolConfig?.description && (
                                  <p className="text-xs text-stone mt-0.5">{toolConfig.description}</p>
                                )}
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {user && assessmentId && (
                  <button
                    onClick={handleEmailResults}
                    disabled={sendingEmail || cooldownSeconds > 0}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors',
                      cooldownSeconds > 0
                        ? 'bg-sage/20 text-sage'
                        : 'bg-gold text-ink hover:bg-gold/80'
                    )}
                  >
                    {sendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : cooldownSeconds > 0 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Sent! Resend in {cooldownSeconds}s
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        {emailSent ? 'Resend Results' : 'Email My Results'}
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-sand rounded-full text-sm hover:bg-ink hover:text-pearl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Take Again
                </button>
                <Link
                  href="/tools"
                  className="flex items-center gap-2 px-4 py-2 bg-ink text-pearl rounded-full text-sm hover:bg-ink/90 transition-colors"
                >
                  Back to Tools
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Unlock Celebration Modal */}
        <UnlockCelebration
          isOpen={showUnlockCelebration}
          onClose={() => setShowUnlockCelebration(false)}
          unlockedAssessments={[]}
          grantedTools={grantedTools}
          grantedResources={grantedResources}
        />
      </div>
    </div>
  )
}
