import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import {
  MapPin,
  Calendar,
  Award,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Target,
  Users,
  Shield,
} from 'lucide-react'
import { verifiedCaseStudies, type CaseStudy } from '@/lib/data/caseStudies'
import { CaseStudyBreadcrumb } from '@/components/ui/Breadcrumb'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

// Generate static params for all case studies
export async function generateStaticParams() {
  return verifiedCaseStudies.map((study) => ({
    id: study.id,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const study = verifiedCaseStudies.find((s) => s.id === id)

  if (!study) {
    return {
      title: 'Case Study Not Found | CIL',
    }
  }

  return {
    title: `${study.title} | Case Study | CIL`,
    description: study.description,
    openGraph: {
      title: `${study.title} - Cultural Innovation Case Study`,
      description: study.description,
    },
  }
}

function getScoreCategory(score: number): { label: string; color: string; bgColor: string } {
  if (score >= 11) return { label: 'Excellent', color: 'text-sage', bgColor: 'bg-sage/10' }
  if (score >= 8) return { label: 'Good', color: 'text-ocean', bgColor: 'bg-ocean/10' }
  if (score >= 5) return { label: 'Moderate', color: 'text-gold', bgColor: 'bg-gold/10' }
  return { label: 'At Risk', color: 'text-terracotta', bgColor: 'bg-terracotta/10' }
}

function getRelatedCaseStudies(currentStudy: CaseStudy, limit = 3): CaseStudy[] {
  return verifiedCaseStudies
    .filter((s) => s.id !== currentStudy.id)
    .filter(
      (s) =>
        s.category === currentStudy.category ||
        s.continent === currentStudy.continent ||
        Math.abs(s.cilScore - currentStudy.cilScore) <= 1
    )
    .slice(0, limit)
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { id } = await params
  const study = verifiedCaseStudies.find((s) => s.id === id)

  if (!study) {
    notFound()
  }

  const scoreCategory = getScoreCategory(study.cilScore)
  const relatedStudies = getRelatedCaseStudies(study)

  return (
    <main className="min-h-screen bg-pearl">
      {/* Hero Section */}
      <section className={cn('relative pt-32 pb-16 px-6 md:px-16', `bg-gradient-to-br ${study.color}`)}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <CaseStudyBreadcrumb title={study.title} />

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  study.cilScore === 13
                    ? 'bg-gold text-ink'
                    : study.cilScore >= 11
                    ? 'bg-sage text-white'
                    : 'bg-ocean text-white'
                )}
              >
                {study.cilScore}/13 CIL Score
              </span>
              {study.unescoRecognition && (
                <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-ink">
                  <Award className="w-3 h-3 inline mr-1" />
                  UNESCO Recognized
                </span>
              )}
              <span className="px-3 py-1 bg-white/60 rounded-full text-xs font-medium text-ink">
                {study.category}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 drop-shadow-md">
              {study.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {study.country}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {study.period}
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {study.outcome === 'success'
                  ? 'Operating Successfully'
                  : study.outcome === 'mixed'
                  ? 'Mixed Results'
                  : 'Discontinued'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 px-6 md:px-16 bg-ink text-pearl">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {study.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl text-gold">{stat.value}</p>
              <p className="text-sm text-pearl/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Full Description */}
              <div>
                <h2 className="font-serif text-2xl mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-gold" />
                  Overview
                </h2>
                <p className="text-stone leading-relaxed text-lg">{study.fullDescription}</p>
              </div>

              {/* Key Innovations */}
              <div className="bg-sand/50 rounded-xl p-6">
                <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-gold" />
                  Key Innovations
                </h2>
                <ul className="space-y-3">
                  {study.innovations.map((innovation) => (
                    <li key={innovation} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span className="text-ink">{innovation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Lessons */}
              <div className="bg-gold/10 rounded-xl p-6">
                <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-gold" />
                  Key Lessons
                </h2>
                <ul className="space-y-3">
                  {study.lessons.map((lesson, index) => (
                    <li key={lesson} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-ink text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-ink">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Citations */}
              <div className="border-t border-stone/20 pt-8">
                <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  Sources & Citations
                </h2>
                <div className="space-y-4">
                  {study.citations.map((citation, index) => (
                    <div
                      key={index}
                      className="bg-white border border-stone/10 rounded-lg p-4 text-sm"
                    >
                      <p className="font-medium text-ink mb-1">
                        {citation.author} ({citation.year})
                      </p>
                      <p className="text-stone italic mb-2">{citation.title}</p>
                      {citation.journal && (
                        <p className="text-stone text-xs">{citation.journal}</p>
                      )}
                      <div className="flex gap-4 mt-2">
                        {citation.doi && (
                          <a
                            href={`https://doi.org/${citation.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ocean hover:underline text-xs flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            DOI
                          </a>
                        )}
                        {citation.url && (
                          <a
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ocean hover:underline text-xs flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CIL Score Card */}
              <div className="bg-white rounded-xl shadow-sm border border-stone/10 p-6">
                <h3 className="font-medium text-ink mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold" />
                  Resilience Score
                </h3>
                <div className="text-center py-6">
                  <div className="font-serif text-6xl text-gold mb-2">{study.cilScore}</div>
                  <p className="text-stone text-sm">out of 13</p>
                  <span
                    className={cn(
                      'inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium',
                      scoreCategory.bgColor,
                      scoreCategory.color
                    )}
                  >
                    {scoreCategory.label}
                  </span>
                </div>
                <div className="pt-4 border-t border-stone/10 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone">Confidence Level</span>
                    <span
                      className={cn(
                        'font-medium capitalize',
                        study.confidenceLevel === 'high'
                          ? 'text-sage'
                          : study.confidenceLevel === 'medium'
                          ? 'text-gold'
                          : 'text-terracotta'
                      )}
                    >
                      {study.confidenceLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone">Last Verified</span>
                    <span className="text-ink font-medium">
                      {new Date(study.verifiedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-xl shadow-sm border border-stone/10 p-6">
                <h3 className="font-medium text-ink mb-4">Quick Info</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-stone">Region</dt>
                    <dd className="text-ink font-medium">{study.region}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone">Continent</dt>
                    <dd className="text-ink font-medium">{study.continent}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone">Category</dt>
                    <dd className="text-ink font-medium">{study.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone">Period</dt>
                    <dd className="text-ink font-medium">{study.period}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone">Outcome</dt>
                    <dd
                      className={cn(
                        'font-medium capitalize',
                        study.outcome === 'success'
                          ? 'text-sage'
                          : study.outcome === 'mixed'
                          ? 'text-gold'
                          : 'text-terracotta'
                      )}
                    >
                      {study.outcome}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* UNESCO Recognition */}
              {study.unescoRecognition && (
                <div className="bg-ocean/10 rounded-xl p-6">
                  <h3 className="font-medium text-ink mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-ocean" />
                    UNESCO Recognition
                  </h3>
                  <p className="text-sm text-stone">{study.unescoRecognition}</p>
                </div>
              )}

              {/* CTA */}
              <div className="bg-ink rounded-xl p-6 text-pearl text-center">
                <h3 className="font-medium mb-2">Assess Your Initiative</h3>
                <p className="text-pearl/70 text-sm mb-4">
                  Compare your cultural innovation with verified case studies.
                </p>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 bg-gold text-ink px-4 py-2 rounded-full text-sm font-medium hover:bg-gold/90 transition-colors"
                >
                  Take the Assessment
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <section className="py-16 px-6 md:px-16 bg-sand">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-serif text-2xl mb-8 flex items-center gap-2">
              <Users className="w-6 h-6 text-gold" />
              Related Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedStudies.map((related) => (
                <Link
                  key={related.id}
                  href={`/case-studies/${related.id}`}
                  className="bg-white rounded-xl shadow-sm border border-stone/10 overflow-hidden hover:shadow-md transition-all group"
                >
                  <div className={cn('h-32 bg-gradient-to-br', related.color)} />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-stone">{related.country}</span>
                      <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-medium rounded-full">
                        {related.cilScore}/13
                      </span>
                    </div>
                    <h3 className="font-medium text-ink group-hover:text-gold transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-stone mt-1 line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back Navigation */}
      <section className="py-8 px-6 md:px-16 border-t border-stone/10">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-stone hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Case Studies
          </Link>
        </div>
      </section>
    </main>
  )
}
