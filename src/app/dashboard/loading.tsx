import { DashboardSkeleton } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <DashboardSkeleton />
    </div>
  )
}
