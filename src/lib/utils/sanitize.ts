/**
 * HTML Sanitization Utility
 *
 * Provides safe HTML sanitization for blog content and user inputs.
 * For production at scale, consider using a library like DOMPurify:
 * npm install isomorphic-dompurify
 */

// List of allowed HTML tags for blog content
const ALLOWED_TAGS = new Set([
  'p', 'br', 'b', 'i', 'strong', 'em', 'u',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'span', 'div',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'img', 'figure', 'figcaption',
  'hr',
])

// List of allowed attributes
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title', 'target', 'rel']),
  img: new Set(['src', 'alt', 'title', 'width', 'height']),
  '*': new Set(['class', 'id', 'style']),
}

// Dangerous patterns to remove
const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /on\w+\s*=\s*["'][^"']*["']/gi,
  /on\w+\s*=\s*[^\s>]*/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /expression\s*\(/gi,
]

/**
 * Sanitize HTML content by removing dangerous elements and attributes
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''

  let sanitized = html

  // Remove dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '')
  }

  // Remove event handlers more thoroughly
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*(["']).*?\1/gi, '')
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, '')

  // Ensure links open safely
  sanitized = sanitized.replace(
    /<a\s+([^>]*?)>/gi,
    (match, attrs) => {
      // Add rel="noopener noreferrer" to external links
      if (!attrs.includes('rel=')) {
        return `<a ${attrs} rel="noopener noreferrer">`
      }
      return match
    }
  )

  return sanitized
}

/**
 * Strip all HTML tags from a string
 */
export function stripHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .trim()
}

/**
 * Escape HTML entities in a string (for displaying user input)
 */
export function escapeHtml(text: string): string {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Sanitize a URL to prevent XSS
 */
export function sanitizeUrl(url: string): string {
  if (!url) return ''

  // Only allow http, https, and relative URLs
  const trimmed = url.trim().toLowerCase()
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  ) {
    return url
  }

  // Block potentially dangerous protocols
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('vbscript:') ||
    trimmed.startsWith('data:')
  ) {
    return ''
  }

  // Default to treating as relative URL
  return url
}
