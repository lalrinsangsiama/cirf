'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Clock,
  ClipboardCheck,
  Lock,
  Save,
  Users,
  ArrowRight,
  Gift,
  Unlock,
  FileText,
  CreditCard,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AssessmentConfig, TOOL_CONFIGS } from '@/lib/data/assessmentConfig'
import { getResourceByToolAccessId } from '@/lib/data/resourcesConfig'

interface AssessmentIntroScreenProps {
  config: AssessmentConfig
  user: { email?: string } | null
  profileName?: string | null
  credits?: number
  authLoading: boolean
  hasDraft?: boolean
  hasExistingSubmission?: boolean
  existingDate?: string | null
  existingScore?: number | null
  onStart: () => void
  children?: React.ReactNode // Optional extra content (e.g., CIL section grid)
}

export default function AssessmentIntroScreen({
  config,
  user,
  profileName,
  credits,
  authLoading,
  hasDraft = false,
  hasExistingSubmission = false,
  existingDate,
  existingScore,
  onStart,
  children,
}: AssessmentIntroScreenProps) {
  const [consentChecked, setConsentChecked] = useState(false)

  // Resolve tool and resource display names
  const toolNames = config.grantsToolAccess.map(
    (id) => TOOL_CONFIGS[id]?.name || id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  )
  const resourceDetails = config.grantsResourceAccess
    .map((id) => getResourceByToolAccessId(id))
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-serif text-2xl mb-2">{config.fullName}</h3>
        <p className="text-stone leading-relaxed">{config.researchDescription}</p>
      </div>

      {/* Description */}
      <p className="text-stone leading-relaxed">{config.description}</p>

      {/* Who is this for? */}
      <div className="flex items-start gap-3 p-4 bg-sand/50 rounded-lg">
        <Users className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-sm mb-1">Who is this for?</h4>
          <p className="text-sm text-stone">{config.targetParticipants}</p>
        </div>
      </div>

      {/* Time + question count */}
      <div className="flex flex-wrap gap-4 text-sm text-stone">
        <span className="flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4" />
          {config.questionCount} questions
        </span>
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          ~{config.estimatedMinutes} minutes
        </span>
        <span className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Responses kept confidential
        </span>
      </div>

      {/* Credit cost display */}
      {config.creditCost > 0 && user && (
        <div className={cn(
          'flex items-start gap-3 p-4 rounded-lg',
          (credits ?? 0) >= config.creditCost
            ? 'bg-ocean/10 border border-ocean/20'
            : 'bg-terracotta/10 border border-terracotta/20'
        )}>
          <CreditCard className={cn(
            'w-5 h-5 flex-shrink-0 mt-0.5',
            (credits ?? 0) >= config.creditCost ? 'text-ocean' : 'text-terracotta'
          )} />
          <div>
            <p className="font-medium text-sm">
              Costs 1 credit (you have {credits ?? 0})
            </p>
            {(credits ?? 0) < config.creditCost && (
              <p className="text-sm text-terracotta mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Complete another assessment to earn a credit
              </p>
            )}
          </div>
        </div>
      )}

      {/* What you'll earn */}
      {config.completionRewardSummary && (
        <div className="bg-sage/5 border border-sage/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-sage" />
            <h4 className="font-medium text-sm">What you&apos;ll earn</h4>
          </div>
          <p className="text-sm text-stone">{config.completionRewardSummary}</p>
        </div>
      )}

      {/* What you'll unlock */}
      {(resourceDetails.length > 0 || toolNames.length > 0) && (
        <div className="bg-gold/5 border border-gold/20 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-4 h-4 text-gold" />
            <h4 className="font-medium text-sm">What you'll unlock</h4>
          </div>
          <div className="space-y-2">
            {resourceDetails.map((resource) =>
              resource ? (
                <div key={resource.id} className="flex items-center gap-2 text-sm">
                  <FileText className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{resource.title}</span>
                  <span className="text-xs text-stone">({resource.format})</span>
                </div>
              ) : null
            )}
            {toolNames.map((name) => (
              <div key={name} className="flex items-center gap-2 text-sm">
                <Unlock className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                <span>{name}</span>
              </div>
            ))}
            {config.creditsGranted > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-ocean flex-shrink-0" />
                <span>{config.creditsGranted} assessment credit{config.creditsGranted > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Optional extra content (e.g., CIL section grid) */}
      {children}

      {/* Existing submission notice */}
      {hasExistingSubmission && (
        <div className="p-4 rounded-lg border border-gold/30 bg-gold/10">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Already Completed</h4>
              <p className="text-sm text-stone">
                You completed this assessment
                {existingDate ? ` on ${new Date(existingDate).toLocaleDateString()}` : ''}
                {existingScore != null ? ` with a score of ${existingScore}` : ''}.
                Each assessment can only be taken once.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Draft resume notice */}
      {!hasExistingSubmission && hasDraft && (
        <div className="p-4 rounded-lg border border-ocean/30 bg-ocean/10">
          <div className="flex items-start gap-3">
            <Save className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">You have saved progress</h4>
              <p className="text-sm text-stone">
                Your previous answers have been saved. Click &quot;Take the Survey&quot; to continue where you left off.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Auth status card */}
      {!authLoading && (
        <div
          className={cn(
            'p-4 rounded-lg border',
            user ? 'bg-sage/10 border-sage/30' : 'bg-sand border-stone/20'
          )}
        >
          {user ? (
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-sage" />
              <div>
                <p className="font-medium text-ink">Signed in as {profileName || user.email}</p>
                {credits != null && (
                  <p className="text-sm text-stone">
                    {credits} assessment credit{credits !== 1 ? 's' : ''} available
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-ink">Sign up to save your results</p>
                <p className="text-sm text-stone">Create a free account to track progress and unlock tools</p>
              </div>
              <Link
                href="/auth/signup?redirectTo=/tools"
                className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors flex-shrink-0"
              >
                Sign up free
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Consent checkbox */}
      {!hasExistingSubmission && (
        <label className="flex items-start gap-3 p-4 bg-pearl border border-ink/10 rounded-lg cursor-pointer select-none hover:border-gold/40 transition-colors">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-stone/40 text-gold focus:ring-gold/50 accent-gold"
          />
          <span className="text-sm text-stone leading-relaxed">
            I consent to participate in this research. I understand my responses are confidential
            and will be anonymized before use in any published research. I can withdraw at any time.{' '}
            <Link href="/privacy" className="text-gold hover:underline" onClick={(e) => e.stopPropagation()}>
              Privacy Policy
            </Link>
          </span>
        </label>
      )}

      {/* Start button */}
      {!hasExistingSubmission && (
        <button
          onClick={onStart}
          disabled={!consentChecked}
          className={cn(
            'btn-primary inline-flex items-center gap-2 w-full justify-center text-lg py-4',
            !consentChecked && 'opacity-50 cursor-not-allowed'
          )}
        >
          Take the Survey
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
