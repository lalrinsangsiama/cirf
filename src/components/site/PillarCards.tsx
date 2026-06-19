'use client'

import { useState } from 'react'

const PILLARS = [
  {
    id: 1,
    title: 'Economic Value Creation',
    color: '#1A8A7D',
    icon: '📈',
    summary: 'Transform cultural assets into measurable economic outputs.',
    detail: 'Revenue generation, employment creation, GDP contribution, export value, and tourism multiplier effects. The engine that turns cultural capital into economic resilience.',
    indicators: ['Cultural GDP share', 'Creative employment rates', 'Export values', 'Tourism multipliers'],
  },
  {
    id: 2,
    title: 'Cultural Integrity & Authenticity',
    color: '#D4A843',
    icon: '🛡️',
    summary: 'Preserve heritage meaning during commercialisation.',
    detail: 'IP protections, community governance models, authenticity certification schemes, and indigenous consent frameworks. The safeguard that ensures cultural innovation does not become cultural extraction.',
    indicators: ['IP protections enacted', 'Community governance models', 'Authenticity certification', 'Indigenous consent frameworks'],
  },
  {
    id: 3,
    title: 'Adaptability & Sustainability',
    color: '#E07A5F',
    icon: '🔄',
    summary: 'Evolve with market, technology, and environmental change.',
    detail: 'Digital adoption rates, hybrid business model prevalence, intergenerational knowledge transfer, and climate-resilient practices. The bridge between tradition and future viability.',
    indicators: ['Digital adoption rates', 'Hybrid business models', 'Knowledge transfer', 'Climate resilience'],
  },
  {
    id: 4,
    title: 'Social Empowerment & Inclusion',
    color: '#0D1B2A',
    icon: '🤝',
    summary: 'Distribute opportunity across marginalised communities.',
    detail: 'Participation demographics, income distribution shifts, women/youth entrepreneurship rates, and social mobility indicators. The measure of whether cultural innovation lifts all boats.',
    indicators: ['Participation demographics', 'Income distribution', 'Women/youth entrepreneurship', 'Social mobility'],
  },
]

export function PillarCards() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {PILLARS.map((pillar) => {
        const isOpen = expanded === pillar.id
        return (
          <button
            key={pillar.id}
            onClick={() => setExpanded(isOpen ? null : pillar.id)}
            className="text-left p-8 rounded-2xl transition-all duration-500 group"
            style={{
              backgroundColor: 'white',
              border: `2px solid ${isOpen ? pillar.color : 'transparent'}`,
              boxShadow: isOpen
                ? `0 8px 30px ${pillar.color}15`
                : '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{pillar.icon}</span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: pillar.color }}>
                  Pillar {pillar.id}
                </span>
              </div>
              <svg
                className="w-5 h-5 transition-transform duration-300"
                style={{ color: pillar.color, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
              {pillar.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
              {pillar.summary}
            </p>

            {isOpen && (
              <div className="mt-6 pt-6 space-y-4 animate-fade-in-up" style={{ borderTop: `1px solid ${pillar.color}20` }}>
                <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                  {pillar.detail}
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: pillar.color }}>
                    Key Indicators
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.indicators.map((ind) => (
                      <span key={ind} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: `${pillar.color}10`, color: pillar.color }}>
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
