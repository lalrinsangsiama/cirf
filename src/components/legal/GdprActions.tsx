'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal, ModalActions } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/ToastProvider'
import { Download, Trash2, AlertTriangle } from 'lucide-react'

interface GdprActionsProps {
  userId: string
}

export function GdprActions({ userId }: GdprActionsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const toast = useToast()

  const handleDownloadData = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch('/api/user/data-export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        throw new Error('Failed to export data')
      }

      const data = await response.json()

      // Create and download file
      const blob = new Blob([JSON.stringify(data.data, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cirf-data-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('Your data has been downloaded')
    } catch (error) {
      toast.error('Failed to download data. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error('Please type DELETE to confirm')
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch('/api/user/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, confirmation: deleteConfirmation }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete account')
      }

      toast.success('Your account has been deleted')

      // Redirect to homepage after a short delay
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } catch (error) {
      toast.error('Failed to delete account. Please contact support.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-6 border border-ink/10 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-ocean/10 rounded-lg">
            <Download className="w-5 h-5 text-ocean" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-ink mb-1">Download Your Data</h3>
            <p className="text-sm text-stone mb-4">
              Download a copy of all the data we have stored about you, including your profile,
              assessments, and transaction history.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadData}
              isLoading={isDownloading}
              loadingText="Preparing..."
              icon={Download}
            >
              Download my data
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 border border-terracotta/20 rounded-xl bg-terracotta/5">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-terracotta/10 rounded-lg">
            <Trash2 className="w-5 h-5 text-terracotta" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-ink mb-1">Delete Account</h3>
            <p className="text-sm text-stone mb-4">
              Permanently delete your account and all associated data. This action cannot be
              undone.
            </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              icon={Trash2}
            >
              Delete my account
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeleteConfirmation('')
        }}
        title="Delete Account"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-terracotta/10 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-terracotta flex-shrink-0" />
            <p className="text-sm text-ink">
              This action is <strong>permanent and irreversible</strong>. All your data will be
              deleted.
            </p>
          </div>

          <div>
            <p className="text-sm text-stone mb-2">This will delete:</p>
            <ul className="text-sm text-stone list-disc list-inside space-y-1">
              <li>Your profile and account information</li>
              <li>All assessment results and history</li>
              <li>Credit balance and transaction history</li>
              <li>Newsletter subscription (if any)</li>
            </ul>
          </div>

          <div>
            <label htmlFor="delete-confirmation" className="block text-sm font-medium text-ink mb-2">
              Type <span className="font-mono bg-sand px-1 rounded">DELETE</span> to confirm:
            </label>
            <input
              id="delete-confirmation"
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              placeholder="DELETE"
            />
          </div>
        </div>

        <ModalActions>
          <Button
            variant="outline"
            onClick={() => {
              setShowDeleteModal(false)
              setDeleteConfirmation('')
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            isLoading={isDeleting}
            loadingText="Deleting..."
            disabled={deleteConfirmation !== 'DELETE'}
          >
            Delete Account
          </Button>
        </ModalActions>
      </Modal>
    </div>
  )
}
