export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-pearl pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-stone/20 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-stone/10 rounded w-96 mx-auto animate-pulse" />
        </div>

        {/* Category Filter Skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-stone/10 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Blog Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-[16/9] bg-stone/20" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-stone/20 rounded w-3/4" />
                <div className="h-4 bg-stone/10 rounded" />
                <div className="h-4 bg-stone/10 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
