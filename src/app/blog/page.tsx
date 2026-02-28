import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react'
import { BlogNewsletterForm } from '@/components/blog/BlogNewsletterForm'
import { BLOG_CATEGORIES } from '@/lib/data/blogCategories'

export const metadata: Metadata = {
  title: 'Blog - Cultural Innovation Insights',
  description: 'Insights, research findings, and practical guidance on cultural innovation and economic resilience from the CIL framework.',
  openGraph: {
    title: 'Blog - Cultural Innovation Insights',
    description: 'Insights, research findings, and practical guidance on cultural innovation and economic resilience from the CIL framework.',
  },
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  author_name: string
  category: string
  featured_image: string | null
  published_at: string
  view_count: number
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const selectedCategory = params.category || 'all'

  const supabase = await createClient()

  let query = supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, author_name, category, featured_image, published_at, view_count')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (selectedCategory && selectedCategory !== 'all') {
    query = query.eq('category', selectedCategory)
  }

  const { data: posts } = await query

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getCategoryColor = (category: string) => {
    const cat = BLOG_CATEGORIES.find(c => c.id === category)
    return cat?.color || 'bg-stone/10 text-stone'
  }

  return (
    <main className="min-h-screen bg-pearl pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4">
            Blog & Research
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto">
            Insights, research findings, and practical guidance on cultural innovation
            and economic resilience from the CIL framework.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {BLOG_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.id === 'all' ? '/blog' : `/blog?category=${category.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-ink text-pearl'
                  : 'bg-white border border-stone/20 text-stone hover:border-ink/50'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article
                  className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden hover:shadow-md transition-shadow h-full"
                >
                  {/* Featured Image */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-sand to-pearl relative overflow-hidden">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-stone/30" />
                      </div>
                    )}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {BLOG_CATEGORIES.find(c => c.id === post.category)?.name || post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-ink mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-stone text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-stone">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author_name || 'CIL Team'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.published_at)}
                        </span>
                      </div>
                      <span className="text-gold font-medium group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-gold" />
            </div>
            {selectedCategory !== 'all' ? (
              <>
                <h3 className="text-xl font-semibold text-ink mb-2">No posts in this category yet</h3>
                <p className="text-stone mb-6">
                  Check back soon — new articles are on the way.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-gold font-medium hover:underline"
                >
                  View all posts
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-ink mb-2">Blog Coming Soon</h3>
                <p className="text-stone mb-4">
                  We&apos;re preparing articles on cultural innovation, community resilience,
                  and practical frameworks for cultural entrepreneurs.
                </p>
                <p className="text-stone text-sm mb-6">
                  Subscribe below to be the first to know when we publish.
                </p>
              </>
            )}
          </div>
        )}

        {/* Newsletter CTA */}
        <BlogNewsletterForm />
      </div>
    </main>
  )
}
