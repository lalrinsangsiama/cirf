'use client'

import type { TripleRatingAnswer } from '@/lib/survey/types'

interface TripleRatingMatrixProps {
  indicators: { id: string; text: string }[]
  dimensions: { id: string; label: string }[]
  scale: { value: number; label: string }[]
  value: TripleRatingAnswer | undefined
  onChange: (value: TripleRatingAnswer) => void
}

export function TripleRatingMatrix({ indicators, dimensions, scale, value = {}, onChange }: TripleRatingMatrixProps) {
  const handleRate = (indicatorId: string, dimensionId: string, rating: number) => {
    onChange({
      ...value,
      [indicatorId]: { ...(value[indicatorId] || {}), [dimensionId]: rating },
    })
  }

  const isComplete = (indicatorId: string) => {
    const ratings = value[indicatorId] || {}
    return dimensions.every((d) => ratings[d.id] !== undefined)
  }

  return (
    <div className="space-y-1">
      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-3 pr-3 text-xs font-medium uppercase tracking-wider" style={{ width: '30%', color: '#6a9a7a' }}>
                Indicator
              </th>
              {dimensions.map((dim) => (
                <th key={dim.id} colSpan={scale.length} className="pb-1 text-center text-xs font-medium" style={{ color: '#4a8dad', borderBottom: '1px solid rgba(74, 173, 224, 0.12)' }}>
                  {dim.label}
                </th>
              ))}
            </tr>
            <tr>
              <th />
              {dimensions.map((dim) =>
                scale.map((s) => (
                  <th key={`${dim.id}-${s.value}`} className="pb-2 pt-1 text-center text-[10px] px-0.5" style={{ color: '#9abccc' }}>
                    {s.value}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {indicators.map((ind, i) => (
              <tr
                key={ind.id}
                className="transition-colors duration-200"
                style={{
                  backgroundColor: isComplete(ind.id)
                    ? 'rgba(90, 175, 110, 0.03)'
                    : i % 2 === 0
                      ? 'rgba(74, 173, 224, 0.02)'
                      : 'transparent',
                }}
              >
                <td className="py-3 pr-3 text-[13px] leading-snug align-middle rounded-l-lg pl-2" style={{ color: '#3a5a4a' }}>
                  {ind.text}
                </td>
                {dimensions.map((dim, di) =>
                  scale.map((s) => (
                    <td
                      key={`${dim.id}-${s.value}`}
                      className={`py-3 px-0.5 text-center align-middle ${
                        di < dimensions.length - 1 && s.value === scale.length ? 'border-r' : ''
                      } ${di === dimensions.length - 1 && s.value === scale.length ? 'rounded-r-lg' : ''}`}
                      style={{ borderColor: 'rgba(74, 173, 224, 0.08)' }}
                    >
                      <button
                        type="button"
                        onClick={() => handleRate(ind.id, dim.id, s.value)}
                        className="mx-auto flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200"
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(74, 173, 224, 0.08)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span
                          className="w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                          style={{
                            borderColor: value[ind.id]?.[dim.id] === s.value ? '#4aade0' : '#c8dce4',
                            backgroundColor: value[ind.id]?.[dim.id] === s.value ? '#4aade0' : 'transparent',
                          }}
                        >
                          {value[ind.id]?.[dim.id] === s.value && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                      </button>
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet card layout */}
      <div className="lg:hidden space-y-4">
        {indicators.map((ind) => (
          <div
            key={ind.id}
            className="p-4 rounded-2xl border-2 transition-all duration-300"
            style={{
              borderColor: isComplete(ind.id) ? 'rgba(90, 175, 110, 0.25)' : 'rgba(135, 195, 230, 0.15)',
              backgroundColor: isComplete(ind.id) ? 'rgba(90, 175, 110, 0.03)' : 'rgba(255,255,255,0.3)',
            }}
          >
            <p className="text-[13px] leading-relaxed mb-3 font-medium" style={{ color: '#3a5a4a' }}>{ind.text}</p>
            <div className="space-y-2.5">
              {dimensions.map((dim) => (
                <div key={dim.id}>
                  <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#4a8dad' }}>{dim.label}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] w-4" style={{ color: '#9abccc' }}>1</span>
                    {scale.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => handleRate(ind.id, dim.id, s.value)}
                        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
                      >
                        <span
                          className="w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                          style={{
                            borderColor: value[ind.id]?.[dim.id] === s.value ? '#4aade0' : '#c8dce4',
                            backgroundColor: value[ind.id]?.[dim.id] === s.value ? '#4aade0' : 'transparent',
                          }}
                        >
                          {value[ind.id]?.[dim.id] === s.value && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </span>
                      </button>
                    ))}
                    <span className="text-[10px] w-4" style={{ color: '#9abccc' }}>5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
