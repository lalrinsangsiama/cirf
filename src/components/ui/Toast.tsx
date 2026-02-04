'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id: string
  message: string
  variant?: ToastVariant
  duration?: number
  onClose: (id: string) => void
}

const variantStyles: Record<ToastVariant, { bg: string; icon: typeof CheckCircle; iconColor: string }> = {
  success: {
    bg: 'bg-sage/10 border-sage/30',
    icon: CheckCircle,
    iconColor: 'text-sage',
  },
  error: {
    bg: 'bg-terracotta/10 border-terracotta/30',
    icon: XCircle,
    iconColor: 'text-terracotta',
  },
  warning: {
    bg: 'bg-gold/10 border-gold/30',
    icon: AlertTriangle,
    iconColor: 'text-gold',
  },
  info: {
    bg: 'bg-ocean/10 border-ocean/30',
    icon: Info,
    iconColor: 'text-ocean',
  },
}

export function Toast({
  id,
  message,
  variant = 'info',
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const styles = variantStyles[variant]
  const Icon = styles.icon

  const handleClose = useCallback(() => {
    setIsLeaving(true)
    setTimeout(() => onClose(id), 300)
  }, [id, onClose])

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setIsVisible(true), 10)

    // Auto-dismiss
    const dismissTimer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(dismissTimer)
    }
  }, [duration, handleClose])

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-sm',
        'transform transition-all duration-300 ease-out',
        styles.bg,
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', styles.iconColor)} />
      <p className="text-ink text-sm flex-1">{message}</p>
      <button
        onClick={handleClose}
        className="p-1 hover:bg-ink/5 rounded transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 text-stone" />
      </button>
    </div>
  )
}
