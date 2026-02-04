'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, TrendingUp, Globe2, Shield, Users, CheckCircle2, ChevronRight, Sparkles, Unlock, FileText, Calculator, BarChart3, BookOpen } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

export default function HomePage() {
  const { user, profile, loading: authLoading } = useAuth()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [quickAnswers, setQuickAnswers] = useState<Record<string, boolean | null>>({
    cultural: null,
    community: null,
    economic: null,
    adaptive: null,
  })

  useEffect(() => {
    // Add js-ready class to enable scroll animations (content visible by default if JS fails)
    document.documentElement.classList.add('js-ready')

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

    return () => {
      observerRef.current?.disconnect()
      document.documentElement.classList.remove('js-ready')
    }
  }, [])

  const quickScore = Object.values(quickAnswers).filter(v => v === true).length
  const answeredCount = Object.values(quickAnswers).filter(v => v !== null).length

  return (
    <>
      {/* Hero Section with Assessment CTA */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-pearl">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, #0a0a0a 0, #0a0a0a 1px, transparent 1px, transparent 100px),
              repeating-linear-gradient(0deg, #0a0a0a 0, #0a0a0a 1px, transparent 1px, transparent 100px)
            `,
          }}
        />

        <div className="w-full px-6 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-[clamp(3rem,10vw,9rem)] font-light leading-[0.85] tracking-tight text-ink">
                <span className="hero-line">
                  <span>Unlock Your</span>
                </span>
                <span className="hero-line">
                  <span className="italic text-gold">Cultural Innovation</span>
                </span>
                <span className="hero-line">
                  <span>Potential</span>
                </span>
              </h1>

              <p
                className="text-base md:text-lg leading-relaxed font-light max-w-[500px] mt-8 text-ink/80 animate-fade-in-up"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                Take the free CIRF Assessment to discover your strengths and unlock exclusive tools, frameworks, and funding guides designed for cultural entrepreneurs.
              </p>

              {/* Quick Value Proposition */}
              <div
                className="mt-6 space-y-2 text-ink/70 animate-fade-in-up"
                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Unlock className="w-4 h-4 text-sage" />
                  <span>6 specialized assessments (5 free after CIRF)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Unlock className="w-4 h-4 text-sage" />
                  <span>Premium tools & calculators</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Unlock className="w-4 h-4 text-sage" />
                  <span>Global Funding Guide 2026</span>
                </div>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up"
                style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
              >
                <Link href="/tools" className="btn-primary bg-gold text-ink hover:bg-ink hover:text-pearl inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
                  Take the Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/framework" className="btn-secondary inline-flex items-center justify-center gap-2">
                  Learn About CIL
                </Link>
              </div>
            </div>

            {/* Quick Assessment Preview Card */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up hidden lg:block"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl">Quick Assessment Preview</h3>
                <span className="text-sm text-ink/60">~2 minutes</span>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'cultural', q: 'Does your initiative preserve authentic cultural elements?', short: 'cultural preservation' },
                  { key: 'community', q: 'Are benefits clearly relevant to local community needs?', short: 'community benefits' },
                  { key: 'economic', q: 'Is there a sustainable revenue model?', short: 'sustainable revenue' },
                  { key: 'adaptive', q: 'Can you adjust to changing conditions?', short: 'adaptability' },
                ].map((item) => (
                  <fieldset key={item.key} className="border-b border-ink/10 pb-4">
                    <legend className="text-sm mb-2">{item.q}</legend>
                    <div className="flex gap-2" role="group" aria-label={`Answer for ${item.short}`}>
                      <button
                        onClick={() => setQuickAnswers(prev => ({ ...prev, [item.key]: true }))}
                        aria-pressed={quickAnswers[item.key as keyof typeof quickAnswers] === true}
                        aria-label={`Yes, ${item.short}`}
                        className={`px-4 py-1 rounded-full text-sm transition-all ${
                          quickAnswers[item.key as keyof typeof quickAnswers] === true
                            ? 'bg-sage text-white'
                            : 'bg-sand hover:bg-sage/20'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setQuickAnswers(prev => ({ ...prev, [item.key]: false }))}
                        aria-pressed={quickAnswers[item.key as keyof typeof quickAnswers] === false}
                        aria-label={`No, ${item.short}`}
                        className={`px-4 py-1 rounded-full text-sm transition-all ${
                          quickAnswers[item.key as keyof typeof quickAnswers] === false
                            ? 'bg-terracotta text-white'
                            : 'bg-sand hover:bg-terracotta/20'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </fieldset>
                ))}
              </div>

              {answeredCount > 0 && (
                <div className="mt-6 p-4 bg-sand rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Quick Score Preview</span>
                    <span className="font-serif text-2xl text-gold">{quickScore}/4</span>
                  </div>
                  <div className="w-full bg-ink/10 rounded-full h-2 mb-3">
                    <div
                      className="bg-gold h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(quickScore / 4) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-ink/60">
                    {quickScore >= 3
                      ? 'Strong foundation! Take the full assessment to see your complete profile.'
                      : quickScore >= 2
                      ? 'Good start. The full assessment will identify specific areas for improvement.'
                      : 'The full 13-component assessment will help identify priorities.'}
                  </p>
                </div>
              )}

              <Link
                href="/tools"
                className="mt-6 w-full bg-ink text-pearl py-3 rounded-full font-medium hover:bg-gold hover:text-ink transition-all duration-300 flex items-center justify-center gap-2"
              >
                Continue to Full Assessment
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 md:py-32 bg-ink text-pearl overflow-hidden">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 pr-8 whitespace-nowrap">
              {['Heritage', 'Innovation', 'Resilience', 'Community', 'Future'].map((word) => (
                <span
                  key={word}
                  className="font-serif text-[clamp(2rem,5vw,5rem)] font-light italic px-6 md:px-12 flex items-center gap-6 md:gap-12"
                >
                  {word}
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 md:py-48 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-32">
          <div>
            <p className="section-label">The Problem We Exist to Solve</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight">
              One impossible choice.
            </h2>
          </div>

          <div className="lg:col-span-2 pt-8 lg:pt-16">
            <div className="animate-on-scroll mb-12">
              <p className="text-lg md:text-xl leading-relaxed font-light mb-4">
                <span className="text-gold font-medium">476 million indigenous people. Countless ethnic communities.</span> One impossible choice:
                abandon your culture to participate in the modern economy, or preserve your identity while remaining poor.
              </p>
              <p className="text-base leading-relaxed font-light text-ink/70 mb-6">
                This is the development world&apos;s most destructive false dichotomy. Conventional economics treats traditional knowledge,
                ancestral practices, and indigenous governance systems as obstacles to progress — relics to be replaced by modern alternatives.
              </p>
              <p className="text-base leading-relaxed font-light text-ink/70">
                The result: languages disappearing every two weeks, youth forced to migrate from their communities,
                and $1.2 trillion in traditional knowledge commercialised without community benefit.
              </p>
            </div>

            <div className="animate-on-scroll bg-pearl p-6 rounded-lg border-l-4 border-gold">
              <h3 className="font-serif text-xl mb-3 font-normal">There is a third path.</h3>
              <p className="text-base leading-relaxed font-light">
                Not preservation as a museum exercise. Not modernisation as cultural erasure. But <span className="font-medium">cultural innovation</span> —
                the creative adaptation of traditional knowledge, practices, and social systems for contemporary economic challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="h-screen relative bg-ink flex items-center justify-center">
        <h2 className="font-serif text-[clamp(2.5rem,8vw,10rem)] text-pearl font-light italic text-center px-4 animate-fade-in">
          Culture is Capital
        </h2>
      </section>

      {/* What We Do Section */}
      <section className="py-24 md:py-48 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">What We Do</p>
          <h2 className="section-title mb-16">Four Arms. One Mission.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Research & Frameworks',
                number: '01',
                description: 'We develop the intellectual infrastructure for cultural innovation — original frameworks, measurement tools, and empirical evidence that prove culture drives economic resilience.',
              },
              {
                icon: TrendingUp,
                title: 'Policy & Protection',
                number: '02',
                description: 'Cultural knowledge belongs to communities, not corporations. We work at the intersection of indigenous intellectual property, anti-appropriation advocacy, and economic policy.',
              },
              {
                icon: Globe2,
                title: 'Global Network',
                number: '03',
                description: 'We connect cultural entrepreneurs across borders, link them to global policy processes, and amplify their collective voice where economic decisions are made.',
              },
              {
                icon: Users,
                title: 'Ventures',
                number: '04',
                description: 'We don\'t just theorise about cultural innovation — we build it. Our ventures are living laboratories testing whether our frameworks work in markets.',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="animate-on-scroll bg-sand p-8 card-hover gold-border-top"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-gold font-serif text-sm">{item.number}</span>
                <item.icon className="w-10 h-10 text-gold mb-4 mt-2" strokeWidth={1.5} />
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="text-base leading-relaxed font-light text-ink/70">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/framework" className="btn-primary inline-flex items-center gap-2">
              Explore the Framework
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What You Unlock Section */}
      <section className="py-24 md:py-48 px-6 md:px-16 bg-gradient-to-br from-sage/10 via-pearl to-gold/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Unlock className="w-5 h-5 text-gold" />
              <p className="section-label mb-0">What You Unlock</p>
            </div>
            <h2 className="section-title">Complete Your Assessment. Unlock Everything.</h2>
            <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto mt-4 text-ink/70">
              One free assessment opens the door to a complete toolkit for cultural entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Assessments Card */}
            <div className="animate-on-scroll bg-pearl p-8 rounded-xl shadow-lg border border-sage/20">
              <div className="w-14 h-14 bg-sage/20 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-sage" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl mb-3">6 Assessments</h3>
              <p className="text-ink/70 mb-6">
                Comprehensive evaluations covering resilience, innovation readiness, sustainability, and pricing strategy.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0" />
                  <span className="text-sm">CIRF (Main Assessment)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0" />
                  <span className="text-sm">5 specialized follow-ups (FREE)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0" />
                  <span className="text-sm">Personalized recommendations</span>
                </li>
              </ul>
            </div>

            {/* Tools Card */}
            <div className="animate-on-scroll bg-pearl p-8 rounded-xl shadow-lg border border-ocean/20" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-ocean/20 rounded-xl flex items-center justify-center mb-6">
                <Calculator className="w-7 h-7 text-ocean" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl mb-3">10+ Tools</h3>
              <p className="text-ink/70 mb-6">
                Calculators and measurement tools to track your cultural innovation journey.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-sm">Innovation Intensity Ratio</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-sm">Cultural Leverage Index</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-sm">Pricing Calculator & more</span>
                </li>
              </ul>
            </div>

            {/* Resources Card */}
            <div className="animate-on-scroll bg-pearl p-8 rounded-xl shadow-lg border border-gold/20" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl mb-3">Premium Resources</h3>
              <p className="text-ink/70 mb-6">
                Exclusive guides and frameworks to accelerate your cultural enterprise.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm">Global Funding Guide 2026</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm">Creative Reconstruction Framework</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm">Templates & worksheets</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/tools" className="btn-primary bg-gold text-ink hover:bg-ink hover:text-pearl inline-flex items-center gap-2 text-lg px-8 py-4">
              Start Your Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-ink/60 mt-4">
              Takes ~15 minutes • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* The Thesis Section */}
      <section className="py-24 md:py-48 px-6 md:px-16 bg-gradient-to-b from-pearl to-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">The Thesis</p>
            <h2 className="section-title">What the Evidence Shows</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {[
              { value: '$126B', label: 'Māori Economy', subtext: '8.9% of New Zealand GDP' },
              { value: '$43.9B', label: 'Native American Enterprises', subtext: 'Annual revenue' },
              { value: 'R50B', label: 'South African Stokvels', subtext: 'Serving 12 million people' },
              { value: '35-40%', label: 'Better Recovery', subtext: 'During economic crises' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="animate-on-scroll bg-pearl p-8 md:p-12 text-center hover:bg-sand transition-colors duration-300"
              >
                <p className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-light text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-sm uppercase tracking-[0.2em] text-ink/70">{stat.label}</p>
                <p className="text-xs text-ink/50 mt-1">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview - Updated with CIL ventures */}
      <section className="py-24 md:py-48 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Our Ventures</p>
          <h2 className="section-title mb-8">Living Laboratories</h2>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl mb-16">
            Each venture validates the thesis that culture creates economy.
            From eco-friendly mobility to blockchain-enabled heritage monetisation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                region: 'Cultural Gaming',
                title: 'Treaxures',
                stat: 'AR Platform',
                subtitle: 'Gamifying cultural exploration',
                color: 'from-terracotta to-gold',
              },
              {
                region: 'Music Heritage',
                title: 'Cultural Sound Lab',
                stat: 'Blockchain',
                subtitle: 'Traditional musicians monetising heritage',
                color: 'from-ocean to-sage',
              },
              {
                region: 'Sustainable Mobility',
                title: 'Bambam Karts',
                stat: 'Eco-Mobility',
                subtitle: 'Adapting traditional Mizo designs',
                color: 'from-sage to-gold',
              },
            ].map((study, i) => (
              <div
                key={study.title}
                className="animate-on-scroll group aspect-[3/4] relative overflow-hidden card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${study.color}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                <div className="absolute top-6 left-6">
                  <span className="text-4xl font-serif font-light text-pearl/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-sm uppercase tracking-[0.15em] text-pearl/80 mb-2">{study.region}</p>
                  <h3 className="font-serif text-2xl text-pearl mb-2">{study.title}</h3>
                  <p className="text-gold font-medium">{study.stat}</p>
                  <p className="text-pearl/70 text-sm">{study.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/case-studies" className="btn-secondary inline-flex items-center gap-2">
              Explore All Case Studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 md:py-48 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Our Approach</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Practitioner-led research.<br />Research-informed practice.
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Most research on indigenous economies is conducted by outsiders looking in.
                Most cultural entrepreneurs build without frameworks to guide them.
                CIL operates at the intersection.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage" />
                  <span>Every framework tested in at least one venture</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage" />
                  <span>Every venture designed to answer a research question</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage" />
                  <span>Dual accountability: academic rigour + market reality</span>
                </div>
              </div>
              <Link href="/research" className="btn-primary inline-flex items-center gap-2 mt-8">
                View Our Research
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-pearl p-8 rounded-lg">
              <h3 className="font-medium mb-6">Creative Reconstruction</h3>
              <p className="text-ink/70 mb-6">
                A deliberate counterpoint to Schumpeter&apos;s creative destruction.
              </p>
              <div className="space-y-4">
                {[
                  { contrast: 'Conventional innovation destroys what came before', ours: 'Cultural innovation revitalises and recombines it' },
                  { contrast: 'The old dies for the new', ours: 'The old adapts and evolves' },
                  { contrast: 'Abandon tradition for modernity', ours: 'Innovate from tradition into both' },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-gold pl-4">
                    <p className="text-sm text-stone line-through">{item.contrast}</p>
                    <p className="text-sm font-medium mt-1">{item.ours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-48 px-6 md:px-16 bg-ink text-pearl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light mb-8">
            Complete Your Assessment → Unlock Everything
          </h2>
          <p className="text-lg md:text-xl leading-relaxed font-light opacity-90 mb-8">
            One free assessment unlocks a complete toolkit for cultural entrepreneurs: specialized assessments, premium tools, and exclusive resources.
          </p>

          {/* What You Get */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-left">
            <div className="bg-pearl/10 rounded-lg p-4">
              <div className="text-gold font-serif text-2xl mb-1">6</div>
              <div className="text-sm opacity-80">Specialized Assessments</div>
            </div>
            <div className="bg-pearl/10 rounded-lg p-4">
              <div className="text-gold font-serif text-2xl mb-1">10+</div>
              <div className="text-sm opacity-80">Premium Tools</div>
            </div>
            <div className="bg-pearl/10 rounded-lg p-4">
              <div className="text-gold font-serif text-2xl mb-1">2</div>
              <div className="text-sm opacity-80">Exclusive Guides</div>
            </div>
            <div className="bg-pearl/10 rounded-lg p-4">
              <div className="text-gold font-serif text-2xl mb-1">∞</div>
              <div className="text-sm opacity-80">Free Forever</div>
            </div>
          </div>

          {/* Auth-aware CTA */}
          {!authLoading && !user && (
            <div className="bg-pearl/10 rounded-xl p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="font-medium">Get started free</span>
              </div>
              <p className="text-sm opacity-80">
                Sign up now and get 1 free assessment credit
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!authLoading && !user ? (
              <>
                <Link href="/auth/signup" className="btn-primary bg-gold text-ink hover:bg-pearl inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
                  Sign Up Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/auth/login" className="btn-secondary border-pearl text-pearl hover:bg-pearl/10 inline-flex items-center justify-center gap-2">
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link href="/tools" className="btn-primary bg-gold text-ink hover:bg-pearl inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
                  Take the Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/resources" className="btn-secondary border-pearl text-pearl hover:bg-pearl/10 inline-flex items-center justify-center gap-2">
                  View Resources
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
