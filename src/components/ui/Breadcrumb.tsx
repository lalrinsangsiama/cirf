import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}

export function Breadcrumb({ items, className, showHome = true }: BreadcrumbProps) {
  const allItems = showHome
    ? [{ label: 'Home', href: '/' }, ...items]
    : items

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-sm', className)}
    >
      <ol className="flex items-center flex-wrap gap-1">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isHome = index === 0 && showHome

          return (
            <li key={item.label} className="flex items-center">
              {index > 0 && (
                <ChevronRight
                  className="w-4 h-4 mx-1 text-stone/50"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span
                  className="text-ink font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-stone hover:text-ink transition-colors flex items-center gap-1"
                >
                  {isHome && <Home className="w-4 h-4" aria-hidden="true" />}
                  {!isHome && item.label}
                </Link>
              ) : (
                <span className="text-stone">
                  {isHome && <Home className="w-4 h-4" aria-hidden="true" />}
                  {!isHome && item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Pre-configured breadcrumb components for common pages
export function FrameworkBreadcrumb({ topic }: { topic: string }) {
  return (
    <Breadcrumb
      items={[
        { label: 'Framework', href: '/framework' },
        { label: topic },
      ]}
    />
  )
}

export function BlogBreadcrumb({ title }: { title: string }) {
  return (
    <Breadcrumb
      items={[
        { label: 'Blog', href: '/blog' },
        { label: title },
      ]}
    />
  )
}

export function CaseStudyBreadcrumb({ title }: { title: string }) {
  return (
    <Breadcrumb
      items={[
        { label: 'Case Studies', href: '/case-studies' },
        { label: title },
      ]}
    />
  )
}

export function AssessmentBreadcrumb({ name }: { name: string }) {
  return (
    <Breadcrumb
      items={[
        { label: 'Tools', href: '/tools' },
        { label: name },
      ]}
    />
  )
}

export function DashboardBreadcrumb({ page }: { page: string }) {
  return (
    <Breadcrumb
      items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: page },
      ]}
    />
  )
}
