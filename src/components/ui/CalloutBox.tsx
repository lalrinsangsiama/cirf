'use client'

import { ReactNode } from 'react'
import { Lightbulb, Sparkles, AlertTriangle, TrendingUp } from 'lucide-react'

export type CalloutVariant = 'tip' | 'insight' | 'warning' | 'stat'

interface CalloutBoxProps {
  variant: CalloutVariant
  title?: string
  children: ReactNode
  className?: string
}

const variantStyles: Record<CalloutVariant, {
  bg: string
  border: string
  iconBg: string
  iconColor: string
  titleColor: string
  Icon: typeof Lightbulb
}> = {
  tip: {
    bg: 'bg-sage/10',
    border: 'border-sage/30',
    iconBg: 'bg-sage/20',
    iconColor: 'text-sage',
    titleColor: 'text-sage',
    Icon: Lightbulb,
  },
  insight: {
    bg: 'bg-ocean/10',
    border: 'border-ocean/30',
    iconBg: 'bg-ocean/20',
    iconColor: 'text-ocean',
    titleColor: 'text-ocean',
    Icon: Sparkles,
  },
  warning: {
    bg: 'bg-gold/10',
    border: 'border-gold/30',
    iconBg: 'bg-gold/20',
    iconColor: 'text-gold',
    titleColor: 'text-gold',
    Icon: AlertTriangle,
  },
  stat: {
    bg: 'bg-sand',
    border: 'border-gold/40',
    iconBg: 'bg-gold/20',
    iconColor: 'text-gold',
    titleColor: 'text-gold',
    Icon: TrendingUp,
  },
}

export function CalloutBox({ variant, title, children, className = '' }: CalloutBoxProps) {
  const styles = variantStyles[variant]
  const { Icon } = styles

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 ${className}`}>
      <div className="flex gap-3">
        <div className={`${styles.iconBg} rounded-full p-2 h-fit flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${styles.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-medium text-sm ${styles.titleColor} mb-1`}>
              {title}
            </h4>
          )}
          <div className="text-sm text-ink/80 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
