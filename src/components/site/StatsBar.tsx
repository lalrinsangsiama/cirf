'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 'US$2.1T', label: 'Annual creative economy exports', source: 'UNCTAD, 2024' },
  { value: '10%', label: 'Projected share of global GDP by 2030', source: 'IFC' },
  { value: '6.2%', label: 'Of global workforce in creative industries', source: 'UNESCO' },
  { value: '12', label: 'Countries in our research portfolio', source: '' },
]

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ backgroundColor: '#0D1B2A' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#D4A843', fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </p>
              <p className="text-xs md:text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {stat.label}
              </p>
              {stat.source && (
                <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {stat.source}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
