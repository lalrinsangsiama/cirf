'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, Info } from 'lucide-react'
import { TOOL_CONFIGS } from '@/lib/data/assessmentConfig'
import type { ToolPageConfig } from '@/lib/data/toolPageConfigs'

interface InteractiveCalculatorProps {
  config: ToolPageConfig
  prefillValues?: Record<string, number>
  prefillSource?: string
}

export default function InteractiveCalculator({ config, prefillValues, prefillSource }: InteractiveCalculatorProps) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {}
    for (const input of config.inputs) {
      defaults[input.id] = prefillValues?.[input.id] ?? input.defaultValue
    }
    return defaults
  })
  const [hasPrefill] = useState(() => !!prefillValues && Object.keys(prefillValues).length > 0)

  // Update values if prefillValues arrive after initial render
  useEffect(() => {
    if (prefillValues && Object.keys(prefillValues).length > 0) {
      setValues(prev => {
        const updated = { ...prev }
        for (const [key, value] of Object.entries(prefillValues)) {
          updated[key] = value
        }
        return updated
      })
    }
  }, [prefillValues])

  const result = useMemo(() => config.calculate(values), [config, values])
  const formattedResult = config.formatResult(result)

  const interpretation = useMemo(() => {
    for (const interp of config.interpretations) {
      if (result >= interp.min && result < interp.max) {
        return interp
      }
    }
    // Fallback to last interpretation
    return config.interpretations[config.interpretations.length - 1]
  }, [config, result])

  const colorMap: Record<string, string> = {
    terracotta: 'bg-terracotta/20 text-terracotta border-terracotta/30',
    gold: 'bg-gold/20 text-gold border-gold/30',
    ocean: 'bg-ocean/20 text-ocean border-ocean/30',
    sage: 'bg-sage/20 text-sage border-sage/30',
  }

  const barColorMap: Record<string, string> = {
    terracotta: 'bg-terracotta',
    gold: 'bg-gold',
    ocean: 'bg-ocean',
    sage: 'bg-sage',
  }

  const handleInputChange = (id: string, rawValue: string, input: typeof config.inputs[0]) => {
    const parsed = parseFloat(rawValue)
    if (isNaN(parsed)) return
    const clamped = Math.min(input.max, Math.max(input.min, parsed))
    setValues(prev => ({ ...prev, [id]: clamped }))
  }

  return (
    <div className="space-y-8">
      {/* Prefill Banner */}
      {hasPrefill && prefillSource && (
        <div className="bg-sage/10 border border-sage/20 px-4 py-3 rounded-lg flex items-start gap-2">
          <Info className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
          <p className="text-sm text-ink/70">
            Pre-filled from your <strong>{prefillSource}</strong> assessment results. Adjust the values as needed.
          </p>
        </div>
      )}

      {/* Formula */}
      <div className="bg-ink/5 p-4 rounded-lg">
        <p className="font-mono text-sm mb-2">{config.formula}</p>
        <p className="text-sm text-stone">{config.formulaExplanation}</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.inputs.map((input) => (
          <div key={input.id}>
            <label className="block text-sm font-medium mb-2">{input.label}</label>
            {input.helpText && (
              <p className="text-xs text-stone mb-2 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                {input.helpText}
              </p>
            )}
            {input.type === 'slider' ? (
              <div>
                <input
                  type="range"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={values[input.id]}
                  onChange={(e) => handleInputChange(input.id, e.target.value, input)}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between text-xs text-stone mt-1">
                  <span>{input.min}</span>
                  <span className="font-medium text-ink text-sm">{values[input.id]}</span>
                  <span>{input.max}</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                {input.unit === '$' && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone">$</span>
                )}
                <input
                  type="number"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={values[input.id]}
                  onChange={(e) => handleInputChange(input.id, e.target.value, input)}
                  className={cn(
                    'w-full p-3 border border-ink/20 rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all',
                    input.unit === '$' && 'pl-8',
                    input.unit === '%' && 'pr-8'
                  )}
                />
                {input.unit === '%' && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone">%</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="bg-gradient-to-br from-sand to-pearl p-8 rounded-lg text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-stone mb-2">Result</p>
        <p className="font-serif text-5xl mb-3">{formattedResult}</p>
        {interpretation && (
          <span className={cn(
            'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border',
            colorMap[interpretation.color] || colorMap.gold
          )}>
            {interpretation.label}
          </span>
        )}
      </div>

      {/* Interpretation */}
      {interpretation && (
        <div className="space-y-4">
          <div className={cn(
            'p-4 rounded-lg border',
            `bg-${interpretation.color}/10 border-${interpretation.color}/20`
          )}>
            <p className="text-sm">{interpretation.description}</p>
          </div>

          {/* Visual scale */}
          <div className="relative h-3 bg-ink/10 rounded-full overflow-hidden">
            {config.interpretations.map((interp, i) => {
              const totalRange = config.interpretations[config.interpretations.length - 1].max === Infinity
                ? config.interpretations[config.interpretations.length - 2].max * 1.5
                : config.interpretations[config.interpretations.length - 1].max
              const width = ((Math.min(interp.max, totalRange) - interp.min) / totalRange) * 100
              const left = (interp.min / totalRange) * 100
              return (
                <div
                  key={i}
                  className={cn('absolute h-full', barColorMap[interp.color] || 'bg-gold')}
                  style={{ left: `${left}%`, width: `${width}%`, opacity: interp === interpretation ? 1 : 0.2 }}
                />
              )
            })}
          </div>

          {/* Action items */}
          {interpretation.actions.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-3">Recommended Actions</h4>
              <ul className="space-y-2">
                {interpretation.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-gold mt-0.5">→</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Related Tools */}
      {config.relatedTools.length > 0 && (
        <div className="border-t border-ink/10 pt-6">
          <h4 className="font-medium text-sm mb-3">Related Tools</h4>
          <div className="flex flex-wrap gap-2">
            {config.relatedTools.map((toolId) => {
              const toolConfig = TOOL_CONFIGS[toolId]
              if (!toolConfig) return null
              return (
                <Link
                  key={toolId}
                  href={`/tools/${toolId}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-sand hover:bg-ink hover:text-pearl text-sm rounded-full transition-colors"
                >
                  {toolConfig.name}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
