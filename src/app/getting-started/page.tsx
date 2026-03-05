import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UserPlus,
  ClipboardCheck,
  TrendingUp,
  Unlock,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Users,
  BookOpen,
} from 'lucide-react'
import { ASSESSMENT_CONFIGS, SCORE_THRESHOLDS } from '@/lib/data/assessmentConfig'

export const metadata: Metadata = {
  title: 'Getting Started with CIL',
  description: 'A step-by-step guide to evaluating and improving your cultural innovation initiative using the CIL framework.',
  openGraph: {
    title: 'Getting Started with CIL',
    description: 'A step-by-step guide to evaluating and improving your cultural innovation initiative using the CIL framework.',
  },
}

const cilConfig = ASSESSMENT_CONFIGS.cil

export default function GettingStartedPage() {
  return (
    <main className="min-h-screen bg-pearl pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4">
            Getting Started with CIL
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto">
            A step-by-step guide to evaluating and improving your cultural
            innovation initiative using the CIL framework.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-stone/10 overflow-hidden">
            <div className="flex items-center gap-4 p-6 border-b border-stone/10 bg-gold/5">
              <div className="w-12 h-12 bg-gold text-white rounded-xl flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h2 className="text-xl font-semibold text-ink">Create Your Account</h2>
                <p className="text-stone text-sm">Sign up free — your first assessment costs nothing</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <UserPlus className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone mb-4">
                    Sign up for a free account to access the CIL assessment platform.
                    No credit card required — your first assessment is completely free.
                  </p>
                  <ul className="space-y-2 text-sm text-stone">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage" />
                      Quick signup with email
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage" />
                      CIL assessment is free — no credit needed
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage" />
                      Personal dashboard to track results
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 bg-ink text-pearl px-5 py-2.5 rounded-full font-medium hover:bg-ink/90 transition-colors"
                >
                  Create free account
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-stone/10 overflow-hidden">
            <div className="flex items-center gap-4 p-6 border-b border-stone/10 bg-sage/5">
              <div className="w-12 h-12 bg-sage text-white rounded-xl flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h2 className="text-xl font-semibold text-ink">Take the CIL Assessment</h2>
                <p className="text-stone text-sm">{cilConfig.questionCount} questions across {cilConfig.sections.length} dimensions (~{cilConfig.estimatedMinutes} min)</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <ClipboardCheck className="w-6 h-6 text-sage flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone mb-4">
                    The CIL assessment evaluates your initiative across {cilConfig.sections.length} key dimensions.
                    Each section explores a different aspect of your cultural innovation work.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {cilConfig.sections.map((section) => (
                      <div key={section.id} className="bg-sand/50 rounded-lg p-3">
                        <p className="font-medium text-ink text-sm mb-0.5">{section.name}</p>
                        <p className="text-xs text-stone">{section.questionCount} questions</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/tools?start=cil"
                  className="inline-flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-full font-medium hover:bg-sage/90 transition-colors"
                >
                  Start assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-stone/10 overflow-hidden">
            <div className="flex items-center gap-4 p-6 border-b border-stone/10 bg-ocean/5">
              <div className="w-12 h-12 bg-ocean text-white rounded-xl flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h2 className="text-xl font-semibold text-ink">Understand Your Results</h2>
                <p className="text-stone text-sm">Score 0-100 across four performance levels</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-ocean flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone mb-4">
                    Your score (0-100) is categorized into four performance levels
                    with personalized recommendations based on your results.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-sage/10">
                      <div className="w-12 h-10 bg-sage text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {SCORE_THRESHOLDS.thriving.min}+
                      </div>
                      <div>
                        <p className="font-medium text-ink">{SCORE_THRESHOLDS.thriving.label}</p>
                        <p className="text-sm text-stone">Excellent performance with strong foundations across all dimensions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-ocean/10">
                      <div className="w-12 h-10 bg-ocean text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {SCORE_THRESHOLDS.established.min}-{SCORE_THRESHOLDS.established.max}
                      </div>
                      <div>
                        <p className="font-medium text-ink">{SCORE_THRESHOLDS.established.label}</p>
                        <p className="text-sm text-stone">Solid performance with some areas for improvement</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gold/10">
                      <div className="w-12 h-10 bg-gold text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {SCORE_THRESHOLDS.developing.min}-{SCORE_THRESHOLDS.developing.max}
                      </div>
                      <div>
                        <p className="font-medium text-ink">{SCORE_THRESHOLDS.developing.label}</p>
                        <p className="text-sm text-stone">Good progress with significant growth opportunities</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-terracotta/10">
                      <div className="w-12 h-10 bg-terracotta text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        0-{SCORE_THRESHOLDS.emerging.max}
                      </div>
                      <div>
                        <p className="font-medium text-ink">{SCORE_THRESHOLDS.emerging.label}</p>
                        <p className="text-sm text-stone">Early stage with foundational work needed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl border border-stone/10 overflow-hidden">
            <div className="flex items-center gap-4 p-6 border-b border-stone/10 bg-gold/5">
              <div className="w-12 h-12 bg-ink text-white rounded-xl flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h2 className="text-xl font-semibold text-ink">Unlock Your Full Toolkit</h2>
                <p className="text-stone text-sm">Progressive unlock — all free</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <Unlock className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone mb-4">
                    Completing CIL is just the beginning. Each assessment you complete unlocks
                    more tools, resources, and earns you a credit for the next one.
                  </p>
                  <div className="space-y-4 mb-4">
                    <div className="border-l-4 border-sage pl-4">
                      <p className="font-medium text-ink mb-1">Complete CIL (free)</p>
                      <p className="text-sm text-stone">Unlocks 2 premium resources + 1 credit + access to all 5 secondary assessments</p>
                    </div>
                    <div className="border-l-4 border-ocean pl-4">
                      <p className="font-medium text-ink mb-1">Take secondary assessments (6-8 min each)</p>
                      <p className="text-sm text-stone">Each costs 1 credit but earns 1 back. Each unlocks 2 interactive tools + 1 resource.</p>
                    </div>
                    <div className="border-l-4 border-gold pl-4">
                      <p className="font-medium text-ink mb-1">Complete all 6 assessments</p>
                      <p className="text-sm text-stone">Total: 10 interactive tools + 7 premium resources — all free</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/tools?start=cil"
                  className="inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-full font-medium hover:bg-gold/90 transition-colors"
                >
                  Start your journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Who is CIL for */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6 text-center">
            Who is CIL for?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/for/practitioners"
              className="bg-white rounded-xl p-6 border border-stone/10 hover:border-gold/50 transition-colors group"
            >
              <Sparkles className="w-8 h-8 text-sage mb-3" />
              <h3 className="font-semibold text-ink mb-1">Practitioners</h3>
              <p className="text-sm text-stone">Leading cultural enterprises</p>
            </Link>
            <Link
              href="/for/communities"
              className="bg-white rounded-xl p-6 border border-stone/10 hover:border-gold/50 transition-colors group"
            >
              <Users className="w-8 h-8 text-ocean mb-3" />
              <h3 className="font-semibold text-ink mb-1">Communities</h3>
              <p className="text-sm text-stone">Indigenous and heritage groups</p>
            </Link>
            <Link
              href="/about"
              className="bg-white rounded-xl p-6 border border-stone/10 hover:border-gold/50 transition-colors group"
            >
              <BookOpen className="w-8 h-8 text-terracotta mb-3" />
              <h3 className="font-semibold text-ink mb-1">Policymakers</h3>
              <p className="text-sm text-stone">Cultural development programs</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-ink to-ink/90 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-serif font-bold text-pearl mb-4">
            Ready to evaluate your initiative?
          </h3>
          <p className="text-pearl/70 mb-6 max-w-xl mx-auto">
            Start with the free CIL assessment and progressively unlock your
            complete toolkit — all at no cost.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3 rounded-full font-medium hover:bg-gold/90 transition-colors"
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
