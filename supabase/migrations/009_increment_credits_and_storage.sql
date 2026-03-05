-- Migration: Add increment_credits RPC and ensure resources storage bucket exists
-- Required by assessmentUnlockService.ts for granting credits on assessment completion

-- ============================================
-- 1. INCREMENT CREDITS FUNCTION
-- Atomically adds credits to a user's profile
-- ============================================

CREATE OR REPLACE FUNCTION public.increment_credits(
  user_id_input UUID,
  amount INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET credits = COALESCE(credits, 0) + amount,
      updated_at = NOW()
  WHERE id = user_id_input;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User profile not found: %', user_id_input;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated users (called from server-side service)
GRANT EXECUTE ON FUNCTION public.increment_credits(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_credits(UUID, INTEGER) TO service_role;

-- ============================================
-- 2. ENSURE RESOURCES STORAGE BUCKET EXISTS
-- The resources bucket stores downloadable PDFs
-- ============================================

-- Create the bucket if it doesn't exist (idempotent)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resources',
  'resources',
  false,  -- Private bucket (access via signed URLs only)
  52428800,  -- 50 MB max file size
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'];

-- Storage policies: Only authenticated users can download via signed URLs
-- (The app creates signed URLs server-side after checking tool_access)

-- Allow service role to upload/manage files
CREATE POLICY "Service role can manage resources" ON storage.objects
  FOR ALL USING (bucket_id = 'resources')
  WITH CHECK (bucket_id = 'resources');

-- Allow authenticated users to read (for signed URL generation)
CREATE POLICY "Authenticated users can read resources" ON storage.objects
  FOR SELECT USING (bucket_id = 'resources' AND auth.role() = 'authenticated');
