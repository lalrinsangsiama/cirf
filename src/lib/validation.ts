import { z } from 'zod'

// ===== Sanitization Helpers =====

/**
 * Sanitize string input to prevent XSS attacks
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Sanitize HTML but allow basic formatting
 */
export function sanitizeHtml(input: string): string {
  // Remove script tags and event handlers
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}

/**
 * Strip all HTML tags
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '')
}

// ===== Common Schemas =====

export const emailSchema = z
  .string()
  .email('Please provide a valid email address')
  .min(5, 'Email is too short')
  .max(254, 'Email is too long')
  .transform((val) => val.trim().toLowerCase())

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .transform((val) => sanitizeString(val.trim()))

export const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(5000, 'Message is too long')
  .transform((val) => sanitizeString(val.trim()))

// ===== Contact Form Schema =====

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .max(200, 'Subject is too long')
    .optional()
    .transform((val) => (val ? sanitizeString(val.trim()) : undefined)),
  message: messageSchema,
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

// ===== Newsletter Schema =====

export const newsletterSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .max(100, 'Name is too long')
    .optional()
    .transform((val) => (val ? sanitizeString(val.trim()) : undefined)),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

// ===== Razorpay Schemas =====

export const creditPackIdSchema = z.enum(['pack_5', 'pack_15', 'pack_50'])

export const currencySchema = z.enum(['INR', 'USD']).default('INR')

export const createOrderSchema = z.object({
  packId: creditPackIdSchema,
  currency: currencySchema,
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z
    .string()
    .min(1, 'Order ID is required')
    .max(100, 'Order ID is too long'),
  razorpay_payment_id: z
    .string()
    .min(1, 'Payment ID is required')
    .max(100, 'Payment ID is too long'),
  razorpay_signature: z
    .string()
    .min(1, 'Signature is required')
    .max(256, 'Signature is too long'),
  packId: creditPackIdSchema,
  credits: z
    .number()
    .int()
    .positive()
    .max(1000, 'Invalid credit amount'),
})

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>

// ===== AI Generation Schema =====

export const generatePostSchema = z.object({
  topic: z
    .string()
    .min(5, 'Topic must be at least 5 characters')
    .max(500, 'Topic is too long')
    .transform((val) => sanitizeString(val.trim())),
})

export type GeneratePostInput = z.infer<typeof generatePostSchema>

// ===== Blog Post Schema =====

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title is too long')
    .transform((val) => sanitizeString(val.trim())),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug is too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z
    .string()
    .min(100, 'Content must be at least 100 characters')
    .max(50000, 'Content is too long'),
  excerpt: z
    .string()
    .max(500, 'Excerpt is too long')
    .optional()
    .transform((val) => (val ? sanitizeString(val.trim()) : undefined)),
  category: z.enum([
    'research',
    'case-study',
    'practitioner-tips',
    'news',
    'framework-updates',
  ]),
  tags: z.array(z.string().max(50)).max(10).optional(),
  featured_image: z.string().url().optional(),
  status: z.enum(['draft', 'review', 'published', 'archived']).default('draft'),
  seo_description: z
    .string()
    .max(160, 'SEO description should be under 160 characters')
    .optional(),
  og_image: z.string().url().optional(),
})

export type BlogPostInput = z.infer<typeof blogPostSchema>

// ===== Assessment Schema =====

export const assessmentAnswerSchema = z.record(
  z.string(),
  z.union([z.number().int().min(1).max(7), z.string(), z.null()])
)

export const saveAssessmentSchema = z.object({
  answers: assessmentAnswerSchema,
  score: z.number().min(0).max(13),
  interpretation: z.object({
    level: z.string(),
    description: z.string(),
    recommendations: z.array(z.string()),
  }),
  matchedCaseStudies: z.array(z.string()).optional(),
})

export type SaveAssessmentInput = z.infer<typeof saveAssessmentSchema>

// ===== Waitlist Schema =====

export const waitlistSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  organization: z
    .string()
    .max(200, 'Organization name is too long')
    .optional()
    .transform((val) => (val ? sanitizeString(val.trim()) : undefined)),
  interest: z
    .string()
    .max(1000, 'Interest description is too long')
    .optional()
    .transform((val) => (val ? sanitizeString(val.trim()) : undefined)),
})

export type WaitlistInput = z.infer<typeof waitlistSchema>

// ===== Validation Helper =====

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; errors?: z.ZodIssue[] }

export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const firstError = result.error.issues[0]
  return {
    success: false,
    error: firstError?.message || 'Validation failed',
    errors: result.error.issues,
  }
}
