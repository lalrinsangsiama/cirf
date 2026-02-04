'use client'

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, hint, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputId = id || props.name

    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-ink mb-1.5"
          >
            {label}
            {props.required && <span className="text-terracotta ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            id={inputId}
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-lg border bg-pearl text-ink',
              'placeholder:text-stone/60',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-terracotta focus:ring-terracotta/30'
                : 'border-ink/10 focus:border-ink/30 focus:ring-ink/10',
              props.disabled && 'bg-sand/50 cursor-not-allowed opacity-60',
              isPassword && 'pr-12',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone hover:text-ink transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-terracotta">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-stone">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, hint, id, ...props }, ref) => {
    const textareaId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-ink mb-1.5"
          >
            {label}
            {props.required && <span className="text-terracotta ml-0.5">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-pearl text-ink',
            'placeholder:text-stone/60',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'resize-y min-h-[120px]',
            error
              ? 'border-terracotta focus:ring-terracotta/30'
              : 'border-ink/10 focus:border-ink/30 focus:ring-ink/10',
            props.disabled && 'bg-sand/50 cursor-not-allowed opacity-60',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-terracotta">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-1.5 text-sm text-stone">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  error?: string
  label?: string
  hint?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, hint, id, options, placeholder, ...props }, ref) => {
    const selectId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-ink mb-1.5"
          >
            {label}
            {props.required && <span className="text-terracotta ml-0.5">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-pearl text-ink',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'appearance-none bg-no-repeat bg-right pr-10',
            error
              ? 'border-terracotta focus:ring-terracotta/30'
              : 'border-ink/10 focus:border-ink/30 focus:ring-ink/10',
            props.disabled && 'bg-sand/50 cursor-not-allowed opacity-60',
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%237c7c7c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.25rem 1.25rem',
          }}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-terracotta">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1.5 text-sm text-stone">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
  label: string
  description?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, label, description, id, ...props }, ref) => {
    const checkboxId = id || props.name

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={cn(
              'h-4 w-4 rounded border-ink/20 text-ink',
              'focus:ring-2 focus:ring-ink/10 focus:ring-offset-1',
              'transition-colors duration-200',
              props.disabled && 'opacity-60 cursor-not-allowed',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            {...props}
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor={checkboxId}
            className={cn(
              'text-sm text-ink',
              props.disabled && 'opacity-60'
            )}
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-stone mt-0.5">{description}</p>
          )}
          {error && (
            <p className="text-xs text-terracotta mt-0.5">{error}</p>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
