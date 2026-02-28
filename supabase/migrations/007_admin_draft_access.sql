-- Migration: Admin Draft Access
-- Allows admin users to view all assessment drafts for monitoring

CREATE POLICY "Admins can view all drafts"
  ON public.assessment_drafts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
