'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  MapPin,
  Briefcase,
  Users,
  DollarSign,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Save,
} from 'lucide-react'
import { DashboardBreadcrumb } from '@/components/ui/Breadcrumb'

interface ProfileFormData {
  full_name: string
  organization: string | null
  phone: string | null
  website: string | null
  linkedin_url: string | null
  twitter_handle: string | null
  country: string | null
  city: string | null
  timezone: string | null
  industry: string | null
  business_stage: string | null
  years_operating: number | null
  team_size: string | null
  revenue_range: string | null
  cultural_tradition: string | null
  community_affiliation: string | null
}

const INDUSTRIES = [
  'Arts & Crafts',
  'Music & Performing Arts',
  'Fashion & Textiles',
  'Food & Culinary',
  'Tourism & Heritage',
  'Media & Entertainment',
  'Education & Research',
  'Technology',
  'Non-Profit / NGO',
  'Government',
  'Other',
]

const BUSINESS_STAGES = [
  'Idea Stage',
  'Early Stage (0-2 years)',
  'Growth Stage (2-5 years)',
  'Established (5-10 years)',
  'Mature (10+ years)',
]

const TEAM_SIZES = [
  'Solo',
  '2-5',
  '6-10',
  '11-25',
  '26-50',
  '51-100',
  '100+',
]

const REVENUE_RANGES = [
  'Pre-revenue',
  'Under $10,000',
  '$10,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $500,000',
  '$500,000 - $1M',
  '$1M+',
]

export default function ProfileEditPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, refreshProfile } = useAuth()
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    organization: null,
    phone: null,
    website: null,
    linkedin_url: null,
    twitter_handle: null,
    country: null,
    city: null,
    timezone: null,
    industry: null,
    business_stage: null,
    years_operating: null,
    team_size: null,
    revenue_range: null,
    cultural_tradition: null,
    community_affiliation: null,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Populate form with existing profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        organization: profile.organization || null,
        phone: profile.phone || null,
        website: profile.website || null,
        linkedin_url: profile.linkedin_url || null,
        twitter_handle: profile.twitter_handle || null,
        country: profile.country || null,
        city: profile.city || null,
        timezone: profile.timezone || null,
        industry: profile.industry || null,
        business_stage: profile.business_stage || null,
        years_operating: profile.years_operating || null,
        team_size: profile.team_size || null,
        revenue_range: profile.revenue_range || null,
        cultural_tradition: profile.cultural_tradition || null,
        community_affiliation: profile.community_affiliation || null,
      })
    }
  }, [profile])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseInt(value) : null) : (value || null),
    }))
    setSaved(false)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    setError(null)
    setSaved(false)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || data.message || 'Failed to update profile')
      }

      await refreshProfile()
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-sand pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-stone/20 rounded w-48 mb-8" />
            <div className="h-64 bg-stone/20 rounded-2xl" />
          </div>
        </div>
      </main>
    )
  }

  if (!user) {
    router.push('/auth/login?redirectTo=/dashboard/profile')
    return null
  }

  return (
    <main className="min-h-screen bg-sand pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <DashboardBreadcrumb page="Edit Profile" />
          <div className="mt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-stone hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-serif font-bold text-ink">Edit Profile</h1>
          <p className="text-stone mt-1">Update your personal and business information</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
            <p className="text-terracotta">{error}</p>
          </div>
        )}

        {saved && (
          <div className="mb-6 p-4 bg-sage/10 border border-sage/20 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
            <p className="text-sage">Profile updated successfully</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
            <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gold" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="full_name" className="block text-sm font-medium text-ink mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="organization" className="block text-sm font-medium text-ink mb-1">
                  Organization
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization || ''}
                    onChange={handleChange}
                    placeholder="Your company or organization"
                    className="w-full pl-10 pr-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
            <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email || ''}
                  disabled
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg bg-sand/50 text-stone cursor-not-allowed"
                />
                <p className="text-xs text-stone mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-ink mb-1">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full pl-10 pr-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="linkedin_url" className="block text-sm font-medium text-ink mb-1">
                  LinkedIn
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
                  <input
                    type="url"
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url || ''}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full pl-10 pr-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="twitter_handle" className="block text-sm font-medium text-ink mb-1">
                  Twitter/X Handle
                </label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
                  <input
                    type="text"
                    id="twitter_handle"
                    name="twitter_handle"
                    value={formData.twitter_handle || ''}
                    onChange={handleChange}
                    placeholder="yourhandle"
                    className="w-full pl-10 pr-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
            <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold" />
              Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-ink mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country || ''}
                  onChange={handleChange}
                  placeholder="United States"
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-ink mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  placeholder="San Francisco"
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-ink mb-1">
                  Timezone
                </label>
                <input
                  type="text"
                  id="timezone"
                  name="timezone"
                  value={formData.timezone || ''}
                  onChange={handleChange}
                  placeholder="PST (UTC-8)"
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
            </div>
          </section>

          {/* Business Information */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
            <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gold" />
              Business Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-ink mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="">Select industry</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="business_stage" className="block text-sm font-medium text-ink mb-1">
                  Business Stage
                </label>
                <select
                  id="business_stage"
                  name="business_stage"
                  value={formData.business_stage || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="">Select stage</option>
                  {BUSINESS_STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="years_operating" className="block text-sm font-medium text-ink mb-1">
                  Years Operating
                </label>
                <input
                  type="number"
                  id="years_operating"
                  name="years_operating"
                  value={formData.years_operating || ''}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label htmlFor="team_size" className="block text-sm font-medium text-ink mb-1">
                  <Users className="w-4 h-4 inline mr-1" />
                  Team Size
                </label>
                <select
                  id="team_size"
                  name="team_size"
                  value={formData.team_size || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="">Select size</option>
                  {TEAM_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="revenue_range" className="block text-sm font-medium text-ink mb-1">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Annual Revenue Range
                </label>
                <select
                  id="revenue_range"
                  name="revenue_range"
                  value={formData.revenue_range || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="">Select range</option>
                  {REVENUE_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Cultural Context */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
            <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-gold" />
              Cultural Context
            </h2>
            <p className="text-sm text-stone mb-4">
              Help us understand your cultural background to provide more relevant insights and case study comparisons.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="cultural_tradition" className="block text-sm font-medium text-ink mb-1">
                  Cultural Tradition
                </label>
                <input
                  type="text"
                  id="cultural_tradition"
                  name="cultural_tradition"
                  value={formData.cultural_tradition || ''}
                  onChange={handleChange}
                  placeholder="e.g., Indigenous Weaving, Traditional Music, Folk Art"
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label htmlFor="community_affiliation" className="block text-sm font-medium text-ink mb-1">
                  Community Affiliation
                </label>
                <input
                  type="text"
                  id="community_affiliation"
                  name="community_affiliation"
                  value={formData.community_affiliation || ''}
                  onChange={handleChange}
                  placeholder="e.g., Navajo Nation, Maori Community, Oaxacan Artisan Collective"
                  className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-2 text-stone hover:text-ink transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={cn(
                'inline-flex items-center gap-2 bg-ink text-pearl px-6 py-2 rounded-full font-medium hover:bg-ink/90 transition-colors',
                saving && 'opacity-50 cursor-not-allowed'
              )}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
