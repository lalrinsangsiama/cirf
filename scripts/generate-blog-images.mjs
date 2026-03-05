/**
 * Generate placeholder blog images for CIL platform.
 * Creates branded SVG-based images converted to JPEG via sharp.
 *
 * Usage: node scripts/generate-blog-images.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const OUTPUT_DIR = join(import.meta.dirname, '..', 'public', 'images', 'blog')
mkdirSync(OUTPUT_DIR, { recursive: true })

// CIL design tokens
const PALETTES = [
  { bg: '#1a1a2e', accent: '#c9a84c', text: '#f5f0e8' }, // ink + gold + pearl
  { bg: '#2d5a4a', accent: '#c9a84c', text: '#f5f0e8' }, // sage + gold + pearl
  { bg: '#3a6b8c', accent: '#f5f0e8', text: '#f5f0e8' }, // ocean + pearl
  { bg: '#c26b49', accent: '#f5f0e8', text: '#f5f0e8' }, // terracotta + pearl
  { bg: '#1a1a2e', accent: '#2d5a4a', text: '#f5f0e8' }, // ink + sage
  { bg: '#3a6b8c', accent: '#c9a84c', text: '#f5f0e8' }, // ocean + gold
  { bg: '#2d5a4a', accent: '#c26b49', text: '#f5f0e8' }, // sage + terracotta
  { bg: '#c26b49', accent: '#c9a84c', text: '#f5f0e8' }, // terracotta + gold
]

const POSTS = [
  { file: 'reading-list.jpg', title: 'The Ultimate\nReading List', subtitle: 'For Cultural Entrepreneurs' },
  { file: 'appropriation-appreciation.jpg', title: 'Appropriation\nvs Appreciation', subtitle: 'In Business' },
  { file: 'history-cultural-economies.jpg', title: 'A Brief History of\nCultural Economies', subtitle: 'From Silk Road to Today' },
  { file: 'africa-innovation.jpg', title: 'Cultural Innovation\nAround the World', subtitle: 'Africa' },
  { file: 'asia-innovation.jpg', title: 'Cultural Innovation\nAround the World', subtitle: 'Asia' },
  { file: 'latin-america-innovation.jpg', title: 'Cultural Innovation\nAround the World', subtitle: 'Latin America' },
  { file: 'january-playlist.jpg', title: 'Cultural Music\nPlaylist', subtitle: 'January 2026' },
  { file: 'trillion-dollar-question.jpg', title: 'The $1.2 Trillion\nQuestion', subtitle: 'Traditional Knowledge & Global Industries' },
]

for (let i = 0; i < POSTS.length; i++) {
  const post = POSTS[i]
  const palette = PALETTES[i % PALETTES.length]
  const titleLines = post.title.split('\n')

  // Build title tspans
  const titleTspans = titleLines.map((line, idx) => {
    const y = 260 + idx * 60
    return `<tspan x="600" y="${y}" text-anchor="middle">${escapeXml(line)}</tspan>`
  }).join('\n        ')

  const subtitleY = 260 + titleLines.length * 60 + 20

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.bg}"/>
      <stop offset="100%" stop-color="${darken(palette.bg, 20)}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Decorative accent line -->
  <rect x="520" y="180" width="160" height="3" rx="1.5" fill="${palette.accent}" opacity="0.8"/>
  <!-- Title -->
  <text fill="${palette.text}" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="bold">
        ${titleTspans}
  </text>
  <!-- Subtitle -->
  <text x="600" y="${subtitleY}" text-anchor="middle" fill="${palette.accent}" font-family="system-ui, -apple-system, sans-serif" font-size="22" letter-spacing="2" text-transform="uppercase">
    ${escapeXml(post.subtitle.toUpperCase())}
  </text>
  <!-- Bottom brand -->
  <text x="600" y="560" text-anchor="middle" fill="${palette.text}" opacity="0.4" font-family="system-ui, sans-serif" font-size="16" letter-spacing="3">
    CULTURAL INNOVATION LAB
  </text>
</svg>`

  writeFileSync(join(OUTPUT_DIR, post.file.replace('.jpg', '.svg')), svg)
  console.log(`Created: ${post.file.replace('.jpg', '.svg')}`)
}

console.log(`\nGenerated ${POSTS.length} SVG images in public/images/blog/`)
console.log('Note: These are SVGs. Update blogContent.ts to reference .svg instead of .jpg,')
console.log('or convert to JPEG using: npx sharp-cli -i public/images/blog/*.svg -o public/images/blog/ -f jpeg')

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function darken(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - amount)
  const g = Math.max(0, ((num >> 8) & 0x00FF) - amount)
  const b = Math.max(0, (num & 0x0000FF) - amount)
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
}
