import { CIRFAssessment } from '@/components/site/CIRFAssessment'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CIRF Self-Assessment Tool',
  description: 'Assess your cultural innovation initiative across 4 pillars: Economic Value, Cultural Integrity, Adaptability, and Social Empowerment. Free, 5 minutes.',
}

export default function AssessmentPage() {
  return <CIRFAssessment />
}
