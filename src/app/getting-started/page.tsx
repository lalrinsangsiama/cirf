import Link from 'next/link'
import {
  UserPlus,
  ClipboardCheck,
  TrendingUp,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Users,
  Target,
} from 'lucide-react'

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
                <p className="text-stone text-sm">Get 1 free assessment credit</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <UserPlus className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone mb-4">
                    Sign up for a free account to access the CIL assessment tool.
                    Every new user receives 1 free credit to evaluate their first initiative.
                  </p>
                  <ul className="space-y-2 text-sm text-stone">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage" />
                      Quick signup with email or Google
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage" />
                      1 free assessment credit included
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
                <h2 className="text-xl font-semibold text-ink">Take the Assessment</h2>
                <p className="text-stone text-sm">Answer 13 research-backed questions</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <ClipboardCheck className="w-6 h-6 text-sage flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone mb-4">
                    The CIL assessment evaluates your initiative across three key dimensions:
                    Foundation, Capacity, and Outcomes. Each question has clear indicators
                    to help you answer accurately.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-sand/50 rounded-lg p-4">
                      <p className="font-medium text-ink mb-1">Foundation</p>
                      <p className="text-sm text-stone">4 questions on cultural integrity, community relevance, economic value, and adaptability</p>
                    </div>
                    <div className="bg-sand/50 rounded-lg p-4">
                      <p className="font-medium text-ink mb-1">Capacity</p>
                      <p className="text-sm text-stone">6 questions on adaptive, protective, empowerment, benefit, and control mechanisms</p>
                    </div>
                    <div className="bg-sand/50 rounded-lg p-4">
                      <p className="font-medium text-ink mb-1">Outcomes</p>
                      <p className="text-sm text-stone">3 questions on transformative, generative, and sustainable development results</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/tools"
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
                <p className="text-stone text-sm">Get actionable insights and benchmarks</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-ocean flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone mb-4">
                    Your score (0-13) is categorized into resilience levels with specific
                    success rate predictions based on our research of 362 case studies.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-sage/10">
                      <div className="w-10 h-10 bg-sage text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        11+
                      </div>
                      <div>
                        <p className="font-medium text-ink">High Resilience</p>
                        <p className="text-sm text-stone">85%+ success rate - Strong foundation for sustainable growth</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gold/10">
                      <div className="w-10 h-10 bg-gold text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        7-10
                      </div>
                      <div>
                        <p className="font-medium text-ink">Moderate Resilience</p>
                        <p className="text-sm text-stone">65% success rate - Good base with room for improvement</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-terracotta/10">
                      <div className="w-10 h-10 bg-terracotta text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        &lt;7
                      </div>
                      <div>
                        <p className="font-medium text-ink">At Risk</p>
                        <p className="text-sm text-stone">Below critical threshold - Focused intervention recommended</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl border border-stone/10 overflow-hidden">
            <div className="flex items-center gap-4 p-6 border-b border-stone/10 bg-lavender/30">
              <div className="w-12 h-12 bg-ink text-white rounded-xl flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h2 className="text-xl font-semibold text-ink">Learn from Case Studies</h2>
                <p className="text-stone text-sm">See how similar initiatives succeeded</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-ink flex-shrink-0 mt-1" />
                <div>
                  <p className="text-stone mb-4">
                    Based on your score, we match you with relevant case studies from our
                    database. Learn from initiatives with similar contexts and see what
                    strategies led to their success.
                  </p>
                  <ul className="space-y-2 text-sm text-stone">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage" />
                      Case studies matched to your score range
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage" />
                      Detailed innovations and lessons learned
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage" />
                      Verified sources and citations
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 border border-stone/20 bg-white px-5 py-2.5 rounded-full font-medium hover:bg-sand transition-colors"
                >
                  Browse case studies
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/for/researchers"
              className="bg-white rounded-xl p-6 border border-stone/10 hover:border-gold/50 transition-colors group"
            >
              <Target className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-semibold text-ink mb-1">Researchers</h3>
              <p className="text-sm text-stone">Academic study of cultural innovation</p>
            </Link>
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
            Get your free assessment credit and discover how the CIL framework
            can help strengthen your cultural innovation project.
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
