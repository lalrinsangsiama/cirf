'use client'

import { useState, useEffect } from 'react'
import type { SingleSelectAnswer } from '@/lib/survey/types'

interface SingleSelectProps {
  questionId: string
  options: { value: string; label: string }[]
  hasOther: boolean
  conditionalTextOn?: string
  value: SingleSelectAnswer | undefined
  onChange: (value: SingleSelectAnswer) => void
}

export function SingleSelect({ questionId, options, hasOther, conditionalTextOn, value, onChange }: SingleSelectProps) {
  const selected = value?.value || ''
  const [otherText, setOtherText] = useState(value?.otherText || '')
  const showTextField = conditionalTextOn && selected === conditionalTextOn

  useEffect(() => {
    if (value?.otherText !== undefined) setOtherText(value.otherText)
  }, [value?.otherText])

  const handleSelect = (optValue: string) => {
    const next: SingleSelectAnswer = { value: optValue }
    if (conditionalTextOn && optValue === conditionalTextOn) next.otherText = otherText
    onChange(next)
  }

  const handleOtherText = (text: string) => {
    setOtherText(text)
    onChange({ value: selected, otherText: text })
  }

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="group flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300"
          style={{
            borderColor: selected === opt.value ? '#4aade0' : 'rgba(135, 195, 230, 0.2)',
            backgroundColor: selected === opt.value ? 'rgba(74, 173, 224, 0.04)' : 'transparent',
          }}
          onMouseEnter={(e) => { if (selected !== opt.value) e.currentTarget.style.borderColor = 'rgba(74, 173, 224, 0.4)' }}
          onMouseLeave={(e) => { if (selected !== opt.value) e.currentTarget.style.borderColor = 'rgba(135, 195, 230, 0.2)' }}
        >
          <input type="radio" name={questionId} value={opt.value} checked={selected === opt.value} onChange={() => handleSelect(opt.value)} className="sr-only" />
          <span
            className="flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
            style={{ borderColor: selected === opt.value ? '#4aade0' : '#b0cdd8' }}
          >
            {selected === opt.value && (
              <span className="w-2.5 h-2.5 rounded-full animate-fade-in" style={{ backgroundColor: '#4aade0' }} />
            )}
          </span>
          <span className="text-[15px] leading-snug" style={{ color: '#2a4a3a' }}>{opt.label}</span>
        </label>
      ))}

      {showTextField && (
        <div className="ml-8 mt-2 animate-fade-in-up">
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleOtherText(e.target.value)}
            placeholder="Please specify..."
            className="w-full px-4 py-2.5 rounded-xl border-2 text-sm focus:outline-none transition-colors duration-200"
            style={{
              borderColor: 'rgba(74, 173, 224, 0.25)',
              color: '#2a4a3a',
              backgroundColor: 'rgba(255,255,255,0.6)',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#4aade0')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(74, 173, 224, 0.25)')}
          />
        </div>
      )}
    </div>
  )
}
