import type { Metadata } from 'next'
import Link from 'next/link'
import { PillarCards } from '@/components/site/PillarCards'

export const metadata: Metadata = {
  title: 'The CIRF Framework',
  description: 'Deep dive into the Cultural Innovation Resilience Framework — four essential pillars for measuring and scaling cultural innovation.',
}

const MISSING_TABLE = [
  { missing: 'Economic Value Creation', result: 'Cultural activity without financial sustainability. Heritage is preserved but communities remain economically vulnerable.', example: 'Many UNESCO World Heritage sites that generate tourism revenue captured by external operators, not local communities.' },
  { missing: 'Cultural Integrity', result: 'Economic exploitation of cultural assets. Short-term profits at the cost of long-term cultural erosion and community resentment.', example: 'Fast-fashion appropriation of indigenous textile designs without attribution, compensation, or consent.' },
  { missing: 'Adaptability', result: 'A museum model — culturally authentic and economically viable today, but fragile against market shifts, technology change, or generational disengagement.', example: "Japan's traditional crafts sector losing 80% of market value as apprenticeship pipelines collapsed." },
  { missing: 'Social Empowerment', result: 'Elite capture — cultural innovation generates wealth that concentrates among intermediaries, investors, or urban elites rather than source communities.', example: "Peru's gastronomy boom generating billions while many rural food producers remained in poverty." },
]

export default function FrameworkPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #f0f5f4 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#D4A843' }}>The Framework</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
            Cultural Innovation Resilience Framework
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#4a5568' }}>
            The CIRF is the first integrated, scalable framework for positioning cultural innovation as a strategic
            driver of economic resilience. Built from global research into cultural innovation models worldwide.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20" style={{ backgroundColor: '#f5f2ed' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
            The Four Pillars
          </h2>
          <PillarCards />
        </div>
      </section>

      {/* Why All Four Are Essential */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
            Why All Four Pillars Are Essential
          </h2>
          <p className="text-center text-sm mb-12" style={{ color: '#4a5568' }}>
            Remove any single pillar and the framework fails. Here&apos;s what happens when each is missing.
          </p>

          <div className="space-y-5">
            {MISSING_TABLE.map((row, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#E07A5F' }}>
                  Without {row.missing}
                </p>
                <p className="text-sm font-medium mb-2" style={{ color: '#0D1B2A' }}>{row.result}</p>
                <p className="text-xs" style={{ color: '#4a5568' }}>
                  <strong>Example:</strong> {row.example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ backgroundColor: '#0D1B2A' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Assess Your Initiative
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Take the free 16-question CIRF assessment and get personalised insights.
          </p>
          <Link href="/assessment" className="inline-flex px-8 py-4 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#1A8A7D' }}>
            Start the Assessment →
          </Link>
        </div>
      </section>
    </>
  )
}
