'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BarChart3, Users, Globe2, Zap, Shield, Clock, CheckCircle2, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/ToastProvider'

const features = [
  {
    icon: BarChart3,
    title: 'Assessment Engine',
    description: 'Comprehensive CIL assessment with real-time scoring and visualization of resilience capacities.',
    details: ['Multi-dimensional scoring', 'Benchmark comparisons', 'Progress tracking', 'Export capabilities'],
  },
  {
    icon: Users,
    title: 'Community Dashboard',
    description: 'Centralized view of community cultural assets, initiatives, and resilience metrics over time.',
    details: ['Asset inventory', 'Initiative tracking', 'Stakeholder mapping', 'Impact measurement'],
  },
  {
    icon: Globe2,
    title: 'Case Study Library',
    description: 'Access our complete database of 362+ analyzed case studies with detailed CIL breakdowns.',
    details: ['Advanced filtering', 'Comparative analysis', 'Downloadable reports', 'Regular updates'],
  },
  {
    icon: Zap,
    title: 'Strategic Planning',
    description: 'AI-powered recommendations based on your assessment results and similar successful cases.',
    details: ['Personalized recommendations', 'Implementation roadmaps', 'Resource planning', 'Milestone tracking'],
  },
]

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'completed',
    items: ['CIL Assessment Tool', 'Case Study Database', 'Basic Dashboard'],
  },
  {
    phase: 'Phase 2',
    title: 'Enhancement',
    status: 'current',
    items: ['Strategic Planning Module', 'Community Features', 'API Access'],
  },
  {
    phase: 'Phase 3',
    title: 'Expansion',
    status: 'upcoming',
    items: ['Multi-language Support', 'Mobile Application', 'Advanced Analytics'],
  },
  {
    phase: 'Phase 4',
    title: 'Ecosystem',
    status: 'upcoming',
    items: ['Partner Integrations', 'Marketplace Features', 'Research Collaboration'],
  },
]

const testimonials = [
  {
    quote: 'CultureBridge Global transformed how we approach cultural development planning. The CIL framework gave us a common language.',
    author: 'Community Development Officer',
    organization: 'Indigenous Tourism Association',
  },
  {
    quote: 'The assessment tool helped us identify blind spots in our resilience strategy we hadn\'t considered before.',
    author: 'Program Director',
    organization: 'Heritage Foundation',
  },
]

export default function PlatformPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [heroEmail, setHeroEmail] = useState('')
  const [ctaEmail, setCtaEmail] = useState('')
  const [isHeroSubmitting, setIsHeroSubmitting] = useState(false)
  const [isCtaSubmitting, setIsCtaSubmitting] = useState(false)
  const { toast } = useToast()

  const handleWaitlistSubmit = async (email: string, setSubmitting: (v: boolean) => void, setEmail: (v: string) => void) => {
    if (!email || !email.includes('@')) {
      toast('Please enter a valid email address', 'error')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interest: 'platform' }),
      })

      const data = await response.json()

      if (response.ok) {
        toast(data.message || "You're on the list!", 'success')
        setEmail('')
      } else {
        toast(data.error || 'Failed to join waitlist', 'error')
      }
    } catch {
      toast('Something went wrong. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

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
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-gradient-to-br from-ink to-ocean/80 text-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-pearl/60 mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Coming Soon
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>CultureBridge</span></span>
            <span className="hero-line"><span className="italic text-gold">Global</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-90 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            A comprehensive digital platform bringing the CIL framework to life—empowering communities
            worldwide to assess, plan, and scale cultural innovation for economic resilience.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-6 py-4 rounded-full text-ink w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-gold"
                disabled={isHeroSubmitting}
              />
              <button
                onClick={() => handleWaitlistSubmit(heroEmail, setIsHeroSubmitting, setHeroEmail)}
                disabled={isHeroSubmitting}
                className="bg-gold text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isHeroSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join the Waitlist'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Platform Features</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Everything You Need
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            CultureBridge Global combines assessment tools, strategic planning, and community
            features into a single platform designed for cultural innovation practitioners.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="animate-on-scroll bg-sand p-8 rounded-lg card-hover gold-border-top"
              >
                <feature.icon className="w-10 h-10 text-gold mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                <p className="text-stone mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-sage" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots/Demo Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Interactive Tour</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                See It In Action
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Experience how CultureBridge Global transforms the CIL framework into an intuitive,
                actionable platform for cultural innovation practitioners.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-ink text-sm font-medium">1</span>
                  <div>
                    <span className="font-medium">Complete Your Assessment</span>
                    <p className="text-stone text-sm">Multi-step assessment wizard with real-time visualization</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-ink text-sm font-medium">2</span>
                  <div>
                    <span className="font-medium">Review Your Dashboard</span>
                    <p className="text-stone text-sm">Comprehensive view of strengths, gaps, and opportunities</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-ink text-sm font-medium">3</span>
                  <div>
                    <span className="font-medium">Explore Case Studies</span>
                    <p className="text-stone text-sm">Find relevant examples matched to your profile</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-ink text-sm font-medium">4</span>
                  <div>
                    <span className="font-medium">Build Your Strategy</span>
                    <p className="text-stone text-sm">Generate personalized recommendations and action plans</p>
                  </div>
                </li>
              </ul>
              <Link href="/tools" className="btn-primary inline-flex items-center gap-2">
                Try the Assessment Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-ink rounded-lg p-8 aspect-video flex items-center justify-center relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-gold" />
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border border-gold" />
                <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full border border-gold" />
              </div>
              <div className="text-center text-pearl/80 relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <Globe2 className="w-10 h-10 text-gold" strokeWidth={1.5} />
                </div>
                <p className="text-xl font-serif mb-2">Platform in Development</p>
                <p className="text-sm text-pearl/60 max-w-xs mx-auto">
                  We&apos;re building something special. In the meantime, try our CIL Assessment Tool below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Development Roadmap</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Building the Future
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-16">
            Our development roadmap is guided by community feedback and practitioner needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmap.map((phase) => (
              <div
                key={phase.phase}
                className={`animate-on-scroll p-6 rounded-lg border ${
                  phase.status === 'current'
                    ? 'border-gold bg-gold/10'
                    : phase.status === 'completed'
                    ? 'border-sage bg-sage/10'
                    : 'border-ink/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-sm font-medium ${
                      phase.status === 'current'
                        ? 'text-gold'
                        : phase.status === 'completed'
                        ? 'text-sage'
                        : 'text-stone'
                    }`}
                  >
                    {phase.phase}
                  </span>
                  {phase.status === 'completed' && (
                    <CheckCircle2 className="w-4 h-4 text-sage" />
                  )}
                  {phase.status === 'current' && (
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  )}
                </div>
                <h3 className="font-serif text-xl mb-4">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="text-sm text-stone flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-stone" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1200px] mx-auto">
          <p className="section-label text-center">Early Feedback</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-center mb-16">
            What Practitioners Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-pearl p-8 rounded-lg">
                <p className="text-lg leading-relaxed italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-stone text-sm">{testimonial.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-ink text-pearl">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-pearl/60 mb-4">Pricing</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Accessible to All Communities
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-12">
            We believe in equitable access. Pricing will be scaled based on community size
            and economic context, with free tiers for eligible indigenous communities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-pearl/10 p-8 rounded-lg border border-pearl/20">
              <h3 className="font-serif text-xl mb-2">Community</h3>
              <p className="text-pearl/70 mb-4">For small communities and grassroots organizations</p>
              <p className="font-serif text-3xl text-gold">Free</p>
              <p className="text-sm text-pearl/60 mt-2">For eligible communities</p>
            </div>
            <div className="bg-gold text-ink p-8 rounded-lg transform scale-105">
              <h3 className="font-serif text-xl mb-2">Professional</h3>
              <p className="text-ink/70 mb-4">For NGOs, cultural organizations, and regional bodies</p>
              <p className="font-serif text-3xl">$49/mo</p>
              <p className="text-sm text-ink/60 mt-2">Early adopter pricing</p>
            </div>
            <div className="bg-pearl/10 p-8 rounded-lg border border-pearl/20">
              <h3 className="font-serif text-xl mb-2">Enterprise</h3>
              <p className="text-pearl/70 mb-4">For government agencies and large institutions</p>
              <p className="font-serif text-3xl text-gold">Custom</p>
              <p className="text-sm text-pearl/60 mt-2">Contact for pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-ocean to-sage text-pearl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Be Part of the Movement
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join the waitlist for early access and help shape the future of cultural innovation globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={ctaEmail}
              onChange={(e) => setCtaEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full text-ink w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-gold"
              disabled={isCtaSubmitting}
            />
            <button
              onClick={() => handleWaitlistSubmit(ctaEmail, setIsCtaSubmitting, setCtaEmail)}
              disabled={isCtaSubmitting}
              className="bg-pearl text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300 whitespace-nowrap disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {isCtaSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Waitlist'
              )}
            </button>
          </div>
          <p className="text-sm opacity-60 mt-4">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </section>
    </>
  )
}
