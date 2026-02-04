export default function Loading() {
  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-16 h-16 mx-auto">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full animate-pulse"
            >
              {/* Outer ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-ink/10"
              />
              {/* Animated arc */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-gold animate-spin"
                strokeDasharray="70 200"
                style={{
                  transformOrigin: 'center',
                }}
              />
              {/* Inner element */}
              <circle
                cx="50"
                cy="50"
                r="8"
                className="fill-ink/80"
              />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <p className="text-stone text-sm tracking-wide">Loading...</p>

        {/* Screen reader announcement */}
        <span className="sr-only" role="status" aria-live="polite">
          Loading page content, please wait.
        </span>
      </div>
    </div>
  )
}
