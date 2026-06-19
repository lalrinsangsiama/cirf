import type {
  SurveyScreen,
  SurveyQuestion,
  SurveyAnswers,
  SingleSelectAnswer,
  MultiSelectAnswer,
  LikertMatrixAnswer,
  TripleRatingAnswer,
  RankingAnswer,
} from './types'

/**
 * Check if a single question is answered (for required fields)
 */
function isQuestionAnswered(question: SurveyQuestion, answer: unknown): boolean {
  if (!answer && answer !== false) return false

  switch (question.type) {
    case 'consent':
      return answer === true

    case 'single-select': {
      const a = answer as SingleSelectAnswer
      if (!a?.value) return false
      // If conditionalTextOn triggers a text field, require it
      if (question.conditionalTextOn && a.value === question.conditionalTextOn) {
        return Boolean(a.otherText?.trim())
      }
      return true
    }

    case 'multi-select': {
      const a = answer as MultiSelectAnswer
      if (!a?.values?.length) return false
      if (question.minSelections && a.values.length < question.minSelections) return false
      if (question.maxSelections && a.values.length > question.maxSelections) return false
      if (a.values.includes('other') && !a.otherText?.trim()) return false
      return true
    }

    case 'likert-matrix': {
      const a = answer as LikertMatrixAnswer
      if (!a || typeof a !== 'object') return false
      return question.statements.every((s) => a[s.id] !== undefined)
    }

    case 'triple-rating-matrix': {
      const a = answer as TripleRatingAnswer
      if (!a || typeof a !== 'object') return false
      return question.indicators.every((ind) => {
        const ratings = a[ind.id]
        if (!ratings) return false
        return question.dimensions.every((dim) => ratings[dim.id] !== undefined)
      })
    }

    case 'open-text':
      return typeof answer === 'string' && answer.trim().length > 0

    case 'ranking': {
      const a = answer as RankingAnswer
      if (!a || typeof a !== 'object') return false
      // All items must be ranked
      if (Object.keys(a).length !== question.items.length) return false
      // No duplicate ranks
      const ranks = Object.values(a)
      return new Set(ranks).size === ranks.length
    }

    default:
      return false
  }
}

/**
 * Check if a screen's required questions are all answered
 */
export function isScreenValid(screen: SurveyScreen, answers: SurveyAnswers): boolean {
  return screen.questions.every((q) => {
    if (!q.required) return true
    return isQuestionAnswered(q, answers[q.id])
  })
}

/**
 * Check if a screen has any answers at all (for progress tracking)
 */
export function hasScreenAnswers(screen: SurveyScreen, answers: SurveyAnswers): boolean {
  return screen.questions.some((q) => {
    const answer = answers[q.id]
    if (!answer && answer !== false) return false
    if (typeof answer === 'string') return answer.trim().length > 0
    return true
  })
}
