'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Lock, ArrowLeft, ChevronRight, Loader2 } from 'lucide-react'
import { TOOL_CONFIGS, ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'
import { getToolPageConfig } from '@/lib/data/toolPageConfigs'
import { TOOL_PREFILL_MAPPINGS, scaleScoreToInput } from '@/lib/data/toolPrefillMappings'
import InteractiveCalculator from '@/components/tools/InteractiveCalculator'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ToolPage({ params }: PageProps) {
  const { id: toolId } = use(params)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(true)
  const [prefillValues, setPrefillValues] = useState<Record<string, number> | null>(null)
  const [assessmentName, setAssessmentName] = useState<string | null>(null)

  const toolConfig = TOOL_CONFIGS[toolId]
  const pageConfig = getToolPageConfig(toolId)

  // Check if tool exists
  useEffect(() => {
    if (!toolConfig || !pageConfig) {
      router.push('/tools/calculators')
    }
  }, [toolConfig, pageConfig, router])

  // Check access
  useEffect(() => {
    async function checkAccess() {
      if (!user) {
        setHasAccess(false)
        setChecking(false)
        return
      }

      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('tool_access')
          .select('tool_id')
          .eq('user_id', user.id)
          .eq('tool_id', toolId)
          .maybeSingle()

        setHasAccess(!!data)
      } catch {
        setHasAccess(false)
      }
      setChecking(false)
    }

    if (authLoading) return
    checkAccess()
  }, [user, authLoading, toolId])

  // Fetch assessment scores for prefill
  useEffect(() => {
    async function fetchPrefill() {
      if (!user || !hasAccess) return

      const mapping = TOOL_PREFILL_MAPPINGS[toolId]
      if (!mapping || !pageConfig) return

      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('assessments')
          .select('score, section_scores, assessment_type')
          .eq('user_id', user.id)
          .eq('assessment_type', mapping.assessmentType)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (data?.section_scores) {
          const scores = data.section_scores as Record<string, number>
          const values: Record<string, number> = {}

          for (const [inputId, sectionId] of Object.entries(mapping.inputMappings)) {
            const sectionScore = scores[sectionId]
            if (sectionScore != null) {
              const input = pageConfig.inputs.find(i => i.id === inputId)
              if (input) {
                values[inputId] = scaleScoreToInput(sectionScore, input.min, input.max)
              }
            }
          }

          if (Object.keys(values).length > 0) {
            setPrefillValues(values)
            const configName = ASSESSMENT_CONFIGS[mapping.assessmentType as keyof typeof ASSESSMENT_CONFIGS]?.name
            setAssessmentName(configName || mapping.assessmentType.toUpperCase())
          }
        }
      } catch {
        // Prefill is best-effort — silently ignore errors
      }
    }

    fetchPrefill()
  }, [user, hasAccess, toolId, pageConfig])

  if (!toolConfig || !pageConfig) {
    return null
  }

  if (authLoading || checking) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    )
  }

  // Locked state
  if (!hasAccess) {
    const requiredAssessment = toolConfig.unlockedByAssessment
    const assessmentName = requiredAssessment
      ? (requiredAssessment === 'cimm' ? 'CIMM' :
         requiredAssessment === 'cira' ? 'CIRA' :
         requiredAssessment === 'tbl' ? 'TBL-CI' :
         requiredAssessment === 'ciss' ? 'CISS' :
         requiredAssessment === 'pricing' ? 'Pricing' : requiredAssessment)
      : 'a required'

    return (
      <div className="min-h-screen bg-pearl">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-ink/40" />
              </div>
              <h1 className="text-2xl font-serif text-ink mb-2">{toolConfig.name}</h1>
              <p className="text-stone mb-6">
                This tool is locked. Complete the <strong>{assessmentName}</strong> assessment to unlock it.
                {!user && <> You also need to be signed in.</>}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user ? (
                  <Link
                    href={`/auth/login?redirectTo=${encodeURIComponent(`/tools/${toolId}`)}`}
                    className="btn-primary"
                  >
                    Sign In
                  </Link>
                ) : requiredAssessment ? (
                  <Link href={`/assessments/${requiredAssessment}`} className="btn-primary">
                    Take {assessmentName} Assessment
                  </Link>
                ) : null}
                <Link href="/tools/calculators" className="btn-secondary">
                  Back to Calculators
                </Link>
              </div>
            </div>

            {/* Tool Preview — shows what the user will get */}
            <div className="border-t border-stone/10 pt-6 opacity-60">
              <p className="text-xs uppercase tracking-wide text-stone mb-3">What you&apos;ll get</p>
              <p className="text-sm text-stone mb-4">{pageConfig.description}</p>

              {pageConfig.formula && (
                <div className="bg-sand/50 rounded-lg p-4 mb-4">
                  <p className="text-xs uppercase tracking-wide text-stone mb-1">Formula</p>
                  <p className="text-sm font-mono text-ink/70">{pageConfig.formula}</p>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-stone">Inputs</p>
                {pageConfig.inputs.map((input) => (
                  <div key={input.id} className="flex items-center gap-2 text-sm text-ink/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                    {input.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pearl py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-stone mb-6">
          <Link href="/tools" className="hover:text-ink transition-colors">Tools</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/tools/calculators" className="hover:text-ink transition-colors">Calculators</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink font-medium">{toolConfig.name}</span>
        </nav>

        {/* Header */}
        <div className="bg-ink rounded-t-2xl py-6 px-8">
          <Link
            href="/tools/calculators"
            className="text-pearl/60 text-sm hover:text-pearl transition-colors mb-2 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Calculators
          </Link>
          <h1 className="text-2xl font-serif text-pearl">{pageConfig.name}</h1>
          <p className="text-pearl/70 text-sm mt-1">{pageConfig.description}</p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <InteractiveCalculator
            config={pageConfig}
            prefillValues={prefillValues || undefined}
            prefillSource={assessmentName || undefined}
          />
        </div>
      </div>
    </div>
  )
}
