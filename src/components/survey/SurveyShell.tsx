'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SURVEY_SCREENS, TOTAL_SCREENS } from '@/lib/data/cirfSurveyQuestions'
import type { SurveyAnswers, AnswerValue } from '@/lib/survey/types'
import { isScreenValid } from '@/lib/survey/validation'
import { SurveyProgress } from './SurveyProgress'
import { SurveyNavigation } from './SurveyNavigation'
import { SectionIntro } from './SectionIntro'
import { ThankYouScreen } from './ThankYouScreen'
import { QuestionRenderer } from './QuestionRenderer'

const STORAGE_KEY = 'cirf-survey-state'
const SESSION_KEY = 'cirf-survey-session'

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function SurveyShell() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [sessionId, setSessionId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [animClass, setAnimClass] = useState('animate-fade-in-up')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const startedAtRef = useRef<string>(new Date().toISOString())

  // Initialize session and restore draft
  useEffect(() => {
    let sid = localStorage.getItem(SESSION_KEY)
    if (!sid) {
      sid = generateId()
      localStorage.setItem(SESSION_KEY, sid)
    }
    setSessionId(sid)

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const state = JSON.parse(saved)
        if (state.answers) setAnswers(state.answers)
        if (state.currentScreen !== undefined) setCurrentScreen(state.currentScreen)
        if (state.startedAt) startedAtRef.current = state.startedAt
        if (state.isComplete) setIsComplete(true)
      } catch {
        // Ignore corrupt state
      }
    }
  }, [])

  // Auto-save to localStorage (debounced)
  const saveToLocal = useCallback(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answers,
        currentScreen,
        startedAt: startedAtRef.current,
        isComplete,
      })
    )
  }, [answers, currentScreen, isComplete])

  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(saveToLocal, 500)
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [saveToLocal])

  // Save draft to server on navigation
  const saveDraftToServer = useCallback(async () => {
    if (!sessionId) return
    try {
      await fetch('/api/survey/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, answers, currentScreen }),
      })
    } catch {
      // Silent fail
    }
  }, [sessionId, answers, currentScreen])

  const handleAnswer = (questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const transitionTo = (nextScreen: number, direction: 'forward' | 'back') => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setAnimClass(direction === 'forward' ? 'survey-exit-left' : 'survey-exit-right')

    setTimeout(() => {
      setCurrentScreen(nextScreen)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setAnimClass(direction === 'forward' ? 'survey-enter-right' : 'survey-enter-left')

      setTimeout(() => {
        setAnimClass('')
        setIsTransitioning(false)
      }, 400)
    }, 300)
  }

  const handleNext = () => {
    if (currentScreen < TOTAL_SCREENS - 1) {
      saveDraftToServer()
      transitionTo(currentScreen + 1, 'forward')
    }
  }

  const handleBack = () => {
    if (currentScreen > 0) {
      transitionTo(currentScreen - 1, 'back')
    }
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          answers,
          startedAt: startedAtRef.current,
        }),
      })

      if (res.ok) {
        setIsComplete(true)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ isComplete: true }))
      } else {
        const data = await res.json().catch(() => ({}))
        alert(data?.error?.message || 'Failed to submit. Please try again.')
      }
    } catch {
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Render ──

  if (isComplete) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <ThankYouScreen />
        </div>
      </div>
    )
  }

  const screen = SURVEY_SCREENS[currentScreen]
  if (!screen) return null

  const canAdvance = isScreenValid(screen, answers)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <SurveyProgress
        currentScreen={currentScreen}
        totalScreens={TOTAL_SCREENS}
        currentSection={screen.section}
      />

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center py-8 md:py-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Glass card container */}
          <div
            className="rounded-3xl px-6 py-8 md:px-10 md:py-10"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 4px 30px rgba(90, 175, 110, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Animated screen container */}
            <div className={animClass}>
              {/* Section label */}
              {screen.sectionLabel && (
                <div className="mb-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest"
                    style={{
                      background: 'linear-gradient(135deg, rgba(90, 175, 110, 0.1), rgba(74, 173, 224, 0.08))',
                      color: '#3d8a50',
                    }}
                  >
                    {screen.sectionLabel}
                  </span>
                </div>
              )}

              {/* Intro content */}
              {screen.introContent && (
                <SectionIntro
                  title={screen.introContent.title}
                  body={screen.introContent.body}
                  highlight={screen.introContent.highlight}
                />
              )}

              {/* Questions */}
              <div className="space-y-8">
                {screen.questions.map((question) => (
                  <QuestionRenderer
                    key={question.id}
                    question={question}
                    value={answers[question.id]}
                    onChange={handleAnswer}
                  />
                ))}
              </div>

              {/* Navigation */}
              <SurveyNavigation
                currentScreen={currentScreen}
                totalScreens={TOTAL_SCREENS}
                canAdvance={canAdvance}
                isSubmitting={isSubmitting}
                onBack={handleBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-5 text-center">
        <p className="text-[11px]" style={{ color: '#9abcaa' }}>
          Cultural Innovation Resilience Framework &middot; Doctoral Research Study &middot; All responses are confidential
        </p>
      </div>
    </div>
  )
}
