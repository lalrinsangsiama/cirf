'use client'

import { useRef, useEffect } from 'react'
import type { OpenTextAnswer } from '@/lib/survey/types'

interface OpenTextProps {
  questionId: string
  placeholder?: string
  maxLength?: number
  rows?: number
  value: OpenTextAnswer | undefined
  onChange: (value: OpenTextAnswer) => void
}

export function OpenText({ questionId, placeholder = 'Your response...', maxLength = 5000, rows = 4, value = '', onChange }: OpenTextProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(el.scrollHeight, rows * 28)}px`
  }, [value, rows])

  return (
    <div className="space-y-2">
      <textarea
        ref={ref}
        id={questionId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="w-full px-4 py-3 rounded-2xl border-2 text-[15px] leading-relaxed resize-none focus:outline-none focus:ring-0 transition-all duration-300"
        style={{
          borderColor: value ? 'rgba(74, 173, 224, 0.3)' : 'rgba(135, 195, 230, 0.2)',
          color: '#2a4a3a',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          minHeight: `${rows * 28}px`,
        }}
        onFocus={(e) => { e.target.style.borderColor = '#4aade0'; e.target.style.backgroundColor = 'rgba(255,255,255,0.7)' }}
        onBlur={(e) => { e.target.style.borderColor = value ? 'rgba(74, 173, 224, 0.3)' : 'rgba(135, 195, 230, 0.2)'; e.target.style.backgroundColor = 'rgba(255,255,255,0.5)' }}
      />
      {value.length > 0 && (
        <div className="flex justify-end">
          <span className="text-[11px]" style={{ color: '#9abccc' }}>
            {value.length.toLocaleString()} / {maxLength.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}
