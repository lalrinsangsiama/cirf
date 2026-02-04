'use client'

import { useEffect, useRef, useCallback, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccessibleModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean
  /**
   * Callback when the modal should close
   */
  onClose: () => void
  /**
   * Modal title for accessibility
   */
  title: string
  /**
   * Optional description for accessibility
   */
  description?: string
  /**
   * Modal content
   */
  children: ReactNode
  /**
   * Additional className for the modal content
   */
  className?: string
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean
  /**
   * Whether clicking the backdrop closes the modal
   * @default true
   */
  closeOnBackdropClick?: boolean
  /**
   * Whether pressing Escape closes the modal
   * @default true
   */
  closeOnEscape?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

/**
 * Accessible modal dialog component
 *
 * Features:
 * - Proper ARIA attributes (role="dialog", aria-modal, aria-labelledby, aria-describedby)
 * - Focus trap - Tab key cycles through focusable elements within the modal
 * - Keyboard dismissal - Escape key closes the modal
 * - Focus restoration - Returns focus to trigger element on close
 * - Backdrop click to close (optional)
 * - Scroll lock when open
 *
 * @example
 * ```tsx
 * <AccessibleModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 * >
 *   <p>Modal content here</p>
 *   <button onClick={() => setIsModalOpen(false)}>Close</button>
 * </AccessibleModal>
 * ```
 */
export function AccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const titleId = `modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`
  const descriptionId = description
    ? `modal-desc-${title.replace(/\s+/g, '-').toLowerCase()}`
    : undefined

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault()
        onClose()
      }

      // Focus trap - Tab key navigation
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement?.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement?.focus()
          }
        }
      }
    },
    [closeOnEscape, onClose]
  )

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose()
      }
    },
    [closeOnBackdropClick, onClose]
  )

  // Manage focus and scroll lock when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement

      // Add event listener for escape key
      document.addEventListener('keydown', handleKeyDown)

      // Lock body scroll
      document.body.style.overflow = 'hidden'

      // Focus the modal content
      const timer = setTimeout(() => {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements && focusableElements.length > 0) {
          focusableElements[0].focus()
        } else {
          modalRef.current?.focus()
        }
      }, 0)

      return () => {
        clearTimeout(timer)
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''

        // Restore focus to the previously focused element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-xl',
          'max-h-[90vh] overflow-y-auto',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-white border-b border-stone/10 rounded-t-2xl">
          <h2 id={titleId} className="text-xl font-serif font-semibold text-ink">
            {title}
          </h2>
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 -m-2 text-stone hover:text-ink rounded-full hover:bg-sand transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Description (if provided) */}
        {description && (
          <p id={descriptionId} className="sr-only">
            {description}
          </p>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AccessibleModal
