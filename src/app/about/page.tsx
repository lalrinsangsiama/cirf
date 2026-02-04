'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Mail, MapPin, BookOpen, Users, Globe2, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function AboutPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [contactStatus, setContactStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }>({ type: 'idle' })

  // Newsletter form state
  const [newsletterForm, setNewsletterForm] = useState({
    name: '',
    email: '',
    role: '',
  })
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }>({ type: 'idle' })

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus({ type: 'loading' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setContactStatus({ type: 'success', message: data.message })
      setContactForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setContactStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
      })
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus({ type: 'loading' })

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterForm.email,
          name: newsletterForm.name || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setNewsletterStatus({ type: 'success', message: data.message })
      setNewsletterForm({ name: '', email: '', role: '' })
    } catch (error) {
      setNewsletterStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
      })
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            About
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>The Story</span></span>
            <span className="hero-line"><span className="italic">Behind CIL</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            A personal journey from the hills of Northeast India to a global framework
            for understanding cultural innovation and economic resilience.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label">Origin</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Where It All Began
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  The Cultural Innovation Lab emerged from a simple observation:
                  communities that maintained strong cultural practices seemed to weather economic
                  disruptions better than those that didn&apos;t.
                </p>
                <p>
                  Growing up in Mizoram, I witnessed firsthand how traditional bamboo craftsmanship
                  evolved into a thriving export industry—not by abandoning tradition, but by
                  innovating from it. This wasn&apos;t an isolated phenomenon.
                </p>
                <p>
                  From the Māori tech entrepreneurs of New Zealand to the Maasai artisans of Kenya,
                  a pattern was emerging: cultural innovation was driving economic resilience in
                  ways that conventional development theory couldn&apos;t explain.
                </p>
              </div>
            </div>
            <div className="bg-pearl p-8 rounded-lg">
              <h3 className="font-medium mb-6">Research Timeline</h3>
              <div className="space-y-6">
                {[
                  { year: '2019', event: 'Initial research question formulated' },
                  { year: '2020', event: 'Literature review and framework development' },
                  { year: '2021', event: 'Case study data collection begins' },
                  { year: '2022', event: 'Statistical analysis and model validation' },
                  { year: '2023', event: 'Framework refinement and tool development' },
                  { year: '2024', event: 'DBA thesis completion and public launch' },
                ].map((item) => (
                  <div key={item.year} className="flex gap-4">
                    <span className="font-serif text-gold text-xl">{item.year}</span>
                    <span className="text-stone">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-ink text-pearl">
        <div className="max-w-[1600px] mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-pearl/60 mb-8">Our Mission</p>
          <h2 className="font-serif text-3xl md:text-5xl font-light italic max-w-4xl mx-auto leading-tight mb-12">
            To demonstrate that cultural innovation isn&apos;t a barrier to economic development—it&apos;s the most powerful and sustainable path toward it.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="animate-on-scroll">
              <BookOpen className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-medium mb-2">Research</h3>
              <p className="text-pearl/70">
                Rigorous academic research that challenges conventional development paradigms.
              </p>
            </div>
            <div className="animate-on-scroll">
              <Users className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-medium mb-2">Practice</h3>
              <p className="text-pearl/70">
                Practical tools and frameworks that communities can immediately apply.
              </p>
            </div>
            <div className="animate-on-scroll">
              <Globe2 className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-medium mb-2">Impact</h3>
              <p className="text-pearl/70">
                Global reach with local relevance—adapting to diverse cultural contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Context */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-label">Academic Foundation</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                DBA Thesis Context
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                CIL is the central contribution of a Doctor of Business Administration (DBA)
                thesis exploring the intersection of cultural economics, resilience theory,
                and regional development.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                The research addresses a critical gap in academic literature: while cultural
                industries are increasingly recognized as economic drivers, the mechanisms
                through which cultural innovation generates resilience remain poorly understood.
              </p>
              <p className="text-lg leading-relaxed">
                By analyzing 362 case studies across 47 countries, this research provides the
                first systematic, empirically-validated framework for understanding these mechanisms.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-sand p-6 rounded-lg">
                <h3 className="font-medium mb-3">Theoretical Contributions</h3>
                <ul className="space-y-2 text-stone">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">→</span>
                    Integration of resilience theory with cultural economics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">→</span>
                    Identification of multiplicative effects in cultural innovation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">→</span>
                    Discovery of the 4-6/13 boundary zone phenomenon
                  </li>
                </ul>
              </div>
              <div className="bg-sand p-6 rounded-lg">
                <h3 className="font-medium mb-3">Practical Contributions</h3>
                <ul className="space-y-2 text-stone">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">→</span>
                    Validated assessment tools for practitioners
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">→</span>
                    Implementation frameworks for policymakers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">→</span>
                    Case study database for benchmarking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Guiding Principles</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Community-Centered',
                description: 'Research and tools designed with and for the communities they serve, not imposed from outside.',
              },
              {
                title: 'Evidence-Based',
                description: 'Grounded in rigorous research methodology, not ideology or assumptions.',
              },
              {
                title: 'Culturally Responsive',
                description: 'Acknowledging that effective approaches must adapt to specific cultural contexts.',
              },
              {
                title: 'Open Access',
                description: 'Committed to making research and tools accessible to all, regardless of resources.',
              },
            ].map((value) => (
              <div key={value.title} className="animate-on-scroll bg-pearl p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-stone">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-label">Get In Touch</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">Contact</h2>
              <p className="text-lg leading-relaxed mb-8">
                Whether you&apos;re a researcher interested in collaboration, a practitioner seeking
                guidance, or a community looking to apply the framework, we&apos;d love to hear from you.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gold" />
                  <span>contact@cirf-framework.org</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span>Global research initiative</span>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-sand p-6 rounded-lg">
                <h3 className="font-medium mb-4">Send us a message</h3>

                {contactStatus.type === 'success' ? (
                  <div className="flex items-start gap-3 p-4 bg-sage/10 border border-sage/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                    <p className="text-sage">{contactStatus.message}</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {contactStatus.type === 'error' && (
                      <div className="flex items-start gap-3 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-terracotta">{contactStatus.message}</p>
                      </div>
                    )}
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-ink mb-1">
                        Your name <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-ink mb-1">
                        Your email <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        placeholder="you@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-ink mb-1">
                        Subject <span className="text-stone">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        placeholder="How can we help?"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-ink mb-1">
                        Your message <span className="text-terracotta">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell us how we can help..."
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                        required
                        aria-required="true"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={contactStatus.type === 'loading'}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {contactStatus.type === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div id="newsletter" className="bg-sand p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Stay Updated</h3>
              <p className="text-stone mb-6">
                Subscribe to receive updates on new research, case studies, and tool releases.
              </p>

              {newsletterStatus.type === 'success' ? (
                <div className="flex items-start gap-3 p-4 bg-sage/10 border border-sage/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                  <p className="text-sage">{newsletterStatus.message}</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  {newsletterStatus.type === 'error' && (
                    <div className="flex items-start gap-3 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-terracotta">{newsletterStatus.message}</p>
                    </div>
                  )}
                  <div>
                    <label htmlFor="newsletter-name" className="block text-sm font-medium text-ink mb-1">
                      Your name <span className="text-stone">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="newsletter-name"
                      placeholder="John Doe"
                      value={newsletterForm.name}
                      onChange={(e) => setNewsletterForm({ ...newsletterForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="newsletter-email" className="block text-sm font-medium text-ink mb-1">
                      Your email <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="email"
                      id="newsletter-email"
                      placeholder="you@example.com"
                      value={newsletterForm.email}
                      onChange={(e) => setNewsletterForm({ ...newsletterForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="newsletter-role" className="block text-sm font-medium text-ink mb-1">
                      I am a
                    </label>
                    <select
                      id="newsletter-role"
                      value={newsletterForm.role}
                      onChange={(e) => setNewsletterForm({ ...newsletterForm, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      <option value="">Select your role...</option>
                      <option value="researcher">Researcher</option>
                      <option value="practitioner">Practitioner</option>
                      <option value="policymaker">Policymaker</option>
                      <option value="community">Community member</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={newsletterStatus.type === 'loading'}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {newsletterStatus.type === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
              )}
              <p className="text-xs text-stone mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-ocean to-sage text-pearl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Explore the framework, assess your community&apos;s resilience, or dive into our case studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/framework"
              className="bg-pearl text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300"
            >
              Explore Framework
            </Link>
            <Link
              href="/tools"
              className="bg-transparent border border-pearl text-pearl px-8 py-4 rounded-full font-medium hover:bg-pearl/10 transition-colors duration-300"
            >
              Take Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
