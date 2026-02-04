'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  children: ReactNode
  className?: string
}

export function FormField({ children, className }: FormFieldProps) {
  return <div className={cn('space-y-1.5', className)}>{children}</div>
}

interface FormLabelProps {
  htmlFor?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function FormLabel({
  htmlFor,
  required,
  children,
  className,
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block text-sm font-medium text-ink', className)}
    >
      {children}
      {required && <span className="text-terracotta ml-0.5">*</span>}
    </label>
  )
}

interface FormErrorProps {
  children: ReactNode
  className?: string
}

export function FormError({ children, className }: FormErrorProps) {
  if (!children) return null

  return (
    <p className={cn('text-sm text-terracotta', className)} role="alert">
      {children}
    </p>
  )
}

interface FormHintProps {
  children: ReactNode
  className?: string
}

export function FormHint({ children, className }: FormHintProps) {
  return <p className={cn('text-sm text-stone', className)}>{children}</p>
}

interface FormGroupProps {
  children: ReactNode
  className?: string
}

export function FormGroup({ children, className }: FormGroupProps) {
  return <div className={cn('space-y-4', className)}>{children}</div>
}

interface FormRowProps {
  children: ReactNode
  className?: string
}

export function FormRow({ children, className }: FormRowProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      {children}
    </div>
  )
}

interface FormSectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="border-b border-ink/10 pb-4">
          {title && (
            <h3 className="text-lg font-medium text-ink">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-stone">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
