-- Migration: Tiered Assessment System
-- Adds enhanced profile fields, assessment types, unlock tracking, and tool access

-- ============================================
-- ENHANCED PROFILE FIELDS
-- Collect entrepreneur profiles during assessment
-- ============================================

-- Contact Information
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS twitter_handle TEXT;

-- Location
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS timezone TEXT;

-- Business Information
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_stage TEXT; -- idea, startup, growth, established
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS years_operating INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS team_size TEXT; -- solo, 2-5, 6-10, 11-25, 26-50, 51+
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS revenue_range TEXT; -- pre-revenue, <10k, 10k-50k, 50k-100k, 100k-500k, 500k+

-- Cultural Context
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cultural_tradition TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS community_affiliation TEXT;

-- Profile Completion Status
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT FALSE;

-- ============================================
-- ASSESSMENT TYPE TRACKING
-- Add assessment_type column to assessments table
-- ============================================

ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS assessment_type TEXT DEFAULT 'cirf';

-- Create index for assessment type queries
CREATE INDEX IF NOT EXISTS idx_assessments_type ON public.assessments(assessment_type);
CREATE INDEX IF NOT EXISTS idx_assessments_user_type ON public.assessments(user_id, assessment_type);

-- ============================================
-- ASSESSMENT UNLOCKS TABLE
-- Tracks which assessments users have unlocked
-- ============================================

CREATE TABLE IF NOT EXISTS public.assessment_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  assessment_type TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  unlocked_by_assessment_id UUID REFERENCES public.assessments(id) ON DELETE SET NULL,
  UNIQUE(user_id, assessment_type)
);

-- Enable RLS
ALTER TABLE public.assessment_unlocks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessment_unlocks
CREATE POLICY "Users can view their own unlocks"
  ON public.assessment_unlocks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own unlocks"
  ON public.assessment_unlocks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage unlocks"
  ON public.assessment_unlocks FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for unlock queries
CREATE INDEX IF NOT EXISTS idx_assessment_unlocks_user_id ON public.assessment_unlocks(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_unlocks_type ON public.assessment_unlocks(assessment_type);

-- ============================================
-- TOOL ACCESS TABLE
-- Tracks which tools users have access to
-- ============================================

CREATE TABLE IF NOT EXISTS public.tool_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  tool_id TEXT NOT NULL,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by_assessment_type TEXT,
  UNIQUE(user_id, tool_id)
);

-- Enable RLS
ALTER TABLE public.tool_access ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tool_access
CREATE POLICY "Users can view their own tool access"
  ON public.tool_access FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tool access"
  ON public.tool_access FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage tool access"
  ON public.tool_access FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for tool access queries
CREATE INDEX IF NOT EXISTS idx_tool_access_user_id ON public.tool_access(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_access_tool_id ON public.tool_access(tool_id);

-- ============================================
-- EMAIL LOGS TABLE
-- Track sent emails for assessment results
-- ============================================

CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE,
  email_type TEXT NOT NULL, -- 'assessment_results', 'newsletter', 'contact', etc.
  recipient_email TEXT NOT NULL,
  subject TEXT,
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  metadata JSONB
);

-- Enable RLS
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_logs
CREATE POLICY "Users can view their own email logs"
  ON public.email_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage email logs"
  ON public.email_logs FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for email log queries
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON public.email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON public.email_logs(email_type);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to unlock assessments after completing CIRF
CREATE OR REPLACE FUNCTION public.unlock_assessments_on_cirf_completion(
  p_user_id UUID,
  p_cirf_assessment_id UUID
)
RETURNS SETOF TEXT AS $$
DECLARE
  assessment_to_unlock TEXT;
  unlocked_assessments TEXT[] := ARRAY['cimm', 'cira', 'tbl', 'ciss', 'pricing'];
BEGIN
  FOREACH assessment_to_unlock IN ARRAY unlocked_assessments
  LOOP
    INSERT INTO public.assessment_unlocks (user_id, assessment_type, unlocked_by_assessment_id)
    VALUES (p_user_id, assessment_to_unlock, p_cirf_assessment_id)
    ON CONFLICT (user_id, assessment_type) DO NOTHING;

    RETURN NEXT assessment_to_unlock;
  END LOOP;

  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to grant tool access after completing a specialized assessment
CREATE OR REPLACE FUNCTION public.grant_tool_access_on_assessment_completion(
  p_user_id UUID,
  p_assessment_type TEXT
)
RETURNS SETOF TEXT AS $$
DECLARE
  tool_to_grant TEXT;
  tools_to_grant TEXT[];
BEGIN
  -- Map assessment types to their tools
  CASE p_assessment_type
    WHEN 'cimm' THEN tools_to_grant := ARRAY['innovation-intensity-ratio', 'cultural-leverage-index'];
    WHEN 'cira' THEN tools_to_grant := ARRAY['innovation-readiness-calculator', 'innovation-inclusivity-score'];
    WHEN 'tbl' THEN tools_to_grant := ARRAY['tbl-calculator', 'economic-multiplier'];
    WHEN 'ciss' THEN tools_to_grant := ARRAY['sustainability-scorecard', 'cultural-resilience-quotient'];
    WHEN 'pricing' THEN tools_to_grant := ARRAY['pricing-calculator', 'innovation-efficiency-rate'];
    ELSE tools_to_grant := ARRAY[]::TEXT[];
  END CASE;

  FOREACH tool_to_grant IN ARRAY tools_to_grant
  LOOP
    INSERT INTO public.tool_access (user_id, tool_id, granted_by_assessment_type)
    VALUES (p_user_id, tool_to_grant, p_assessment_type)
    ON CONFLICT (user_id, tool_id) DO NOTHING;

    RETURN NEXT tool_to_grant;
  END LOOP;

  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has access to an assessment
CREATE OR REPLACE FUNCTION public.check_assessment_access(
  p_user_id UUID,
  p_assessment_type TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  -- CIRF is always accessible
  IF p_assessment_type = 'cirf' THEN
    RETURN TRUE;
  END IF;

  -- Check if assessment is unlocked for user
  RETURN EXISTS (
    SELECT 1 FROM public.assessment_unlocks
    WHERE user_id = p_user_id
    AND assessment_type = p_assessment_type
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has access to a tool
CREATE OR REPLACE FUNCTION public.check_tool_access(
  p_user_id UUID,
  p_tool_id TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.tool_access
    WHERE user_id = p_user_id
    AND tool_id = p_tool_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update profile with assessment demographics
CREATE OR REPLACE FUNCTION public.update_profile_from_assessment(
  p_user_id UUID,
  p_phone TEXT DEFAULT NULL,
  p_website TEXT DEFAULT NULL,
  p_linkedin_url TEXT DEFAULT NULL,
  p_twitter_handle TEXT DEFAULT NULL,
  p_country TEXT DEFAULT NULL,
  p_city TEXT DEFAULT NULL,
  p_timezone TEXT DEFAULT NULL,
  p_industry TEXT DEFAULT NULL,
  p_business_stage TEXT DEFAULT NULL,
  p_years_operating INTEGER DEFAULT NULL,
  p_team_size TEXT DEFAULT NULL,
  p_revenue_range TEXT DEFAULT NULL,
  p_cultural_tradition TEXT DEFAULT NULL,
  p_community_affiliation TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.profiles
  SET
    phone = COALESCE(p_phone, phone),
    website = COALESCE(p_website, website),
    linkedin_url = COALESCE(p_linkedin_url, linkedin_url),
    twitter_handle = COALESCE(p_twitter_handle, twitter_handle),
    country = COALESCE(p_country, country),
    city = COALESCE(p_city, city),
    timezone = COALESCE(p_timezone, timezone),
    industry = COALESCE(p_industry, industry),
    business_stage = COALESCE(p_business_stage, business_stage),
    years_operating = COALESCE(p_years_operating, years_operating),
    team_size = COALESCE(p_team_size, team_size),
    revenue_range = COALESCE(p_revenue_range, revenue_range),
    cultural_tradition = COALESCE(p_cultural_tradition, cultural_tradition),
    community_affiliation = COALESCE(p_community_affiliation, community_affiliation),
    profile_completed = TRUE,
    updated_at = NOW()
  WHERE id = p_user_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant access to authenticated users
GRANT SELECT, INSERT ON public.assessment_unlocks TO authenticated;
GRANT SELECT, INSERT ON public.tool_access TO authenticated;
GRANT SELECT ON public.email_logs TO authenticated;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION public.unlock_assessments_on_cirf_completion TO authenticated;
GRANT EXECUTE ON FUNCTION public.grant_tool_access_on_assessment_completion TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_assessment_access TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_tool_access TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_profile_from_assessment TO authenticated;
