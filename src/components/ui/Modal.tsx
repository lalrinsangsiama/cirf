'use client'

import { useEffect, useRef, useCallback, ReactNode, KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: ModalSize
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  className?: string
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Focus trap - get all focusable elements
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return []
    return Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled'))
  }, [])

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements()
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    },
    [closeOnEscape, getFocusableElements, onClose]
  )

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose()
    }
  }

  // Manage focus and body scroll
  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement

      // Lock body scroll
      document.body.style.overflow = 'hidden'

      // Focus first focusable element
      const focusableElements = getFocusableElements()
      if (focusableElements.length > 0) {
        setTimeout(() => focusableElements[0].focus(), 0)
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = ''

      // Restore focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, getFocusableElements])

  if (!isOpen) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fade-in"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full bg-pearl rounded-xl shadow-2xl',
          'transform transition-all duration-300',
          'animate-fade-in-up',
          sizeStyles[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-6 border-b border-ink/10">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="text-xl font-serif font-medium text-ink"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm text-stone"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 -m-2 hover:bg-ink/5 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-stone" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn(!title && !showCloseButton && 'pt-6', 'p-6')}>
          {children}
        </div>
      </div>
    </div>
  )

  // Use portal to render outside current DOM hierarchy
  if (typeof window === 'undefined') return null
  return createPortal(modalContent, document.body)
}

// Convenience components for common modal patterns
interface ModalActionsProps {
  children: ReactNode
  className?: string
}

export function ModalActions({ children, className }: ModalActionsProps) {
  return (
    <div className={cn('flex justify-end gap-3 mt-6 pt-4 border-t border-ink/10', className)}>
      {children}
    </div>
  )
}
