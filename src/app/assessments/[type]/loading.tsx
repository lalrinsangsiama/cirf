export default function AssessmentLoading() {
  return (
    <div className="min-h-screen bg-pearl py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          {/* Badge skeleton */}
          <div className="h-8 w-32 bg-stone/10 rounded-full animate-pulse mx-auto mb-4" />
          {/* Title skeleton */}
          <div className="h-10 w-96 max-w-full bg-stone/10 rounded animate-pulse mx-auto mb-4" />
          {/* Description skeleton */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="h-4 w-full bg-stone/10 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-stone/10 rounded animate-pulse mx-auto" />
          </div>
        </div>

        {/* Progress Bar Skeleton */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 w-24 bg-stone/10 rounded animate-pulse" />
            <div className="h-4 w-16 bg-stone/10 rounded animate-pulse" />
          </div>
          <div className="h-2 w-full bg-stone/10 rounded-full animate-pulse" />
        </div>

        {/* Question Card Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Section badge skeleton */}
          <div className="h-6 w-40 bg-stone/10 rounded-full animate-pulse mb-6" />

          {/* Question skeleton */}
          <div className="space-y-3 mb-8">
            <div className="h-6 w-full bg-stone/10 rounded animate-pulse" />
            <div className="h-6 w-2/3 bg-stone/10 rounded animate-pulse" />
          </div>

          {/* Options skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border border-stone/10 rounded-lg"
              >
                <div className="w-5 h-5 rounded-full bg-stone/10 animate-pulse flex-shrink-0" />
                <div className="h-5 flex-1 bg-stone/10 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-12 w-32 bg-stone/10 rounded-full animate-pulse" />
          <div className="h-12 w-32 bg-stone/10 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Screen reader announcement */}
      <span className="sr-only" role="status" aria-live="polite">
        Loading assessment, please wait.
      </span>
    </div>
  )
}
