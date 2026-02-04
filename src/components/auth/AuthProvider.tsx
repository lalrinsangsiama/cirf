'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  organization: string | null
  role: string
  credits: number
  avatar_url: string | null
  // Contact Information
  phone: string | null
  website: string | null
  linkedin_url: string | null
  twitter_handle: string | null
  // Location
  country: string | null
  city: string | null
  timezone: string | null
  // Business Information
  industry: string | null
  business_stage: string | null
  years_operating: number | null
  team_size: string | null
  revenue_range: string | null
  // Cultural Context
  cultural_tradition: string | null
  community_affiliation: string | null
  // Profile Completion Status
  profile_completed: boolean
  created_at: string
}

export type { Profile }

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data as Profile
  }

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setProfile(null)
  }

  useEffect(() => {
    // Track mounted state to prevent state updates after unmount
    let isMounted = true

    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession()

        if (!isMounted) return

        if (currentSession) {
          setSession(currentSession)
          setUser(currentSession.user)
          const profileData = await fetchProfile(currentSession.user.id)
          if (isMounted) {
            setProfile(profileData)
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!isMounted) return

        // Set loading to true during auth state changes to prevent race conditions
        setLoading(true)

        setSession(newSession)
        setUser(newSession?.user ?? null)

        if (newSession?.user) {
          try {
            const profileData = await fetchProfile(newSession.user.id)
            if (isMounted) {
              setProfile(profileData)
            }
          } catch (error) {
            console.error('Error fetching profile during auth state change:', error)
          }
        } else {
          setProfile(null)
        }

        // Only set loading to false after profile is loaded (or cleared)
        if (isMounted) {
          setLoading(false)
        }
      }
    )

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
