'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Search, MapPin, X, ChevronRight, ExternalLink } from 'lucide-react'
import { verifiedCaseStudies, type CaseStudy } from '@/lib/data/caseStudies'

const filters = {
  continents: ['All Regions', 'Asia Pacific', 'Americas', 'Africa', 'Middle East', 'Europe'],
  categories: ['All Categories', 'Crafts & Heritage', 'Indigenous Enterprise', 'Creative Industries'],
  scores: ['All Scores', '13/13', '12/13', '11/13', '10/13 and below'],
}

export default function CaseStudiesPage() {
  const [activeContinent, setActiveContinent] = useState('All Regions')
  const [activeCategory, setActiveCategory] = useState('All Categories')
  const [activeScore, setActiveScore] = useState('All Scores')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)
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

  const filteredStudies = verifiedCaseStudies.filter((study) => {
    const matchesContinent = activeContinent === 'All Regions' || study.continent === activeContinent
    const matchesCategory = activeCategory === 'All Categories' || study.category === activeCategory
    const matchesScore = activeScore === 'All Scores' ||
      (activeScore === '13/13' && study.cilScore === 13) ||
      (activeScore === '12/13' && study.cilScore === 12) ||
      (activeScore === '11/13' && study.cilScore === 11) ||
      (activeScore === '10/13 and below' && study.cilScore <= 10)
    const matchesSearch =
      searchQuery === '' ||
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesContinent && matchesCategory && matchesSearch && matchesScore
  })

  return (
    <>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center relative overflow-hidden bg-gradient-to-br from-sand to-pearl">
        <div className="w-full px-6 md:px-16 relative z-10">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Verified Case Studies
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,8vw,9rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Stories of</span></span>
            <span className="hero-line"><span className="italic">Transformation</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Eight verified case studies from our research database demonstrating how communities worldwide
            achieve cultural innovation resilience. Each case includes CIL scoring and source documentation.
          </p>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-8 px-6 md:px-16 bg-ink text-pearl">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="font-serif text-3xl text-gold">362</p>
            <p className="text-sm text-pearl/70">Total Cases in Database</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl text-gold">8.38</p>
            <p className="text-sm text-pearl/70">Mean CIL Score</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl text-gold">76.5%</p>
            <p className="text-sm text-pearl/70">Operating Success Rate</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl text-gold">98.6%</p>
            <p className="text-sm text-pearl/70">Success at Score 8+</p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-ink text-pearl">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light italic mb-4">
            Global Distribution of Verified Cases
          </h2>
          <p className="text-pearl/70 mb-12">Click on a location to explore the case study</p>

          {/* Simplified world map representation */}
          <div className="relative w-full max-w-[1000px] mx-auto aspect-[2/1] mb-8">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* Simplified continent outlines */}
              <path d="M150,150 L300,120 L350,150 L330,220 L280,260 L150,240 Z" stroke="#fdfdfb" strokeWidth="1" fill="none" opacity="0.3" />
              <path d="M400,100 L600,90 L650,150 L600,200 L450,190 L400,130 Z" stroke="#fdfdfb" strokeWidth="1" fill="none" opacity="0.3" />
              <path d="M650,150 L800,130 L850,220 L780,300 L650,250 Z" stroke="#fdfdfb" strokeWidth="1" fill="none" opacity="0.3" />
              <path d="M450,250 L550,230 L600,350 L500,380 L450,320 Z" stroke="#fdfdfb" strokeWidth="1" fill="none" opacity="0.3" />
              <path d="M750,350 L850,330 L880,400 L800,420 L750,390 Z" stroke="#fdfdfb" strokeWidth="1" fill="none" opacity="0.3" />

              {/* Map pins */}
              {verifiedCaseStudies.map((study) => {
                const x = ((study.location.lng + 180) / 360) * 1000
                const y = ((90 - study.location.lat) / 180) * 500
                const pinColor = study.cilScore === 13 ? '#d4af37' : study.cilScore === 12 ? '#8b9a7b' : '#5f9ea0'
                return (
                  <g key={study.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="14"
                      fill={pinColor}
                      className="cursor-pointer hover:r-18 transition-all animate-pulse-gold"
                      onClick={() => setSelectedStudy(study)}
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill="#0a0a0a"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {study.cilScore}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gold flex items-center justify-center text-[8px] font-bold text-ink">13</div>
              <span className="text-sm">Perfect Score (13/13)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-sage flex items-center justify-center text-[8px] font-bold text-ink">12</div>
              <span className="text-sm">Excellent (12/13)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-ocean flex items-center justify-center text-[8px] font-bold text-ink">11</div>
              <span className="text-sm">High (11/13)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 py-6 px-6 md:px-16 bg-pearl border-b border-ink/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.continents.map((continent) => (
              <button
                key={continent}
                onClick={() => setActiveContinent(continent)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm transition-all',
                  activeContinent === continent
                    ? 'bg-ink text-pearl'
                    : 'bg-transparent border border-ink/30 hover:border-ink'
                )}
              >
                {continent}
              </button>
            ))}
          </div>

          <div className="flex gap-4 w-full md:w-auto flex-wrap">
            <div className="relative flex-1 md:w-64">
              <label htmlFor="case-study-search" className="sr-only">
                Search case studies
              </label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" aria-hidden="true" />
              <input
                id="case-study-search"
                type="text"
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-ink/30 rounded-full text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <label htmlFor="score-filter" className="sr-only">
              Filter by CIL score
            </label>
            <select
              id="score-filter"
              value={activeScore}
              onChange={(e) => setActiveScore(e.target.value)}
              className="px-4 py-2 border border-ink/30 rounded-full text-sm bg-transparent cursor-pointer"
              aria-label="Filter by CIL score"
            >
              {filters.scores.map((score) => (
                <option key={score} value={score}>{score}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto space-y-24">
          {filteredStudies.map((study, i) => (
            <article
              key={study.id}
              className="animate-on-scroll grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className={cn('aspect-[4/3] relative overflow-hidden rounded-lg', i % 2 === 1 && 'lg:order-2')}>
                <div className={`absolute inset-0 bg-gradient-to-br ${study.color}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    study.cilScore === 13 ? 'bg-gold text-ink' :
                    study.cilScore === 12 ? 'bg-sage text-white' :
                    'bg-ocean text-white'
                  )}>
                    {study.cilScore}/13 CIL
                  </span>
                </div>
                {study.unescoRecognition && (
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-ink">
                      UNESCO Recognized
                    </span>
                  </div>
                )}
              </div>

              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-stone" />
                  <span className="text-sm uppercase tracking-[0.2em] text-stone">{study.country}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">{study.title}</h2>

                <div className="flex flex-wrap gap-8 mb-6">
                  {study.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-3xl text-gold">{stat.value}</p>
                      <p className="text-xs uppercase tracking-[0.15em] text-stone">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-base leading-relaxed mb-6">{study.description}</p>

                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <span className="text-sm text-stone">{study.period}</span>
                  <span className="text-sm px-3 py-1 bg-sand text-stone rounded-full">
                    {study.category}
                  </span>
                </div>

                <div className="text-xs text-stone mb-6">
                  <span className="font-medium">Source:</span> {study.source}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedStudy(study)}
                    className="inline-flex items-center gap-2 text-ink font-medium hover:text-gold transition-colors"
                  >
                    Quick View
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <Link
                    href={`/case-studies/${study.id}`}
                    className="inline-flex items-center gap-2 text-gold font-medium hover:underline"
                  >
                    Full Details
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {filteredStudies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-stone text-lg">No case studies match your filters.</p>
              <button
                onClick={() => {
                  setActiveContinent('All Regions')
                  setActiveCategory('All Categories')
                  setActiveScore('All Scores')
                  setSearchQuery('')
                }}
                className="mt-4 text-gold hover:text-ink transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Research Note */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-6 text-center">
            About These Case Studies
          </h2>
          <div className="bg-pearl p-8 rounded-lg">
            <p className="text-base leading-relaxed mb-4">
              These eight case studies are drawn from our verified database of 362 cultural innovation
              initiatives analyzed between 2010-2024. Each case has been:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-gold mt-1">→</span>
                Scored across all 13 CIL components using standardized criteria
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-gold mt-1">→</span>
                Verified through multiple academic and institutional sources
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-gold mt-1">→</span>
                Selected to represent diverse regions, categories, and score levels
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-gold mt-1">→</span>
                Documented with traceable sources for academic citation
              </li>
            </ul>
            <p className="text-sm text-stone">
              The full database includes 362 cases across 47 countries. For research access,
              contact us through the Resources section.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="font-serif text-8xl text-gold/30 leading-none">&ldquo;</span>
          <p className="font-serif text-2xl md:text-3xl italic font-light leading-relaxed mb-8 -mt-8">
            Cultural innovation isn&apos;t about choosing between tradition and progress.
            It&apos;s about recognizing that our ancestral wisdom holds the keys to our economic future.
          </p>
          <p className="font-medium">Dr. Maria Xólotl</p>
          <p className="text-stone">Indigenous Economics Researcher, Guatemala</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-ink text-pearl text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
          Assess Your Own Initiative
        </h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
          Use our research-validated assessment tool to score your cultural innovation
          initiative and compare with these verified case studies.
        </p>
        <button
          onClick={() => window.location.href = '/tools'}
          className="bg-gold text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300"
        >
          Take the CIL Assessment
        </button>
      </section>

      {/* Detail Modal - Accessible */}
      {selectedStudy && (
        <CaseStudyModal
          study={selectedStudy}
          onClose={() => setSelectedStudy(null)}
        />
      )}
    </>
  )
}

// Accessible Case Study Modal Component
function CaseStudyModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Handle escape key and focus trap
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }

    // Focus trap
    if (event.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }
  }, [onClose])

  useEffect(() => {
    // Store previous focus
    previousActiveElement.current = document.activeElement as HTMLElement

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Focus modal
    const timer = setTimeout(() => {
      const closeButton = modalRef.current?.querySelector<HTMLElement>('button')
      closeButton?.focus()
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousActiveElement.current?.focus()
    }
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        aria-describedby="case-study-description"
        className="bg-pearl rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto w-full"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className={`h-48 bg-gradient-to-br ${study.color} relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pearl/90 flex items-center justify-center hover:bg-pearl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium',
              study.cilScore === 13 ? 'bg-gold text-ink' :
              study.cilScore === 12 ? 'bg-sage text-white' :
              'bg-ocean text-white'
            )}>
              {study.cilScore}/13 CIL Score
            </span>
            {study.unescoRecognition && (
              <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-ink">
                UNESCO
              </span>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-stone" aria-hidden="true" />
            <span className="text-sm text-stone">{study.country}</span>
            <span className="text-sm text-stone" aria-hidden="true">•</span>
            <span className="text-sm text-stone">{study.period}</span>
          </div>

          <h2 id="case-study-title" className="font-serif text-3xl mb-4">{study.title}</h2>

          <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-ink/10">
            {study.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl text-gold">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-stone">{stat.label}</p>
              </div>
            ))}
          </div>

          <p id="case-study-description" className="text-base leading-relaxed mb-6">
            {study.fullDescription}
          </p>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Key Innovations</h3>
            <ul className="space-y-2">
              {study.innovations.map((innovation) => (
                <li key={innovation} className="flex items-start gap-2 text-sm">
                  <span className="text-gold mt-1" aria-hidden="true">→</span>
                  {innovation}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-sand p-6 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Key Lessons</h3>
            <ul className="space-y-2">
              {study.lessons.map((lesson) => (
                <li key={lesson} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2" aria-hidden="true" />
                  {lesson}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-ink/10">
            <p className="text-xs text-stone">
              <span className="font-medium">Source:</span> {study.source}
            </p>
            {study.unescoRecognition && (
              <p className="text-xs text-stone mt-1">
                <span className="font-medium">UNESCO Recognition:</span> {study.unescoRecognition}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
