import { describe, it, expect } from 'vitest'
import {
  sanitizeString,
  sanitizeHtml,
  stripHtml,
  contactFormSchema,
  newsletterSchema,
  createOrderSchema,
  verifyPaymentSchema,
  generatePostSchema,
  validateInput,
} from '@/lib/validation'

describe('Sanitization Helpers', () => {
  describe('sanitizeString', () => {
    it('escapes HTML special characters', () => {
      const input = '<script>alert("xss")</script>'
      const result = sanitizeString(input)
      expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;')
    })

    it('escapes ampersands', () => {
      expect(sanitizeString('Tom & Jerry')).toBe('Tom &amp; Jerry')
    })

    it('escapes quotes', () => {
      expect(sanitizeString("It's a \"test\"")).toBe("It&#x27;s a &quot;test&quot;")
    })

    it('handles empty string', () => {
      expect(sanitizeString('')).toBe('')
    })
  })

  describe('sanitizeHtml', () => {
    it('removes script tags', () => {
      const input = '<p>Hello</p><script>alert("xss")</script>'
      const result = sanitizeHtml(input)
      expect(result).not.toContain('script')
    })

    it('removes event handlers', () => {
      const input = '<img src="x" onerror="alert(1)" />'
      const result = sanitizeHtml(input)
      expect(result).not.toContain('onerror')
    })

    it('removes javascript: URLs', () => {
      const input = '<a href="javascript:alert(1)">Click</a>'
      const result = sanitizeHtml(input)
      expect(result).not.toContain('javascript:')
    })
  })

  describe('stripHtml', () => {
    it('removes all HTML tags', () => {
      const input = '<p>Hello <strong>World</strong></p>'
      expect(stripHtml(input)).toBe('Hello World')
    })

    it('handles nested tags', () => {
      const input = '<div><p><span>Test</span></p></div>'
      expect(stripHtml(input)).toBe('Test')
    })
  })
})

describe('Contact Form Schema', () => {
  it('validates correct input', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message that is long enough.',
    }
    const result = validateInput(contactFormSchema, input)
    expect(result.success).toBe(true)
  })

  it('rejects short name', () => {
    const input = {
      name: 'J',
      email: 'john@example.com',
      message: 'This is a test message that is long enough.',
    }
    const result = validateInput(contactFormSchema, input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('2 characters')
    }
  })

  it('rejects invalid email', () => {
    const input = {
      name: 'John Doe',
      email: 'not-an-email',
      message: 'This is a test message that is long enough.',
    }
    const result = validateInput(contactFormSchema, input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('email')
    }
  })

  it('rejects short message', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Too short',
    }
    const result = validateInput(contactFormSchema, input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('10 characters')
    }
  })

  it('normalizes email to lowercase', () => {
    const input = {
      name: 'John Doe',
      email: 'JOHN@EXAMPLE.COM',
      message: 'This is a test message that is long enough.',
    }
    const result = validateInput(contactFormSchema, input)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.email).toBe('john@example.com')
    }
  })

  it('accepts optional subject', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message that is long enough.',
    }
    const result = validateInput(contactFormSchema, input)
    expect(result.success).toBe(true)
  })
})

describe('Newsletter Schema', () => {
  it('validates email only', () => {
    const input = { email: 'test@example.com' }
    const result = validateInput(newsletterSchema, input)
    expect(result.success).toBe(true)
  })

  it('validates email with name', () => {
    const input = { email: 'test@example.com', name: 'John' }
    const result = validateInput(newsletterSchema, input)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const input = { email: 'invalid' }
    const result = validateInput(newsletterSchema, input)
    expect(result.success).toBe(false)
  })
})

describe('Create Order Schema', () => {
  it('validates correct input', () => {
    const input = { packId: 'pack_5', currency: 'INR' }
    const result = validateInput(createOrderSchema, input)
    expect(result.success).toBe(true)
  })

  it('rejects invalid pack ID', () => {
    const input = { packId: 'pack_100', currency: 'INR' }
    const result = validateInput(createOrderSchema, input)
    expect(result.success).toBe(false)
  })

  it('defaults currency to INR', () => {
    const input = { packId: 'pack_5' }
    const result = validateInput(createOrderSchema, input)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.currency).toBe('INR')
    }
  })

  it('accepts USD currency', () => {
    const input = { packId: 'pack_15', currency: 'USD' }
    const result = validateInput(createOrderSchema, input)
    expect(result.success).toBe(true)
  })
})

describe('Verify Payment Schema', () => {
  it('validates correct input', () => {
    const input = {
      razorpay_order_id: 'order_123',
      razorpay_payment_id: 'pay_123',
      razorpay_signature: 'sig_123abc',
      packId: 'pack_5',
      credits: 5,
    }
    const result = validateInput(verifyPaymentSchema, input)
    expect(result.success).toBe(true)
  })

  it('rejects missing fields', () => {
    const input = {
      razorpay_order_id: 'order_123',
      packId: 'pack_5',
      credits: 5,
    }
    const result = validateInput(verifyPaymentSchema, input)
    expect(result.success).toBe(false)
  })

  it('rejects negative credits', () => {
    const input = {
      razorpay_order_id: 'order_123',
      razorpay_payment_id: 'pay_123',
      razorpay_signature: 'sig_123',
      packId: 'pack_5',
      credits: -5,
    }
    const result = validateInput(verifyPaymentSchema, input)
    expect(result.success).toBe(false)
  })
})

describe('Generate Post Schema', () => {
  it('validates correct input', () => {
    const input = { topic: 'Cultural preservation in the digital age' }
    const result = validateInput(generatePostSchema, input)
    expect(result.success).toBe(true)
  })

  it('rejects short topic', () => {
    const input = { topic: 'Hi' }
    const result = validateInput(generatePostSchema, input)
    expect(result.success).toBe(false)
  })

  it('sanitizes topic', () => {
    const input = { topic: 'Test <script>alert(1)</script> topic here' }
    const result = validateInput(generatePostSchema, input)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.topic).not.toContain('<script>')
    }
  })
})
