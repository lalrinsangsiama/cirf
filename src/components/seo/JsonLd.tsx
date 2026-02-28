const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cil-framework.org'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization schema for About page
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CIL - Cultural Innovation Lab',
    alternateName: 'CIL',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description:
      'Transforming indigenous wisdom into economic resilience. A comprehensive framework for understanding how cultural innovation drives sustainable development.',
    sameAs: [
      'https://twitter.com/cilframework',
      'https://linkedin.com/company/cil',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@cil-framework.org',
      url: `${baseUrl}/about#contact`,
    },
  }

  return <JsonLd data={data} />
}

// Article schema for blog posts
interface ArticleJsonLdProps {
  title: string
  description: string
  slug: string
  author: string
  publishedAt: string
  updatedAt?: string
  image?: string
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  author,
  publishedAt,
  updatedAt,
  image,
}: ArticleJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || `${baseUrl}/opengraph-image`,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CIL',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
    url: `${baseUrl}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${slug}`,
    },
  }

  return <JsonLd data={data} />
}

// FAQ schema
interface FaqItem {
  question: string
  answer: string
}

interface FaqJsonLdProps {
  faqs: FaqItem[]
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return <JsonLd data={data} />
}

// Breadcrumb schema
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  }

  return <JsonLd data={data} />
}

// WebSite schema for homepage
export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CIL - Cultural Innovation Lab',
    alternateName: 'CIL',
    url: baseUrl,
    description:
      'Transforming indigenous wisdom into economic resilience. A comprehensive framework for understanding how cultural innovation drives sustainable development.',
  }

  return <JsonLd data={data} />
}

// Product schema for credit packs
interface ProductJsonLdProps {
  name: string
  description: string
  price: number
  currency: string
}

export function ProductJsonLd({
  name,
  description,
  price,
  currency,
}: ProductJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'CIL',
      },
    },
  }

  return <JsonLd data={data} />
}

/**
 * Global JSON-LD schemas to be added to the root layout
 * Combines Organization and WebSite schemas for site-wide SEO
 */
export function GlobalJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
    </>
  )
}
