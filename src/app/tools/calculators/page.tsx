'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, Calculator, Lock, Unlock, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { TOOL_CONFIGS, ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'
import { TOOL_PAGE_CONFIGS } from '@/lib/data/toolPageConfigs'
import { createClient } from '@/lib/supabase/client'

export default function CalculatorsPage() {
  const { user } = useAuth()
  const [unlockedToolIds, setUnlockedToolIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  // Fetch tool access
  useEffect(() => {
    async function fetchAccess() {
      if (!user) {
        setUnlockedToolIds(new Set())
        return
      }

      setLoading(true)
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('tool_access')
          .select('tool_id')
          .eq('user_id', user.id)

        if (data) {
          setUnlockedToolIds(new Set(data.map(t => t.tool_id)))
        }
      } catch {
        console.error('Error fetching tool access')
      }
      setLoading(false)
    }

    fetchAccess()
  }, [user])

  const allTools = Object.values(TOOL_CONFIGS)

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-gradient-to-br from-lavender to-pearl">
        <div className="max-w-[1600px] mx-auto">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-stone hover:text-ink transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Interactive Calculators
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Calculators &</span></span>
            <span className="hero-line"><span className="italic">KPI Tools</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Interactive tools for measuring and tracking cultural innovation impact. Complete assessments to unlock specialized calculators.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          {user && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-sage" />
                </div>
                <span className="text-sm text-stone">
                  {unlockedToolIds.size} of {allTools.length} tools unlocked
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTools.map((tool, index) => {
              const isUnlocked = unlockedToolIds.has(tool.id)
              const pageConfig = TOOL_PAGE_CONFIGS[tool.id]
              const assessment = ASSESSMENT_CONFIGS[tool.unlockedByAssessment]

              return (
                <article
                  key={tool.id}
                  className={cn(
                    'bg-white border border-ink/10 rounded-xl p-6 transition-all duration-300 relative',
                    isUnlocked ? 'hover:shadow-lg hover:-translate-y-1' : 'opacity-70'
                  )}
                >
                  {/* Number + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-light text-gold/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {user && (
                      isUnlocked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full">
                          <Unlock className="w-3 h-3" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-sand text-stone text-xs font-medium rounded-full">
                          <Lock className="w-3 h-3" />
                          Locked
                        </span>
                      )
                    )}
                  </div>

                  <h3 className="text-lg font-medium mb-1">{tool.name}</h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-stone mb-3">{tool.category}</p>
                  <p className="text-sm text-stone mb-4">{tool.description}</p>

                  {/* Formula preview */}
                  {pageConfig && (
                    <div className="bg-ink/5 p-3 rounded-lg font-mono text-xs mb-4">
                      {pageConfig.formula}
                    </div>
                  )}

                  {/* Unlocked by */}
                  <p className="text-xs text-stone mb-4">
                    Unlocked by: <strong>{assessment?.name || tool.unlockedByAssessment}</strong>
                  </p>

                  {isUnlocked ? (
                    <Link
                      href={`/tools/${tool.id}`}
                      className="btn-primary text-sm inline-flex items-center gap-2"
                    >
                      Open Calculator
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      href={`/assessments/${tool.unlockedByAssessment}`}
                      className="btn-secondary text-sm inline-flex items-center gap-2"
                    >
                      <Lock className="w-3 h-3" />
                      Take {assessment?.name || 'Assessment'} to Unlock
                    </Link>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
