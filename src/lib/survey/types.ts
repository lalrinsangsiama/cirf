// ── Survey Question Types ──

export interface BaseQuestion {
  id: string
  section: SurveySection
  label: string
  required: boolean
  helpText?: string
}

export interface SingleSelectQuestion extends BaseQuestion {
  type: 'single-select'
  options: { value: string; label: string }[]
  hasOther: boolean
  conditionalTextOn?: string // show text input when this value is selected
}

export interface MultiSelectQuestion extends BaseQuestion {
  type: 'multi-select'
  options: { value: string; label: string }[]
  hasOther: boolean
  maxSelections?: number
  minSelections?: number
}

export interface LikertMatrixQuestion extends BaseQuestion {
  type: 'likert-matrix'
  statements: { id: string; text: string }[]
  scale: { value: number; label: string }[]
}

export interface TripleRatingMatrixQuestion extends BaseQuestion {
  type: 'triple-rating-matrix'
  indicators: { id: string; text: string }[]
  dimensions: { id: string; label: string }[]
  scale: { value: number; label: string }[]
}

export interface OpenTextQuestion extends BaseQuestion {
  type: 'open-text'
  placeholder?: string
  maxLength?: number
  rows?: number
}

export interface RankingQuestion extends BaseQuestion {
  type: 'ranking'
  items: { id: string; label: string }[]
}

export interface ConsentQuestion extends BaseQuestion {
  type: 'consent'
  consentText: string
}

export type SurveyQuestion =
  | SingleSelectQuestion
  | MultiSelectQuestion
  | LikertMatrixQuestion
  | TripleRatingMatrixQuestion
  | OpenTextQuestion
  | RankingQuestion
  | ConsentQuestion

// ── Survey Structure ──

export type SurveySection =
  | 'consent'
  | 'profile'
  | 'definition'
  | 'pillars'
  | 'barriers'
  | 'metrics'
  | 'reflections'

export interface SectionInfo {
  id: SurveySection
  title: string
  subtitle?: string
  estimatedMinutes: number
}

export interface SurveyScreen {
  id: number
  section: SurveySection
  sectionLabel?: string
  introContent?: {
    title: string
    body: string
    highlight?: string // e.g. proposed definition or pillar definition
  }
  questions: SurveyQuestion[]
}

// ── Answer Types ──

export type SingleSelectAnswer = { value: string; otherText?: string }
export type MultiSelectAnswer = { values: string[]; otherText?: string }
export type LikertMatrixAnswer = Record<string, number> // statementId -> rating
export type TripleRatingAnswer = Record<string, Record<string, number>> // indicatorId -> { dimensionId: rating }
export type RankingAnswer = Record<string, number> // itemId -> rank
export type OpenTextAnswer = string
export type ConsentAnswer = boolean

export type AnswerValue =
  | SingleSelectAnswer
  | MultiSelectAnswer
  | LikertMatrixAnswer
  | TripleRatingAnswer
  | RankingAnswer
  | OpenTextAnswer
  | ConsentAnswer

export type SurveyAnswers = Record<string, AnswerValue>

// ── Survey State ──

export interface SurveyState {
  sessionId: string
  currentScreen: number
  answers: SurveyAnswers
  startedAt: string
  lastSavedAt?: string
}
