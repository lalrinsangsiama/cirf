'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Settings,
  Shield,
  Bell,
  Download,
  Trash2,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import { DashboardBreadcrumb } from '@/components/ui/Breadcrumb'

export default function SettingsPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const handleExportData = async () => {
    if (!user) return

    setExporting(true)
    setExportError(null)
    setExportSuccess(false)

    try {
      const response = await fetch('/api/user/data-export', {
        method: 'GET',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error?.message || 'Failed to export data')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cil-data-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setExportSuccess(true)
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Failed to export data')
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') return

    setDeleting(true)
    setDeleteError(null)

    try {
      const response = await fetch('/api/user/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: 'DELETE' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || data.message || 'Failed to delete account')
      }

      // Sign out and redirect to home
      await signOut()
      router.push('/?deleted=true')
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete account')
      setDeleting(false)
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
    router.push('/auth/login?redirectTo=/dashboard/settings')
    return null
  }

  return (
    <main className="min-h-screen bg-sand pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <DashboardBreadcrumb page="Settings" />
          <div className="mt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-stone hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-serif font-bold text-ink flex items-center gap-2">
            <Settings className="w-8 h-8 text-gold" />
            Account Settings
          </h1>
          <p className="text-stone mt-1">Manage your account preferences and data</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold" />
                  Profile Settings
                </h2>
                <p className="text-sm text-stone mt-1">
                  Update your personal information and preferences
                </p>
              </div>
              <Link
                href="/dashboard/profile"
                className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-gold" />
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-ink">Assessment Results</p>
                  <p className="text-sm text-stone">Email me when my assessment results are ready</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-gold rounded border-stone/30 focus:ring-gold"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-ink">Newsletter</p>
                  <p className="text-sm text-stone">Receive updates about cultural innovation research</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-gold rounded border-stone/30 focus:ring-gold"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-ink">Product Updates</p>
                  <p className="text-sm text-stone">Get notified about new features and tools</p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-gold rounded border-stone/30 focus:ring-gold"
                />
              </label>
            </div>
          </section>

          {/* Data Export Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-4">
              <Download className="w-5 h-5 text-gold" />
              Export Your Data
            </h2>
            <p className="text-sm text-stone mb-4">
              Download a copy of all your data, including profile information, assessment results,
              and transaction history. This is provided in JSON format.
            </p>

            {exportSuccess && (
              <div className="mb-4 p-3 bg-sage/10 border border-sage/20 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                <p className="text-sm text-sage">Data exported successfully</p>
              </div>
            )}

            {exportError && (
              <div className="mb-4 p-3 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <p className="text-sm text-terracotta">{exportError}</p>
              </div>
            )}

            <button
              onClick={handleExportData}
              disabled={exporting}
              className={cn(
                'inline-flex items-center gap-2 bg-sand text-ink px-4 py-2 rounded-full text-sm font-medium hover:bg-sand/70 transition-colors',
                exporting && 'opacity-50 cursor-not-allowed'
              )}
            >
              {exporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Preparing Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download My Data
                </>
              )}
            </button>
          </section>

          {/* Danger Zone */}
          <section className="bg-white rounded-2xl shadow-sm border border-terracotta/20 p-6">
            <h2 className="text-lg font-semibold text-terracotta flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-terracotta/5 rounded-lg">
                <h3 className="font-medium text-ink mb-1">Delete Account</h3>
                <p className="text-sm text-stone mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                  Your profile, assessment history, and any purchased credits will be permanently removed.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center gap-2 bg-terracotta text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-terracotta/90 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete My Account
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
          onClick={() => !deleting && setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-terracotta" />
                Delete Account
              </h3>
              {!deleting && (
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 hover:bg-sand rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="mb-6">
              <p className="text-stone mb-4">
                This action is <span className="font-semibold text-terracotta">permanent and irreversible</span>.
                All your data will be deleted, including:
              </p>
              <ul className="text-sm text-stone space-y-1 mb-4">
                <li>- Your profile information</li>
                <li>- All assessment results and history</li>
                <li>- Any remaining credits (non-refundable)</li>
                <li>- Transaction history</li>
              </ul>
              <p className="text-sm text-ink font-medium mb-2">
                To confirm, type DELETE in the box below:
              </p>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="w-full px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                disabled={deleting}
              />
            </div>

            {deleteError && (
              <div className="mb-4 p-3 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <p className="text-sm text-terracotta">{deleteError}</p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 text-stone hover:text-ink transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE' || deleting}
                className={cn(
                  'inline-flex items-center gap-2 bg-terracotta text-white px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  deleteConfirmation === 'DELETE' && !deleting
                    ? 'hover:bg-terracotta/90'
                    : 'opacity-50 cursor-not-allowed'
                )}
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
