export default function FrameworkDetailLoading() {
  return (
    <div className="min-h-screen bg-pearl">
      {/* Hero Skeleton */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16">
        <div className="max-w-[1600px] mx-auto">
          {/* Back link skeleton */}
          <div className="h-5 w-32 bg-stone/10 rounded animate-pulse mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              {/* Label skeleton */}
              <div className="h-4 w-24 bg-stone/10 rounded animate-pulse mb-4" />
              {/* Title skeleton */}
              <div className="space-y-4 mb-8">
                <div className="h-12 w-full bg-stone/10 rounded animate-pulse" />
                <div className="h-12 w-3/4 bg-stone/10 rounded animate-pulse" />
              </div>
              {/* Description skeleton */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-stone/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-stone/10 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-stone/10 rounded animate-pulse" />
              </div>
            </div>

            {/* Icon card skeleton */}
            <div className="h-64 bg-gradient-to-br from-stone/5 to-stone/10 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Components Section Skeleton */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="h-8 w-48 bg-stone/10 rounded animate-pulse mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-pearl p-8 rounded-lg">
                <div className="h-6 w-48 bg-stone/10 rounded animate-pulse mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full bg-stone/10 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-stone/10 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 w-2/3 bg-stone/10 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen reader announcement */}
      <span className="sr-only" role="status" aria-live="polite">
        Loading framework details, please wait.
      </span>
    </div>
  )
}
