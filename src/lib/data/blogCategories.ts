export interface BlogCategory {
  id: string
  name: string
  color: string
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'all', name: 'All Posts', color: 'bg-stone/10 text-stone' },
  { id: 'resources', name: 'Resources', color: 'bg-gold/10 text-gold' },
  { id: 'education', name: 'Education', color: 'bg-ocean/10 text-ocean' },
  { id: 'series', name: 'World Series', color: 'bg-sage/10 text-sage' },
  { id: 'playlist', name: 'Playlists', color: 'bg-terracotta/10 text-terracotta' },
  { id: 'research', name: 'Research Insights', color: 'bg-ocean/10 text-ocean' },
  { id: 'case-study', name: 'Case Studies', color: 'bg-gold/10 text-gold' },
  { id: 'practitioner-tips', name: 'Practitioner Tips', color: 'bg-sage/10 text-sage' },
  { id: 'news', name: 'News', color: 'bg-terracotta/10 text-terracotta' },
  { id: 'framework-updates', name: 'Framework Updates', color: 'bg-lavender/10 text-ink' },
]

export const BLOG_CATEGORIES_MAP: Record<string, { name: string; color: string }> = Object.fromEntries(
  BLOG_CATEGORIES.filter(c => c.id !== 'all').map(c => [c.id, { name: c.name, color: c.color }])
)

export type BlogCategoryId = 'resources' | 'education' | 'series' | 'playlist' | 'research' | 'case-study' | 'practitioner-tips' | 'news' | 'framework-updates'
