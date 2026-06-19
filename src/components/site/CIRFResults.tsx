'use client'

import {
  getOverallLabel,
  getPillarInterpretation,
  RECOMMENDATIONS,
  type CIRFPillar,
} from '@/lib/data/cirfAssessmentData'

interface PillarScore {
  pillar: CIRFPillar
  score: number
}

interface CIRFResultsProps {
  pillarScores: PillarScore[]
  totalScore: number
  name: string
}

export function CIRFResults({ pillarScores, totalScore, name }: CIRFResultsProps) {
  const overall = getOverallLabel(totalScore)
  const weakest = [...pillarScores].sort((a, b) => a.score - b.score)[0]
  const recs = RECOMMENDATIONS[weakest.pillar.id]

  // Radar chart points
  const size = 200
  const cx = size / 2
  const cy = size / 2
  const maxR = 80
  const angles = pillarScores.map((_, i) => (Math.PI * 2 * i) / 4 - Math.PI / 2)
  const points = pillarScores.map((ps, i) => {
    const r = (ps.score / 20) * maxR
    return { x: cx + r * Math.cos(angles[i]), y: cy + r * Math.sin(angles[i]) }
  })
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ')

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A8A7D' }}>
            Your CIRF Assessment Results
          </p>
          {name && <p className="text-lg mb-2" style={{ color: '#4a5568' }}>Results for {name}</p>}

          {/* Overall Score */}
          <div className="inline-flex flex-col items-center p-8 rounded-3xl mb-6" style={{ backgroundColor: 'white', boxShadow: '0 4px 30px rgba(0,0,0,0.04)' }}>
            <p className="text-7xl font-bold mb-2" style={{ color: overall.color, fontFamily: "'Playfair Display', serif" }}>
              {totalScore}
            </p>
            <p className="text-sm" style={{ color: '#4a5568' }}>out of 80</p>
            <div className="mt-3 px-5 py-1.5 rounded-full text-sm font-bold" style={{ backgroundColor: `${overall.color}15`, color: overall.color }}>
              {overall.label}
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="flex justify-center mb-16">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="drop-shadow-sm">
              {/* Grid */}
              {rings.map((r) => (
                <polygon
                  key={r}
                  points={angles.map((a) => `${cx + maxR * r * Math.cos(a)},${cy + maxR * r * Math.sin(a)}`).join(' ')}
                  fill="none"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth={1}
                />
              ))}
              {/* Axes */}
              {angles.map((a, i) => (
                <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(a)} y2={cy + maxR * Math.sin(a)} stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
              ))}
              {/* Data polygon */}
              <polygon points={polygonPoints} fill="rgba(26, 138, 125, 0.12)" stroke="#1A8A7D" strokeWidth={2.5} />
              {/* Data points */}
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={5} fill={pillarScores[i].pillar.color} stroke="white" strokeWidth={2} />
              ))}
            </svg>
            {/* Labels */}
            {pillarScores.map((ps, i) => {
              const labelR = maxR + 30
              const x = cx + labelR * Math.cos(angles[i])
              const y = cy + labelR * Math.sin(angles[i])
              return (
                <div
                  key={i}
                  className="absolute text-center"
                  style={{
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                    width: 90,
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: ps.pillar.color }}>{ps.score}/20</span>
                  <br />
                  <span className="text-[10px]" style={{ color: '#4a5568' }}>{ps.pillar.shortTitle}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pillar Breakdown */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {pillarScores.map((ps) => {
            const interp = getPillarInterpretation(ps.score)
            const pct = (ps.score / 20) * 100
            return (
              <div key={ps.pillar.id} className="p-6 rounded-2xl bg-white" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{ps.pillar.icon}</span>
                  <h3 className="text-sm font-bold" style={{ color: '#0D1B2A' }}>{ps.pillar.title}</h3>
                </div>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-3xl font-bold" style={{ color: ps.pillar.color, fontFamily: "'Playfair Display', serif" }}>
                    {ps.score}
                  </span>
                  <span className="text-sm pb-1" style={{ color: '#999' }}>/20</span>
                  <span className="text-xs font-bold ml-auto px-3 py-1 rounded-full" style={{ backgroundColor: `${ps.pillar.color}12`, color: ps.pillar.color }}>
                    {interp.level}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full mb-3" style={{ backgroundColor: `${ps.pillar.color}12` }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: ps.pillar.color }} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{interp.description}</p>
              </div>
            )
          })}
        </div>

        {/* Recommendations */}
        <div className="p-8 rounded-2xl mb-16" style={{ backgroundColor: 'white', border: `2px solid ${weakest.pillar.color}20` }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">💡</span>
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
              Personalised Recommendations
            </h3>
          </div>
          <p className="text-sm mb-6" style={{ color: '#4a5568' }}>
            Based on your results, <strong style={{ color: weakest.pillar.color }}>{weakest.pillar.title}</strong> is
            your area with the most room for growth. Here are evidence-based strategies:
          </p>
          <div className="space-y-4">
            {recs.map((rec, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ backgroundColor: weakest.pillar.color }}>
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Share / Actions */}
        <div className="text-center space-y-4">
          <p className="text-sm font-medium" style={{ color: '#0D1B2A' }}>Share your results</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://culturalinnovationlab.org/assessment')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#0077b5' }}
            >
              Share on LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just assessed my cultural innovation initiative using the CIRF Framework from @culturalinnovationlab. My score: ${totalScore}/80. Take the free assessment:`)}&url=${encodeURIComponent('https://culturalinnovationlab.org/assessment')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#0D1B2A', color: 'white' }}
            >
              Share on X
            </a>
          </div>

          <div className="pt-8">
            <a
              href="/survey"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-md"
              style={{ backgroundColor: '#D4A843', color: '#0D1B2A' }}
            >
              🎓 Participate in Expert Research Survey
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
