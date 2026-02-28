'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'
import {
  getAssessmentRecommendations,
  getRecommendationBadge,
  type AssessmentRecommendation,
} from '@/lib/data/assessmentRecommendations'

interface AssessmentRecommendationPanelProps {
  constructScores: Record<string, number>
}

export default function AssessmentRecommendationPanel({
  constructScores,
}: AssessmentRecommendationPanelProps) {
  const recommendations = getAssessmentRecommendations(constructScores)
  const topRecs = recommendations.filter(r => r.level !== 'optional').slice(0, 2)
  const otherRecs = recommendations.filter(r => !topRecs.includes(r))

  return (
    <div className="bg-sage/10 border border-sage/30 p-6 rounded-lg">
      <div className="flex items-start gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-sage flex-shrink-0" />
        <div>
          <h4 className="font-medium mb-1">Your Recommended Next Steps</h4>
          <p className="text-sm text-stone">
            Based on your CIL scores, these assessments will help you improve your weakest areas. Each unlocks specialized tools.
          </p>
        </div>
      </div>

      {/* Top recommendations - expanded */}
      {topRecs.length > 0 && (
        <div className="space-y-3 mb-4">
          {topRecs.map((rec) => {
            const config = ASSESSMENT_CONFIGS[rec.assessmentType]
            const badge = getRecommendationBadge(rec.level)
            return (
              <div
                key={rec.assessmentType}
                className="bg-white rounded-lg border border-sage/20 p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium">{config.name}</h5>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full border', badge.className)}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-stone">{config.fullName}</p>
                  </div>
                  <span className="text-xs text-stone whitespace-nowrap">
                    ~{config.estimatedMinutes} min
                  </span>
                </div>
                <p className="text-sm text-stone mb-3">{rec.forYouIf}</p>
                <p className="text-xs text-gold mb-3">{rec.benefit}</p>
                <Link
                  href={`/assessments/${rec.assessmentType}`}
                  className="btn-primary text-sm inline-flex items-center gap-2"
                >
                  Start {config.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {/* Other recommendations - compact */}
      {otherRecs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {otherRecs.map((rec) => {
            const config = ASSESSMENT_CONFIGS[rec.assessmentType]
            return (
              <Link
                key={rec.assessmentType}
                href={`/assessments/${rec.assessmentType}`}
                className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-sage/10 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{config.name}</p>
                  <p className="text-xs text-stone truncate">{config.questionCount} questions • Free</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone flex-shrink-0" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
