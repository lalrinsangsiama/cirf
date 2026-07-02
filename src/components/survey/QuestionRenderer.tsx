'use client'

import type {
  SurveyQuestion,
  AnswerValue,
  SingleSelectAnswer,
  MultiSelectAnswer,
  LikertMatrixAnswer,
  TripleRatingAnswer,
  RankingAnswer,
} from '@/lib/survey/types'
import { ConsentCheckbox } from './questions/ConsentCheckbox'
import { SingleSelect } from './questions/SingleSelect'
import { MultiSelectSurvey } from './questions/MultiSelectSurvey'
import { LikertMatrix } from './questions/LikertMatrix'
import { TripleRatingMatrix } from './questions/TripleRatingMatrix'
import { OpenText } from './questions/OpenText'
import { RankingQuestion } from './questions/RankingQuestion'

interface QuestionRendererProps {
  question: SurveyQuestion
  value: AnswerValue | undefined
  onChange: (questionId: string, value: AnswerValue) => void
}

export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  const handleChange = (v: AnswerValue) => onChange(question.id, v)

  return (
    <div className="space-y-3">
      {question.type !== 'consent' && (
        <div>
          <label className="block text-[16px] font-medium leading-relaxed" style={{ color: '#1a3a2a' }}>
            {question.label}
            {question.required && <span className="ml-1" style={{ color: '#c07557' }}>*</span>}
          </label>
          {question.helpText && (
            <p className="mt-1 text-[13px]" style={{ color: '#7aaaba' }}>{question.helpText}</p>
          )}
        </div>
      )}

      <div className="mt-2">
        {question.type === 'consent' && (
          <ConsentCheckbox
            consentText={question.consentText}
            value={(value as boolean) || false}
            onChange={handleChange}
          />
        )}

        {question.type === 'single-select' && (
          <SingleSelect
            questionId={question.id}
            options={question.options}
            hasOther={question.hasOther}
            conditionalTextOn={question.conditionalTextOn}
            value={value as SingleSelectAnswer | undefined}
            onChange={handleChange}
          />
        )}

        {question.type === 'multi-select' && (
          <MultiSelectSurvey
            questionId={question.id}
            options={question.options}
            hasOther={question.hasOther}
            maxSelections={question.maxSelections}
            minSelections={question.minSelections}
            value={value as MultiSelectAnswer | undefined}
            onChange={handleChange}
          />
        )}

        {question.type === 'likert-matrix' && (
          <LikertMatrix
            statements={question.statements}
            scale={question.scale}
            value={value as LikertMatrixAnswer | undefined}
            onChange={handleChange}
          />
        )}

        {question.type === 'triple-rating-matrix' && (
          <TripleRatingMatrix
            indicators={question.indicators}
            dimensions={question.dimensions}
            scale={question.scale}
            value={value as TripleRatingAnswer | undefined}
            onChange={handleChange}
          />
        )}

        {question.type === 'open-text' && (
          <OpenText
            questionId={question.id}
            placeholder={question.placeholder}
            maxLength={question.maxLength}
            rows={question.rows}
            value={(value as string) || ''}
            onChange={handleChange}
          />
        )}

        {question.type === 'ranking' && (
          <RankingQuestion
            items={question.items}
            value={value as RankingAnswer | undefined}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  )
}
