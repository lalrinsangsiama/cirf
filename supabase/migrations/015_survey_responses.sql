-- ════════════════════════════════════════════════════════════
-- Migration 015: CIRF Expert Validation Survey Responses
-- ════════════════════════════════════════════════════════════

CREATE TABLE public.survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  answers JSONB NOT NULL DEFAULT '{}',
  current_screen INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_saved_at TIMESTAMPTZ DEFAULT NOW(),
  completion_time_seconds INTEGER,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (service role bypasses; no anon access)
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Admin read access for data export
CREATE POLICY "Admins can view survey responses"
  ON public.survey_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Indexes
CREATE INDEX idx_survey_responses_session ON public.survey_responses(session_id);
CREATE INDEX idx_survey_responses_status ON public.survey_responses(status);

-- Only one in-progress draft per session
CREATE UNIQUE INDEX idx_survey_responses_session_draft
  ON public.survey_responses(session_id) WHERE status = 'in_progress';
