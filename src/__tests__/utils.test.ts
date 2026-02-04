import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn (className utility)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active')
  })

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end')
  })

  it('handles array of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })

  it('handles object notation', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('merges Tailwind conflicts correctly', () => {
    // tailwind-merge should handle conflicting classes
    expect(cn('p-4', 'p-2')).toBe('p-2')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
    expect(cn('bg-red-100', 'bg-blue-200')).toBe('bg-blue-200')
  })

  it('preserves non-conflicting classes', () => {
    expect(cn('p-4', 'm-2')).toBe('p-4 m-2')
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
  })

  it('handles complex combinations', () => {
    const result = cn(
      'base-class',
      true && 'conditional-true',
      false && 'conditional-false',
      { 'object-true': true, 'object-false': false },
      ['array-item-1', 'array-item-2']
    )
    expect(result).toContain('base-class')
    expect(result).toContain('conditional-true')
    expect(result).not.toContain('conditional-false')
    expect(result).toContain('object-true')
    expect(result).not.toContain('object-false')
    expect(result).toContain('array-item-1')
    expect(result).toContain('array-item-2')
  })
})
