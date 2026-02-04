import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import {
  FileText,
  Search,
  Inbox,
  FolderOpen,
  Users,
  BarChart3,
  BookOpen,
  type LucideIcon
} from 'lucide-react'

type EmptyStateVariant =
  | 'default'
  | 'search'
  | 'inbox'
  | 'folder'
  | 'users'
  | 'analytics'
  | 'blog'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: LucideIcon
  variant?: EmptyStateVariant
  action?: ReactNode
  className?: string
}

const variantIcons: Record<EmptyStateVariant, LucideIcon> = {
  default: FileText,
  search: Search,
  inbox: Inbox,
  folder: FolderOpen,
  users: Users,
  analytics: BarChart3,
  blog: BookOpen,
}

export function EmptyState({
  title,
  description,
  icon,
  variant = 'default',
  action,
  className,
}: EmptyStateProps) {
  const Icon = icon || variantIcons[variant]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-stone" />
      </div>
      <h3 className="text-lg font-medium text-ink mb-1">{title}</h3>
      {description && (
        <p className="text-stone text-sm max-w-sm mb-4">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

// Pre-configured empty states for common use cases

export function NoResultsState({
  searchTerm,
  onClear,
}: {
  searchTerm?: string
  onClear?: () => void
}) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description={
        searchTerm
          ? `We couldn't find anything matching "${searchTerm}". Try a different search term.`
          : "We couldn't find any matches. Try adjusting your filters."
      }
      action={
        onClear && (
          <button
            onClick={onClear}
            className="text-sm text-ocean hover:text-ocean/80 transition-colors"
          >
            Clear search
          </button>
        )
      }
    />
  )
}

export function NoAssessmentsState({ onStart }: { onStart?: () => void }) {
  return (
    <EmptyState
      variant="analytics"
      title="No assessments yet"
      description="Complete your first CIL assessment to see your cultural innovation resilience score."
      action={
        onStart && (
          <Button onClick={onStart} size="sm">
            Start Assessment
          </Button>
        )
      }
    />
  )
}

export function NoBlogPostsState() {
  return (
    <EmptyState
      variant="blog"
      title="No posts yet"
      description="Check back soon for insights on cultural innovation and resilience."
    />
  )
}

export function NoCreditsState({ onBuy }: { onBuy?: () => void }) {
  return (
    <EmptyState
      variant="default"
      title="No credits available"
      description="Purchase credits to access CIL assessments and premium features."
      action={
        onBuy && (
          <Button onClick={onBuy} size="sm">
            Buy Credits
          </Button>
        )
      }
    />
  )
}

export function NoContactsState() {
  return (
    <EmptyState
      variant="inbox"
      title="No messages"
      description="Contact form submissions will appear here."
    />
  )
}

export function NoSubscribersState() {
  return (
    <EmptyState
      variant="users"
      title="No subscribers yet"
      description="Newsletter subscribers will appear here once people sign up."
    />
  )
}
