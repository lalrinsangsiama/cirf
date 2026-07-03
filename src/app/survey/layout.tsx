import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CIRF Expert Validation Survey',
  description: 'Expert validation questionnaire for the Cultural Innovation Resilience Framework (CIRF) — doctoral research study by Lalrinngheti Sangsiama.',
  robots: { index: false, follow: false },
}

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fdf5 30%, #fffef8 60%, #fdf8f0 100%)', color: '#1a3a2a', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
