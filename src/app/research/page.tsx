'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Database, FileText, BarChart3, Users, CheckCircle2 } from 'lucide-react'

const researchAreas = [
  {
    icon: BookOpen,
    title: 'Theoretical Foundation',
    description: 'Integration of resilience theory, cultural economics, and regional development scholarship.',
    papers: 3,
  },
  {
    icon: Database,
    title: 'Empirical Analysis',
    description: 'Comprehensive analysis of 362 cultural innovation case studies spanning 2010-2024.',
    papers: 5,
  },
  {
    icon: BarChart3,
    title: 'Statistical Models',
    description: 'Multiplicative effects analysis and boundary zone identification methodology.',
    papers: 2,
  },
  {
    icon: Users,
    title: 'Indigenous Focus',
    description: 'Addressing critical gaps in cultural/heritage/indigenous entrepreneurship research.',
    papers: 4,
  },
]

// Updated with verified key findings from Chapter 4 Results
const keyFindings = [
  {
    number: '01',
    title: 'High Predictive Accuracy',
    finding: 'The CIL model achieves 78.1% overall predictive accuracy in determining initiative outcomes, with 85.6% sensitivity and 87.7% specificity at the optimal threshold.',
    evidence: 'Validated through bootstrap resampling (n=1000), yielding 95% CI of 70.1%-81.6%.',
  },
  {
    number: '02',
    title: 'Critical Score 7-8 Threshold',
    finding: 'A dramatic jump in success rates occurs at scores 7-8, from 64.7% to nearly 100%. This +35.3 percentage point increase represents the most valuable intervention zone.',
    evidence: 'Cohen\'s d = 1.94 (very large effect size) confirms the practical significance of this threshold.',
  },
  {
    number: '03',
    title: 'The +39.1% Synergy Effect',
    finding: 'CIL components don\'t just add—they multiply. Initiatives with multiple strong components show 39.1% better outcomes than component-count alone would predict.',
    evidence: 'Interaction analysis reveals Cultural Integrity + Adaptive Capacity yields +9.2% synergy.',
  },
  {
    number: '04',
    title: 'Five Necessary Conditions',
    finding: 'Five components function as necessary (not sufficient) conditions, present in 85%+ of successful cases: Economic Value (91.7%), Community Relevance (90.6%), Cultural Integrity (90.3%), Adaptive Capacity (86.3%), Adaptability (85.2%).',
    evidence: 'Adaptive Capacity shows highest discriminatory power at +64.7 percentage points.',
  },
]

const methodology = [
  {
    phase: 'Phase 1',
    title: 'Case Selection',
    description: 'Systematic selection of 362 cases based on clear criteria: cultural innovation focus, economic outcomes documented, 5+ years of data available.',
  },
  {
    phase: 'Phase 2',
    title: 'CIL Scoring',
    description: 'Each case scored across 13 binary components covering foundation (4), capacity (6), and outcome (3) dimensions.',
  },
  {
    phase: 'Phase 3',
    title: 'Statistical Analysis',
    description: 'Logistic regression, interaction analysis, threshold detection, and bootstrap validation (n=1000).',
  },
  {
    phase: 'Phase 4',
    title: 'Validation',
    description: 'Cross-validation through expert panels, practitioner feedback, and out-of-sample testing.',
  },
]

export default function ResearchPage() {
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
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Academic Foundation
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Research &</span></span>
            <span className="hero-line"><span className="italic">Methodology</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            The CIL framework emerges from rigorous doctoral research analyzing how cultural innovation
            generates economic resilience in indigenous, ethnic, and heritage communities.
          </p>
        </div>
      </section>

      {/* Research Context - Updated with verified statistics */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-label">DBA Thesis</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                The Two Paradoxes
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                This research addresses two fundamental paradoxes that have shaped—and constrained—understanding
                of cultural development:
              </p>
              <div className="space-y-6">
                <div className="bg-pearl p-6 rounded-lg">
                  <h3 className="font-medium mb-2">The Authenticity-Scale Paradox</h3>
                  <p className="text-stone">
                    What makes cultural products valuable (unique authenticity) appears to limit their economic potential.
                    Our research reveals this is a design problem, not an inherent trade-off.
                  </p>
                </div>
                <div className="bg-pearl p-6 rounded-lg">
                  <h3 className="font-medium mb-2">The Preservation-Innovation Paradox</h3>
                  <p className="text-stone">
                    Communities are told to choose between preserving traditions or pursuing economic development.
                    CIL demonstrates cultural innovation actually strengthens both.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ink text-pearl p-8 md:p-12 rounded-lg">
              <h3 className="font-serif text-2xl mb-8">Research Scope</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-serif text-4xl text-gold mb-2">362</p>
                  <p className="text-pearl/70">Case studies analyzed</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-gold mb-2">8.38</p>
                  <p className="text-pearl/70">Mean CIL score (64.5%)</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-gold mb-2">76.5%</p>
                  <p className="text-pearl/70">Operating success (277 cases)</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-gold mb-2">13</p>
                  <p className="text-pearl/70">CIL components</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-pearl/20">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gold">Predictive Accuracy</p>
                    <p className="text-pearl/70">78.1%</p>
                  </div>
                  <div>
                    <p className="text-gold">Effect Size</p>
                    <p className="text-pearl/70">Cohen&apos;s d = 1.94</p>
                  </div>
                  <div>
                    <p className="text-gold">Sensitivity</p>
                    <p className="text-pearl/70">85.6%</p>
                  </div>
                  <div>
                    <p className="text-gold">Specificity</p>
                    <p className="text-pearl/70">87.7%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Findings - Updated with verified data */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Chapter 4 Results</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">Key Findings</h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            Four major findings emerge from our empirical analysis, each with significant
            implications for practitioners and policymakers.
          </p>

          <div className="space-y-8">
            {keyFindings.map((finding) => (
              <div
                key={finding.number}
                className="animate-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-1">
                  <span className="font-serif text-5xl text-gold/30">{finding.number}</span>
                </div>
                <div className="lg:col-span-5">
                  <h3 className="font-serif text-2xl mb-3">{finding.title}</h3>
                  <p className="text-lg leading-relaxed">{finding.finding}</p>
                </div>
                <div className="lg:col-span-6 bg-sand p-6 rounded-lg">
                  <p className="text-sm uppercase tracking-[0.15em] text-stone mb-2">Evidence</p>
                  <p className="text-base">{finding.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Necessary Conditions Detail */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Critical Finding</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Five Necessary Conditions
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            These five components appear in 85%+ of successful cases and show the highest
            discriminatory power between successful and failed initiatives.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink/20">
                  <th className="text-left py-4 px-4 font-medium">Component</th>
                  <th className="text-center py-4 px-4 font-medium">Success Rate</th>
                  <th className="text-center py-4 px-4 font-medium">Discriminatory Power</th>
                  <th className="text-left py-4 px-4 font-medium">Implication</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Economic Value Creation', rate: '91.7%', power: '+36.8 pp', note: 'Sustainable revenue model essential' },
                  { name: 'Community Relevance', rate: '90.6%', power: '+23.9 pp', note: 'Local needs must drive priorities' },
                  { name: 'Cultural Integrity', rate: '90.3%', power: '+13.8 pp', note: 'Authenticity enables premium positioning' },
                  { name: 'Adaptive Capacity', rate: '86.3%', power: '+64.7 pp', note: 'Highest predictive value' },
                  { name: 'Adaptability', rate: '85.2%', power: '+59.7 pp', note: 'Flexibility enables survival' },
                ].map((row, i) => (
                  <tr key={row.name} className="border-b border-ink/10">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-xl text-gold">{i + 1}</span>
                        <span className="font-medium">{row.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-sage font-medium">{row.rate}</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-gold font-medium">{row.power}</span>
                    </td>
                    <td className="py-4 px-4 text-stone text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Score Distribution */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Score Analysis</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            CIL Score Distribution & Outcomes
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            The relationship between CIL scores and success rates shows a clear threshold effect
            at scores 7-8, where outcomes shift dramatically.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-sand p-8 rounded-lg">
              <h3 className="font-medium mb-6">Success Rates by Score Range</h3>
              <div className="space-y-4">
                {[
                  { range: 'Score 0-3', rate: 15.7, color: 'bg-red-500', label: 'Critical' },
                  { range: 'Score 4-5', rate: 28.2, color: 'bg-orange-500', label: 'Low' },
                  { range: 'Score 6-7', rate: 51.2, color: 'bg-yellow-500', label: 'Medium' },
                  { range: 'Score 8-9', rate: 98.6, color: 'bg-green-500', label: 'Medium-High' },
                  { range: 'Score 10-11', rate: 98.5, color: 'bg-emerald-500', label: 'High' },
                  { range: 'Score 12-13', rate: 96.7, color: 'bg-teal-500', label: 'Excellent' },
                ].map((item) => (
                  <div key={item.range} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-stone">{item.range}</span>
                    <div className="flex-1 bg-ink/10 rounded-full h-6 overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                    <span className="w-16 text-sm font-medium">{item.rate}%</span>
                    <span className="w-24 text-xs text-stone">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gold/10 border border-gold/30 p-6 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                  The Critical Threshold
                </h4>
                <p className="text-sm text-stone">
                  At scores 7-8, success rates jump from 64.7% to nearly 100%—a +35.3 percentage
                  point increase. This represents the optimal intervention point where small
                  improvements yield dramatic outcome changes.
                </p>
              </div>

              <div className="bg-sage/10 border border-sage/30 p-6 rounded-lg">
                <h4 className="font-medium mb-2">Database Statistics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-stone">Mean Score</p>
                    <p className="font-medium">8.38/13 (64.5%)</p>
                  </div>
                  <div>
                    <p className="text-stone">Success Rate</p>
                    <p className="font-medium">76.5% (277/362)</p>
                  </div>
                  <div>
                    <p className="text-stone">Bootstrap 95% CI</p>
                    <p className="font-medium">70.1% - 81.6%</p>
                  </div>
                  <div>
                    <p className="text-stone">Effect Size</p>
                    <p className="font-medium">d = 1.94 (very large)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-ink text-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label text-pearl/60">Chapter 3</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">Methodology</h2>
          <p className="text-pearl/80 text-lg max-w-3xl mb-16">
            A mixed-methods approach combining quantitative analysis of case outcomes
            with qualitative investigation of causal mechanisms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((phase) => (
              <div key={phase.phase} className="animate-on-scroll">
                <p className="text-gold font-medium mb-2">{phase.phase}</p>
                <h3 className="font-serif text-xl mb-3">{phase.title}</h3>
                <p className="text-pearl/70">{phase.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-pearl/20">
            <h3 className="font-medium mb-4">Data Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-gold mb-2">Primary Sources</p>
                <ul className="text-pearl/70 space-y-1 text-sm">
                  <li>• UNESCO Cultural Statistics Database</li>
                  <li>• World Bank Indigenous Peoples Data</li>
                  <li>• National cultural economy reports</li>
                </ul>
              </div>
              <div>
                <p className="text-gold mb-2">Secondary Sources</p>
                <ul className="text-pearl/70 space-y-1 text-sm">
                  <li>• Academic literature (230+ papers)</li>
                  <li>• Industry reports and white papers</li>
                  <li>• Case study documentation</li>
                </ul>
              </div>
              <div>
                <p className="text-gold mb-2">Validation Sources</p>
                <ul className="text-pearl/70 space-y-1 text-sm">
                  <li>• Expert panel reviews</li>
                  <li>• Practitioner interviews</li>
                  <li>• Community feedback sessions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Publications</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">Research Areas</h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            The CIL research program spans multiple interconnected areas, each contributing
            to our understanding of cultural innovation and resilience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="animate-on-scroll bg-sand p-8 rounded-lg card-hover"
              >
                <area.icon className="w-10 h-10 text-gold mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-xl mb-3">{area.title}</h3>
                <p className="text-stone mb-4">{area.description}</p>
                <p className="text-sm text-gold">{area.papers} papers available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Literature Gaps */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Research Contribution</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Addressing Critical Gaps
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                This research fills significant gaps in the literature on cultural, heritage,
                and indigenous entrepreneurship—areas historically underrepresented in mainstream scholarship.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold mt-2" />
                  <div>
                    <span className="font-medium">Theoretical Integration:</span>
                    <span className="text-stone ml-2">First framework connecting resilience theory to cultural innovation mechanisms</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold mt-2" />
                  <div>
                    <span className="font-medium">Empirical Evidence:</span>
                    <span className="text-stone ml-2">Largest systematic analysis of cultural innovation outcomes (362 cases)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold mt-2" />
                  <div>
                    <span className="font-medium">Practical Application:</span>
                    <span className="text-stone ml-2">Validated assessment tools with 78.1% predictive accuracy</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-pearl p-8 rounded-lg">
              <h3 className="font-medium mb-6">Related Academic Fields</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'Resilience Theory',
                  'Cultural Economics',
                  'Regional Development',
                  'Indigenous Studies',
                  'Heritage Management',
                  'Entrepreneurship',
                  'Economic Geography',
                  'Innovation Studies',
                  'Social Enterprise',
                  'Community Development',
                ].map((field) => (
                  <span key={field} className="px-4 py-2 bg-sand rounded-full text-sm">
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-ocean to-sage text-pearl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Apply the Research
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Use our research-validated assessment tool to evaluate your initiative
            and receive personalized recommendations based on 362 verified case studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="bg-pearl text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300"
            >
              Take the CIL Assessment
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
