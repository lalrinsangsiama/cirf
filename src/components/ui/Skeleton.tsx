import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-ink/5',
        className
      )}
      aria-hidden="true"
    />
  )
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn('rounded-xl border border-ink/10 p-6', className)}
      aria-hidden="true"
    >
      <Skeleton className="h-40 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <SkeletonText lines={2} />
    </div>
  )
}

export function SkeletonAvatar({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  return (
    <Skeleton
      className={cn('rounded-full', sizeClasses[size], className)}
    />
  )
}

export function SkeletonButton({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-32',
  }

  return (
    <Skeleton
      className={cn('rounded-full', sizeClasses[size], className)}
    />
  )
}

// Page-specific skeletons

export function DashboardSkeleton() {
  return (
    <div className="space-y-8" aria-label="Loading dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-ink/10">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-ink/10 p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <SkeletonAvatar size="sm" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BlogSkeleton() {
  return (
    <div className="space-y-8" aria-label="Loading blog posts">
      {/* Featured Post */}
      <div className="rounded-xl border border-ink/10 overflow-hidden">
        <Skeleton className="h-64 w-full" />
        <div className="p-6">
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <SkeletonText lines={2} />
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}

export function AssessmentSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-6" aria-label="Loading assessment">
      {/* Progress */}
      <Skeleton className="h-2 w-full rounded-full" />

      {/* Question */}
      <div className="p-8 rounded-xl border border-ink/10">
        <Skeleton className="h-4 w-20 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-6" />

        {/* Options */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <SkeletonButton />
        <SkeletonButton />
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading profile">
      <div className="flex items-center gap-4">
        <SkeletonAvatar size="lg" />
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
