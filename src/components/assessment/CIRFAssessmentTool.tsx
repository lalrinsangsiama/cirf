'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Download,
  CheckCircle2,
  Info,
  Save,
  Share2,
  AlertTriangle,
  TrendingUp,
  Lock,
  CreditCard,
  Loader2,
  Clock,
  Target,
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
import { LikertScale, CategoricalSelect, SectionProgress } from './LikertScale'
import {
  demographicQuestions,
  culturalCapitalQuestions,
  innovationActivitiesQuestions,
  organizationalCapacitiesQuestions,
  economicResilienceQuestions,
  SECTION_META,
  ASSESSMENT_V2_STATS,
  questionConfig,
  type LikertSection,
  type LikertQuestion,
  type DemographicQuestion,
} from '@/lib/data/assessmentQuestions'
import {
  calculateAssessmentResult,
  DATABASE_STATISTICS,
  type AssessmentResult,
} from '@/lib/assessment/scoring'
import { getMatchingCaseStudies } from '@/lib/data/caseStudies'
import { extractProfileDataFromAnswers } from '@/lib/data/assessmentQuestions'
import { handleAssessmentCompletion } from '@/lib/services/assessmentUnlockService'
import { AssessmentType, ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'
import UnlockCelebration from './UnlockCelebration'

type Step = 'overview' | LikertSection | 'results'

interface AssessmentAnswers {
  [questionId: string]: number | string | null
}

const STORAGE_KEY = 'cil-assessment-v2-progress'

const SECTION_ORDER: LikertSection[] = [
  'demographics',
  'culturalCapital',
  'innovationActivities',
  'organizationalCapacities',
  'economicResilience',
]

export function CILAssessmentTool() {
  const router = useRouter()
  const { user, profile, loading: authLoading, refreshProfile } = useAuth()
  const [currentStep, setCurrentStep] = useState<Step>('overview')
  const [answers, setAnswers] = useState<AssessmentAnswers>({})
  const [savedResults, setSavedResults] = useState<{ date: string; score: number }[]>([])
  const [saving, setSaving] = useState(false)
  const [hasUsedCredit, setHasUsedCredit] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false)
  const [unlockedAssessments, setUnlockedAssessments] = useState<AssessmentType[]>([])
  const [grantedTools, setGrantedTools] = useState<string[]>([])
  const [grantedResources, setGrantedResources] = useState<string[]>([])
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supabase = createClient()

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.answers) {
          setAnswers(parsed.answers)
        }
        if (parsed.history) {
          setSavedResults(parsed.history)
        }
      } catch {
        console.error('Failed to load saved progress')
      }
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    const data = {
      answers,
      history: savedResults,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [answers, savedResults])

  // Get questions for current section
  const getQuestionsForSection = (section: LikertSection): (LikertQuestion | DemographicQuestion)[] => {
    switch (section) {
      case 'demographics':
        return demographicQuestions
      case 'culturalCapital':
        return culturalCapitalQuestions
      case 'innovationActivities':
        return innovationActivitiesQuestions
      case 'organizationalCapacities':
        return organizationalCapacitiesQuestions
      case 'economicResilience':
        return economicResilienceQuestions
      default:
        return []
    }
  }

  // Calculate section progress
  const getSectionProgress = () => {
    return SECTION_ORDER.map(section => {
      const questions = getQuestionsForSection(section)
      const answeredCount = questions.filter(q => answers[q.id] != null).length
      return {
        id: section,
        label: SECTION_META[section].shortLabel,
        questionCount: questions.length,
        answeredCount,
      }
    })
  }

  // Get total answered count
  const getAnsweredCount = (): number => {
    return Object.values(answers).filter(v => v != null).length
  }

  // Handle answer for Likert questions
  const handleLikertAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  // Handle answer for demographic questions
  const handleDemographicAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  // Check if can proceed to next section
  const canProceed = (step: Step): boolean => {
    if (step === 'overview' || step === 'results') return true

    const questions = getQuestionsForSection(step as LikertSection)
    // Require at least 50% of questions answered to proceed
    const answeredCount = questions.filter(q => answers[q.id] != null).length
    return answeredCount >= Math.ceil(questions.length * 0.5)
  }

  // Get current step index
  const getCurrentStepIndex = (): number => {
    if (currentStep === 'overview') return 0
    if (currentStep === 'results') return SECTION_ORDER.length + 1
    return SECTION_ORDER.indexOf(currentStep as LikertSection) + 1
  }

  const stepIndex = getCurrentStepIndex()

  // Handle navigation
  const handleNext = async () => {
    if (currentStep === 'overview') {
      setCurrentStep(SECTION_ORDER[0])
      return
    }

    const currentSectionIndex = SECTION_ORDER.indexOf(currentStep as LikertSection)

    if (currentSectionIndex < SECTION_ORDER.length - 1) {
      setCurrentStep(SECTION_ORDER[currentSectionIndex + 1])
    } else {
      // Moving to results
      if (user && !hasUsedCredit) {
        // Race condition protection: prevent multiple simultaneous submissions
        if (isSubmitting) return
        setIsSubmitting(true)

        if (!profile || profile.credits <= 0) {
          setIsSubmitting(false)
          router.push('/pricing?need_credits=true')
          return
        }

        setSaving(true)
        try {
          // Submit assessment via atomic API endpoint
          // This handles credit deduction and assessment saving in a single transaction
          const response = await fetch('/api/assessments/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              assessmentType: 'cirf',
              answers,
            }),
          })

          const result = await response.json()

          if (!response.ok) {
            // Handle specific error cases
            if (result.error?.code === 'INSUFFICIENT_CREDITS') {
              setSaving(false)
              setIsSubmitting(false)
              router.push('/pricing?need_credits=true')
              return
            }
            console.error('Failed to submit assessment:', result.error?.message || result.message)
            alert('Failed to process assessment. Please try again.')
            setSaving(false)
            setIsSubmitting(false)
            return
          }

          // Extract results from API response
          const { assessmentId: newAssessmentId, score, interpretation, sectionScores, unlockedAssessments: unlocked, grantedTools: tools, grantedResources: resources } = result.data

          // Build assessment result for display using server-calculated data
          const serverResult = calculateAssessmentResult(answers, questionConfig)
          // Override with server-calculated score for accuracy
          serverResult.overallScore = score
          setAssessmentResult(serverResult)

          setAssessmentId(newAssessmentId)

          if ((unlocked && unlocked.length > 0) || (tools && tools.length > 0) || (resources && resources.length > 0)) {
            setUnlockedAssessments(unlocked || [])
            setGrantedTools(tools || [])
            setGrantedResources(resources || [])
            setShowUnlockCelebration(true)
          }

          // Save profile data from demographics (this is additional to the assessment)
          const profileData = extractProfileDataFromAnswers(answers)
          if (Object.keys(profileData).length > 0) {
            await supabase
              .from('profiles')
              .update({
                ...profileData,
                profile_completed: true,
                updated_at: new Date().toISOString(),
              })
              .eq('id', user.id)
          }

          setHasUsedCredit(true)
          await refreshProfile()
        } catch (error) {
          console.error('Error processing assessment:', error)
          alert('Failed to process assessment. Please try again.')
        }
        setSaving(false)
        setIsSubmitting(false)
      } else {
        // Calculate results without saving (for non-authenticated preview)
        const result = calculateAssessmentResult(answers, questionConfig)
        setAssessmentResult(result)
      }

      setCurrentStep('results')
    }
  }

  const handlePrev = () => {
    if (currentStep === 'results') {
      setCurrentStep(SECTION_ORDER[SECTION_ORDER.length - 1])
      return
    }

    const currentSectionIndex = SECTION_ORDER.indexOf(currentStep as LikertSection)

    if (currentSectionIndex > 0) {
      setCurrentStep(SECTION_ORDER[currentSectionIndex - 1])
    } else {
      setCurrentStep('overview')
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentStep('overview')
    setHasUsedCredit(false)
    setAssessmentResult(null)
    setAssessmentId(null)
    setEmailSent(false)
    setShowUnlockCelebration(false)
    setUnlockedAssessments([])
    setGrantedTools([])
    setGrantedResources([])
  }

  // Send email results
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
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send email. Please try again.')
    }
    setSendingEmail(false)
  }

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === 'overview') {
      setCurrentStep('overview')
    } else if (SECTION_ORDER.includes(sectionId as LikertSection)) {
      setCurrentStep(sectionId as LikertSection)
    }
  }

  // Calculate result on demand for preview
  const previewResult = useMemo(() => {
    if (getAnsweredCount() < 10) return null
    return calculateAssessmentResult(answers, questionConfig)
  }, [answers])

  // Export results
  const exportReport = () => {
    if (!assessmentResult) return

    const content = `
Cultural Innovation Resilience Assessment Results
==================================================

Date: ${new Date().toLocaleDateString()}
Resilience Index: ${assessmentResult.overallScore}/100
Level: ${assessmentResult.interpretation.level}
Predicted Success Rate: ${assessmentResult.interpretation.successRate}%

Score Interpretation:
${assessmentResult.interpretation.description}

Section Scores:
${assessmentResult.sectionScores.map(s =>
  `- ${SECTION_META[s.section].label}: ${s.score}%`
).join('\n')}

${assessmentResult.activeSynergies.length > 0 ? `
Active Synergies (+${assessmentResult.synergyBonus}% bonus):
${assessmentResult.activeSynergies.map(s => `- ${s.description}: +${Math.round(s.bonus * 100)}%`).join('\n')}
` : ''}

Priority Recommendations:
${assessmentResult.recommendations.slice(0, 5).map((r, i) =>
  `${i + 1}. ${r.area} (Current: ${r.currentScore}%)
   Action: ${r.action}
   Impact: ${r.impact}`
).join('\n\n')}

---
Generated by Cultural Innovation Lab
https://cirf.org/tools
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `CI-Resilience-Assessment-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareResults = () => {
    if (!assessmentResult) return

    const text = `My Cultural Innovation Resilience Index: ${assessmentResult.overallScore}/100 (${assessmentResult.interpretation.level}) - ${assessmentResult.interpretation.successRate}% predicted success rate. Take the assessment at ${window.location.origin}/tools`

    if (navigator.share) {
      navigator.share({ title: 'CI Resilience Assessment Results', text })
    } else {
      navigator.clipboard.writeText(text)
      alert('Results copied to clipboard!')
    }
  }

  const saveToHistory = () => {
    if (!assessmentResult) return
    const newResult = {
      date: new Date().toISOString(),
      score: assessmentResult.overallScore,
    }
    setSavedResults(prev => [...prev, newResult])
  }

  // Check if login is required
  const needsLogin = currentStep === SECTION_ORDER[SECTION_ORDER.length - 1] && !user && !authLoading

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-ink py-4 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif text-pearl">Cultural Innovation Resilience Assessment</h2>
            <p className="text-pearl/70 text-sm flex items-center gap-2">
              <Clock className="w-3 h-3" />
              ~{ASSESSMENT_V2_STATS.estimatedMinutes} minutes • {ASSESSMENT_V2_STATS.totalQuestions} questions
            </p>
          </div>
          {user && profile && (
            <div className="flex items-center gap-2 text-pearl/70 text-sm">
              <CreditCard className="w-4 h-4" />
              {profile.credits} credits
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-ink/10 px-6 py-4">
        <SectionProgress
          sections={[
            { id: 'overview', label: 'Start', questionCount: 1, answeredCount: currentStep !== 'overview' ? 1 : 0 },
            ...getSectionProgress(),
          ]}
          currentSection={currentStep === 'overview' ? 'overview' : currentStep === 'results' ? '' : currentStep}
          onSectionClick={handleSectionClick}
        />
        <div className="mt-4 w-full bg-sand rounded-full h-2">
          <div
            className="bg-gold h-2 rounded-full transition-all duration-500"
            style={{ width: `${(getAnsweredCount() / ASSESSMENT_V2_STATS.totalQuestions) * 100}%` }}
          />
        </div>
        <p className="text-xs text-stone mt-2 text-center">
          {getAnsweredCount()}/{ASSESSMENT_V2_STATS.totalQuestions} questions answered
          {previewResult && currentStep !== 'results' && (
            <span className="ml-2 text-gold">• Preview score: {previewResult.overallScore}/100</span>
          )}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 min-h-[500px]">
        {/* Login Required Notice */}
        {needsLogin && (
          <div className="mb-6 bg-gold/10 border border-gold/30 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Sign in to complete your assessment</h4>
                <p className="text-sm text-stone mb-4">
                  Create a free account to save your results and get your first assessment free.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/auth/signup?redirectTo=/tools"
                    className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors"
                  >
                    Sign up free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/auth/login?redirectTo=/tools"
                    className="text-sm text-gold font-medium hover:underline"
                  >
                    Already have an account? Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overview Step */}
        {currentStep === 'overview' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl">Cultural Innovation Resilience Assessment</h3>
            <p className="text-stone leading-relaxed">
              This comprehensive assessment measures how cultural innovation drives economic resilience
              in your organization or initiative. Based on the CI-ER (Cultural Innovation → Economic Resilience)
              framework and validated across 362 case studies, your results will provide actionable insights
              for strengthening your cultural innovation capacity.
            </p>

            {/* Auth Status Card */}
            {!authLoading && (
              <div className={cn(
                'p-4 rounded-lg border',
                user ? 'bg-sage/10 border-sage/30' : 'bg-sand border-stone/20'
              )}>
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage" />
                      <div>
                        <p className="font-medium text-ink">Signed in as {profile?.full_name || user.email}</p>
                        <p className="text-sm text-stone">
                          {profile?.credits || 0} assessment credits available
                        </p>
                      </div>
                    </div>
                    {profile && profile.credits === 0 && (
                      <Link
                        href="/pricing"
                        className="text-sm text-gold font-medium hover:underline"
                      >
                        Buy credits
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">Get 1 free assessment</p>
                      <p className="text-sm text-stone">Sign up to save your results and track progress</p>
                    </div>
                    <Link
                      href="/auth/signup?redirectTo=/tools"
                      className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors"
                    >
                      Sign up free
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Assessment Structure */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {SECTION_ORDER.map((section, i) => (
                <div key={section} className="bg-sand/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs flex items-center justify-center font-medium">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <h4 className="font-medium text-sm">{SECTION_META[section].shortLabel}</h4>
                  </div>
                  <p className="text-xs text-stone">{getQuestionsForSection(section).length} questions</p>
                  <p className="text-xs text-stone">~{SECTION_META[section].estimatedMinutes} min</p>
                </div>
              ))}
            </div>

            {/* Scoring Info */}
            <div className="bg-gold/10 border border-gold/30 p-6 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-gold" />
                Research-Validated Scoring (0-100)
              </h4>
              <p className="text-sm text-stone mb-4">
                Your responses generate a Cultural Innovation Resilience Index from 0-100.
                Based on our database of {DATABASE_STATISTICS.sampleSize} cases:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Score 0-24</p>
                  <p className="text-red-600">15.7% success rate</p>
                </div>
                <div>
                  <p className="font-medium">Score 25-39</p>
                  <p className="text-orange-600">28.2% success rate</p>
                </div>
                <div>
                  <p className="font-medium">Score 40-54</p>
                  <p className="text-yellow-600">51.2% success rate</p>
                </div>
                <div>
                  <p className="font-medium">Score 55-69</p>
                  <p className="text-lime-600">78.4% success rate</p>
                </div>
                <div>
                  <p className="font-medium">Score 70-84</p>
                  <p className="text-green-600">92.3% success rate</p>
                </div>
                <div>
                  <p className="font-medium">Score 85-100</p>
                  <p className="text-emerald-600">98.6% success rate</p>
                </div>
              </div>
            </div>

            {savedResults.length > 0 && (
              <div className="bg-sand/50 p-6 rounded-lg">
                <h4 className="font-medium mb-3">Previous Assessments</h4>
                <div className="space-y-2">
                  {savedResults.slice(-3).map((result, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-stone">{new Date(result.date).toLocaleDateString()}</span>
                      <span className="font-medium">{result.score}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section Questions */}
        {SECTION_ORDER.includes(currentStep as LikertSection) && (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-serif text-2xl mb-2">
                {SECTION_META[currentStep as LikertSection].label}
              </h3>
              <p className="text-stone">
                {SECTION_META[currentStep as LikertSection].description}
              </p>
            </div>

            <div className="space-y-6">
              {getQuestionsForSection(currentStep as LikertSection).map((question, index) => (
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
                      {'helpText' in question && question.helpText && (
                        <p className="text-sm text-stone flex items-start gap-1">
                          <Info className="w-3 h-3 mt-0.5 shrink-0" />
                          {question.helpText}
                        </p>
                      )}
                    </div>
                  </div>

                  {'type' in question ? (
                    // Demographic question
                    <CategoricalSelect
                      value={answers[question.id] as string | null}
                      onChange={(value) => handleDemographicAnswer(question.id, value)}
                      options={question.options || []}
                      placeholder="Select an option..."
                    />
                  ) : (
                    // Likert question
                    <LikertScale
                      value={answers[question.id] as number | null}
                      onChange={(value) => handleLikertAnswer(question.id, value)}
                      variant="horizontal"
                      size="md"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Step */}
        {currentStep === 'results' && assessmentResult && (
          <div className="space-y-8">
            {/* Score Summary */}
            <div className="text-center p-8 bg-gradient-to-br from-sand to-pearl rounded-lg">
              <p className="text-sm uppercase tracking-[0.2em] text-stone mb-2">
                Cultural Innovation Resilience Index
              </p>
              <p className={cn('font-serif text-7xl mb-2', assessmentResult.interpretation.color)}>
                {assessmentResult.overallScore}
              </p>
              <p className={cn('text-xl font-medium', assessmentResult.interpretation.color)}>
                {assessmentResult.interpretation.level}
              </p>
              <p className="text-3xl font-serif text-gold mt-4">
                {assessmentResult.interpretation.successRate}%
              </p>
              <p className="text-sm text-stone">Predicted Success Rate</p>

              {assessmentResult.synergyBonus > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 bg-ocean/20 text-ocean px-4 py-2 rounded-full text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +{assessmentResult.synergyBonus}% synergy bonus applied
                </div>
              )}
            </div>

            {/* Score Interpretation */}
            <div className={cn(
              'p-6 rounded-lg border',
              assessmentResult.overallScore < 55 ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'
            )}>
              <div className="flex items-start gap-3">
                {assessmentResult.overallScore < 55 ? (
                  <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-medium mb-1">Score Interpretation</h4>
                  <p className="text-sm text-stone">{assessmentResult.interpretation.description}</p>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-sand/50 p-6 rounded-lg">
              <h4 className="font-medium mb-4">Dimension Profile</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={assessmentResult.radarData}>
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
              <h4 className="font-medium mb-4">Section Scores</h4>
              <div className="space-y-4">
                {assessmentResult.sectionScores
                  .filter(s => s.section !== 'demographics')
                  .map(section => (
                    <div key={section.section}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {SECTION_META[section.section].label}
                        </span>
                        <span className="text-sm text-stone">{section.score}%</span>
                      </div>
                      <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            section.score >= 70 ? 'bg-sage' :
                              section.score >= 50 ? 'bg-gold' :
                                section.score >= 30 ? 'bg-orange-500' : 'bg-terracotta'
                          )}
                          style={{ width: `${section.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Database Comparison */}
            <div className="bg-sand/50 p-6 rounded-lg">
              <h4 className="font-medium mb-4">Comparison to Database</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative h-4 bg-ink/10 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gold rounded-full"
                      style={{ width: `${assessmentResult.overallScore}%` }}
                    />
                    <div
                      className="absolute top-0 h-full w-0.5 bg-ink"
                      style={{ left: `${DATABASE_STATISTICS.averageScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-stone">
                    <span>0</span>
                    <span>Database avg: {DATABASE_STATISTICS.averageScore}</span>
                    <span>100</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl text-gold">{assessmentResult.overallScore}</p>
                  <p className="text-xs text-stone">Your score</p>
                </div>
              </div>
              <p className={cn(
                'text-sm mt-4',
                assessmentResult.overallScore >= DATABASE_STATISTICS.averageScore ? 'text-sage' : 'text-terracotta'
              )}>
                {assessmentResult.overallScore >= DATABASE_STATISTICS.averageScore
                  ? `Your score is above the database average of ${DATABASE_STATISTICS.averageScore}.`
                  : `Your score is below the database average of ${DATABASE_STATISTICS.averageScore}.`
                }
              </p>
            </div>

            {/* Active Synergies */}
            {assessmentResult.activeSynergies.length > 0 && (
              <div className="bg-ocean/10 p-6 rounded-lg">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-ocean" />
                  Active Synergy Effects
                </h4>
                <p className="text-sm text-stone mb-4">
                  Your strong performance in multiple areas has activated these synergy bonuses:
                </p>
                <div className="space-y-3">
                  {assessmentResult.activeSynergies.map(synergy => (
                    <div key={synergy.description} className="flex items-center justify-between">
                      <span className="text-sm">{synergy.description}</span>
                      <span className="text-sm font-medium text-ocean">
                        +{Math.round(synergy.bonus * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Priority Recommendations */}
            {assessmentResult.recommendations.length > 0 && (
              <div className="bg-gold/10 p-6 rounded-lg">
                <h4 className="font-medium mb-4">Priority Recommendations</h4>
                <p className="text-sm text-stone mb-4">
                  Based on your scores, focus on these areas to maximize your resilience:
                </p>
                <div className="space-y-4">
                  {assessmentResult.recommendations.slice(0, 5).map(rec => (
                    <div key={rec.area} className="border-b border-gold/20 pb-4 last:border-0">
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-xl text-gold">{rec.priority}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{rec.area}</p>
                            <span className="text-sm text-stone">
                              {rec.currentScore}% → {rec.targetScore}%
                            </span>
                          </div>
                          <p className="text-sm text-stone mb-2">{rec.action}</p>
                          <p className="text-xs text-gold">{rec.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Case Studies */}
            {(() => {
              const matchingCases = getMatchingCaseStudies(Math.round(assessmentResult.overallScore / 100 * 13))
              return matchingCases.length > 0 && (
                <div className="bg-sand/50 p-6 rounded-lg">
                  <h4 className="font-medium mb-4">Similar Case Studies</h4>
                  <p className="text-sm text-stone mb-4">
                    Learn from initiatives with similar profiles:
                  </p>
                  <div className="space-y-4">
                    {matchingCases.map(caseStudy => (
                      <div key={caseStudy.id} className="flex items-center justify-between p-4 bg-white rounded-lg">
                        <div>
                          <p className="font-medium">{caseStudy.title}</p>
                          <p className="text-sm text-stone">{caseStudy.country} - {caseStudy.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-xl text-gold">{caseStudy.cilScore}/13</p>
                          <p className="text-xs text-sage">{caseStudy.outcome}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/case-studies"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-gold font-medium hover:underline"
                  >
                    View all case studies
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })()}

            {/* Unlocked Assessments Banner */}
            {unlockedAssessments.length > 0 && (
              <div className="bg-sage/10 border border-sage/30 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-sage flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">New Assessments Unlocked!</h4>
                    <p className="text-sm text-stone mb-4">
                      By completing the CIRF assessment, you&apos;ve unlocked {unlockedAssessments.length} specialized assessments:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {unlockedAssessments.map(type => {
                        const config = ASSESSMENT_CONFIGS[type]
                        return (
                          <Link
                            key={type}
                            href={`/assessments/${type}`}
                            className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-sage/10 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4 text-sage" />
                            <div>
                              <p className="font-medium text-sm">{config.name}</p>
                              <p className="text-xs text-stone">{config.questionCount} questions • Free</p>
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
                onClick={saveToHistory}
                className="flex items-center gap-2 px-4 py-2 bg-sand rounded-full text-sm hover:bg-ink hover:text-pearl transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Results
              </button>
              <button
                onClick={exportReport}
                className="flex items-center gap-2 px-4 py-2 bg-sand rounded-full text-sm hover:bg-ink hover:text-pearl transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button
                onClick={shareResults}
                className="flex items-center gap-2 px-4 py-2 bg-sand rounded-full text-sm hover:bg-ink hover:text-pearl transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </button>
            </div>
          </div>
        )}

        {/* Unlock Celebration Modal */}
        <UnlockCelebration
          isOpen={showUnlockCelebration}
          onClose={() => setShowUnlockCelebration(false)}
          unlockedAssessments={unlockedAssessments}
          grantedTools={grantedTools}
          grantedResources={grantedResources}
        />
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-ink/10 px-6 py-4 flex justify-between">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-stone hover:text-ink transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        <div className="flex gap-4">
          {stepIndex > 0 && currentStep !== 'results' && (
            <button onClick={handlePrev} className="btn-secondary flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
          {currentStep !== 'results' && (
            <button
              onClick={handleNext}
              disabled={(currentStep !== 'overview' && !canProceed(currentStep)) || saving || needsLogin}
              className={cn(
                'btn-primary flex items-center gap-2',
                ((currentStep !== 'overview' && !canProceed(currentStep)) || saving || needsLogin) && 'opacity-50 cursor-not-allowed'
              )}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : currentStep === SECTION_ORDER[SECTION_ORDER.length - 1] ? (
                <>
                  {user ? (
                    profile && profile.credits > 0 ? (
                      <>View Results (1 credit)</>
                    ) : (
                      <>Need Credits</>
                    )
                  ) : (
                    <>Sign in to View Results</>
                  )}
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  {currentStep === 'overview' ? 'Start Assessment' : 'Next Section'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
          {currentStep === 'results' && (
            <button
              onClick={handleReset}
              className="btn-primary flex items-center gap-2"
            >
              Take Again
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
