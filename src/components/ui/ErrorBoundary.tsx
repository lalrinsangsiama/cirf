'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-6 rounded-xl bg-terracotta/5 border border-terracotta/20">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-terracotta/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-terracotta" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-ink mb-1">
                Something went wrong
              </h3>
              <p className="text-sm text-stone mb-4">
                This section encountered an error and couldn&apos;t be displayed.
              </p>
              <Button
                onClick={this.handleReset}
                variant="outline"
                size="sm"
                icon={RefreshCw}
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Functional wrapper for use with hooks
interface ErrorBoundaryWrapperProps extends ErrorBoundaryProps {
  resetKey?: string | number
}

export function ErrorBoundaryWrapper({
  children,
  fallback,
  onError,
  resetKey,
}: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary key={resetKey} fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  )
}
