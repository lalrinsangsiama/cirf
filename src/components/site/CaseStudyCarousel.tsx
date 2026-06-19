'use client'

import { useState } from 'react'

const CASES = [
  { country: 'South Korea', flag: '🇰🇷', model: 'Hallyu Wave', stat: 'US$12.3B', pillars: ['Value Creation', 'Adaptability'] },
  { country: 'Shanghai', flag: '🇨🇳', model: 'Creative Clusters', stat: '12% of city GDP', pillars: ['Value Creation'] },
  { country: 'India', flag: '🇮🇳', model: 'TKDL', stat: '500K+ formulations', pillars: ['Cultural Integrity', 'Adaptability'] },
  { country: 'Bhutan', flag: '🇧🇹', model: 'GNH Tourism', stat: '6% of GDP', pillars: ['Cultural Integrity', 'Social Empowerment'] },
  { country: 'Peru', flag: '🇵🇪', model: 'Culinary Innovation', stat: '45% sector growth', pillars: ['Value Creation', 'Adaptability'] },
  { country: 'Japan', flag: '🇯🇵', model: 'Traditional Craft', stat: '¥100B market', pillars: ['Cultural Integrity'] },
  { country: 'Italy', flag: '🇮🇹', model: 'Artisan Clusters & GI', stat: 'Most EU GI products', pillars: ['Value Creation', 'Cultural Integrity'] },
  { country: 'South Africa', flag: '🇿🇦', model: 'San Digital Storytelling', stat: 'Indigenous preservation', pillars: ['Social Empowerment'] },
  { country: 'NE India', flag: '🇮🇳', model: 'Handloom Sector', stat: '2nd largest rural employer', pillars: ['Social Empowerment'] },
  { country: 'Berlin', flag: '🇩🇪', model: 'Creative Industries', stat: '€18B turnover', pillars: ['Value Creation', 'Adaptability'] },
  { country: 'Australia', flag: '🇦🇺', model: 'Indigenous Art Centres', stat: 'AU$250-500M annual', pillars: ['Social Empowerment'] },
  { country: 'Ghana', flag: '🇬🇭', model: 'Kente Cloth GI', stat: 'First African GI textile', pillars: ['Cultural Integrity', 'Social Empowerment'] },
]

const PILLAR_COLORS: Record<string, string> = {
  'Value Creation': '#1A8A7D',
  'Cultural Integrity': '#D4A843',
  'Adaptability': '#E07A5F',
  'Social Empowerment': '#4a6fa5',
}

export function CaseStudyCarousel() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CASES.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className="text-left p-5 rounded-2xl transition-all duration-300 group"
            style={{
              backgroundColor: selected === i ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              border: selected === i ? '1px solid rgba(212, 168, 67, 0.3)' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{c.flag}</span>
              <span className="text-xs font-medium text-white/50">{c.country}</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">{c.model}</h4>
            <p className="text-xs font-bold mb-3" style={{ color: '#D4A843' }}>{c.stat}</p>
            <div className="flex flex-wrap gap-1">
              {c.pillars.map((p) => (
                <span
                  key={p}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${PILLAR_COLORS[p]}25`, color: PILLAR_COLORS[p] }}
                >
                  {p}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="mt-6 p-6 rounded-2xl animate-fade-in-up" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{CASES[selected].flag}</span>
            <div>
              <h4 className="text-lg font-bold text-white">{CASES[selected].model}</h4>
              <p className="text-sm text-white/50">{CASES[selected].country}</p>
            </div>
          </div>
          <p className="text-2xl font-bold mb-4" style={{ color: '#D4A843' }}>{CASES[selected].stat}</p>
          <div className="flex flex-wrap gap-2">
            {CASES[selected].pillars.map((p) => (
              <span key={p} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: `${PILLAR_COLORS[p]}20`, color: PILLAR_COLORS[p] }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
