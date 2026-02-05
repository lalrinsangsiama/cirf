'use client'

import { ReactNode, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ExpandableSectionProps {
  summary: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

export function ExpandableSection({
  summary,
  children,
  defaultOpen = false,
  className = '',
}: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`border border-ink/10 rounded-lg overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-sand/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-ink/80">{summary}</span>
        <ChevronDown
          className={`w-4 h-4 text-ink/60 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 text-sm text-ink/70 leading-relaxed border-t border-ink/10">
          {children}
        </div>
      </div>
    </div>
  )
}
