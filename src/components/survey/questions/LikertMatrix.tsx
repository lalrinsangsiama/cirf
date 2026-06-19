'use client'

import type { LikertMatrixAnswer } from '@/lib/survey/types'

interface LikertMatrixProps {
  statements: { id: string; text: string }[]
  scale: { value: number; label: string }[]
  value: LikertMatrixAnswer | undefined
  onChange: (value: LikertMatrixAnswer) => void
}

export function LikertMatrix({ statements, scale, value = {}, onChange }: LikertMatrixProps) {
  const handleRate = (statementId: string, rating: number) => {
    onChange({ ...value, [statementId]: rating })
  }

  return (
    <div className="space-y-1">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-4 pr-4 text-xs font-medium uppercase tracking-wider w-1/2" style={{ color: '#6a9a7a' }}>
                Statement
              </th>
              {scale.map((s) => (
                <th key={s.value} className="pb-4 px-1 text-center text-xs font-medium w-[11%]">
                  <span className="block text-[10px] uppercase tracking-wider leading-tight" style={{ color: '#7aaaba' }}>{s.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {statements.map((stmt, i) => (
              <tr
                key={stmt.id}
                className="group transition-colors duration-200"
                style={{
                  backgroundColor: value[stmt.id]
                    ? 'rgba(90, 175, 110, 0.03)'
                    : i % 2 === 0
                      ? 'rgba(74, 173, 224, 0.02)'
                      : 'transparent',
                }}
              >
                <td className="py-4 pr-4 text-[14px] leading-relaxed align-top rounded-l-lg pl-3" style={{ color: '#3a5a4a' }}>
                  {stmt.text}
                </td>
                {scale.map((s) => (
                  <td key={s.value} className="py-4 px-1 text-center align-top last:rounded-r-lg">
                    <button
                      type="button"
                      onClick={() => handleRate(stmt.id, s.value)}
                      className="group/btn mx-auto flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                      style={{ background: value[stmt.id] === s.value ? 'transparent' : 'transparent' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(74, 173, 224, 0.08)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      aria-label={`${s.label} for "${stmt.text}"`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                        style={{
                          borderColor: value[stmt.id] === s.value ? '#4aade0' : '#c8dce4',
                          backgroundColor: value[stmt.id] === s.value ? '#4aade0' : 'transparent',
                          transform: value[stmt.id] === s.value ? 'scale(1.15)' : 'scale(1)',
                        }}
                      >
                        {value[stmt.id] === s.value && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </span>
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-4">
        {statements.map((stmt) => (
          <div
            key={stmt.id}
            className="p-4 rounded-2xl border-2 transition-all duration-300"
            style={{
              borderColor: value[stmt.id] ? 'rgba(74, 173, 224, 0.3)' : 'rgba(135, 195, 230, 0.15)',
              backgroundColor: value[stmt.id] ? 'rgba(74, 173, 224, 0.03)' : 'rgba(255,255,255,0.3)',
            }}
          >
            <p className="text-[14px] leading-relaxed mb-3" style={{ color: '#3a5a4a' }}>{stmt.text}</p>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] w-14 text-left" style={{ color: '#9abcaa' }}>Strongly Disagree</span>
              <div className="flex items-center gap-2">
                {scale.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => handleRate(stmt.id, s.value)}
                    className="flex flex-col items-center gap-1"
                    aria-label={`${s.label} for "${stmt.text}"`}
                  >
                    <span
                      className="w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                      style={{
                        borderColor: value[stmt.id] === s.value ? '#4aade0' : '#c8dce4',
                        backgroundColor: value[stmt.id] === s.value ? '#4aade0' : 'transparent',
                        transform: value[stmt.id] === s.value ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      {value[stmt.id] === s.value && (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="text-[10px]" style={{ color: '#9abcaa' }}>{s.value}</span>
                  </button>
                ))}
              </div>
              <span className="text-[10px] w-14 text-right" style={{ color: '#9abcaa' }}>Strongly Agree</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
