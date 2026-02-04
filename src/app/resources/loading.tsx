export default function ResourcesLoading() {
  return (
    <>
      {/* Hero Skeleton */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <div className="h-4 bg-stone/20 rounded w-24 mb-4 animate-pulse" />
          <div className="space-y-4 mb-8">
            <div className="h-16 bg-stone/20 rounded w-96 animate-pulse" />
            <div className="h-16 bg-stone/20 rounded w-80 animate-pulse" />
          </div>
          <div className="h-6 bg-stone/10 rounded w-2/3 max-w-2xl animate-pulse" />
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="py-6 px-6 md:px-16 bg-sand border-b border-ink/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-32 bg-pearl rounded-full animate-pulse" />
            ))}
          </div>
          <div className="h-10 w-64 bg-pearl rounded-full animate-pulse" />
        </div>
      </section>

      {/* Resources Grid Skeleton */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <div className="h-4 bg-stone/10 rounded w-32 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-sand p-6 rounded-lg animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-stone/20 rounded" />
                  <div className="w-12 h-6 bg-pearl rounded" />
                </div>
                <div className="h-5 bg-stone/20 rounded w-3/4 mb-2" />
                <div className="h-4 bg-stone/10 rounded mb-4" />
                <div className="h-4 bg-stone/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
