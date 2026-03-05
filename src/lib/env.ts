/**
 * Environment variable validation
 * Validates required environment variables at startup
 */

import { logger } from '@/lib/logger'

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

  // Security
  {
    name: 'CSRF_SECRET',
    required: true,
    description: 'CSRF token signing secret (generate with: openssl rand -hex 32)',
  },

  // App URLs
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    required: true,
    pattern: /^https?:\/\//,
    description: 'Public site URL (e.g. https://culturalinnovationlab.org)',
  },
  {
    name: 'NEXT_PUBLIC_APP_URL',
    required: true,
    pattern: /^https?:\/\//,
    description: 'App URL for auth redirects (e.g. https://culturalinnovationlab.org)',
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

  if (isProduction) {
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
    logger.warn('Environment warnings', { warnings: result.warnings })
  }

  if (!result.valid) {
    logger.error('Environment validation failed', { errors: result.errors })
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
  get email(): boolean {
    return !!(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)
  },
  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  },
}
