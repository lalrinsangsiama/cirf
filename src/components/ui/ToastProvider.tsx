'use client'

import { createContext, useContext, useCallback, useState, ReactNode } from 'react'
import { Toast, ToastVariant } from './Toast'

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

interface ToastContextType {
  toast: (message: string, variant?: ToastVariant, duration?: number) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  dismiss: (id: string) => void
  dismissAll: () => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
  maxToasts?: number
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration?: number) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      setToasts((prev) => {
        const newToasts = [...prev, { id, message, variant, duration }]
        // Limit number of toasts
        if (newToasts.length > maxToasts) {
          return newToasts.slice(-maxToasts)
        }
        return newToasts
      })

      return id
    },
    [maxToasts]
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  const value: ToastContextType = {
    toast: addToast,
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
    dismiss,
    dismissAll,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              message={toast.message}
              variant={toast.variant}
              duration={toast.duration}
              onClose={dismiss}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
