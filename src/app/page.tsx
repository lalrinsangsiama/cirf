import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  description:
    'The Cultural Innovation Lab builds the frameworks, tools, and evidence for treating cultural heritage as economic infrastructure. Research across 12 countries and 6 continents.',
}

const ROUTES = [
  {
    href: '/framework',
    eyebrow: 'The Framework',
    title: 'Explore the Framework',
    body: 'The Cultural Innovation Resilience Framework (CIRF) — four pillars for measuring, protecting, and scaling cultural innovation.',
  },
  {
    href: '/evidence',
    eyebrow: 'Global Evidence',
    title: 'See the Evidence',
    body: 'Cultural innovation models from around the world that ground the framework in real economic outcomes.',
  },
  {
    href: '/about',
    eyebrow: 'The Research',
    title: 'About the research',
    body: 'The doctoral research and the researcher behind the Lab, and how the framework was built.',
  },
]

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#FAF7F2', color: '#0D1B2A', minHeight: '100vh' }}>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="py-24 md:py-32" style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #f0f5f4 100%)' }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#D4A843' }}>
              Cultural Innovation Lab
            </p>
            {/* PLACEHOLDER positioning line — refine in the copy pass.
                Framing: "economic infrastructure builder for overlooked assets". */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
              Cultural heritage is economic infrastructure.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ color: '#4a5568' }}>
              {/* PLACEHOLDER subhead — refine in the copy pass. */}
              The Cultural Innovation Lab builds the frameworks, tools, and evidence that policymakers,
              entrepreneurs, and communities need to turn culture into resilient, shared economic value.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/framework" className="inline-flex px-8 py-4 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#1A8A7D' }}>
                Explore the Framework →
              </Link>
              <Link href="/evidence" className="inline-flex px-8 py-4 rounded-full text-sm font-semibold" style={{ border: '1px solid #0D1B2A', color: '#0D1B2A' }}>
                See the Evidence
              </Link>
            </div>
          </div>
        </section>

        {/* What the Lab is */}
        <section className="py-20" style={{ backgroundColor: '#f5f2ed' }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
              What the Lab is
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#4a5568' }}>
              Cultural innovation — the strategic transformation of heritage, traditions, and community
              knowledge into economic opportunity — is one of the world’s most powerful but least measured
              economic forces. The Cultural Innovation Lab is the applied research platform of a doctoral
              study at the Swiss School of Business and Management Geneva, providing an assessment tool, an
              evidence base of global case studies, and a research instrument validating the framework with
              experts worldwide.
            </p>
          </div>
        </section>

        {/* Three routes onward */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {ROUTES.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="block p-8 rounded-2xl bg-white transition-shadow hover:shadow-md"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D4A843' }}>
                    {route.eyebrow}
                  </p>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
                    {route.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                    {route.body}
                  </p>
                  <span className="text-sm font-semibold" style={{ color: '#1A8A7D' }}>
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quiet invited-expert line */}
        <section className="py-12 text-center" style={{ backgroundColor: '#0D1B2A' }}>
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Are you an invited expert reviewer?{' '}
              <Link href="/survey" className="font-semibold underline underline-offset-4" style={{ color: '#D4A843' }}>
                Take the validation survey
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
