'use client'

import type { RankingAnswer } from '@/lib/survey/types'

interface RankingQuestionProps {
  items: { id: string; label: string }[]
  value: RankingAnswer | undefined
  onChange: (value: RankingAnswer) => void
}

export function RankingQuestion({ items, value = {}, onChange }: RankingQuestionProps) {
  const totalItems = items.length
  const rankOptions = Array.from({ length: totalItems }, (_, i) => i + 1)

  const handleRank = (itemId: string, rank: number) => {
    const next = { ...value }
    const existingItem = Object.entries(next).find(([id, r]) => r === rank && id !== itemId)
    if (existingItem) {
      const oldRank = next[itemId]
      if (oldRank) {
        next[existingItem[0]] = oldRank
      } else {
        delete next[existingItem[0]]
      }
    }
    next[itemId] = rank
    onChange(next)
  }

  const allRanked = items.every((item) => value[item.id] !== undefined)

  return (
    <div className="space-y-3">
      <p className="text-xs mb-1" style={{ color: '#7aaaba' }}>
        Click a number to assign a rank. Items will automatically swap if a rank is already taken.
      </p>

      {items.map((item) => {
        const currentRank = value[item.id]
        const hasRank = currentRank !== undefined

        return (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300"
            style={{
              borderColor: hasRank ? '#5aaf6e' : 'rgba(135, 195, 230, 0.2)',
              backgroundColor: hasRank ? 'rgba(90, 175, 110, 0.04)' : 'rgba(255,255,255,0.3)',
            }}
          >
            <div className="flex items-center gap-2">
              {rankOptions.map((rank) => (
                <button
                  key={rank}
                  type="button"
                  onClick={() => handleRank(item.id, rank)}
                  className="w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center"
                  style={{
                    backgroundColor: currentRank === rank ? '#5aaf6e' : 'rgba(135, 195, 230, 0.1)',
                    color: currentRank === rank ? 'white' : '#7aaaba',
                    transform: currentRank === rank ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: currentRank === rank ? '0 3px 10px rgba(90, 175, 110, 0.25)' : 'none',
                  }}
                >
                  {rank}
                </button>
              ))}
            </div>

            <span className="text-[15px] leading-snug flex-1" style={{ color: '#2a4a3a' }}>{item.label}</span>

            {hasRank && (
              <span
                className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ color: '#3d8a50', backgroundColor: 'rgba(90, 175, 110, 0.1)' }}
              >
                #{currentRank}
              </span>
            )}
          </div>
        )
      })}

      {allRanked && (
        <div className="text-center mt-2 animate-fade-in">
          <span className="text-xs font-medium" style={{ color: '#5aaf6e' }}>All pillars ranked</span>
        </div>
      )}
    </div>
  )
}
