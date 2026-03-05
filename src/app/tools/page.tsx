'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CILAssessmentTool } from '@/components/assessment/CILAssessmentTool'
import { cn } from '@/lib/utils'
import { Lock, Unlock, CheckCircle2, Calculator, ArrowRight } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { getUserUnlockStatus, getAssessmentProgressSummary, type UserUnlocks } from '@/lib/services/assessmentUnlockService'
import { AssessmentType, ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'
import { getAssessmentRecommendations, getRecommendationBadge, type AssessmentRecommendation } from '@/lib/data/assessmentRecommendations'
import { createClient } from '@/lib/supabase/client'
import { calculateAssessmentResult } from '@/lib/assessment/scoring'
import { questionConfig } from '@/lib/data/assessmentQuestions'
import { logger } from '@/lib/logger'

const frameworks = [
  {
    id: 'cil',
    icon: 'CI',
    title: 'CIL Assessment',
    subtitle: 'Cultural Innovation Lab',
    description: 'A comprehensive multi-step assessment tool for measuring economic impact, cultural integrity, innovation degree, and resilience contribution.',
    features: ['Economic Impact Measurement', 'Cultural Integrity Index', 'Innovation Assessment', 'Personalized Recommendations'],
    primary: true,
  },
  {
    id: 'cimm',
    icon: 'CM',
    title: 'Cultural Innovation Measurement Matrix',
    subtitle: 'CIMM Framework',
    description: 'A four-axis framework for measuring the depth, integrity, impact, and velocity of cultural innovations.',
    features: ['Innovation Depth Spectrum', 'Cultural Integrity Index', 'Economic Impact Metrics', 'Innovation Velocity Tracking'],
  },
  {
    id: 'cira',
    icon: 'RA',
    title: 'Cultural Innovation Readiness Assessment',
    subtitle: 'CIRA Framework',
    description: 'Evaluate your community\'s capacity for successful cultural innovation across multiple dimensions.',
    features: ['Cultural Capital Inventory', 'Innovation Ecosystem Components', 'Barriers Assessment Index', 'Readiness Score Calculation'],
  },
  {
    id: 'tbl',
    icon: '3B',
    title: 'Triple Bottom Line Cultural Innovation',
    subtitle: 'TBL-CI Framework',
    description: 'Measure economic, social, and environmental returns from cultural innovation initiatives.',
    features: ['Economic Returns Calculator', 'Social Impact Metrics', 'Environmental Index', 'Integrated Reporting'],
  },
  {
    id: 'ciss',
    icon: 'SS',
    title: 'Cultural Innovation Sustainability Scorecard',
    subtitle: 'CISS Framework',
    description: 'Evaluate long-term viability of cultural innovation initiatives across four sustainability dimensions.',
    features: ['Economic Sustainability', 'Cultural Sustainability', 'Social Sustainability', 'Environmental Sustainability'],
  },
  {
    id: 'pricing',
    icon: '$',
    title: 'Cultural Product Pricing Framework',
    subtitle: 'Step-by-Step Pricing Tool',
    description: 'A comprehensive guide to pricing cultural products for global markets while maintaining authenticity.',
    features: ['Cost Analysis', 'Value Proposition', 'Market Positioning', 'Price Optimization'],
  },
]

export default function ToolsPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [showAssessment, setShowAssessment] = useState(false)
  const [unlockStatus, setUnlockStatus] = useState<UserUnlocks | null>(null)
  const [progressSummary, setProgressSummary] = useState<{
    completedAssessments: number
    unlockedAssessments: number
    assessmentStatuses: Record<AssessmentType, { isUnlocked: boolean; isCompleted: boolean; latestScore?: number }>
  } | null>(null)
  const [recommendations, setRecommendations] = useState<AssessmentRecommendation[]>([])

  // Auto-trigger CIL assessment when ?start=cil is present
  useEffect(() => {
    if (searchParams.get('start') === 'cil') {
      setShowAssessment(true)
    }
  }, [searchParams])

  // Fetch unlock status and construct scores when user is available
  useEffect(() => {
    async function fetchStatus() {
      if (!user) {
        setUnlockStatus(null)
        setProgressSummary(null)
        setRecommendations([])
        return
      }

      try {
        const supabase = createClient()

        const [unlocks, progress] = await Promise.all([
          getUserUnlockStatus(user.id),
          getAssessmentProgressSummary(user.id),
        ])
        setUnlockStatus(unlocks)
        setProgressSummary(progress)

        // Fetch latest CIL assessment for construct scores
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

            // Fallback: recompute from answers if constructScores not stored
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
        logger.error('Error fetching unlock status', {}, error instanceof Error ? error : undefined)
      }
    }

    fetchStatus()
  }, [user])

  // Helper to check if an assessment is unlocked
  const isAssessmentUnlocked = (id: string): boolean => {
    if (id === 'cil') return true
    if (!unlockStatus) return false
    return unlockStatus.assessments[id as AssessmentType]?.isUnlocked || false
  }

  // Helper to check if an assessment is completed
  const isAssessmentCompleted = (id: string): boolean => {
    if (!progressSummary) return false
    return progressSummary.assessmentStatuses[id as AssessmentType]?.isCompleted || false
  }

  // Helper to get latest score
  const getLatestScore = (id: string): number | undefined => {
    if (!progressSummary) return undefined
    return progressSummary.assessmentStatuses[id as AssessmentType]?.latestScore
  }

  // Get recommendation for a specific assessment
  const getRecommendation = (id: string): AssessmentRecommendation | undefined => {
    return recommendations.find(r => r.assessmentType === id)
  }

  if (showAssessment) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-16 bg-pearl min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          <button
            onClick={() => setShowAssessment(false)}
            className="mb-8 text-stone hover:text-ink transition-colors"
          >
            ← Back to Tools
          </button>
          <CILAssessmentTool />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-gradient-to-br from-lavender to-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Practical Resources
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Tools &</span></span>
            <span className="hero-line"><span className="italic">Frameworks</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Evidence-based frameworks and measurement tools for communities to assess,
            develop, and scale cultural innovation for economic resilience.
          </p>
        </div>
      </section>

      {/* Core Frameworks */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Core Frameworks</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">Comprehensive Assessment Tools</h2>
          <p className="text-stone text-lg max-w-3xl mb-12">
            Research-validated frameworks for understanding and developing cultural innovation capacity in your community.
          </p>

          {/* Progress Summary Banner */}
          {user && progressSummary && (
            <div className="bg-gradient-to-r from-sage/10 to-gold/10 border border-sage/20 rounded-xl p-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium mb-1">Your Assessment Progress</h3>
                  <p className="text-sm text-stone">
                    {progressSummary.completedAssessments} of 6 assessments completed •{' '}
                    {progressSummary.unlockedAssessments} unlocked
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {(['cil', 'cimm', 'cira', 'tbl', 'ciss', 'pricing'] as AssessmentType[]).map((type) => {
                      const status = progressSummary.assessmentStatuses[type]
                      return (
                        <div
                          key={type}
                          className={cn(
                            'w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold',
                            status?.isCompleted
                              ? 'bg-sage text-white'
                              : status?.isUnlocked
                                ? 'bg-gold/20 text-gold'
                                : 'bg-sand text-stone'
                          )}
                          title={`${ASSESSMENT_CONFIGS[type].name}: ${status?.isCompleted ? 'Completed' : status?.isUnlocked ? 'Unlocked' : 'Locked'}`}
                        >
                          {status?.isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : status?.isUnlocked ? (
                            <Unlock className="w-3 h-3" />
                          ) : (
                            <Lock className="w-3 h-3" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <Link href="/dashboard" className="text-sm text-gold font-medium hover:underline ml-4">
                    View Dashboard →
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frameworks.map((framework) => {
              const isUnlocked = isAssessmentUnlocked(framework.id)
              const isCompleted = isAssessmentCompleted(framework.id)
              const latestScore = getLatestScore(framework.id)
              const isCIL = framework.id === 'cil'
              const recommendation = getRecommendation(framework.id)
              const badge = recommendation ? getRecommendationBadge(recommendation.level) : null

              return (
                <article
                  key={framework.id}
                  className={cn(
                    'bg-white border border-ink/10 p-8 transition-all duration-500 relative',
                    framework.primary && 'ring-2 ring-gold/50',
                    isUnlocked ? 'card-hover gold-border-top' : 'opacity-75'
                  )}
                >
                  {/* Status Badge */}
                  {user && (
                    <div className="absolute top-4 right-4">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          {latestScore !== undefined && `${latestScore}%`}
                        </span>
                      ) : isUnlocked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                          <Unlock className="w-3 h-3" />
                          {!isCIL && 'FREE'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-sand text-stone text-xs font-medium rounded-full">
                          <Lock className="w-3 h-3" />
                          Locked
                        </span>
                      )}
                    </div>
                  )}

                  <div className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center text-white font-serif text-lg mb-6',
                    isUnlocked
                      ? 'bg-gradient-to-br from-gold to-ocean'
                      : 'bg-gradient-to-br from-stone/50 to-stone/30'
                  )}>
                    {framework.icon}
                  </div>
                  <h3 className="font-serif text-xl mb-1">{framework.title}</h3>
                  <p className="text-sm text-stone mb-4">{framework.subtitle}</p>

                  {/* Score-aware recommendation badge */}
                  {!isCIL && recommendation && isUnlocked && !isCompleted && badge && (
                    <div className={cn('inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border mb-4', badge.className)}>
                      {badge.label}
                    </div>
                  )}

                  <p className="text-base leading-relaxed mb-4">{framework.description}</p>

                  {/* Recommendation messaging */}
                  {!isCIL && recommendation && isUnlocked && !isCompleted && (
                    <div className="mb-4">
                      {recommendation.level !== 'optional' ? (
                        <p className="text-sm text-stone italic">{recommendation.forYouIf}</p>
                      ) : (
                        <p className="text-sm text-stone/70 italic">{recommendation.notForYouIf}</p>
                      )}
                      <p className="text-xs text-gold mt-2">{recommendation.benefit}</p>
                    </div>
                  )}

                  {/* Lock message for locked assessments */}
                  {!isUnlocked && user && (
                    <div className="bg-sand/50 border border-sand rounded-lg p-4 mb-6">
                      <p className="text-sm text-stone">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Complete the CIL assessment to unlock this assessment for free.
                      </p>
                    </div>
                  )}

                  {isUnlocked && !recommendation && (
                    <ul className="space-y-2 mb-6">
                      {framework.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-start gap-2">
                          <span className="text-gold mt-1">→</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex gap-3 relative z-10">
                    {isCIL ? (
                      <>
                        <button
                          onClick={() => setShowAssessment(true)}
                          className="btn-primary text-sm cursor-pointer"
                          data-assessment-trigger
                        >
                          {isCompleted ? 'Take Again' : 'Start Assessment'}
                        </button>
                        <Link href="/framework" className="btn-secondary text-sm cursor-pointer">
                          About CIL
                        </Link>
                      </>
                    ) : isUnlocked ? (
                      <>
                        <Link href={`/assessments/${framework.id}`} className="btn-primary text-sm cursor-pointer">
                          {isCompleted ? 'Take Again' : 'Start Assessment'}
                        </Link>
                        <Link href={`/framework/${framework.id}`} className="btn-secondary text-sm cursor-pointer">
                          View Details
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowAssessment(true)}
                          className="btn-primary text-sm cursor-pointer"
                        >
                          Unlock with CIL
                        </button>
                        <a href={`/framework/${framework.id}`} className="btn-secondary text-sm cursor-pointer">
                          Learn More
                        </a>
                      </>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Calculators Link Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-pearl border border-ink/10 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light mb-2">Calculators & KPI Tools</h3>
                <p className="text-stone max-w-lg">
                  Interactive calculators and measurement formulas for tracking cultural innovation impact. Complete assessments to unlock specialized tools.
                </p>
              </div>
            </div>
            <Link href="/tools/calculators" className="btn-primary flex items-center gap-2 whitespace-nowrap">
              View Calculators
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-ink to-ink/90 text-pearl text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
          Need Custom Tools?
        </h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
          We develop tailored frameworks and measurement tools specific to your community&apos;s
          unique cultural context and economic goals.
        </p>
        <Link href="/about#contact" className="bg-pearl text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300 inline-block">
          Request Consultation
        </Link>
      </section>
    </>
  )
}
