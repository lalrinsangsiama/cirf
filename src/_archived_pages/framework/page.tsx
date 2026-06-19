'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CILWheel } from '@/components/charts/CILWheel'
import { ArrowRight, Shield, TrendingUp, Globe2, Users, Lightbulb, Network, Coins, Building2 } from 'lucide-react'

const capacities = [
  {
    icon: Shield,
    title: 'Protective Capacity',
    color: 'from-blue-500 to-blue-600',
    description: 'Keeping control of your culture and business. Protecting against copycats, unfair deals, and outside pressure.',
    indicators: [
      'Legal protections like trademarks or GI certifications',
      'Ability to advocate for your interests',
      'Financial reserves to weather challenges',
      'Network of allies who have your back',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Adaptive Capacity',
    color: 'from-teal-500 to-teal-600',
    description: 'Bending without breaking. Changing your approach when needed while staying true to your roots.',
    indicators: [
      'Bounced back from past challenges',
      'Systems to learn and share knowledge',
      'Team with diverse skills',
      'Quick to respond to market changes',
    ],
  },
  {
    icon: Globe2,
    title: 'Transformative Capacity',
    color: 'from-purple-500 to-purple-600',
    description: 'Creating something new from tradition. Finding fresh ways to share and sell your cultural knowledge.',
    indicators: [
      'Created new markets or products',
      'Developed innovative offerings',
      'Built new types of organizations',
      'Pioneered new approaches',
    ],
  },
  {
    icon: Users,
    title: 'Generative Capacity',
    color: 'from-amber-500 to-amber-600',
    description: 'Growing the ecosystem. When your success helps others succeed too.',
    indicators: [
      'Inspired others to start their own ventures',
      'Created jobs beyond your own team',
      'Influenced other communities',
      'Shared knowledge that helped others',
    ],
  },
]

const mechanisms = [
  {
    icon: Lightbulb,
    title: 'Symbolic Knowledge Mechanisms',
    description: 'Creating meaning, experiences, and identities that generate economic and social value.',
    pathways: ['Place branding and territorial identity', 'Experience economy development', 'Cultural narrative construction', 'Heritage interpretation and activation'],
  },
  {
    icon: Network,
    title: 'Network Development Mechanisms',
    description: 'Building connections between diverse actors that enable knowledge flows and collaboration.',
    pathways: ['Creative cluster formation', 'Cross-sectoral partnerships', 'Knowledge spillover networks', 'Community-market bridges'],
  },
  {
    icon: Coins,
    title: 'Capital Conversion Mechanisms',
    description: 'Transforming cultural capital into economic, social, and other forms of capital.',
    pathways: ['Cultural asset monetization', 'Social enterprise development', 'Investment attraction', 'Resource mobilization'],
  },
  {
    icon: Building2,
    title: 'Institutional Innovation Mechanisms',
    description: 'Developing new rules, governance structures, and organizational forms.',
    pathways: ['Governance model innovation', 'Regulatory adaptation', 'New organizational forms', 'Policy framework development'],
  },
]


export default function FrameworkPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-gradient-to-br from-sand to-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            The Framework
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Cultural Innovation</span></span>
            <span className="hero-line"><span className="italic">Lab Framework</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            A comprehensive theoretical framework explaining how cultural innovation generates
            economic resilience, with practical tools for cultural entrepreneurs and communities.
          </p>
        </div>
      </section>

      {/* Framework Visual */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Framework Overview</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
            The 13-Component CIL Model
          </h2>
          <CILWheel />
          <p className="text-center text-stone mt-8 max-w-2xl mx-auto">
            The CIL visualizes 13 interconnected components across foundation, capacity, and outcome dimensions.
          </p>
        </div>
      </section>

      {/* Four Resilience Capacities */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Core Components</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Four Resilience Capacities
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            Cultural innovation enhances resilience through four distinct but interconnected capacities.
          </p>

          <div className="space-y-16">
            {capacities.map((capacity, i) => (
              <div
                key={capacity.title}
                className="animate-on-scroll"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${capacity.color} flex items-center justify-center mb-6`}>
                    <capacity.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-4">{capacity.title}</h3>
                  <p className="text-lg leading-relaxed mb-6">{capacity.description}</p>
                  <h4 className="font-medium mb-3 text-stone">Key Indicators:</h4>
                  <ul className="space-y-2 mb-6">
                    {capacity.indicators.map((indicator) => (
                      <li key={indicator} className="flex items-start gap-2 text-sm">
                        <span className="text-gold mt-1">→</span>
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Causal Mechanisms */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Causal Mechanisms</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            How Cultural Innovation Generates Resilience
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            Four key mechanisms explain the pathways through which cultural innovation
            translates into economic resilience outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mechanisms.map((mechanism) => (
              <div
                key={mechanism.title}
                className="animate-on-scroll bg-sand p-8 rounded-lg card-hover gold-border-top"
              >
                <mechanism.icon className="w-10 h-10 text-gold mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-xl mb-3">{mechanism.title}</h3>
                <p className="text-stone mb-6">{mechanism.description}</p>
                <h4 className="text-sm font-medium mb-3">Key Pathways:</h4>
                <ul className="space-y-2">
                  {mechanism.pathways.map((pathway) => (
                    <li key={pathway} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {pathway}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multiplicative Effects */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-ink text-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label text-pearl/60">Key Insight</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            The Synergy Effect
          </h2>
          <p className="text-pearl/80 text-lg max-w-3xl mb-16">
            CIL components don&apos;t just add together—they multiply.
            Communities with multiple strong components show dramatically better resilience outcomes.
            Key synergy pairs include:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                combination: 'Cultural Integrity + Adaptive Capacity',
                description: 'When authentic cultural preservation combines with adaptive capability, initiatives achieve stronger outcomes.',
              },
              {
                combination: 'Community Relevance + Adaptive Capacity',
                description: 'Local relevance combined with adaptability creates reinforcing benefits for community outcomes.',
              },
              {
                combination: 'Economic Value + Cultural Integrity',
                description: 'Sustainable revenue models paired with authentic cultural content achieve premium market positioning.',
              },
            ].map((effect) => (
              <div
                key={effect.combination}
                className="animate-on-scroll bg-pearl/10 p-8 rounded-lg border border-pearl/20"
              >
                <p className="text-sm uppercase tracking-[0.15em] text-pearl/60 mb-4">
                  {effect.combination}
                </p>
                <p className="text-pearl/80 text-sm">{effect.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-ink to-ink/90 text-pearl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Ready to apply the framework?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Use our interactive assessment tool to evaluate your initiative across all 13 CIL components
            and receive personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="bg-pearl text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
