import { Skeleton } from '@/components/ui/Skeleton'

export default function SettingsLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label="Loading settings">
      <Skeleton className="h-8 w-32 mb-8" />

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-ink/10">
            <Skeleton className="h-5 w-40 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
