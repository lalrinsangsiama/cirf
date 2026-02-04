export default function CaseStudiesLoading() {
  return (
    <>
      {/* Hero Skeleton */}
      <section className="min-h-[80vh] flex items-center relative overflow-hidden bg-gradient-to-br from-sand to-pearl">
        <div className="w-full px-6 md:px-16 relative z-10">
          <div className="h-4 bg-stone/20 rounded w-32 mb-4 animate-pulse" />
          <div className="space-y-4 mb-8">
            <div className="h-20 bg-stone/20 rounded w-96 animate-pulse" />
            <div className="h-20 bg-stone/20 rounded w-80 animate-pulse" />
          </div>
          <div className="h-6 bg-stone/10 rounded w-2/3 max-w-2xl animate-pulse" />
        </div>
      </section>

      {/* Statistics Banner Skeleton */}
      <section className="py-8 px-6 md:px-16 bg-ink">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="h-8 w-16 bg-gold/20 rounded mx-auto mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-pearl/20 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="py-6 px-6 md:px-16 bg-pearl border-b border-ink/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 w-28 bg-sand rounded-full animate-pulse" />
            ))}
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-48 bg-sand rounded-full animate-pulse" />
            <div className="h-10 w-32 bg-sand rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Case Studies Skeleton */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto space-y-24">
          {[1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-pulse">
              <div className="aspect-[4/3] bg-stone/20 rounded-lg" />
              <div className="space-y-4">
                <div className="h-4 bg-stone/10 rounded w-32" />
                <div className="h-10 bg-stone/20 rounded w-3/4" />
                <div className="flex gap-8">
                  {[1, 2, 3].map((j) => (
                    <div key={j}>
                      <div className="h-8 w-16 bg-stone/20 rounded mb-1" />
                      <div className="h-3 w-20 bg-stone/10 rounded" />
                    </div>
                  ))}
                </div>
                <div className="h-4 bg-stone/10 rounded" />
                <div className="h-4 bg-stone/10 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
