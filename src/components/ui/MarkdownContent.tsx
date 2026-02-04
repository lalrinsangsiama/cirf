'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { cn } from '@/lib/utils'

// Extended schema allowing some additional HTML elements while maintaining security
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    // Allow class names for styling
    '*': ['className', 'class'],
    // Allow links with safe attributes
    a: ['href', 'title', 'target', 'rel'],
    // Allow images with safe attributes
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    // Allow code blocks with language class
    code: ['className', 'class'],
    // Allow tables
    table: ['className', 'class'],
    th: ['className', 'class', 'scope'],
    td: ['className', 'class'],
  },
  // Protocols allowed for links
  protocols: {
    href: ['http', 'https', 'mailto'],
    src: ['http', 'https', 'data'],
  },
  // Tags allowed
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'iframe', // Remove iframe for security
  ].filter(tag => tag !== 'iframe'), // Explicitly remove iframe
}

interface MarkdownContentProps {
  content: string
  className?: string
  /**
   * Whether to use prose typography styles
   * @default true
   */
  prose?: boolean
  /**
   * Size variant for prose
   * @default 'base'
   */
  size?: 'sm' | 'base' | 'lg'
}

/**
 * Safe markdown renderer component
 *
 * Features:
 * - Sanitizes HTML to prevent XSS attacks
 * - Supports GitHub Flavored Markdown (tables, strikethrough, autolinks, etc.)
 * - Properly styled with prose typography
 *
 * @example
 * ```tsx
 * <MarkdownContent content={post.content} />
 * ```
 */
export function MarkdownContent({
  content,
  className,
  prose = true,
  size = 'base',
}: MarkdownContentProps) {
  const proseClasses = prose
    ? cn(
        'prose max-w-none',
        size === 'sm' && 'prose-sm',
        size === 'lg' && 'prose-lg',
        // Custom prose styling to match site design
        'prose-headings:text-ink prose-headings:font-serif',
        'prose-p:text-stone prose-p:leading-relaxed',
        'prose-a:text-gold prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-ink prose-strong:font-semibold',
        'prose-code:text-ink prose-code:bg-sand prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm',
        'prose-pre:bg-ink prose-pre:text-pearl prose-pre:rounded-lg',
        'prose-blockquote:border-gold prose-blockquote:text-stone prose-blockquote:italic',
        'prose-ul:text-stone prose-ol:text-stone',
        'prose-li:marker:text-gold',
        'prose-img:rounded-lg prose-img:shadow-sm',
        'prose-hr:border-stone/20',
        'prose-table:text-sm',
        'prose-th:text-ink prose-th:font-medium prose-th:bg-sand/50',
        'prose-td:text-stone'
      )
    : ''

  return (
    <div className={cn(proseClasses, className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
        components={{
          // Custom link component to add security attributes
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          // Custom image component with lazy loading
          img: ({ src, alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || ''}
              loading="lazy"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownContent
