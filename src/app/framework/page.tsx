'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CILWheel } from '@/components/charts/CIRFWheel'
import { ArrowRight, Shield, TrendingUp, Globe2, Users, Lightbulb, Network, Coins, Building2 } from 'lucide-react'

const capacities = [
  {
    icon: Shield,
    title: 'Protective Capacity',
    rate: '78%',
    color: 'from-blue-500 to-blue-600',
    description: 'The ability to defend cultural and economic assets against external threats, market pressures, or hostile actors while maintaining community control.',
    indicators: [
      'Legal protections and IP safeguards established',
      'Political advocacy capacity developed',
      'Resource reserves for defense',
      'Alliance networks for mutual support',
    ],
    example: 'Palestinian Tatreez cooperatives established legal protections and UNESCO recognition to defend against cultural appropriation while scaling exports.',
  },
  {
    icon: TrendingUp,
    title: 'Adaptive Capacity',
    rate: '86.3%',
    color: 'from-teal-500 to-teal-600',
    description: 'The ability to adjust configurations in response to change while maintaining core cultural values and identity. Present in 86.3% of successful cases with +64.7 pp discriminatory power.',
    indicators: [
      'Successfully weathered past disruptions',
      'Learning systems and knowledge transfer in place',
      'Diverse skill sets and resource access',
      'Responsive to market and environmental feedback',
    ],
    example: 'Mi\'kmaq First Nations adapted traditional governance models to acquire 50% ownership of Clearwater Seafoods, creating Canada\'s largest Indigenous-owned business.',
  },
  {
    icon: Globe2,
    title: 'Transformative Capacity',
    rate: '71%',
    color: 'from-purple-500 to-purple-600',
    description: 'The ability to create fundamentally new configurations that leverage cultural assets for entirely new opportunities, markets, or organizational forms.',
    indicators: [
      'New markets and value propositions created',
      'Innovative products and services developed',
      'New organizational forms established',
      'Paradigm-shifting approaches adopted',
    ],
    example: 'South Korean Hanji paper craft transformed from traditional material to premium sustainable product for architecture, fashion, and art conservation markets.',
  },
  {
    icon: Users,
    title: 'Generative Capacity',
    rate: '69%',
    color: 'from-amber-500 to-amber-600',
    description: 'The ability to generate new opportunities, inspire others, and create positive spillover effects beyond the immediate initiative.',
    indicators: [
      'Spawned new initiatives and enterprises',
      'Created new jobs beyond core operations',
      'Influenced other communities positively',
      'Generated knowledge spillovers',
    ],
    example: 'Jamaican creative industries generated 5.2% of GDP and $12-15B JMD in exports, inspiring similar models across the Caribbean.',
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

// Updated with verified multiplicative effects from Chapter 4 Results
const multiplicativeEffects = [
  {
    combination: 'Cultural Integrity + Adaptive Capacity',
    effect: '+9.2% synergy',
    description: 'When authentic cultural preservation combines with adaptive capability, initiatives show 9.2% higher success rates.',
  },
  {
    combination: 'Community Relevance + Adaptive Capacity',
    effect: '+7.7% synergy',
    description: 'Local relevance combined with adaptability creates reinforcing benefits for community outcomes.',
  },
  {
    combination: 'Economic Value + Cultural Integrity',
    effect: '+7.1% synergy',
    description: 'Sustainable revenue models paired with authentic cultural content achieve premium market positioning.',
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
            <span className="hero-line"><span className="italic">Resilience Framework</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            A comprehensive theoretical framework explaining how cultural innovation generates
            economic resilience, validated across 362 case studies with 78.1% predictive accuracy.
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
            Research shows scores of 8+ predict 98.6% success rates.
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
            Cultural innovation enhances resilience through four distinct but interconnected capacities,
            each with verified success rates from our database of 362 cases.
          </p>

          <div className="space-y-16">
            {capacities.map((capacity, i) => (
              <div
                key={capacity.title}
                className="animate-on-scroll grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${capacity.color} flex items-center justify-center mb-6`}>
                    <capacity.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-serif text-2xl md:text-3xl">{capacity.title}</h3>
                    <span className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full font-medium">
                      {capacity.rate} in successful cases
                    </span>
                  </div>
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
                <div className={`bg-pearl p-8 rounded-lg ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h4 className="text-sm uppercase tracking-[0.15em] text-stone mb-4">Case Example</h4>
                  <p className="text-base leading-relaxed italic">&ldquo;{capacity.example}&rdquo;</p>
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
          <p className="section-label text-pearl/60">Research Finding</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            The Synergy Effect: +39.1% Advantage
          </h2>
          <p className="text-pearl/80 text-lg max-w-3xl mb-16">
            Our analysis of 362 case studies reveals that CIL components don&apos;t just add together—they multiply.
            Communities with multiple strong components show dramatically better resilience outcomes, with
            an average synergy advantage of 39.1%.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {multiplicativeEffects.map((effect) => (
              <div
                key={effect.combination}
                className="animate-on-scroll bg-pearl/10 p-8 rounded-lg border border-pearl/20"
              >
                <p className="text-sm uppercase tracking-[0.15em] text-pearl/60 mb-2">
                  {effect.combination}
                </p>
                <p className="font-serif text-4xl text-gold mb-4">{effect.effect}</p>
                <p className="text-pearl/80 text-sm">{effect.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-pearl/60 text-sm mb-4">
              Based on analysis of 362 cultural innovation case studies (2010-2024)
            </p>
            <Link href="/research" className="text-gold hover:text-pearl transition-colors inline-flex items-center gap-2">
              View the full research methodology
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* The 7-8 Boundary Zone */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Critical Finding</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                The Score 7-8 Boundary Zone
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Our research identified a critical threshold in CIL scores: at scores 7-8,
                success rates jump dramatically from 64.7% to nearly 100%. This represents
                the most valuable intervention zone.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-terracotta mt-2" />
                  <div>
                    <span className="font-medium">Score 0-3:</span>
                    <span className="text-stone ml-2">15.7% success rate (Critical)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                  <div>
                    <span className="font-medium">Score 4-5:</span>
                    <span className="text-stone ml-2">28.2% success rate (Low)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold mt-2" />
                  <div>
                    <span className="font-medium">Score 6-7:</span>
                    <span className="text-stone ml-2">51.2% → 64.7% success rate (Medium - Critical transition)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-sage mt-2" />
                  <div>
                    <span className="font-medium">Score 8+:</span>
                    <span className="text-stone ml-2">98.6% success rate (Above threshold)</span>
                  </div>
                </li>
              </ul>
              <div className="bg-gold/10 border border-gold/30 p-4 rounded-lg mb-8">
                <p className="text-sm">
                  <span className="font-medium">Key finding:</span> The jump from score 7 to score 8
                  represents a +35.3 percentage point increase in success probability.
                  Model sensitivity: 85.6%, specificity: 87.7%.
                </p>
              </div>
              <Link href="/tools" className="btn-primary inline-flex items-center gap-2">
                Calculate Your CIL Score
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-sand p-8 rounded-lg">
              <div className="h-72 relative">
                {/* Visualization of the boundary zone with verified data */}
                <div className="absolute inset-0 flex items-end gap-1">
                  {[
                    { score: '0-3', rate: 15.7, color: 'bg-terracotta' },
                    { score: '4-5', rate: 28.2, color: 'bg-orange-500' },
                    { score: '6-7', rate: 51.2, color: 'bg-gold' },
                    { score: '8-9', rate: 98.6, color: 'bg-sage' },
                    { score: '10-11', rate: 98.5, color: 'bg-emerald-500' },
                    { score: '12-13', rate: 96.7, color: 'bg-teal-500' },
                  ].map((item) => (
                    <div key={item.score} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-stone font-medium">{item.rate}%</span>
                      <div
                        className={`w-full ${item.color} rounded-t transition-all duration-300`}
                        style={{ height: `${item.rate}%` }}
                      />
                      <span className="text-xs text-stone">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-ink/10">
                <p className="text-center text-sm text-stone">
                  CIL Score Distribution and Success Rate
                </p>
                <p className="text-center text-xs text-stone mt-1">
                  Based on 362 verified case studies | Mean score: 8.38
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Necessary Conditions */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Research Finding</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Five Necessary Conditions
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            Analysis reveals five components that function as necessary (though not sufficient)
            conditions for success, present in 85%+ of successful cases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { name: 'Economic Value Creation', rate: 91.7, power: 36.8 },
              { name: 'Community Relevance', rate: 90.6, power: 23.9 },
              { name: 'Cultural Integrity', rate: 90.3, power: 13.8 },
              { name: 'Adaptive Capacity', rate: 86.3, power: 64.7 },
              { name: 'Adaptability', rate: 85.2, power: 59.7 },
            ].map((condition, i) => (
              <div key={condition.name} className="animate-on-scroll bg-pearl p-6 rounded-lg text-center">
                <span className="font-serif text-4xl text-gold">{i + 1}</span>
                <h3 className="font-medium mt-2 mb-4">{condition.name}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-serif text-sage">{condition.rate}%</p>
                    <p className="text-xs text-stone">in successful cases</p>
                  </div>
                  <div className="pt-2 border-t border-ink/10">
                    <p className="text-lg font-medium text-gold">+{condition.power} pp</p>
                    <p className="text-xs text-stone">discriminatory power</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-ocean to-sage text-pearl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Ready to apply the framework?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Use our interactive assessment tool to evaluate your initiative across all 13 CIL components
            and receive personalized recommendations based on 362 verified case studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="bg-pearl text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300"
            >
              Take the Assessment
            </Link>
            <Link
              href="/case-studies"
              className="bg-transparent border border-pearl text-pearl px-8 py-4 rounded-full font-medium hover:bg-pearl/10 transition-colors duration-300"
            >
              Explore Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
