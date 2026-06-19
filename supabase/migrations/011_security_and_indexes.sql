-- Migration: Restrict profiles RLS, add newsletter UPDATE policy, fix use_credit race condition, add indexes

-- ============================================
-- 1. Restrict profiles SELECT RLS policy
-- ============================================
-- The original policy (USING (true)) exposed all user data to any authenticated user.
-- Replace with per-user and admin-only policies.

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 2. Newsletter subscribers UPDATE policy
-- ============================================
-- Currently no UPDATE policy exists. The unsubscribe API uses service role (bypasses RLS),
-- but an explicit policy makes the intent clear and is more resilient.

CREATE POLICY "Service role can update subscribers" ON public.newsletter_subscribers FOR UPDATE
  USING (true) WITH CHECK (true);

-- ============================================
-- 3. Fix use_credit race condition with FOR UPDATE lock
-- ============================================
-- The original function reads credits then updates, which is not atomic.
-- Two concurrent requests could both read credits=1 and both succeed.

CREATE OR REPLACE FUNCTION public.use_credit(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits with row-level lock to prevent race conditions
  SELECT credits INTO current_credits
  FROM public.profiles
  WHERE id = user_uuid
  FOR UPDATE;

  -- Check if user has credits
  IF current_credits IS NULL OR current_credits <= 0 THEN
    RETURN FALSE;
  END IF;

  -- Decrement credits
  UPDATE public.profiles
  SET credits = credits - 1, updated_at = NOW()
  WHERE id = user_uuid;

  -- Record transaction
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (user_uuid, -1, 'usage', 'Assessment completed');

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. Add missing database indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_assessment_drafts_user_id ON public.assessment_drafts(user_id);
