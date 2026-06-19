'use client'

interface SurveyNavigationProps {
  currentScreen: number
  totalScreens: number
  canAdvance: boolean
  isSubmitting: boolean
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
}

export function SurveyNavigation({
  currentScreen,
  totalScreens,
  canAdvance,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
}: SurveyNavigationProps) {
  const isFirst = currentScreen === 0
  const isLast = currentScreen === totalScreens - 1

  return (
    <div className="flex items-center justify-between pt-8 mt-8" style={{ borderTop: '1px solid rgba(90, 175, 110, 0.12)' }}>
      {/* Back button */}
      <div>
        {!isFirst && (
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium rounded-xl transition-all duration-200 disabled:opacity-40"
            style={{ color: '#6a9a7a' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(90, 175, 110, 0.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
      </div>

      {/* Next / Submit button */}
      <div>
        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canAdvance || isSubmitting}
            className="flex items-center gap-2 px-8 py-3 text-[14px] font-semibold rounded-2xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-white"
            style={{
              background: canAdvance && !isSubmitting
                ? 'linear-gradient(135deg, #5aaf6e, #3d9e55)'
                : '#c8d8ce',
              boxShadow: canAdvance && !isSubmitting
                ? '0 4px 16px rgba(90, 175, 110, 0.3), 0 1px 3px rgba(90, 175, 110, 0.15)'
                : 'none',
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Survey
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!canAdvance}
            className="flex items-center gap-2 px-8 py-3 text-[14px] font-semibold rounded-2xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-white"
            style={{
              background: canAdvance
                ? 'linear-gradient(135deg, #4aade0, #3a8dc0)'
                : '#c8d8dd',
              boxShadow: canAdvance
                ? '0 4px 16px rgba(74, 173, 224, 0.3), 0 1px 3px rgba(74, 173, 224, 0.15)'
                : 'none',
            }}
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
