import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function BlogArticleLoading() {
  return (
    <div className="min-h-screen bg-pearl" aria-label="Loading article">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Skeleton className="h-4 w-32 mb-8" />

        {/* Title */}
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-3/4 mb-6" />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Featured image */}
        <Skeleton className="h-64 sm:h-80 w-full rounded-xl mb-10" />

        {/* Content */}
        <div className="space-y-4">
          <SkeletonText lines={4} />
          <Skeleton className="h-6 w-1/2 mt-6" />
          <SkeletonText lines={5} />
          <Skeleton className="h-6 w-2/3 mt-6" />
          <SkeletonText lines={3} />
        </div>
      </div>
    </div>
  )
}
