/**
 * Upload resource PDFs from docs/ to Supabase Storage.
 *
 * Usage: node scripts/upload-resources.mjs
 *
 * Requires environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Reads from .env.local if present.
 */
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'

// Load .env.local if it exists
const envPath = join(import.meta.dirname, '..', '.env.local')
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx)
    const val = trimmed.slice(eqIdx + 1)
    if (!process.env[key]) {
      process.env[key] = val
    }
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  console.error('Set them in .env.local or as environment variables')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const BUCKET = 'resources'
const DOCS_DIR = join(import.meta.dirname, '..', 'docs')

// Map: local filename -> storage path
const RESOURCES = [
  { local: 'CIL-Global-Funding-Guide-2026.pdf', storage: 'CIL-Global-Funding-Guide-2026.pdf' },
  { local: 'CIL-Creative-Reconstruction-Framework.pdf', storage: 'CIL-Creative-Reconstruction-Framework.pdf' },
  { local: 'CIL-Cultural-Innovation-Playbook.pdf', storage: 'CIL-Cultural-Innovation-Playbook.pdf' },
  { local: 'CIL-Innovation-Readiness-Action-Plan.pdf', storage: 'CIL-Innovation-Readiness-Action-Plan.pdf' },
  { local: 'CIL-Impact-Report-Template.pdf', storage: 'CIL-Impact-Report-Template.pdf' },
  { local: 'CIL-Sustainability-Succession-Guide.pdf', storage: 'CIL-Sustainability-Succession-Guide.pdf' },
  { local: 'CIL-Pricing-Strategy-Workbook.pdf', storage: 'CIL-Pricing-Strategy-Workbook.pdf' },
  { local: 'CIL-Market-Entry-Masterclass.pdf', storage: 'premium/CIL-Market-Entry-Masterclass.pdf' },
  { local: 'CIL-Cultural-Brand-Toolkit.pdf', storage: 'premium/CIL-Cultural-Brand-Toolkit.pdf' },
  { local: 'CIL-Grant-Writing-Toolkit.pdf', storage: 'premium/CIL-Grant-Writing-Toolkit.pdf' },
]

let uploaded = 0
let skipped = 0
let failed = 0

for (const resource of RESOURCES) {
  const localPath = join(DOCS_DIR, resource.local)

  if (!existsSync(localPath)) {
    console.error(`MISSING: ${resource.local} — file not found in docs/`)
    failed++
    continue
  }

  const fileBuffer = readFileSync(localPath)

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(resource.storage, fileBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    })

  if (error) {
    console.error(`FAILED: ${resource.storage} — ${error.message}`)
    failed++
  } else {
    const sizeKB = Math.round(fileBuffer.length / 1024)
    console.log(`OK: ${resource.storage} (${sizeKB} KB)`)
    uploaded++
  }
}

console.log(`\nDone: ${uploaded} uploaded, ${skipped} skipped, ${failed} failed`)
