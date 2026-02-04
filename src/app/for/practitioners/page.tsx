import Link from 'next/link'
import {
  Compass,
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Shield,
} from 'lucide-react'

export default function ForPractitionersPage() {
  return (
    <main className="min-h-screen bg-pearl pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-sage/10 text-sage rounded-full text-sm font-medium mb-4">
            For Practitioners
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-6">
            Build Resilient Cultural
            <br />
            Innovation Enterprises
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto mb-8">
            Whether you&apos;re launching a heritage craft business, cultural tourism
            venture, or creative enterprise, CIL helps you identify strengths,
            gaps, and paths to sustainable success.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
            >
              Get your free assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 border border-ink px-6 py-3 rounded-full font-medium hover:bg-sand transition-colors"
            >
              See success stories
            </Link>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 border border-stone/10 text-center">
            <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8 text-sage" />
            </div>
            <h3 className="text-xl font-semibold text-ink mb-3">Know Where You Stand</h3>
            <p className="text-stone">
              Get a clear, data-backed assessment of your initiative&apos;s
              strengths and areas for improvement.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone/10 text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-semibold text-ink mb-3">Focus Your Efforts</h3>
            <p className="text-stone">
              Identify the specific components that need attention to cross
              the critical success threshold.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone/10 text-center">
            <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-ocean" />
            </div>
            <h3 className="text-xl font-semibold text-ink mb-3">Track Progress</h3>
            <p className="text-stone">
              Reassess over time to measure improvement and celebrate growth
              as you strengthen your initiative.
            </p>
          </div>
        </div>

        {/* How It Helps */}
        <div className="bg-sand rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-8">
            How CIL Helps Practitioners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-sage/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-sage" />
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-2">Validate Your Model</h3>
                <p className="text-stone text-sm">
                  Confirm that your business model addresses the key factors
                  that research shows matter most for cultural innovation success.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-2">Protect Cultural Assets</h3>
                <p className="text-stone text-sm">
                  Ensure your protective capacity is strong enough to preserve
                  authenticity while enabling sustainable economic growth.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-ocean/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-ocean" />
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-2">Engage Communities</h3>
                <p className="text-stone text-sm">
                  Understand how to strengthen community control and benefit-sharing
                  to build lasting support for your initiative.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-terracotta/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-terracotta" />
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-2">Plan for Growth</h3>
                <p className="text-stone text-sm">
                  Identify which capacities to develop next based on research-backed
                  understanding of what drives sustainable success.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-8 text-center">
            Common Use Cases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">Heritage Crafts</h3>
              <p className="text-sm text-stone">
                Artisan cooperatives, traditional crafts businesses, handloom enterprises
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">Cultural Tourism</h3>
              <p className="text-sm text-stone">
                Community-based tourism, heritage site management, experience providers
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">Creative Industries</h3>
              <p className="text-sm text-stone">
                Music, fashion, visual arts enterprises with cultural foundations
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone/10">
              <h3 className="font-semibold text-ink mb-2">Social Enterprise</h3>
              <p className="text-sm text-stone">
                NGOs and social enterprises focused on cultural preservation
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-8 text-center">
            What Practitioners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-stone/10">
              <p className="text-lg text-ink italic mb-6">
                &ldquo;The CIL assessment helped us identify that while our cultural
                integrity was strong, we needed to improve community control mechanisms.
                After addressing this, we saw significant improvement in both community
                support and economic outcomes.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                  <span className="text-sage font-semibold">MK</span>
                </div>
                <div>
                  <p className="font-medium text-ink">Maria Khatun</p>
                  <p className="text-sm text-stone">Heritage Craft Cooperative, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-stone/10">
              <p className="text-lg text-ink italic mb-6">
                &ldquo;We scored 5/13 on our first assessment—right in the boundary zone.
                The framework showed us exactly which components to strengthen. A year later,
                we&apos;re at 9/13 and our revenue has grown 40%.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-gold font-semibold">JT</span>
                </div>
                <div>
                  <p className="font-medium text-ink">James Tewara</p>
                  <p className="text-sm text-stone">Māori Tourism Enterprise, New Zealand</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gradient-to-r from-sage/10 to-gold/10 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6">
            What You&apos;ll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-sage" />
              <span className="text-ink">Comprehensive 13-component assessment</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-sage" />
              <span className="text-ink">Score interpretation with success rates</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-sage" />
              <span className="text-ink">Matched case studies for learning</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-sage" />
              <span className="text-ink">Personal dashboard to track progress</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-sage" />
              <span className="text-ink">Actionable insights for improvement</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-sage" />
              <span className="text-ink">1 free assessment to get started</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-sage to-sage/80 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            Ready to strengthen your initiative?
          </h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Start with a free assessment and discover how to build a more
            resilient cultural innovation enterprise.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-white text-sage px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
