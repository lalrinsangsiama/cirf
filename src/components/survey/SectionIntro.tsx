'use client'

interface SectionIntroProps {
  title: string
  body: string
  highlight?: string
}

export function SectionIntro({ title, body, highlight }: SectionIntroProps) {
  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-xl font-serif font-semibold leading-snug" style={{ color: '#1a3a2a' }}>
        {title}
      </h2>

      {body && (
        <p className="text-[14px] leading-relaxed" style={{ color: '#5a7a6a' }}>
          {body}
        </p>
      )}

      {highlight && (
        <div
          className="relative pl-5 py-4 pr-5 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(90, 175, 110, 0.06), rgba(74, 173, 224, 0.04))',
            borderLeft: '4px solid #5aaf6e',
          }}
        >
          <p className="text-[14px] leading-relaxed italic" style={{ color: '#3a6a4a' }}>
            {highlight}
          </p>
        </div>
      )}
    </div>
  )
}
