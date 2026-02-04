'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface TermsCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
}

export const TermsCheckbox = forwardRef<HTMLInputElement, TermsCheckboxProps>(
  ({ className, error, id = 'terms', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id={id}
              ref={ref}
              className={cn(
                'h-4 w-4 rounded border-ink/20 text-ink',
                'focus:ring-2 focus:ring-ink/10 focus:ring-offset-1',
                'transition-colors duration-200',
                props.disabled && 'opacity-60 cursor-not-allowed',
                error && 'border-terracotta',
                className
              )}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              {...props}
            />
          </div>
          <label
            htmlFor={id}
            className={cn(
              'ml-3 text-sm text-stone',
              props.disabled && 'opacity-60'
            )}
          >
            I agree to the{' '}
            <Link
              href="/terms"
              className="text-ocean hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-ocean hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            <span className="text-terracotta ml-0.5">*</span>
          </label>
        </div>
        {error && (
          <p id={`${id}-error`} className="text-sm text-terracotta ml-7">
            {error}
          </p>
        )}
      </div>
    )
  }
)

TermsCheckbox.displayName = 'TermsCheckbox'
