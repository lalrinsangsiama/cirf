'use client'

import { useState } from 'react'
import {
  CIRF_PILLARS,
  SCALE_LABELS,
  ROLE_OPTIONS,
  SECTOR_OPTIONS,
  getOverallLabel,
  getPillarInterpretation,
  RECOMMENDATIONS,
} from '@/lib/data/cirfAssessmentData'
import { CIRFResults } from './CIRFResults'

type Answers = Record<string, number>
type Step = 'info' | 1 | 2 | 3 | 4 | 'results'

export function CIRFAssessment() {
  const [step, setStep] = useState<Step>('info')
  const [answers, setAnswers] = useState<Answers>({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [country, setCountry] = useState('')
  const [sectors, setSectors] = useState<string[]>([])
  const [animClass, setAnimClass] = useState('animate-fade-in-up')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailStatus, setEmailStatus] = useState<'pending' | 'sent' | 'failed'>('pending')

  const pillarOrder: Step[] = ['info', 1, 2, 3, 4, 'results']
  const currentIdx = pillarOrder.indexOf(step)
  const progress = Math.round((currentIdx / (pillarOrder.length - 1)) * 100)

  const goTo = (next: Step) => {
    setAnimClass('survey-exit-left')
    setTimeout(() => {
      setStep(next)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setAnimClass('survey-enter-right')
      setTimeout(() => setAnimClass(''), 400)
    }, 250)
  }

  const handleAnswer = (qId: string, val: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }))
  }

  const toggleSector = (s: string) => {
    setSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Persist the lead (best-effort) ...
    try {
      await fetch('/api/survey/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: `cirf-${crypto.randomUUID()}`,
          answers: { type: 'cirf-assessment', email, name, role, country, sectors, ...answers },
          currentScreen: 99,
        }),
      })
    } catch { /* silent */ }
    // ... and email the promised results + toolkit. Track the outcome so we
    // can tell the user if the promised email didn't go out.
    try {
      const res = await fetch('/api/assessments/cirf-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined, answers }),
      })
      setEmailStatus(res.ok ? 'sent' : 'failed')
    } catch {
      setEmailStatus('failed')
    }
    goTo('results')
    setIsSubmitting(false)
  }

  // Calculate scores
  const pillarScores = CIRF_PILLARS.map((p) => {
    const score = p.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
    return { pillar: p, score }
  })
  const totalScore = pillarScores.reduce((s, p) => s + p.score, 0)

  // Validation
  const infoValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  const pillarValid = (pillarId: number) => {
    const pillar = CIRF_PILLARS.find((p) => p.id === pillarId)
    return pillar ? pillar.questions.every((q) => answers[q.id]) : false
  }

  // Current pillar
  const currentPillar = typeof step === 'number' ? CIRF_PILLARS.find((p) => p.id === step) : null

  if (step === 'results') {
    return (
      <>
        {emailStatus === 'failed' && (
          <div
            role="alert"
            className="max-w-3xl mx-auto mt-6 px-6 py-4 rounded-xl text-sm"
            style={{ backgroundColor: '#FDF0EC', color: '#9A4B32', border: '1px solid #E8C4B5' }}
          >
            We couldn&apos;t send your results email to {email}. Your results are shown below — please
            double-check your email address or contact us at hello@culturalinnovationlab.org for the toolkit.
          </div>
        )}
        <CIRFResults pillarScores={pillarScores} totalScore={totalScore} name={name} />
      </>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Progress */}
      <div className="sticky top-16 z-40" style={{ backgroundColor: 'rgba(250, 247, 242, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div className="h-1.5 w-full" style={{ backgroundColor: 'rgba(26, 138, 125, 0.08)' }}>
          <div className="h-full rounded-r-full transition-all duration-700" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #1A8A7D, #D4A843)' }} />
        </div>
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {pillarOrder.slice(0, -1).map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300"
                  style={{
                    backgroundColor: i < currentIdx ? '#1A8A7D' : i === currentIdx ? 'rgba(26, 138, 125, 0.12)' : 'rgba(0,0,0,0.04)',
                    color: i < currentIdx ? 'white' : i === currentIdx ? '#1A8A7D' : '#999',
                    border: i === currentIdx ? '2px solid #1A8A7D' : 'none',
                  }}
                >
                  {i < currentIdx ? '✓' : i === 0 ? '✉' : i}
                </div>
                {i < pillarOrder.length - 2 && <div className="w-4 h-px" style={{ backgroundColor: i < currentIdx ? '#1A8A7D' : '#e0dbd4' }} />}
              </div>
            ))}
          </div>
          <span className="text-xs font-medium" style={{ color: '#1A8A7D' }}>{progress}%</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className={animClass}>
          {/* ── Step: Info ── */}
          {step === 'info' && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A8A7D' }}>Step 1 of 5</p>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
                Your Information
              </h2>
              <p className="text-sm mb-8" style={{ color: '#4a5568' }}>
                Your results and a free copy of the Cultural Innovation Strategy Toolkit will be sent to your email.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0D1B2A' }}>Name <span style={{ color: '#999' }}>(optional)</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                    style={{ borderColor: '#e0dbd4', backgroundColor: 'white' }}
                    onFocus={(e) => e.target.style.borderColor = '#1A8A7D'}
                    onBlur={(e) => e.target.style.borderColor = '#e0dbd4'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0D1B2A' }}>Email <span style={{ color: '#E07A5F' }}>*</span></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                    style={{ borderColor: '#e0dbd4', backgroundColor: 'white' }}
                    onFocus={(e) => e.target.style.borderColor = '#1A8A7D'}
                    onBlur={(e) => e.target.style.borderColor = '#e0dbd4'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0D1B2A' }}>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors bg-white"
                    style={{ borderColor: '#e0dbd4' }}
                  >
                    <option value="">Select your role</option>
                    {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0D1B2A' }}>Country</label>
                  <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Your country"
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                    style={{ borderColor: '#e0dbd4', backgroundColor: 'white' }}
                    onFocus={(e) => e.target.style.borderColor = '#1A8A7D'}
                    onBlur={(e) => e.target.style.borderColor = '#e0dbd4'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0D1B2A' }}>Sector(s)</label>
                  <div className="flex flex-wrap gap-2">
                    {SECTOR_OPTIONS.map((s) => (
                      <button key={s} type="button" onClick={() => toggleSector(s)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                        style={{
                          backgroundColor: sectors.includes(s) ? '#1A8A7D' : 'white',
                          color: sectors.includes(s) ? 'white' : '#4a5568',
                          border: `1.5px solid ${sectors.includes(s) ? '#1A8A7D' : '#e0dbd4'}`,
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button onClick={() => goTo(1)} disabled={!infoValid}
                  className="px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 disabled:opacity-40"
                  style={{ backgroundColor: '#1A8A7D', boxShadow: infoValid ? '0 4px 14px rgba(26, 138, 125, 0.25)' : 'none' }}
                >
                  Start Assessment →
                </button>
              </div>
            </div>
          )}

          {/* ── Pillar Steps ── */}
          {currentPillar && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{currentPillar.icon}</span>
                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: currentPillar.color }}>
                  Pillar {currentPillar.id} of 4
                </p>
              </div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
                {currentPillar.title}
              </h2>
              <p className="text-sm mb-10" style={{ color: '#4a5568' }}>
                Rate each statement on a scale of 1 (Not Present) to 5 (Leading).
              </p>

              <div className="space-y-8">
                {currentPillar.questions.map((q, qi) => (
                  <div key={q.id}>
                    <p className="text-[15px] font-medium mb-4" style={{ color: '#0D1B2A' }}>
                      <span style={{ color: currentPillar.color }} className="font-bold mr-2">Q{qi + 1}.</span>
                      {q.text}
                    </p>
                    <div className="flex items-center gap-2 md:gap-3">
                      {SCALE_LABELS.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => handleAnswer(q.id, s.value)}
                          className="flex-1 py-3 rounded-xl text-center transition-all duration-300"
                          style={{
                            backgroundColor: answers[q.id] === s.value ? currentPillar.color : 'white',
                            color: answers[q.id] === s.value ? 'white' : '#4a5568',
                            border: `2px solid ${answers[q.id] === s.value ? currentPillar.color : '#e0dbd4'}`,
                            boxShadow: answers[q.id] === s.value ? `0 3px 10px ${currentPillar.color}25` : 'none',
                            transform: answers[q.id] === s.value ? 'scale(1.02)' : 'scale(1)',
                          }}
                        >
                          <span className="block text-lg font-bold">{s.value}</span>
                          <span className="block text-[10px] md:text-xs mt-0.5 opacity-80">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex items-center justify-between">
                <button
                  onClick={() => goTo(step === 1 ? 'info' : ((step as number) - 1) as Step)}
                  className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200"
                  style={{ color: '#4a5568' }}
                >
                  ← Back
                </button>

                {step === 4 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!pillarValid(4) || isSubmitting}
                    className="px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 disabled:opacity-40"
                    style={{ backgroundColor: '#1A8A7D', boxShadow: '0 4px 14px rgba(26, 138, 125, 0.25)' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'See My Results →'}
                  </button>
                ) : (
                  <button
                    onClick={() => goTo(((step as number) + 1) as Step)}
                    disabled={!pillarValid(step as number)}
                    className="px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 disabled:opacity-40"
                    style={{ backgroundColor: currentPillar.color, boxShadow: `0 4px 14px ${currentPillar.color}30` }}
                  >
                    Next Pillar →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
