'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/auth/AuthProvider'
import { createBrowserClient } from '@supabase/ssr'
import { FileText, Download, BookOpen, Database, BarChart3, ClipboardList, FileSpreadsheet, File, Lock, AlertCircle, CheckCircle, Loader2, Unlock, Sparkles, ArrowRight, X } from 'lucide-react'
import { UNLOCKABLE_RESOURCES, type ResourceConfig } from '@/lib/data/resourcesConfig'

interface Resource {
  id: string
  category: string
  title: string
  description: string
  format: string
  size: string
  icon: typeof FileText
  requiresAuth?: boolean
  storagePath?: string // Path in Supabase storage
}

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'frameworks', label: 'Frameworks & Templates' },
  { id: 'research', label: 'Research Documents' },
  { id: 'data', label: 'Data & Repositories' },
  { id: 'guides', label: 'Implementation Guides' },
]

const resources: Resource[] = [
  {
    id: 'cirf-assessment-workbook',
    category: 'frameworks',
    title: 'CIL Assessment Workbook',
    description: 'Complete workbook for conducting CIL assessments with scoring guides and benchmarks.',
    format: 'Excel',
    size: '2.4 MB',
    icon: FileSpreadsheet,
    requiresAuth: true,
    storagePath: 'cirf-assessment-workbook.xlsx',
  },
  {
    id: 'implementation-checklist',
    category: 'guides',
    title: 'Implementation Checklist',
    description: 'Step-by-step checklist for implementing cultural innovation strategies based on CIL.',
    format: 'PDF',
    size: '1.2 MB',
    icon: ClipboardList,
    storagePath: 'implementation-checklist.pdf',
  },
  {
    id: 'metrics-dashboard',
    category: 'frameworks',
    title: 'Metrics Dashboard Template',
    description: 'Pre-built dashboard for tracking cultural innovation metrics and resilience indicators.',
    format: 'Excel',
    size: '3.1 MB',
    icon: BarChart3,
    requiresAuth: true,
    storagePath: 'metrics-dashboard-template.xlsx',
  },
  {
    id: 'survey-templates',
    category: 'frameworks',
    title: 'Survey Templates Package',
    description: 'Collection of validated survey instruments for assessing cultural innovation capacity.',
    format: 'Word',
    size: '856 KB',
    icon: FileText,
    storagePath: 'survey-templates.docx',
  },
  {
    id: 'strategic-planning-kit',
    category: 'guides',
    title: 'Strategic Planning Kit',
    description: 'Complete toolkit for developing cultural innovation strategies aligned with CIL.',
    format: 'ZIP',
    size: '8.7 MB',
    icon: BookOpen,
    requiresAuth: true,
    storagePath: 'strategic-planning-kit.zip',
  },
  {
    id: 'case-study-template',
    category: 'frameworks',
    title: 'Case Study Documentation Template',
    description: 'Standardized template for documenting cultural innovation case studies.',
    format: 'Word',
    size: '456 KB',
    icon: FileText,
    storagePath: 'case-study-template.docx',
  },
  {
    id: 'methodology-documentation',
    category: 'research',
    title: 'Research Methodology Documentation',
    description: 'Complete documentation of the CIL research methodology and analytical approach.',
    format: 'PDF',
    size: '4.2 MB',
    icon: BookOpen,
    storagePath: 'research-methodology.pdf',
  },
  {
    id: 'literature-review',
    category: 'research',
    title: 'Literature Review Summary',
    description: 'Comprehensive summary of 230+ academic papers informing the CIL framework.',
    format: 'PDF',
    size: '2.8 MB',
    icon: BookOpen,
    storagePath: 'literature-review-summary.pdf',
  },
  {
    id: 'case-database',
    category: 'data',
    title: 'Case Studies Database',
    description: 'Anonymized database of 362 case studies with CIL scores and outcome data.',
    format: 'Excel',
    size: '5.4 MB',
    icon: Database,
    requiresAuth: true,
    storagePath: 'case-studies-database.xlsx',
  },
  {
    id: 'statistical-models',
    category: 'data',
    title: 'Statistical Models Documentation',
    description: 'Technical documentation of regression models and multiplicative effects analysis.',
    format: 'PDF',
    size: '1.8 MB',
    icon: BarChart3,
    storagePath: 'statistical-models.pdf',
  },
  {
    id: 'pricing-framework',
    category: 'guides',
    title: 'Cultural Product Pricing Framework',
    description: 'Step-by-step guide for pricing cultural products for global markets.',
    format: 'PDF',
    size: '1.5 MB',
    icon: File,
    storagePath: 'pricing-framework.pdf',
  },
  {
    id: 'business-model-canvas',
    category: 'frameworks',
    title: 'Cultural Innovation Business Model Canvas',
    description: 'Adapted business model canvas template for cultural innovation ventures.',
    format: 'PDF',
    size: '892 KB',
    icon: ClipboardList,
    storagePath: 'business-model-canvas.pdf',
  },
]

export default function ResourcesPage() {
  const { user, loading: authLoading } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)
  const [unlockedResources, setUnlockedResources] = useState<Set<string>>(new Set())
  const [loadingAccess, setLoadingAccess] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Check which unlockable resources the user has access to
  useEffect(() => {
    async function checkResourceAccess() {
      if (!user) {
        setUnlockedResources(new Set())
        setLoadingAccess(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('tool_access')
          .select('tool_id')
          .eq('user_id', user.id)
          .like('tool_id', 'resource-%')

        if (error) {
          console.error('Error checking resource access:', error)
        } else {
          setUnlockedResources(new Set(data?.map(d => d.tool_id) || []))
        }
      } catch (err) {
        console.error('Error checking resource access:', err)
      } finally {
        setLoadingAccess(false)
      }
    }

    checkResourceAccess()
  }, [user, supabase])

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Clear messages after 5 seconds
  useEffect(() => {
    if (downloadError || downloadSuccess) {
      const timer = setTimeout(() => {
        setDownloadError(null)
        setDownloadSuccess(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [downloadError, downloadSuccess])

  const handleDownload = async (resource: Resource) => {
    if (resource.requiresAuth && !user) {
      setShowAuthPrompt(true)
      return
    }

    if (!resource.storagePath) {
      setDownloadError('This resource is not yet available for download.')
      return
    }

    setDownloadingId(resource.id)
    setDownloadError(null)
    setDownloadSuccess(null)

    try {
      // Get public URL or signed URL from Supabase Storage
      const { data, error } = await supabase.storage
        .from('resources')
        .createSignedUrl(resource.storagePath, 60 * 5) // 5 minute expiry

      if (error) {
        // Try public URL as fallback
        const { data: publicData } = supabase.storage
          .from('resources')
          .getPublicUrl(resource.storagePath)

        if (publicData?.publicUrl) {
          // Trigger download
          const link = document.createElement('a')
          link.href = publicData.publicUrl
          link.download = resource.storagePath
          link.target = '_blank'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          setDownloadSuccess(`Starting download: ${resource.title}`)
          return
        }

        throw new Error('Resource not found. Please try again later.')
      }

      if (data?.signedUrl) {
        // Trigger download
        const link = document.createElement('a')
        link.href = data.signedUrl
        link.download = resource.storagePath
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setDownloadSuccess(`Starting download: ${resource.title}`)
      }
    } catch (error) {
      console.error('Download error:', error)
      setDownloadError(
        error instanceof Error
          ? error.message
          : 'Failed to download. Please try again.'
      )
    } finally {
      setDownloadingId(null)
    }
  }

  const handleUnlockableDownload = async (resource: ResourceConfig) => {
    if (!user) {
      setShowAuthPrompt(true)
      return
    }

    if (!unlockedResources.has(resource.toolAccessId)) {
      setDownloadError('You need to complete the CIRF Assessment to unlock this resource.')
      return
    }

    setDownloadingId(resource.id)
    setDownloadError(null)
    setDownloadSuccess(null)

    try {
      // Get signed URL from Supabase Storage
      const { data, error } = await supabase.storage
        .from('resources')
        .createSignedUrl(resource.storagePath, 60 * 5) // 5 minute expiry

      if (error) {
        throw new Error('Resource not found. Please try again later.')
      }

      if (data?.signedUrl) {
        // Trigger download
        const link = document.createElement('a')
        link.href = data.signedUrl
        link.download = resource.storagePath
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setDownloadSuccess(`Starting download: ${resource.title}`)
      }
    } catch (error) {
      console.error('Download error:', error)
      setDownloadError(
        error instanceof Error
          ? error.message
          : 'Failed to download. Please try again.'
      )
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <>
      {/* Auth Prompt Modal */}
      {showAuthPrompt && (
        <AuthPromptModal
          isOpen={showAuthPrompt}
          onClose={() => setShowAuthPrompt(false)}
        />
      )}

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Downloads
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Resources &</span></span>
            <span className="hero-line"><span className="italic">Downloads</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Access research documents, templates, data repositories, and implementation guides
            to support your cultural innovation work.
          </p>
        </div>
      </section>

      {/* Status Messages */}
      {(downloadError || downloadSuccess) && (
        <section className="px-6 md:px-16 bg-pearl">
          <div className="max-w-[1600px] mx-auto">
            {downloadError && (
              <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-4 flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                <p className="text-terracotta">{downloadError}</p>
              </div>
            )}
            {downloadSuccess && (
              <div className="bg-sage/10 border border-sage/30 rounded-lg p-4 flex items-start gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <p className="text-sage">{downloadSuccess}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="sticky top-20 z-40 py-6 px-6 md:px-16 bg-sand border-b border-ink/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm transition-all',
                  activeCategory === cat.id
                    ? 'bg-ink text-pearl'
                    : 'bg-pearl border border-ink/30 hover:border-ink'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <label htmlFor="resource-search" className="sr-only">
              Search resources
            </label>
            <input
              id="resource-search"
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-ink/30 rounded-full text-sm bg-pearl"
            />
          </div>
        </div>
      </section>

      {/* Premium Unlockable Resources */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-sage/10 to-gold/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-gold" />
            <p className="section-label mb-0">Premium Resources</p>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Exclusive Guides & Frameworks
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-8">
            Complete the CIRF Assessment to unlock these premium resources designed specifically for cultural entrepreneurs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UNLOCKABLE_RESOURCES.map((resource) => {
              const isUnlocked = unlockedResources.has(resource.toolAccessId)
              const canAccess = isUnlocked && user

              return (
                <article
                  key={resource.id}
                  className={cn(
                    'relative p-8 rounded-xl transition-all duration-300',
                    canAccess
                      ? 'bg-pearl border-2 border-sage/30 shadow-lg'
                      : 'bg-pearl/50 border-2 border-ink/10'
                  )}
                >
                  {/* Unlock Status Badge */}
                  <div className="absolute top-4 right-4">
                    {canAccess ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage/20 text-sage text-sm font-medium rounded-full">
                        <Unlock className="w-4 h-4" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink/10 text-ink/60 text-sm font-medium rounded-full">
                        <Lock className="w-4 h-4" />
                        Locked
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center',
                      canAccess ? 'bg-sage/20' : 'bg-ink/10'
                    )}>
                      {resource.category === 'guides' ? (
                        <BookOpen className={cn('w-7 h-7', canAccess ? 'text-sage' : 'text-ink/40')} strokeWidth={1.5} />
                      ) : (
                        <FileText className={cn('w-7 h-7', canAccess ? 'text-sage' : 'text-ink/40')} strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className={cn(
                        'font-serif text-xl mb-1',
                        canAccess ? 'text-ink' : 'text-ink/60'
                      )}>
                        {resource.title}
                      </h3>
                      <p className="text-xs uppercase tracking-wide text-stone">
                        {resource.format} • {resource.size}
                      </p>
                    </div>
                  </div>

                  <p className={cn(
                    'text-sm mb-6',
                    canAccess ? 'text-stone' : 'text-ink/50'
                  )}>
                    {resource.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {resource.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className={cn(
                          'w-1.5 h-1.5 rounded-full mt-2',
                          canAccess ? 'bg-sage' : 'bg-ink/30'
                        )} />
                        <span className={canAccess ? 'text-stone' : 'text-ink/50'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  {canAccess ? (
                    <button
                      onClick={() => handleUnlockableDownload(resource)}
                      disabled={downloadingId === resource.id}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      {downloadingId === resource.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Preparing Download...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download {resource.format}
                        </>
                      )}
                    </button>
                  ) : !user ? (
                    <Link
                      href="/auth/signup?redirectTo=/resources"
                      className="w-full btn-secondary flex items-center justify-center gap-2"
                    >
                      Sign Up to Unlock
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/tools"
                      className="w-full btn-secondary flex items-center justify-center gap-2"
                    >
                      Complete CIRF to Unlock
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </article>
              )
            })}
          </div>

          {/* Info Banner */}
          {!user && (
            <div className="mt-8 p-6 bg-pearl rounded-xl border border-gold/30 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Unlock Premium Resources for Free</h4>
                <p className="text-sm text-stone">
                  Sign up and complete the CIRF Assessment to unlock these exclusive guides and frameworks at no cost.
                </p>
              </div>
              <Link href="/auth/signup" className="btn-primary flex-shrink-0">
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="text-stone mb-8">{filteredResources.length} resources available</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <article
                key={resource.id}
                className="bg-sand p-6 rounded-lg card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <resource.icon className="w-10 h-10 text-gold" strokeWidth={1.5} />
                  <div className="flex items-center gap-2">
                    {resource.requiresAuth && !user && (
                      <Lock className="w-4 h-4 text-stone" />
                    )}
                    <span className="text-xs uppercase tracking-[0.1em] text-stone bg-pearl px-2 py-1 rounded">
                      {resource.format}
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">{resource.title}</h3>
                <p className="text-stone text-sm mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone">{resource.size}</span>
                  <button
                    onClick={() => handleDownload(resource)}
                    disabled={downloadingId === resource.id}
                    className="flex items-center gap-2 text-sm text-gold hover:text-ink transition-colors group-hover:translate-x-1 duration-300 disabled:opacity-50"
                  >
                    {downloadingId === resource.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        {resource.requiresAuth && !user ? 'Sign in to download' : 'Download'}
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <p className="text-stone text-lg">No resources match your search.</p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSearchQuery('')
                }}
                className="mt-4 text-gold hover:text-ink transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Data Repositories */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Open Data</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Data Repositories
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-12">
            Access the underlying data that powers the CIL framework for your own research and analysis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-pearl p-8 rounded-lg">
              <Database className="w-12 h-12 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="font-serif text-xl mb-3">Case Studies Database</h3>
              <p className="text-stone mb-6">
                Complete anonymized dataset of 362 cultural innovation case studies including
                CIL scores, outcome data, and contextual variables.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  362 case studies (2010-2024)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  47 countries represented
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  13 CIL dimensions scored
                </li>
              </ul>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDownload(resources.find(r => r.id === 'case-database')!)}
                  disabled={downloadingId === 'case-database'}
                  className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {downloadingId === 'case-database' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    user ? 'Download (Excel)' : 'Sign in to download'
                  )}
                </button>
                <Link href="/research" className="btn-secondary text-sm">Documentation</Link>
              </div>
            </div>

            <div className="bg-pearl p-8 rounded-lg">
              <BarChart3 className="w-12 h-12 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="font-serif text-xl mb-3">Hard Data Sources</h3>
              <p className="text-stone mb-6">
                Curated collection of publicly available data sources used in CIL research,
                including links to UNESCO, World Bank, and national statistical databases.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  45+ data sources documented
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Access instructions included
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Regular updates maintained
                </li>
              </ul>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDownload(resources.find(r => r.id === 'statistical-models')!)}
                  disabled={downloadingId === 'statistical-models'}
                  className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {downloadingId === 'statistical-models' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    'Download Guide'
                  )}
                </button>
                <Link href="/research" className="btn-secondary text-sm">View Sources</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Citations */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label">Academic Use</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Citation Information
          </h2>
          <p className="text-stone text-lg max-w-3xl mb-12">
            If you use CIL resources in your research, please cite appropriately.
          </p>

          <div className="bg-sand p-8 rounded-lg">
            <h3 className="font-medium mb-4">Suggested Citation</h3>
            <div className="bg-pearl p-6 rounded font-mono text-sm leading-relaxed">
              <p>Cultural Innovation Lab (CIL). (2024).</p>
              <p>A framework for understanding how cultural innovation generates economic resilience.</p>
              <p className="mt-2">Available at: https://cirf-framework.org</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  'Cultural Innovation Lab (CIL). (2024). A framework for understanding how cultural innovation generates economic resilience. Available at: https://cirf-framework.org'
                )
                setDownloadSuccess('Citation copied to clipboard!')
              }}
              className="mt-4 text-gold hover:text-ink transition-colors text-sm"
            >
              Copy citation
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-ocean to-sage text-pearl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Need Custom Resources?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            We develop tailored tools and documentation for specific community contexts and research needs.
          </p>
          <Link
            href="/about"
            className="inline-block bg-pearl text-ink px-8 py-4 rounded-full font-medium hover:-translate-y-1 transition-transform duration-300"
          >
            Contact for Custom Resources
          </Link>
        </div>
      </section>
    </>
  )
}

/**
 * Accessible Auth Prompt Modal
 *
 * Features:
 * - Proper ARIA attributes (role="dialog", aria-modal, aria-labelledby, aria-describedby)
 * - Focus trap - Tab key cycles through focusable elements
 * - Keyboard dismissal - Escape key closes the modal
 * - Focus restoration - Returns focus to trigger element on close
 */
function AuthPromptModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Handle keyboard events for focus trap and escape
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      // Focus trap - Tab key navigation
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement?.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement?.focus()
          }
        }
      }
    },
    [onClose]
  )

  // Manage focus and scroll lock
  useEffect(() => {
    if (!isOpen) return

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    // Add event listener for keyboard
    document.addEventListener('keydown', handleKeyDown)

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Focus the first focusable element
    const timer = setTimeout(() => {
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''

      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
        className="relative bg-pearl rounded-2xl p-8 max-w-md w-full shadow-xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 -m-2 text-stone hover:text-ink rounded-full hover:bg-sand transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-gold" aria-hidden="true" />
          <h3 id="auth-modal-title" className="font-serif text-xl">
            Sign in required
          </h3>
        </div>
        <p id="auth-modal-description" className="text-stone mb-6">
          This resource is available to registered users. Create a free account to access
          all downloadable resources and tools.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/signup?redirectTo=/resources"
            className="btn-primary text-center"
            onClick={onClose}
          >
            Sign up free
          </Link>
          <Link
            href="/auth/login?redirectTo=/resources"
            className="btn-secondary text-center"
            onClick={onClose}
          >
            Log in
          </Link>
          <button
            onClick={onClose}
            className="text-stone hover:text-ink transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
