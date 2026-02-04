/**
 * Validates redirect URLs to prevent open redirect vulnerabilities.
 * Only allows relative paths to whitelisted internal routes.
 */
export function validateRedirectUrl(url: string | null): string {
  const defaultRedirect = '/dashboard'

  if (!url) return defaultRedirect

  // Must start with / (relative path)
  if (!url.startsWith('/')) return defaultRedirect

  // Must not contain protocol or double slashes (prevent //evil.com)
  if (url.includes('://') || url.startsWith('//')) return defaultRedirect

  // Decode URL to prevent encoded attacks
  let decodedUrl: string
  try {
    decodedUrl = decodeURIComponent(url)
  } catch {
    return defaultRedirect
  }

  // Check decoded URL for protocol or double slashes
  if (decodedUrl.includes('://') || decodedUrl.startsWith('//')) {
    return defaultRedirect
  }

  // Whitelist of allowed path prefixes
  const allowedPrefixes = [
    '/dashboard',
    '/tools',
    '/assessments',
    '/pricing',
    '/resources',
    '/blog',
    '/profile',
    '/framework',
    '/case-studies',
    '/about',
  ]

  if (!allowedPrefixes.some(prefix => url.startsWith(prefix))) {
    return defaultRedirect
  }

  return url
}
