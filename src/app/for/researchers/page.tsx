import Link from 'next/link'
import {
  BookOpen,
  Database,
  LineChart,
  FileText,
  ArrowRight,
  CheckCircle,
  Download,
  Quote,
} from 'lucide-react'

export default function ForResearchersPage() {
  return (
    <main className="min-h-screen bg-pearl pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-ocean/10 text-ocean rounded-full text-sm font-medium mb-4">
            For Researchers
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-6">
            Rigorous Framework for
            <br />
            Cultural Innovation Research
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto mb-8">
            CIL provides researchers with a validated, quantifiable framework
            for studying cultural innovation, heritage entrepreneurship, and
            indigenous economic development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
            >
              Start researching
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 border border-ink px-6 py-3 rounded-full font-medium hover:bg-sand transition-colors"
            >
              View methodology
            </Link>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 text-center border border-stone/10">
            <p className="text-4xl font-bold text-ink mb-2">78.1%</p>
            <p className="text-stone">Predictive accuracy</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-stone/10">
            <p className="text-4xl font-bold text-ink mb-2">362</p>
            <p className="text-stone">Case studies analyzed</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-stone/10">
            <p className="text-4xl font-bold text-ink mb-2">13</p>
            <p className="text-stone">Validated components</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 border border-stone/10">
            <Database className="w-10 h-10 text-ocean mb-4" />
            <h3 className="text-xl font-semibold text-ink mb-3">
              Comprehensive Database
            </h3>
            <p className="text-stone mb-4">
              Access our curated database of 362 cultural innovation case studies
              spanning multiple continents, industries, and outcomes.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Verified sources and citations
              </li>
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Standardized CIL scoring
              </li>
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Success/failure outcome tracking
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone/10">
            <LineChart className="w-10 h-10 text-gold mb-4" />
            <h3 className="text-xl font-semibold text-ink mb-3">
              Quantifiable Metrics
            </h3>
            <p className="text-stone mb-4">
              Move beyond qualitative descriptions with measurable indicators
              across 13 components and three main dimensions.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Discriminatory power metrics
              </li>
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Statistical validation
              </li>
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Comparative analysis enabled
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone/10">
            <FileText className="w-10 h-10 text-sage mb-4" />
            <h3 className="text-xl font-semibold text-ink mb-3">
              Publication-Ready
            </h3>
            <p className="text-stone mb-4">
              Cite the CIL framework in your research with full methodological
              documentation and transparent data sources.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Full methodology documentation
              </li>
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Citable framework components
              </li>
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Open research collaboration
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone/10">
            <BookOpen className="w-10 h-10 text-terracotta mb-4" />
            <h3 className="text-xl font-semibold text-ink mb-3">
              Research Applications
            </h3>
            <p className="text-stone mb-4">
              Apply CIL to various research contexts from heritage economics
              to indigenous business studies.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Cultural entrepreneurship
              </li>
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Heritage economics
              </li>
              <li className="flex items-center gap-2 text-stone">
                <CheckCircle className="w-4 h-4 text-sage" />
                Sustainable development
              </li>
            </ul>
          </div>
        </div>

        {/* Research Findings */}
        <div className="bg-sand rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-8 text-center">
            Key Research Findings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">7-8</div>
              <p className="font-medium text-ink mb-1">Critical Threshold</p>
              <p className="text-sm text-stone">
                Initiatives scoring below 7-8 show significantly lower success rates
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage mb-2">+39.1%</div>
              <p className="font-medium text-ink mb-1">Synergy Effect</p>
              <p className="text-sm text-stone">
                High scores across all three dimensions create compounding benefits
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ocean mb-2">5</div>
              <p className="font-medium text-ink mb-1">Necessary Conditions</p>
              <p className="text-sm text-stone">
                Five components identified as necessary (though not sufficient) for success
              </p>
            </div>
          </div>
        </div>

        {/* Citation */}
        <div className="bg-white rounded-2xl p-8 border border-stone/10 mb-16">
          <Quote className="w-8 h-8 text-stone/30 mb-4" />
          <h3 className="text-lg font-semibold text-ink mb-4">How to Cite CIL</h3>
          <div className="bg-sand/50 rounded-lg p-4 font-mono text-sm text-stone">
            Cultural Innovation Lab (CIL). (2024). Assessment methodology
            and validation study. Retrieved from https://cirf.org/research
          </div>
          <p className="text-sm text-stone mt-4">
            For specific methodology citations, please refer to our{' '}
            <Link href="/research" className="text-gold hover:underline">
              research documentation
            </Link>.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-ocean to-ocean/80 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            Advance your research with CIL
          </h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Join researchers using the CIL framework to study cultural
            innovation and heritage entrepreneurship worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white text-ocean px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Create account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download resources
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
