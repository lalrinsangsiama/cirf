import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { validateRedirectUrl } from '@/lib/utils/validateRedirect'

/**
 * Map of known OAuth error codes to user-friendly messages
 * This prevents exposing internal error details to users
 */
const ERROR_MESSAGES: Record<string, string> = {
  // OAuth errors
  'access_denied': 'You cancelled the sign-in process or access was denied.',
  'invalid_request': 'There was a problem with the sign-in request. Please try again.',
  'unauthorized_client': 'This application is not authorized. Please contact support.',
  'server_error': 'The authentication service encountered an error. Please try again later.',
  'temporarily_unavailable': 'The authentication service is temporarily unavailable. Please try again later.',
  'invalid_scope': 'There was a configuration issue. Please contact support.',

  // Supabase-specific errors
  'Email link is invalid or has expired': 'Your sign-in link has expired. Please request a new one.',
  'User already registered': 'An account with this email already exists. Please sign in instead.',
  'Invalid login credentials': 'Invalid email or password. Please try again.',
  'User not found': 'No account found with this email address.',

  // Default fallback
  'default': 'Authentication failed. Please try again.',
}

/**
 * Sanitize error message by mapping to known safe messages
 */
function sanitizeErrorMessage(error: string | null, description: string | null): string {
  // Check if we have a direct match for the error code
  if (error && ERROR_MESSAGES[error]) {
    return ERROR_MESSAGES[error]
  }

  // Check if the description matches any known error pattern
  if (description) {
    for (const [pattern, message] of Object.entries(ERROR_MESSAGES)) {
      if (description.toLowerCase().includes(pattern.toLowerCase())) {
        return message
      }
    }
  }

  // Return generic error for unknown errors (security: don't expose internal messages)
  return ERROR_MESSAGES['default']
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const errorParam = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const redirectTo = validateRedirectUrl(searchParams.get('redirectTo'))

  // Handle OAuth provider errors
  if (errorParam) {
    const errorMessage = encodeURIComponent(
      sanitizeErrorMessage(errorParam, errorDescription)
    )
    return NextResponse.redirect(
      `${origin}/auth/login?error=${errorMessage}&redirectTo=${encodeURIComponent(redirectTo)}`
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successful auth - redirect to intended destination
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }

    // Auth exchange failed - sanitize error message
    const errorMessage = encodeURIComponent(
      sanitizeErrorMessage(null, error.message)
    )
    return NextResponse.redirect(
      `${origin}/auth/login?error=${errorMessage}&redirectTo=${encodeURIComponent(redirectTo)}`
    )
  }

  // No code provided - redirect to error page with generic message
  return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(ERROR_MESSAGES['default'])}`)
}
