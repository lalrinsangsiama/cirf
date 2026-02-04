'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, Sparkles, ArrowRight, Lock, Unlock, Download, FileText } from 'lucide-react'
import { AssessmentType, ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'
import { getResourceByToolAccessId, type ResourceConfig } from '@/lib/data/resourcesConfig'

interface UnlockCelebrationProps {
  isOpen: boolean
  onClose: () => void
  unlockedAssessments: AssessmentType[]
  grantedTools?: string[]
  grantedResources?: string[] // New prop for unlocked resources
}

export default function UnlockCelebration({
  isOpen,
  onClose,
  unlockedAssessments,
  grantedTools = [],
  grantedResources = [],
}: UnlockCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      // Auto-close confetti after animation
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  const hasNewAssessments = unlockedAssessments.length > 0
  const hasNewTools = grantedTools.length > 0
  const hasNewResources = grantedResources.length > 0

  // Get resource details from toolAccessIds
  const unlockedResourceDetails: ResourceConfig[] = grantedResources
    .map(toolAccessId => getResourceByToolAccessId(toolAccessId))
    .filter((r): r is ResourceConfig => r !== undefined)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#D4A574', '#6B8E6B', '#5B8FA8', '#C17C5E'][
                  Math.floor(Math.random() * 4)
                ],
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="relative bg-pearl rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-celebration-pop">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-sand/50 transition-colors z-10"
        >
          <X className="w-5 h-5 text-ink/60" />
        </button>

        {/* Header with celebration icon */}
        <div className="bg-gradient-to-br from-sage/20 to-gold/20 px-8 pt-8 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/20 rounded-full mb-4 animate-bounce-slow">
            <Sparkles className="w-10 h-10 text-sage" />
          </div>
          <h2 className="text-2xl font-bold text-ink mb-2">
            Congratulations!
          </h2>
          <p className="text-ink/70">
            You&apos;ve completed the assessment and unlocked new features!
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {/* Unlocked Assessments */}
          {hasNewAssessments && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-3">
                New Assessments Unlocked
              </h3>
              <div className="space-y-3">
                {unlockedAssessments.map(type => {
                  const config = ASSESSMENT_CONFIGS[type]
                  return (
                    <div
                      key={type}
                      className="flex items-center gap-4 p-4 bg-sage/10 rounded-xl border border-sage/20"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-sage/20 rounded-lg flex items-center justify-center">
                        <Unlock className="w-5 h-5 text-sage" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-ink">{config.name}</p>
                        <p className="text-sm text-ink/60">{config.fullName}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 bg-sage/20 text-sage text-xs font-medium rounded-full">
                          FREE
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Unlocked Tools */}
          {hasNewTools && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-3">
                New Tools Unlocked
              </h3>
              <div className="flex flex-wrap gap-2">
                {grantedTools.map(tool => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold border border-gold/20 text-sm rounded-full"
                  >
                    <Unlock className="w-3 h-3" />
                    {tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Unlocked Resources */}
          {hasNewResources && unlockedResourceDetails.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-3">
                Premium Resources Unlocked
              </h3>
              <div className="space-y-3">
                {unlockedResourceDetails.map(resource => (
                  <div
                    key={resource.id}
                    className="flex items-center gap-4 p-4 bg-gold/10 rounded-xl border border-gold/20"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-semibold text-ink truncate">{resource.title}</p>
                      <p className="text-sm text-ink/60">{resource.format} • {resource.size}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gold/20 text-gold text-xs font-medium rounded-full">
                        <Download className="w-3 h-3" />
                        Ready
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info box */}
          <div className="p-4 bg-ocean/10 rounded-xl border border-ocean/20">
            <p className="text-sm text-ink/70">
              {hasNewAssessments && hasNewResources ? (
                <>
                  <strong>What&apos;s next?</strong> Download your premium resources and take the unlocked assessments to gain deeper insights and unlock specialized tools.
                </>
              ) : hasNewAssessments ? (
                <>
                  <strong>What&apos;s next?</strong> Take the unlocked assessments to gain
                  deeper insights and unlock specialized tools for your cultural
                  innovation journey.
                </>
              ) : hasNewResources ? (
                <>
                  <strong>Resources ready!</strong> Head to the Resources page to download your premium guides and frameworks.
                </>
              ) : (
                <>
                  <strong>Keep going!</strong> Continue using the tools you&apos;ve
                  unlocked to strengthen your cultural innovation practice.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
          {hasNewAssessments && hasNewResources ? (
            <>
              <Link
                href="/resources"
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
                onClick={onClose}
              >
                <Download className="w-4 h-4" />
                Download Resources
              </Link>
              <Link
                href={`/assessments/${unlockedAssessments[0]}`}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                onClick={onClose}
              >
                Start Next Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          ) : hasNewAssessments ? (
            <>
              <Link
                href="/tools"
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
                onClick={onClose}
              >
                View All Assessments
              </Link>
              <Link
                href={`/assessments/${unlockedAssessments[0]}`}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                onClick={onClose}
              >
                Start Next Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          ) : hasNewResources ? (
            <>
              <button onClick={onClose} className="flex-1 btn-secondary">
                Close
              </button>
              <Link
                href="/resources"
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                onClick={onClose}
              >
                <Download className="w-4 h-4" />
                Download Resources
              </Link>
            </>
          ) : (
            <button onClick={onClose} className="w-full btn-primary">
              Continue
            </button>
          )}
        </div>
      </div>

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes celebration-pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-confetti {
          animation: confetti-fall 3s ease-out forwards;
        }

        .animate-celebration-pop {
          animation: celebration-pop 0.5s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Smaller inline celebration for non-modal usage
export function InlineUnlockBadge({
  assessmentType,
}: {
  assessmentType: AssessmentType
}) {
  const config = ASSESSMENT_CONFIGS[assessmentType]

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-sage/10 border border-sage/20 rounded-lg">
      <div className="w-6 h-6 bg-sage/20 rounded-full flex items-center justify-center">
        <Unlock className="w-3 h-3 text-sage" />
      </div>
      <div>
        <p className="text-sm font-medium text-ink">{config.name} Unlocked</p>
        <p className="text-xs text-ink/60">{config.fullName}</p>
      </div>
    </div>
  )
}

// Lock indicator for locked assessments
export function LockedAssessmentBadge({
  assessmentType,
  onClick,
}: {
  assessmentType: AssessmentType
  onClick?: () => void
}) {
  const config = ASSESSMENT_CONFIGS[assessmentType]
  const requirement = config.unlockRequirement
    ? ASSESSMENT_CONFIGS[config.unlockRequirement]
    : null

  return (
    <div
      className={`flex items-center gap-3 p-4 bg-sand/30 border border-sand rounded-lg ${
        onClick ? 'cursor-pointer hover:bg-sand/50 transition-colors' : ''
      }`}
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-sand rounded-lg flex items-center justify-center">
        <Lock className="w-5 h-5 text-ink/40" />
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-ink/60">{config.name}</p>
        <p className="text-sm text-ink/40">{config.fullName}</p>
      </div>
      {requirement && (
        <div className="text-xs text-ink/50">
          Complete {requirement.name} to unlock
        </div>
      )}
    </div>
  )
}
