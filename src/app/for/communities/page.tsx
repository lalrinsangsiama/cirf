import Link from 'next/link'
import {
  Users,
  Shield,
  Heart,
  Leaf,
  ArrowRight,
  CheckCircle,
  Globe,
  HandHeart,
} from 'lucide-react'

export default function ForCommunitiesPage() {
  return (
    <main className="min-h-screen bg-pearl pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium mb-4">
            For Communities
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-6">
            Protect Your Heritage,
            <br />
            Build Your Future
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto mb-8">
            CIL was developed with indigenous and heritage communities in mind.
            Our framework helps you evaluate initiatives to ensure they serve
            your community&apos;s interests while preserving cultural integrity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
            >
              Start your assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 border border-ink px-6 py-3 rounded-full font-medium hover:bg-sand transition-colors"
            >
              See community successes
            </Link>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 border border-stone/10 text-center">
            <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-semibold text-ink mb-1">Cultural Protection</h3>
            <p className="text-sm text-stone">Safeguard traditions and knowledge</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone/10 text-center">
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-semibold text-ink mb-1">Community Control</h3>
            <p className="text-sm text-stone">Keep decision-making local</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone/10 text-center">
            <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-sage" />
            </div>
            <h3 className="font-semibold text-ink mb-1">Shared Benefits</h3>
            <p className="text-sm text-stone">Ensure economic gains reach all</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone/10 text-center">
            <div className="w-12 h-12 bg-ocean/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6 text-ocean" />
            </div>
            <h3 className="font-semibold text-ink mb-1">Sustainability</h3>
            <p className="text-sm text-stone">Build for future generations</p>
          </div>
        </div>

        {/* Key Questions */}
        <div className="bg-sand rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6">
            Questions CIL Helps You Answer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <p className="font-medium text-ink mb-2">
                &ldquo;Will this initiative protect our cultural knowledge?&rdquo;
              </p>
              <p className="text-sm text-stone">
                CIL evaluates protective capacity and cultural integrity to ensure
                your heritage remains in your hands.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <p className="font-medium text-ink mb-2">
                &ldquo;Who will really benefit from this project?&rdquo;
              </p>
              <p className="text-sm text-stone">
                Our community benefit component specifically examines how economic
                gains are distributed and controlled.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <p className="font-medium text-ink mb-2">
                &ldquo;Will we maintain control over our own development?&rdquo;
              </p>
              <p className="text-sm text-stone">
                Community control is a core CIL component, measuring decision-making
                power and governance structures.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <p className="font-medium text-ink mb-2">
                &ldquo;Is this sustainable for our children and grandchildren?&rdquo;
              </p>
              <p className="text-sm text-stone">
                The framework evaluates long-term sustainability and intergenerational
                knowledge transfer.
              </p>
            </div>
          </div>
        </div>

        {/* Community Success Stories */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-8 text-center">
            Community-Led Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/case-studies"
              className="bg-white rounded-2xl p-6 border border-stone/10 hover:border-gold/50 transition-colors"
            >
              <Globe className="w-8 h-8 text-ocean mb-3" />
              <h3 className="font-semibold text-ink mb-2">Nunavut Indigenous Enterprises</h3>
              <p className="text-sm text-stone mb-3">
                Inuit communities built billion-dollar enterprises while preserving
                traditional governance and language.
              </p>
              <span className="text-gold text-sm font-medium">Score: 13/13 →</span>
            </Link>

            <Link
              href="/case-studies"
              className="bg-white rounded-2xl p-6 border border-stone/10 hover:border-gold/50 transition-colors"
            >
              <HandHeart className="w-8 h-8 text-terracotta mb-3" />
              <h3 className="font-semibold text-ink mb-2">Palestinian Tatreez Cooperatives</h3>
              <p className="text-sm text-stone mb-3">
                Women&apos;s cooperatives preserving embroidery traditions while creating
                sustainable livelihoods.
              </p>
              <span className="text-gold text-sm font-medium">Score: 13/13 →</span>
            </Link>

            <Link
              href="/case-studies"
              className="bg-white rounded-2xl p-6 border border-stone/10 hover:border-gold/50 transition-colors"
            >
              <Users className="w-8 h-8 text-sage mb-3" />
              <h3 className="font-semibold text-ink mb-2">Mi&apos;kmaq Clearwater Partnership</h3>
              <p className="text-sm text-stone mb-3">
                Seven First Nations acquired 50% of Canada&apos;s largest shellfish company
                through coalition.
              </p>
              <span className="text-gold text-sm font-medium">Score: 12/13 →</span>
            </Link>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white rounded-2xl p-8 border border-stone/10 mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6">
            How Communities Use CIL
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-1">Evaluate Proposals</h3>
                <p className="text-stone text-sm">
                  Before agreeing to partnerships or development projects, use CIL
                  to assess whether they meet community standards for protection and benefit.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-1">Design Better Initiatives</h3>
                <p className="text-stone text-sm">
                  Use the framework&apos;s 13 components as a checklist when planning
                  community-led cultural innovation projects.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-1">Monitor Progress</h3>
                <p className="text-stone text-sm">
                  Regularly reassess ongoing initiatives to ensure they continue
                  serving community interests as they grow and evolve.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-1">Learn from Others</h3>
                <p className="text-stone text-sm">
                  Explore case studies of successful community-led initiatives
                  to adapt proven strategies to your context.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment */}
        <div className="bg-gradient-to-r from-terracotta/10 to-gold/10 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-4">
            Our Commitment to Communities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sage mt-0.5" />
              <p className="text-ink">
                CIL was developed through research that centers indigenous and
                community perspectives.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sage mt-0.5" />
              <p className="text-ink">
                Community control and benefit are core framework components,
                not afterthoughts.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sage mt-0.5" />
              <p className="text-ink">
                Your assessment data is private and owned by you—we don&apos;t share
                it without consent.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sage mt-0.5" />
              <p className="text-ink">
                We&apos;re committed to making CIL accessible to communities
                regardless of resources.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-terracotta to-terracotta/80 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            Ready to evaluate your community&apos;s initiatives?
          </h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Start with a free assessment to see how CIL can help your community
            build sustainable, culturally-grounded development.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-white text-terracotta px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
