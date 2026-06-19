'use client'

import type { ConsentAnswer } from '@/lib/survey/types'

interface ConsentCheckboxProps {
  consentText: string
  value: ConsentAnswer
  onChange: (value: ConsentAnswer) => void
}

export function ConsentCheckbox({ consentText, value, onChange }: ConsentCheckboxProps) {
  return (
    <label
      className="group flex items-start gap-4 cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-sm select-none"
      style={{
        borderColor: value ? '#5aaf6e' : 'rgba(135, 195, 230, 0.25)',
        backgroundColor: value ? 'rgba(90, 175, 110, 0.04)' : 'transparent',
      }}
    >
      <span className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className="flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all duration-300"
          style={{
            borderColor: value ? '#5aaf6e' : '#b0cdb8',
            backgroundColor: value ? '#5aaf6e' : 'transparent',
          }}
        >
          {value && (
            <svg className="w-4 h-4 text-white animate-fade-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </span>
      <span className="leading-relaxed text-[15px]" style={{ color: '#3a5a4a' }}>{consentText}</span>
    </label>
  )
}
