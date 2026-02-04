'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  AssessmentType,
  ASSESSMENT_CONFIGS,
  getAssessmentConfig,
  getScoreInterpretation,
} from '@/lib/data/assessmentConfig'
import {
  checkAssessmentAccess,
  handleAssessmentCompletion,
  getUserUnlockStatus,
} from '@/lib/services/assessmentUnlockService'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  CheckCircle2,
  Clock,
  Info,
  Loader2,
  RotateCcw,
  Download,
  Share2,
  Mail,
  Sparkles,
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
  answers: Record<string, number>,
  questions: QuestionWithSection[]
): {
  overallScore: number
  sectionScores: Record<string, number>
} {
  const answeredQuestions = questions.filter(q => answers[q.id] != null)

  if (answeredQuestions.length === 0) {
    return { overallScore: 0, sectionScores: {} }
  }

  // Calculate weighted scores
  let totalWeight = 0
  let weightedSum = 0
  const sectionSums: Record<string, { sum: number; count: number }> = {}

  for (const q of answeredQuestions) {
    let rawScore = answers[q.id]
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
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [saving, setSaving] = useState(false)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false)
  const [grantedTools, setGrantedTools] = useState<string[]>([])
  const [grantedResources, setGrantedResources] = useState<string[]>([])
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supabase = createClient()

  const assessmentType = params.type as AssessmentType
  const config = ASSESSMENT_CONFIGS[assessmentType]

  // Redirect if invalid assessment type
  useEffect(() => {
    if (!config) {
      router.push('/tools')
    }
  }, [config, router])

  // Check access
  useEffect(() => {
    async function checkAccess() {
      if (!user || authLoading) return

      const access = await checkAssessmentAccess(user.id, assessmentType)
      setHasAccess(access)
    }

    if (user) {
      checkAccess()
    } else if (!authLoading) {
      setHasAccess(false)
    }
  }, [user, authLoading, assessmentType])

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
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  // Navigation
  const handleNext = async () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1)
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
            setError('You need credits to complete this assessment.')
            setSaving(false)
            setIsSubmitting(false)
            router.push('/pricing?need_credits=true')
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
      } catch (err) {
        console.error('Error completing assessment:', err)
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
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentSection(0)
    setShowResults(false)
    setAssessmentId(null)
    setEmailSent(false)
  }

  // Email results
  const handleEmailResults = async () => {
    if (!user || !assessmentId || sendingEmail || emailSent) return

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
      }
    } catch (error) {
      console.error('Error sending email:', error)
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

  return (
    <div className="min-h-screen bg-pearl py-8">
      <div className="max-w-4xl mx-auto px-4">
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
        {!showResults && (
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
              <span>{answeredCount}/{totalQuestions} questions answered</span>
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

          {!showResults ? (
            <div className="p-8">
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
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{section.name}</span>
                        <span className="text-sm text-stone">{sectionScores[section.id] || 0}%</span>
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

              {/* Tools Unlocked */}
              {grantedTools.length > 0 && (
                <div className="bg-sage/10 border border-sage/30 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-sage flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-2">New Tools Unlocked!</h4>
                      <p className="text-sm text-stone mb-4">
                        By completing this assessment, you&apos;ve unlocked these tools:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {grantedTools.map(tool => (
                          <span
                            key={tool}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-white text-sage border border-sage/20 text-sm rounded-full"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        ))}
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
                    disabled={sendingEmail || emailSent}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors',
                      emailSent
                        ? 'bg-sage/20 text-sage'
                        : 'bg-gold text-ink hover:bg-gold/80'
                    )}
                  >
                    {sendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : emailSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Email Sent!
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Email My Results
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
