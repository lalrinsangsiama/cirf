import { Suspense } from 'react'

function ToolLoading() {
  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone">Loading tool...</p>
      </div>
    </div>
  )
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<ToolLoading />}>
      {children}
    </Suspense>
  )
}
