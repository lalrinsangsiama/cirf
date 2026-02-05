'use client'

import { ReactNode, useState, useRef, useEffect } from 'react'

interface InfoTooltipProps {
  children: ReactNode
  explanation: string
  className?: string
}

export function InfoTooltip({ children, explanation, className = '' }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipHeight = tooltipRef.current.offsetHeight
      const spaceAbove = triggerRect.top
      const spaceBelow = window.innerHeight - triggerRect.bottom

      // Prefer top, but use bottom if not enough space
      if (spaceAbove < tooltipHeight + 8 && spaceBelow > tooltipHeight + 8) {
        setPosition('bottom')
      } else {
        setPosition('top')
      }
    }
  }, [isVisible])

  return (
    <span className="relative inline-block">
      <span
        ref={triggerRef}
        className={`border-b border-dotted border-gold cursor-help ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        onTouchStart={() => setIsVisible(!isVisible)}
        tabIndex={0}
        role="button"
        aria-describedby={isVisible ? 'tooltip' : undefined}
      >
        {children}
      </span>
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className={`absolute z-50 w-64 px-3 py-2 text-sm bg-ink text-pearl rounded-lg shadow-lg
            ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
            left-1/2 -translate-x-1/2
            animate-fade-in`}
          style={{ animationDuration: '150ms' }}
        >
          {explanation}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45
              ${position === 'top' ? 'top-full -mt-1' : 'bottom-full -mb-1'}`}
          />
        </div>
      )}
    </span>
  )
}
