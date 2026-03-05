/**
 * Seed blog posts directly to Supabase.
 * Usage: npx tsx scripts/seed-blog.ts
 */
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'
import { BLOG_POSTS } from '../src/lib/data/blogContent'

// Load .env.local
const envPath = join(__dirname, '..', '.env.local')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx)
    const val = trimmed.slice(eqIdx + 1)
    if (!process.env[key]) process.env[key] = val
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function main() {
  console.log(`Seeding ${BLOG_POSTS.length} blog posts...\n`)

  let created = 0
  let updated = 0
  let errors = 0

  for (const post of BLOG_POSTS) {
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id, slug')
      .eq('slug', post.slug)
      .single()

    const postData = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || null,
      content: post.content,
      author_name: post.author_name || 'CIL Research Team',
      category: post.category,
      tags: post.tags || [],
      featured_image: post.featured_image || null,
      citations: post.citations || null,
      status: post.status || 'published',
      published_at: new Date().toISOString(),
      view_count: 0,
    }

    if (existing) {
      const { error } = await supabase
        .from('blog_posts')
        .update({ ...postData, updated_at: new Date().toISOString() })
        .eq('id', existing.id)

      if (error) {
        console.error(`FAILED (update): ${post.slug} — ${error.message}`)
        errors++
      } else {
        console.log(`UPDATED: ${post.slug}`)
        updated++
      }
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert(postData)

      if (error) {
        console.error(`FAILED (create): ${post.slug} — ${error.message}`)
        errors++
      } else {
        console.log(`CREATED: ${post.slug}`)
        created++
      }
    }
  }

  console.log(`\nDone: ${created} created, ${updated} updated, ${errors} errors`)
}

main()
