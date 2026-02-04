import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Calendar, User, ArrowLeft, BookOpen, ExternalLink, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

interface Citation {
  author: string
  year: number | string
  title: string
  journal?: string
  doi?: string
  url?: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  author_name: string
  category: string
  tags: string[]
  featured_image: string | null
  citations: Citation[] | null
  published_at: string
  view_count: number
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, featured_image, author_name')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the Cultural Innovation Lab blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
      authors: [post.author_name || 'CIL Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || undefined,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  }
}

const CATEGORIES: Record<string, { name: string; color: string }> = {
  resources: { name: 'Resources', color: 'bg-gold/10 text-gold' },
  education: { name: 'Education', color: 'bg-ocean/10 text-ocean' },
  series: { name: 'World Series', color: 'bg-sage/10 text-sage' },
  playlist: { name: 'Playlists', color: 'bg-terracotta/10 text-terracotta' },
  research: { name: 'Research Insights', color: 'bg-ocean/10 text-ocean' },
  'case-study': { name: 'Case Studies', color: 'bg-gold/10 text-gold' },
  'practitioner-tips': { name: 'Practitioner Tips', color: 'bg-sage/10 text-sage' },
  news: { name: 'News', color: 'bg-terracotta/10 text-terracotta' },
  'framework-updates': { name: 'Framework Updates', color: 'bg-lavender/10 text-ink' },
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !post) {
    notFound()
  }

  // Increment view count (fire and forget)
  supabase
    .from('blog_posts')
    .update({ view_count: (post.view_count || 0) + 1 })
    .eq('id', post.id)
    .then(() => {})

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const categoryInfo = CATEGORIES[post.category] || { name: post.category, color: 'bg-stone/10 text-stone' }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt || `Read ${post.title} on the Cultural Innovation Lab blog.`}
        slug={post.slug}
        author={post.author_name || 'CIL Team'}
        publishedAt={post.published_at}
        image={post.featured_image || undefined}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <main className="min-h-screen bg-pearl pt-24 pb-16">
        {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-stone hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${categoryInfo.color}`}>
            {categoryInfo.name}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-stone">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author_name || 'CIL Team'}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.published_at)}
            </span>
            {post.view_count > 0 && (
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {post.view_count} views
              </span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <div className="bg-sand rounded-xl p-6 mb-8 border-l-4 border-gold">
            <p className="text-lg text-ink italic">{post.excerpt}</p>
          </div>
        )}

        {/* Content - Using MarkdownContent for safe rendering with XSS protection */}
        <MarkdownContent content={post.content} size="lg" />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-stone/10">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-stone" />
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-stone/10 text-stone rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Citations */}
        {post.citations && post.citations.length > 0 && (
          <div className="mt-12 pt-8 border-t border-stone/20">
            <h3 className="text-xl font-semibold text-ink mb-6">References</h3>
            <div className="space-y-4">
              {post.citations.map((citation: Citation, index: number) => (
                <div key={index} className="text-sm text-stone">
                  <p>
                    {citation.author} ({citation.year}).{' '}
                    <em>{citation.title}</em>
                    {citation.journal && `. ${citation.journal}`}
                    {citation.doi && (
                      <>
                        .{' '}
                        <a
                          href={`https://doi.org/${citation.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:underline inline-flex items-center gap-1"
                        >
                          {citation.doi}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    )}
                    {citation.url && !citation.doi && (
                      <>
                        .{' '}
                        <a
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:underline inline-flex items-center gap-1"
                        >
                          Link
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-stone/10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-1">
                {post.author_name || 'CIL Team'}
              </h4>
              <p className="text-stone text-sm">
                Contributing to research and insights on cultural innovation and economic resilience
                through the CIL framework.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
          >
            Explore More Articles
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </article>
    </main>
    </>
  )
}
