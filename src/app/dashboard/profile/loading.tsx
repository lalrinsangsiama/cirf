import { ProfileSkeleton } from '@/components/ui/Skeleton'

export default function ProfileLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <ProfileSkeleton />
    </div>
  )
}
