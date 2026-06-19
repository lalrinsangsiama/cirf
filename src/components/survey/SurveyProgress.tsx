'use client'

import { SURVEY_SECTIONS } from '@/lib/data/cirfSurveyQuestions'
import type { SurveySection } from '@/lib/survey/types'

interface SurveyProgressProps {
  currentScreen: number
  totalScreens: number
  currentSection: SurveySection
}

const SECTION_LABELS: Record<SurveySection, string> = {
  consent: '',
  profile: 'A',
  definition: 'B',
  pillars: 'C',
  barriers: 'D',
  metrics: 'E',
  reflections: '',
}

const SECTION_ORDER: SurveySection[] = ['consent', 'profile', 'definition', 'pillars', 'barriers', 'metrics', 'reflections']

export function SurveyProgress({ currentScreen, totalScreens, currentSection }: SurveyProgressProps) {
  const progress = Math.round((currentScreen / totalScreens) * 100)
  const currentSectionIdx = SECTION_ORDER.indexOf(currentSection)

  const sectionInfo = SURVEY_SECTIONS.find((s) => s.id === currentSection)

  return (
    <div className="w-full">
      {/* Progress bar — sky blue gradient */}
      <div className="h-1.5 w-full" style={{ backgroundColor: 'rgba(135, 195, 230, 0.15)' }}>
        <div
          className="h-full transition-all duration-700 ease-custom rounded-r-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #5aaf6e, #4aade0)',
          }}
        />
      </div>

      {/* Section dots & info */}
      <div className="max-w-3xl mx-auto px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          {/* Section dots */}
          <div className="flex items-center gap-1.5">
            {SECTION_ORDER.map((section, i) => {
              const isPast = i < currentSectionIdx
              const isCurrent = i === currentSectionIdx
              const label = SECTION_LABELS[section]

              return (
                <div key={section} className="flex items-center gap-1.5">
                  <div
                    className="flex items-center justify-center rounded-full text-[10px] font-semibold transition-all duration-500"
                    style={{
                      width: isCurrent ? '26px' : '20px',
                      height: isCurrent ? '26px' : '20px',
                      backgroundColor: isPast
                        ? '#5aaf6e'
                        : isCurrent
                          ? 'rgba(90, 175, 110, 0.12)'
                          : 'rgba(135, 195, 230, 0.15)',
                      color: isPast
                        ? 'white'
                        : isCurrent
                          ? '#3d8a50'
                          : '#97b8c8',
                      border: isCurrent ? '2px solid #5aaf6e' : 'none',
                    }}
                  >
                    {isPast ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      label || (i === 0 ? (
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="4" /></svg>
                      ) : (
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))
                    )}
                  </div>
                  {i < SECTION_ORDER.length - 1 && (
                    <div
                      className="w-4 h-px transition-colors duration-500"
                      style={{ backgroundColor: isPast ? '#5aaf6e' : 'rgba(135, 195, 230, 0.25)' }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress percentage */}
          <span className="text-[11px] font-medium tabular-nums" style={{ color: '#4aade0' }}>
            {progress}%
          </span>
        </div>

        {/* Section title */}
        {sectionInfo && currentSection !== 'consent' && (
          <p className="text-[12px] font-medium" style={{ color: '#6a9a7a' }}>
            {sectionInfo.title}
            {sectionInfo.estimatedMinutes && (
              <span style={{ color: '#9abcaa' }}> &middot; ~{sectionInfo.estimatedMinutes} min</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
