-- Migration: Add updated_at trigger for assessment_drafts + composite index for dashboard queries

-- ============================================
-- 1. Auto-update updated_at on assessment_drafts
-- ============================================
-- The table has an updated_at column but no trigger to auto-update it on row changes.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_assessment_drafts'
  ) THEN
    CREATE TRIGGER set_updated_at_assessment_drafts
      BEFORE UPDATE ON public.assessment_drafts
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- ============================================
-- 2. Composite index for dashboard assessment queries
-- ============================================
CREATE INDEX IF NOT EXISTS idx_assessments_user_created
  ON public.assessments(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_created
  ON public.credit_transactions(user_id, created_at DESC);
