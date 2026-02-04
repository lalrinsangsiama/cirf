'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Loader2, type LucideIcon } from 'lucide-react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  loadingText?: string
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-ink text-pearl',
    'hover:bg-ink/90',
    'focus:ring-ink/20',
    'disabled:bg-ink/50'
  ),
  secondary: cn(
    'bg-sand text-ink',
    'hover:bg-sand/80',
    'focus:ring-sand/50',
    'disabled:bg-sand/50'
  ),
  outline: cn(
    'bg-transparent text-ink border border-ink/20',
    'hover:bg-ink/5 hover:border-ink/40',
    'focus:ring-ink/10',
    'disabled:border-ink/10 disabled:text-ink/50'
  ),
  ghost: cn(
    'bg-transparent text-ink',
    'hover:bg-ink/5',
    'focus:ring-ink/10',
    'disabled:text-ink/50'
  ),
  danger: cn(
    'bg-terracotta text-pearl',
    'hover:bg-terracotta/90',
    'focus:ring-terracotta/30',
    'disabled:bg-terracotta/50'
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
}

const iconSizes: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'font-medium rounded-full',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Full width
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className={cn('animate-spin', iconSizes[size])} />
            {loadingText || children}
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className={iconSizes[size]} />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon className={iconSizes[size]} />
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Icon-only button variant
export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconPosition' | 'loadingText'> {
  icon: LucideIcon
  'aria-label': string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      isLoading = false,
      icon: Icon,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    const iconOnlySizes: Record<ButtonSize, string> = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-2.5',
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed',
          // Variant styles
          variantStyles[variant],
          // Size styles
          iconOnlySizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={cn('animate-spin', iconSizes[size])} />
        ) : (
          <Icon className={iconSizes[size]} />
        )}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

// Link styled as button
export interface ButtonLinkProps {
  href: string
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: ReactNode
  target?: string
  rel?: string
}

export function ButtonLink({
  href,
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  target,
  rel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'font-medium rounded-full',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        // Variant styles
        variantStyles[variant],
        // Size styles
        sizeStyles[size],
        // Full width
        fullWidth && 'w-full',
        className
      )}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={iconSizes[size]} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={iconSizes[size]} />
      )}
    </a>
  )
}
