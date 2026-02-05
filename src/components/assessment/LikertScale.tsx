'use client'

import { cn } from '@/lib/utils'

export interface LikertScaleProps {
  value: number | null
  onChange: (value: number) => void
  disabled?: boolean
  showLabels?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'compact' | 'horizontal'
}

const LIKERT_LABELS = [
  { value: 1, short: '1', full: 'Strongly Disagree' },
  { value: 2, short: '2', full: 'Disagree' },
  { value: 3, short: '3', full: 'Somewhat Disagree' },
  { value: 4, short: '4', full: 'Neutral' },
  { value: 5, short: '5', full: 'Somewhat Agree' },
  { value: 6, short: '6', full: 'Agree' },
  { value: 7, short: '7', full: 'Strongly Agree' },
]

export function LikertScale({
  value,
  onChange,
  disabled = false,
  showLabels = true,
  size = 'md',
  variant = 'default',
}: LikertScaleProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  const getButtonColor = (buttonValue: number, selected: boolean) => {
    if (!selected) return 'bg-sand hover:bg-ink/10'

    // Color gradient from red (disagree) to green (agree)
    if (buttonValue <= 2) return 'bg-terracotta text-white'
    if (buttonValue === 3) return 'bg-orange-500 text-white'
    if (buttonValue === 4) return 'bg-gold text-ink'
    if (buttonValue === 5) return 'bg-lime-500 text-white'
    if (buttonValue >= 6) return 'bg-sage text-white'

    return 'bg-ink text-white'
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1">
        {LIKERT_LABELS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => !disabled && onChange(item.value)}
            disabled={disabled}
            className={cn(
              'rounded-full flex items-center justify-center font-medium transition-all duration-200',
              sizeClasses[size],
              getButtonColor(item.value, value === item.value),
              disabled && 'opacity-50 cursor-not-allowed',
              !disabled && 'hover:scale-110'
            )}
            title={item.full}
            aria-label={item.full}
          >
            {item.short}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center gap-2">
          {LIKERT_LABELS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => !disabled && onChange(item.value)}
              disabled={disabled}
              className={cn(
                'flex-1 rounded-lg py-3 px-2 flex flex-col items-center gap-1 transition-all duration-200 border-2',
                value === item.value
                  ? 'border-gold bg-gold/10'
                  : 'border-transparent bg-sand hover:bg-ink/10',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label={item.full}
            >
              <span
                className={cn(
                  'rounded-full flex items-center justify-center font-medium',
                  size === 'sm' ? 'w-6 h-6 text-xs' : size === 'lg' ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm',
                  getButtonColor(item.value, value === item.value)
                )}
              >
                {item.short}
              </span>
              {showLabels && (
                <span className="text-xs text-stone text-center leading-tight hidden sm:block">
                  {item.value === 1 ? 'Strongly Disagree' : item.value === 7 ? 'Strongly Agree' : ''}
                </span>
              )}
            </button>
          ))}
        </div>
        {showLabels && (
          <div className="flex justify-between mt-2 text-xs text-stone sm:hidden">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className="space-y-3">
      {showLabels && (
        <div className="flex justify-between text-xs text-stone">
          <span>Strongly Disagree</span>
          <span>Neutral</span>
          <span>Strongly Agree</span>
        </div>
      )}
      <div className="flex justify-between items-center gap-2">
        {LIKERT_LABELS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => !disabled && onChange(item.value)}
            disabled={disabled}
            className={cn(
              'rounded-full flex items-center justify-center font-medium transition-all duration-200',
              sizeClasses[size],
              getButtonColor(item.value, value === item.value),
              disabled && 'opacity-50 cursor-not-allowed',
              !disabled && 'hover:scale-110 hover:shadow-md'
            )}
            title={item.full}
            aria-label={item.full}
          >
            {item.short}
          </button>
        ))}
      </div>
    </div>
  )
}

// Categorical select for demographic questions
export interface CategoricalSelectProps {
  value: string | null
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  disabled?: boolean
  placeholder?: string
}

export function CategoricalSelect({
  value,
  onChange,
  options,
  disabled = false,
  placeholder = 'Select an option',
}: CategoricalSelectProps) {
  return (
    <div className="space-y-2">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-ink/20 bg-white text-ink',
          'focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold',
          'transition-all duration-200',
          disabled && 'opacity-50 cursor-not-allowed',
          !value && 'text-stone'
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// Progress indicator for assessment sections
export interface SectionProgressProps {
  sections: {
    id: string
    label: string
    questionCount: number
    answeredCount: number
  }[]
  currentSection: string
  onSectionClick?: (sectionId: string) => void
}

export function SectionProgress({
  sections,
  currentSection,
  onSectionClick,
}: SectionProgressProps) {
  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
      {sections.map((section, index) => {
        const isComplete = section.answeredCount === section.questionCount
        const isCurrent = section.id === currentSection
        const progress = section.questionCount > 0
          ? (section.answeredCount / section.questionCount) * 100
          : 0

        return (
          <button
            key={section.id}
            onClick={() => onSectionClick?.(section.id)}
            className={cn(
              'flex flex-col items-center gap-1 min-w-[80px] p-2 rounded-lg transition-all',
              isCurrent ? 'bg-gold/20' : 'hover:bg-sand',
              onSectionClick && 'cursor-pointer'
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                  isComplete
                    ? 'bg-sage text-white'
                    : isCurrent
                    ? 'bg-gold text-ink'
                    : 'bg-sand text-stone'
                )}
              >
                {isComplete ? '✓' : index + 1}
              </span>
            </div>
            <span
              className={cn(
                'text-xs whitespace-nowrap',
                isCurrent ? 'text-ink font-medium' : 'text-stone'
              )}
            >
              {section.label}
            </span>
            <div className="w-full h-1 bg-sand rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-300',
                  isComplete ? 'bg-sage' : 'bg-gold'
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}

// Multi-select for questions that allow multiple answers
export interface MultiSelectProps {
  value: string[] | null
  onChange: (value: string[]) => void
  options: { value: string; label: string }[]
  disabled?: boolean
  placeholder?: string
}

export function MultiSelect({
  value,
  onChange,
  options,
  disabled = false,
  placeholder = 'Select all that apply',
}: MultiSelectProps) {
  const selectedValues = value || []

  const toggleOption = (optionValue: string) => {
    if (disabled) return

    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((v) => v !== optionValue))
    } else {
      onChange([...selectedValues, optionValue])
    }
  }

  return (
    <div className="space-y-2">
      {placeholder && selectedValues.length === 0 && (
        <p className="text-sm text-stone mb-2">{placeholder}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              disabled={disabled}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-200',
                isSelected
                  ? 'border-gold bg-gold/10 text-ink'
                  : 'border-ink/20 bg-white text-ink hover:border-gold/50 hover:bg-gold/5',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                  isSelected
                    ? 'border-gold bg-gold text-white'
                    : 'border-ink/30 bg-white'
                )}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm">{option.label}</span>
            </button>
          )
        })}
      </div>
      {selectedValues.length > 0 && (
        <p className="text-xs text-stone mt-2">
          {selectedValues.length} selected
        </p>
      )}
    </div>
  )
}

// Text area for open-ended questions
export interface TextAreaInputProps {
  value: string | null
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  rows?: number
  maxLength?: number
}

export function TextAreaInput({
  value,
  onChange,
  disabled = false,
  placeholder = 'Enter your response...',
  rows = 4,
  maxLength = 2000,
}: TextAreaInputProps) {
  return (
    <div className="space-y-2">
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-ink/20 bg-white text-ink resize-none',
          'focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold',
          'transition-all duration-200',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
      {maxLength && (
        <p className="text-xs text-stone text-right">
          {(value || '').length}/{maxLength} characters
        </p>
      )}
    </div>
  )
}

export default LikertScale
