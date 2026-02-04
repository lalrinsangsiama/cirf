import { describe, it, expect } from 'vitest'
import {
  assessmentQuestions,
  getQuestionsByCategory,
  calculateScoreInterpretation,
  DATABASE_AVERAGE_SCORE,
  CRITICAL_THRESHOLD,
  necessaryConditions,
  synergyEffects,
} from '@/lib/data/assessmentQuestions'

describe('Assessment Questions', () => {
  it('has 13 questions total', () => {
    expect(assessmentQuestions).toHaveLength(13)
  })

  it('has unique IDs for all questions', () => {
    const ids = assessmentQuestions.map((q) => q.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('has all required fields for each question', () => {
    assessmentQuestions.forEach((q) => {
      expect(q.id).toBeDefined()
      expect(q.component).toBeDefined()
      expect(q.category).toBeDefined()
      expect(q.question).toBeDefined()
      expect(q.description).toBeDefined()
      expect(q.yesIndicators).toBeDefined()
      expect(q.noIndicators).toBeDefined()
      expect(q.successRate).toBeDefined()
      expect(q.discriminatoryPower).toBeDefined()
    })
  })

  it('has valid categories for all questions', () => {
    const validCategories = ['foundation', 'capacity', 'outcome']
    assessmentQuestions.forEach((q) => {
      expect(validCategories).toContain(q.category)
    })
  })

  it('has at least 2 yes indicators per question', () => {
    assessmentQuestions.forEach((q) => {
      expect(q.yesIndicators.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('has at least 2 no indicators per question', () => {
    assessmentQuestions.forEach((q) => {
      expect(q.noIndicators.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('has success rates between 0 and 100', () => {
    assessmentQuestions.forEach((q) => {
      expect(q.successRate).toBeGreaterThanOrEqual(0)
      expect(q.successRate).toBeLessThanOrEqual(100)
    })
  })

  it('has positive discriminatory power', () => {
    assessmentQuestions.forEach((q) => {
      expect(q.discriminatoryPower).toBeGreaterThan(0)
    })
  })
})

describe('getQuestionsByCategory', () => {
  it('returns 4 foundation questions', () => {
    const foundationQuestions = getQuestionsByCategory('foundation')
    expect(foundationQuestions).toHaveLength(4)
    foundationQuestions.forEach((q) => {
      expect(q.category).toBe('foundation')
    })
  })

  it('returns 6 capacity questions', () => {
    const capacityQuestions = getQuestionsByCategory('capacity')
    expect(capacityQuestions).toHaveLength(6)
    capacityQuestions.forEach((q) => {
      expect(q.category).toBe('capacity')
    })
  })

  it('returns 3 outcome questions', () => {
    const outcomeQuestions = getQuestionsByCategory('outcome')
    expect(outcomeQuestions).toHaveLength(3)
    outcomeQuestions.forEach((q) => {
      expect(q.category).toBe('outcome')
    })
  })
})

describe('calculateScoreInterpretation', () => {
  it('returns Critical for score 0-3', () => {
    [0, 1, 2, 3].forEach((score) => {
      const result = calculateScoreInterpretation(score)
      expect(result.level).toBe('Critical')
      expect(result.successRate).toBe(15.7)
    })
  })

  it('returns Low for score 4-5', () => {
    [4, 5].forEach((score) => {
      const result = calculateScoreInterpretation(score)
      expect(result.level).toBe('Low')
      expect(result.successRate).toBe(28.2)
    })
  })

  it('returns Medium for score 6-7', () => {
    [6, 7].forEach((score) => {
      const result = calculateScoreInterpretation(score)
      expect(result.level).toBe('Medium')
      expect(result.successRate).toBe(51.2)
    })
  })

  it('returns Medium-High for score 8-9', () => {
    [8, 9].forEach((score) => {
      const result = calculateScoreInterpretation(score)
      expect(result.level).toBe('Medium-High')
      expect(result.successRate).toBe(98.6)
    })
  })

  it('returns High for score 10-11', () => {
    [10, 11].forEach((score) => {
      const result = calculateScoreInterpretation(score)
      expect(result.level).toBe('High')
      expect(result.successRate).toBe(98.5)
    })
  })

  it('returns Excellent for score 12-13', () => {
    [12, 13].forEach((score) => {
      const result = calculateScoreInterpretation(score)
      expect(result.level).toBe('Excellent')
      expect(result.successRate).toBe(96.7)
    })
  })

  it('returns correct color for each level', () => {
    expect(calculateScoreInterpretation(2).color).toContain('red')
    expect(calculateScoreInterpretation(5).color).toContain('orange')
    expect(calculateScoreInterpretation(7).color).toContain('yellow')
    expect(calculateScoreInterpretation(8).color).toContain('green')
    expect(calculateScoreInterpretation(10).color).toContain('emerald')
    expect(calculateScoreInterpretation(13).color).toContain('teal')
  })

  it('returns description for each level', () => {
    [0, 4, 6, 8, 10, 12].forEach((score) => {
      const result = calculateScoreInterpretation(score)
      expect(result.description).toBeTruthy()
      expect(result.description.length).toBeGreaterThan(10)
    })
  })
})

describe('Constants', () => {
  it('has correct database average score', () => {
    expect(DATABASE_AVERAGE_SCORE).toBe(8.38)
  })

  it('has correct critical threshold', () => {
    expect(CRITICAL_THRESHOLD).toBe(7)
  })

  it('has 5 necessary conditions', () => {
    expect(necessaryConditions).toHaveLength(5)
  })

  it('necessary conditions have required fields', () => {
    necessaryConditions.forEach((c) => {
      expect(c.component).toBeDefined()
      expect(c.successRate).toBeDefined()
      expect(c.discriminatoryPower).toBeDefined()
    })
  })

  it('has synergy effects', () => {
    expect(synergyEffects.length).toBeGreaterThan(0)
    synergyEffects.forEach((e) => {
      expect(e.combination).toBeDefined()
      expect(e.bonus).toBeGreaterThan(0)
    })
  })
})
