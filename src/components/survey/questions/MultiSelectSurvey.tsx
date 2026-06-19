'use client'

import { useState, useEffect } from 'react'
import type { MultiSelectAnswer } from '@/lib/survey/types'

interface MultiSelectSurveyProps {
  questionId: string
  options: { value: string; label: string }[]
  hasOther: boolean
  maxSelections?: number
  minSelections?: number
  value: MultiSelectAnswer | undefined
  onChange: (value: MultiSelectAnswer) => void
}

export function MultiSelectSurvey({ questionId, options, hasOther, maxSelections, minSelections, value, onChange }: MultiSelectSurveyProps) {
  const selected = value?.values || []
  const [otherText, setOtherText] = useState(value?.otherText || '')
  const isAtMax = maxSelections ? selected.length >= maxSelections : false

  useEffect(() => {
    if (value?.otherText !== undefined) setOtherText(value.otherText)
  }, [value?.otherText])

  const handleToggle = (optValue: string) => {
    let next: string[]
    if (selected.includes(optValue)) {
      next = selected.filter((v) => v !== optValue)
    } else {
      if (isAtMax) return
      next = [...selected, optValue]
    }
    onChange({ values: next, otherText: next.includes('other') ? otherText : undefined })
  }

  const handleOtherText = (text: string) => {
    setOtherText(text)
    onChange({ values: selected, otherText: text })
  }

  return (
    <div className="space-y-2">
      {maxSelections && (
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300"
            style={{
              backgroundColor: selected.length === maxSelections ? 'rgba(90, 175, 110, 0.1)' : 'rgba(74, 173, 224, 0.08)',
              color: selected.length === maxSelections ? '#3d8a50' : '#4a8dad',
            }}
          >
            {selected.length} / {maxSelections} selected
            {minSelections && selected.length < minSelections && (
              <span style={{ color: '#c07557' }}> (select {minSelections})</span>
            )}
          </span>
        </div>
      )}

      {options.map((opt) => {
        const isChecked = selected.includes(opt.value)
        const isDisabled = !isChecked && isAtMax

        return (
          <label
            key={opt.value}
            className={`group flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-300 ${
              isDisabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'
            }`}
            style={{
              borderColor: isChecked ? '#5aaf6e' : 'rgba(135, 195, 230, 0.2)',
              backgroundColor: isChecked ? 'rgba(90, 175, 110, 0.04)' : 'transparent',
            }}
          >
            <input type="checkbox" name={questionId} value={opt.value} checked={isChecked} onChange={() => handleToggle(opt.value)} disabled={isDisabled} className="sr-only" />
            <span
              className="flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center"
              style={{
                borderColor: isChecked ? '#5aaf6e' : '#b0cdb8',
                backgroundColor: isChecked ? '#5aaf6e' : 'transparent',
              }}
            >
              {isChecked && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="text-[15px] leading-snug" style={{ color: '#2a4a3a' }}>{opt.label}</span>
          </label>
        )
      })}

      {hasOther && selected.includes('other') && (
        <div className="ml-8 mt-2 animate-fade-in-up">
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleOtherText(e.target.value)}
            placeholder="Please specify..."
            className="w-full px-4 py-2.5 rounded-xl border-2 text-sm focus:outline-none transition-colors duration-200"
            style={{ borderColor: 'rgba(90, 175, 110, 0.25)', color: '#2a4a3a', backgroundColor: 'rgba(255,255,255,0.6)' }}
            onFocus={(e) => (e.target.style.borderColor = '#5aaf6e')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(90, 175, 110, 0.25)')}
          />
        </div>
      )}
    </div>
  )
}
