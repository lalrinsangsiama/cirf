'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CILAssessmentTool } from '@/components/assessment/CIRFAssessmentTool'
import { cn } from '@/lib/utils'
import { Calculator, FileText, BarChart3, ClipboardList, Target, BookOpen, Lock, Unlock, CheckCircle2, Loader2 } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { getUserUnlockStatus, getAssessmentProgressSummary, type UserUnlocks } from '@/lib/services/assessmentUnlockService'
import { AssessmentType, ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'assessment', label: 'Assessment Frameworks' },
  { id: 'measurement', label: 'Measurement Tools' },
  { id: 'implementation', label: 'Implementation Guides' },
  { id: 'calculators', label: 'Calculators' },
]

const frameworks = [
  {
    id: 'cil',
    category: 'assessment',
    icon: 'CI',
    title: 'CIL Assessment Tool',
    subtitle: 'Cultural Innovation Impact Scale (CIIS)',
    description: 'A comprehensive multi-step assessment tool for measuring economic impact, cultural integrity, innovation degree, and resilience contribution.',
    features: ['Economic Impact Measurement', 'Cultural Integrity Index', 'Innovation Assessment', 'Personalized Recommendations'],
    primary: true,
  },
  {
    id: 'cimm',
    category: 'assessment',
    icon: 'CM',
    title: 'Cultural Innovation Measurement Matrix',
    subtitle: 'CIMM Framework',
    description: 'A four-axis framework for measuring the depth, integrity, impact, and velocity of cultural innovations.',
    features: ['Innovation Depth Spectrum', 'Cultural Integrity Index', 'Economic Impact Metrics', 'Innovation Velocity Tracking'],
  },
  {
    id: 'cira',
    category: 'assessment',
    icon: 'RA',
    title: 'Cultural Innovation Readiness Assessment',
    subtitle: 'CIRA Framework',
    description: 'Evaluate your community\'s capacity for successful cultural innovation across multiple dimensions.',
    features: ['Cultural Capital Inventory', 'Innovation Ecosystem Components', 'Barriers Assessment Index', 'Readiness Score Calculation'],
  },
  {
    id: 'tbl',
    category: 'measurement',
    icon: '3B',
    title: 'Triple Bottom Line Cultural Innovation',
    subtitle: 'TBL-CI Framework',
    description: 'Measure economic, social, and environmental returns from cultural innovation initiatives.',
    features: ['Economic Returns Calculator', 'Social Impact Metrics', 'Environmental Index', 'Integrated Reporting'],
  },
  {
    id: 'ciss',
    category: 'measurement',
    icon: 'SS',
    title: 'Cultural Innovation Sustainability Scorecard',
    subtitle: 'CISS Framework',
    description: 'Evaluate long-term viability of cultural innovation initiatives across four sustainability dimensions.',
    features: ['Economic Sustainability', 'Cultural Sustainability', 'Social Sustainability', 'Environmental Sustainability'],
  },
  {
    id: 'pricing',
    category: 'implementation',
    icon: '$',
    title: 'Cultural Product Pricing Framework',
    subtitle: 'Step-by-Step Pricing Tool',
    description: 'A comprehensive guide to pricing cultural products for global markets while maintaining authenticity.',
    features: ['Cost Analysis', 'Value Proposition', 'Market Positioning', 'Price Optimization'],
  },
]

const measurementTools = [
  {
    number: '01',
    title: 'Innovation Intensity Ratio',
    metric: 'Frequency Metric',
    description: 'Measures the rate of cultural innovation generation in your community.',
    formula: 'IIR = Cultural Innovations / 1000 Population / Year',
  },
  {
    number: '02',
    title: 'Cultural Leverage Index',
    metric: 'Efficiency Metric',
    description: 'Assesses economic value generated per unit of cultural assets employed.',
    formula: 'CLI = Economic Value Generated / Cultural Assets Employed',
  },
  {
    number: '03',
    title: 'Innovation Inclusivity Score',
    metric: 'Equity Metric',
    description: 'Evaluates participation and benefit distribution across marginalized groups.',
    formula: 'IIS = (Marginalized Participants / Total) × Benefit Share',
  },
  {
    number: '04',
    title: 'Cultural Resilience Quotient',
    metric: 'Preservation Metric',
    description: 'Measures balance between innovation and cultural preservation.',
    formula: 'CRQ = (Maintaining + Enhancing) / Total Innovations',
  },
  {
    number: '05',
    title: 'Innovation Efficiency Rate',
    metric: 'Success Metric',
    description: 'Tracks the success rate of cultural innovation attempts.',
    formula: 'IER = Successful Innovations / Total Attempts',
  },
  {
    number: '06',
    title: 'Economic Multiplier Effect',
    metric: 'Impact Metric',
    description: 'Calculates broader economic impact of cultural innovations.',
    formula: 'EME = Total Economic Activity / Direct Investment',
  },
]

const downloadResources = [
  { icon: BarChart3, title: 'Assessment Workbook', format: 'Excel Template' },
  { icon: ClipboardList, title: 'Implementation Checklist', format: 'PDF Guide' },
  { icon: Calculator, title: 'Metrics Dashboard', format: 'Excel Template' },
  { icon: FileText, title: 'Survey Templates', format: 'Word Documents' },
  { icon: Target, title: 'Strategic Planning Kit', format: 'Complete Package' },
  { icon: BookOpen, title: 'Case Study Template', format: 'Word Template' },
]

export default function ToolsPage() {
  const { user } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [showAssessment, setShowAssessment] = useState(false)
  const [calculatorValues, setCalculatorValues] = useState({
    leadership: 5,
    identity: 5,
    flexibility: 5,
    safety: 5,
  })
  const [unlockStatus, setUnlockStatus] = useState<UserUnlocks | null>(null)
  const [progressSummary, setProgressSummary] = useState<{
    completedAssessments: number
    unlockedAssessments: number
    assessmentStatuses: Record<AssessmentType, { isUnlocked: boolean; isCompleted: boolean; latestScore?: number }>
  } | null>(null)
  const [loadingStatus, setLoadingStatus] = useState(false)

  // Fetch unlock status when user is available
  useEffect(() => {
    async function fetchStatus() {
      if (!user) {
        setUnlockStatus(null)
        setProgressSummary(null)
        return
      }

      setLoadingStatus(true)
      try {
        const [unlocks, progress] = await Promise.all([
          getUserUnlockStatus(user.id),
          getAssessmentProgressSummary(user.id),
        ])
        setUnlockStatus(unlocks)
        setProgressSummary(progress)
      } catch (error) {
        console.error('Error fetching unlock status:', error)
      }
      setLoadingStatus(false)
    }

    fetchStatus()
  }, [user])

  // Helper to check if an assessment is unlocked
  const isAssessmentUnlocked = (id: string): boolean => {
    if (id === 'cil' || id === 'cirf') return true // CIRF is always unlocked
    if (!unlockStatus) return false
    return unlockStatus.assessments[id as AssessmentType]?.isUnlocked || false
  }

  // Helper to check if an assessment is completed
  const isAssessmentCompleted = (id: string): boolean => {
    if (!progressSummary) return false
    const assessmentType = id === 'cil' ? 'cirf' : id as AssessmentType
    return progressSummary.assessmentStatuses[assessmentType]?.isCompleted || false
  }

  // Helper to get latest score
  const getLatestScore = (id: string): number | undefined => {
    if (!progressSummary) return undefined
    const assessmentType = id === 'cil' ? 'cirf' : id as AssessmentType
    return progressSummary.assessmentStatuses[assessmentType]?.latestScore
  }

  const filteredFrameworks = activeCategory === 'all'
    ? frameworks
    : frameworks.filter((f) => f.category === activeCategory)

  const calculateReadinessScore = () => {
    const weights = { leadership: 0.3, identity: 0.3, flexibility: 0.2, safety: 0.2 }
    const total = Object.entries(calculatorValues).reduce((acc, [key, value]) => {
      return acc + value * (weights[key as keyof typeof weights] || 0.25)
    }, 0)
    return Math.round(total * 10)
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

      {/* Category Navigation */}
      <section className="sticky top-20 z-40 bg-sand py-6 px-6 md:px-16 border-b border-ink/10">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-normal transition-all duration-300',
                activeCategory === cat.id
                  ? 'bg-ink text-pearl'
                  : 'bg-pearl border border-ink hover:bg-ink hover:text-pearl'
              )}
            >
              {cat.label}
            </button>
          ))}
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
                    {(['cirf', 'cimm', 'cira', 'tbl', 'ciss', 'pricing'] as AssessmentType[]).map((type) => {
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
            {filteredFrameworks.map((framework) => {
              const isUnlocked = isAssessmentUnlocked(framework.id)
              const isCompleted = isAssessmentCompleted(framework.id)
              const latestScore = getLatestScore(framework.id)
              const isCIRF = framework.id === 'cil'

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
                          {!isCIRF && 'FREE'}
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
                  <p className="text-base leading-relaxed mb-6">{framework.description}</p>

                  {/* Lock message for locked assessments */}
                  {!isUnlocked && user && (
                    <div className="bg-sand/50 border border-sand rounded-lg p-4 mb-6">
                      <p className="text-sm text-stone">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Complete the CIRF assessment to unlock this assessment for free.
                      </p>
                    </div>
                  )}

                  {isUnlocked && (
                    <ul className="space-y-2 mb-6">
                      {framework.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-start gap-2">
                          <span className="text-gold mt-1">→</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex gap-3">
                    {isCIRF ? (
                      <>
                        <button
                          onClick={() => setShowAssessment(true)}
                          className="btn-primary text-sm"
                          data-assessment-trigger
                        >
                          {isCompleted ? 'Take Again' : 'Start Assessment'}
                        </button>
                        <Link href="/framework" className="btn-secondary text-sm">
                          About CIRF
                        </Link>
                      </>
                    ) : isUnlocked ? (
                      <>
                        <Link href={`/assessments/${framework.id}`} className="btn-primary text-sm">
                          {isCompleted ? 'Take Again' : 'Start Assessment'}
                        </Link>
                        <Link href={`/framework/${framework.id}`} className="btn-secondary text-sm">
                          View Details
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowAssessment(true)}
                          className="btn-primary text-sm"
                        >
                          Unlock with CIRF
                        </button>
                        <Link href={`/framework/${framework.id}`} className="btn-secondary text-sm">
                          Learn More
                        </Link>
                      </>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Measurement Tools */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Measurement Instruments</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">Key Performance Indicators</h2>
          <p className="text-stone text-lg max-w-3xl mb-12">
            Specific metrics and formulas for tracking cultural innovation impact in your community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {measurementTools.map((tool) => (
              <article
                key={tool.title}
                className="bg-pearl p-8 relative transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <span className="absolute top-4 right-6 font-serif text-5xl font-light text-gold/30">
                  {tool.number}
                </span>
                <h3 className="text-lg font-medium mb-1">{tool.title}</h3>
                <p className="text-xs uppercase tracking-[0.15em] text-stone mb-4">{tool.metric}</p>
                <p className="text-base leading-relaxed mb-4">{tool.description}</p>
                <div className="bg-ink/5 p-3 rounded-lg font-mono text-sm">
                  {tool.formula}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section id="calculators" className="py-16 md:py-24 px-6 md:px-16 bg-ink text-pearl">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light italic mb-4">
            Innovation Readiness Calculator
          </h2>
          <p className="text-pearl/80 mb-12">
            Calculate your community&apos;s innovation potential score based on key enabling conditions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { key: 'leadership', label: 'Bridge Leadership' },
              { key: 'identity', label: 'Identity Security' },
              { key: 'flexibility', label: 'Institutional Flexibility' },
              { key: 'safety', label: 'Economic Safety Nets' },
            ].map((item) => (
              <div key={item.key} className="bg-pearl/10 p-6 rounded-xl">
                <label className="block text-sm uppercase tracking-wider mb-4 opacity-80">
                  {item.label} (0-10)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={calculatorValues[item.key as keyof typeof calculatorValues]}
                  onChange={(e) =>
                    setCalculatorValues((prev) => ({
                      ...prev,
                      [item.key]: Math.min(10, Math.max(0, parseInt(e.target.value) || 0)),
                    }))
                  }
                  className="w-full p-3 bg-pearl/10 border border-pearl/30 rounded-lg text-pearl text-center text-xl"
                />
              </div>
            ))}
          </div>

          <div className="bg-gold text-ink py-8 px-12 rounded-xl inline-block">
            <p className="text-sm uppercase tracking-wider mb-2">Innovation Readiness Score</p>
            <p className="font-serif text-6xl font-light">{calculateReadinessScore()}</p>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Resources</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">Download Templates & Guides</h2>
          <p className="text-stone text-lg max-w-3xl mb-12">
            Ready-to-use templates, worksheets, and implementation guides for your community.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {downloadResources.map((resource) => (
              <article
                key={resource.title}
                className="border border-ink/10 p-6 text-center transition-all duration-300 hover:bg-sand hover:-translate-y-1 cursor-pointer"
              >
                <resource.icon className="w-10 h-10 mx-auto mb-4 text-gold" strokeWidth={1.5} />
                <h3 className="text-sm font-medium mb-1">{resource.title}</h3>
                <p className="text-xs text-stone uppercase tracking-wider">{resource.format}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-ocean to-sage text-pearl text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
          Need Custom Tools?
        </h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
          We develop tailored frameworks and measurement tools specific to your community&apos;s
          unique cultural context and economic goals.
        </p>
        <button className="bg-pearl text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300">
          Request Consultation
        </button>
      </section>
    </>
  )
}
