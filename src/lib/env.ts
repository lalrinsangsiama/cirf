/**
 * Environment variable validation
 * Validates required environment variables at startup
 */

interface EnvVar {
  name: string
  required: boolean
  pattern?: RegExp
  description: string
}

const ENV_VARS: EnvVar[] = [
  // Supabase
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    required: true,
    pattern: /^https:\/\/.+\.supabase\.co$/,
    description: 'Supabase project URL',
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    required: true,
    pattern: /^eyJ/,
    description: 'Supabase anonymous key (JWT)',
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    required: true,
    pattern: /^eyJ/,
    description: 'Supabase service role key (JWT)',
  },

  // Razorpay
  {
    name: 'NEXT_PUBLIC_RAZORPAY_KEY_ID',
    required: true,
    pattern: /^rzp_(test|live)_/,
    description: 'Razorpay key ID',
  },
  {
    name: 'RAZORPAY_KEY_ID',
    required: true,
    pattern: /^rzp_(test|live)_/,
    description: 'Razorpay key ID (server-side)',
  },
  {
    name: 'RAZORPAY_KEY_SECRET',
    required: true,
    description: 'Razorpay key secret',
  },
  {
    name: 'RAZORPAY_WEBHOOK_SECRET',
    required: true,
    description: 'Razorpay webhook secret',
  },

  // Resend
  {
    name: 'RESEND_API_KEY',
    required: true,
    pattern: /^re_/,
    description: 'Resend API key',
  },
  {
    name: 'RESEND_FROM_EMAIL',
    required: true,
    pattern: /^.+@.+\..+$/,
    description: 'Email address to send from',
  },
  {
    name: 'ADMIN_EMAIL',
    required: true,
    pattern: /^.+@.+\..+$/,
    description: 'Admin email for notifications',
  },

  // AI (optional in non-production)
  {
    name: 'ANTHROPIC_API_KEY',
    required: false,
    pattern: /^sk-ant-/,
    description: 'Anthropic API key for AI features',
  },

  // Analytics (optional)
  {
    name: 'NEXT_PUBLIC_POSTHOG_KEY',
    required: false,
    description: 'PostHog project API key',
  },
  {
    name: 'NEXT_PUBLIC_POSTHOG_HOST',
    required: false,
    pattern: /^https?:\/\//,
    description: 'PostHog host URL',
  },
]

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Validate all environment variables
 */
export function validateEnv(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const isProduction = process.env.NODE_ENV === 'production'

  for (const envVar of ENV_VARS) {
    const value = process.env[envVar.name]

    // Check if required variable is missing
    if (envVar.required && !value) {
      errors.push(`Missing required environment variable: ${envVar.name} - ${envVar.description}`)
      continue
    }

    // Check optional variable
    if (!envVar.required && !value) {
      if (isProduction && envVar.name.includes('POSTHOG')) {
        warnings.push(`Missing optional environment variable: ${envVar.name} - Analytics may not work`)
      }
      continue
    }

    // Validate pattern if specified
    if (value && envVar.pattern && !envVar.pattern.test(value)) {
      errors.push(
        `Invalid format for ${envVar.name}: Expected to match ${envVar.pattern.toString()}`
      )
    }
  }

  // Additional validation checks
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID
  const razorpayPublicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  if (razorpayKeyId && razorpayPublicKeyId && razorpayKeyId !== razorpayPublicKeyId) {
    warnings.push('RAZORPAY_KEY_ID and NEXT_PUBLIC_RAZORPAY_KEY_ID should match')
  }

  if (isProduction) {
    if (razorpayKeyId?.includes('test')) {
      warnings.push('Using Razorpay test mode in production')
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      warnings.push('ANTHROPIC_API_KEY not set - AI features will be disabled')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Validate environment and throw if invalid (for startup)
 */
export function assertEnv(): void {
  const result = validateEnv()

  if (result.warnings.length > 0) {
    console.warn('Environment warnings:')
    result.warnings.forEach((warning) => console.warn(`  - ${warning}`))
  }

  if (!result.valid) {
    console.error('Environment validation failed:')
    result.errors.forEach((error) => console.error(`  - ${error}`))
    throw new Error('Environment validation failed. Check the logs above.')
  }
}

/**
 * Check if a specific feature is enabled based on env vars
 */
export const features = {
  get ai(): boolean {
    return !!process.env.ANTHROPIC_API_KEY
  },
  get analytics(): boolean {
    return !!(process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST)
  },
  get payments(): boolean {
    return !!(
      process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      process.env.RAZORPAY_WEBHOOK_SECRET
    )
  },
  get email(): boolean {
    return !!(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)
  },
  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  },
  get isTestMode(): boolean {
    return !!process.env.RAZORPAY_KEY_ID?.includes('test')
  },
}
