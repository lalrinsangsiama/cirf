-- Migration: Draft Assessments System
-- Allows users to save partial assessment progress and resume later

-- ============================================
-- DRAFT ASSESSMENTS TABLE
-- Stores in-progress assessments that haven't been completed
-- ============================================

CREATE TABLE IF NOT EXISTS public.assessment_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  assessment_type TEXT NOT NULL DEFAULT 'cirf',
  answers JSONB NOT NULL DEFAULT '{}',
  current_section TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Each user can only have one draft per assessment type
  UNIQUE(user_id, assessment_type)
);

-- Enable RLS
ALTER TABLE public.assessment_drafts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessment_drafts
CREATE POLICY "Users can view their own drafts"
  ON public.assessment_drafts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own drafts"
  ON public.assessment_drafts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own drafts"
  ON public.assessment_drafts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own drafts"
  ON public.assessment_drafts FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all drafts"
  ON public.assessment_drafts FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_assessment_drafts_user_id ON public.assessment_drafts(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_drafts_type ON public.assessment_drafts(assessment_type);
CREATE INDEX IF NOT EXISTS idx_assessment_drafts_updated ON public.assessment_drafts(updated_at DESC);

-- ============================================
-- ADD NEW PROFILE FIELDS FOR CULTURAL ENTREPRENEURS
-- ============================================

-- New demographic fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS age_group TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state_region TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cultural_innovation_types JSONB;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS revenue_sources JSONB;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS income_challenges TEXT;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to save or update a draft assessment
CREATE OR REPLACE FUNCTION public.save_assessment_draft(
  p_user_id UUID,
  p_assessment_type TEXT,
  p_answers JSONB,
  p_current_section TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_draft_id UUID;
BEGIN
  INSERT INTO public.assessment_drafts (user_id, assessment_type, answers, current_section, updated_at)
  VALUES (p_user_id, p_assessment_type, p_answers, p_current_section, NOW())
  ON CONFLICT (user_id, assessment_type)
  DO UPDATE SET
    answers = p_answers,
    current_section = COALESCE(p_current_section, assessment_drafts.current_section),
    updated_at = NOW()
  RETURNING id INTO v_draft_id;

  RETURN v_draft_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get a user's draft assessment
CREATE OR REPLACE FUNCTION public.get_assessment_draft(
  p_user_id UUID,
  p_assessment_type TEXT
)
RETURNS TABLE (
  id UUID,
  answers JSONB,
  current_section TEXT,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.answers,
    d.current_section,
    d.updated_at
  FROM public.assessment_drafts d
  WHERE d.user_id = p_user_id
    AND d.assessment_type = p_assessment_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete a draft when assessment is completed
CREATE OR REPLACE FUNCTION public.delete_assessment_draft(
  p_user_id UUID,
  p_assessment_type TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  DELETE FROM public.assessment_drafts
  WHERE user_id = p_user_id
    AND assessment_type = p_assessment_type;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.assessment_drafts TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_assessment_draft TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_assessment_draft TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_assessment_draft TO authenticated;
