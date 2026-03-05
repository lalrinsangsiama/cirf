-- Migration 008: Restrict to 1 response per person per assessment type
-- Ensures each user can only submit one response per assessment type

-- ============================================
-- 1. ADD UNIQUE CONSTRAINT ON (user_id, assessment_type)
-- Prevents duplicate submissions at the database level
-- ============================================

-- First, remove any duplicate assessments (keep the latest one per user+type)
DELETE FROM public.assessments a
WHERE a.id NOT IN (
  SELECT DISTINCT ON (user_id, assessment_type) id
  FROM public.assessments
  ORDER BY user_id, assessment_type, created_at DESC
);

-- Add unique constraint
ALTER TABLE public.assessments
  ADD CONSTRAINT unique_user_assessment_type UNIQUE (user_id, assessment_type);

-- ============================================
-- 2. UPDATE save_assessment_with_credit TO CHECK FOR EXISTING
-- Returns error if user already submitted this assessment type
-- ============================================

DROP FUNCTION IF EXISTS public.save_assessment_with_credit(UUID, TEXT, JSONB, INTEGER, JSONB, BOOLEAN);

CREATE OR REPLACE FUNCTION public.save_assessment_with_credit(
  p_user_id UUID,
  p_assessment_type TEXT,
  p_answers JSONB,
  p_score INTEGER,
  p_interpretation JSONB,
  p_requires_credit BOOLEAN DEFAULT TRUE
)
RETURNS TABLE (success BOOLEAN, assessment_id UUID, new_balance INTEGER, error_message TEXT) AS $$
DECLARE
  v_credits INTEGER;
  v_new_assessment_id UUID;
  v_new_balance INTEGER;
  v_existing_id UUID;
BEGIN
  -- Check if user already submitted this assessment type
  SELECT id INTO v_existing_id
  FROM public.assessments
  WHERE user_id = p_user_id AND assessment_type = p_assessment_type;

  IF FOUND THEN
    RETURN QUERY SELECT FALSE, v_existing_id, 0, 'Assessment already completed'::TEXT;
    RETURN;
  END IF;

  -- Lock the user's profile row to prevent race conditions
  SELECT credits INTO v_credits
  FROM public.profiles
  WHERE id = p_user_id
  FOR UPDATE;

  -- Check if user exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, NULL::UUID, 0, 'User not found'::TEXT;
    RETURN;
  END IF;

  -- If assessment requires credit, validate and deduct
  IF p_requires_credit THEN
    IF v_credits IS NULL OR v_credits <= 0 THEN
      RETURN QUERY SELECT FALSE, NULL::UUID, COALESCE(v_credits, 0), 'Insufficient credits'::TEXT;
      RETURN;
    END IF;

    -- Deduct credit
    UPDATE public.profiles
    SET
      credits = credits - 1,
      updated_at = NOW()
    WHERE id = p_user_id;

    v_new_balance := v_credits - 1;

    -- Record credit usage transaction
    INSERT INTO public.credit_transactions (
      user_id,
      amount,
      type,
      description
    ) VALUES (
      p_user_id,
      -1,
      'usage',
      p_assessment_type || ' assessment completed'
    );
  ELSE
    v_new_balance := v_credits;
  END IF;

  -- Insert the assessment
  INSERT INTO public.assessments (
    user_id,
    assessment_type,
    answers,
    score,
    interpretation
  ) VALUES (
    p_user_id,
    p_assessment_type,
    p_answers,
    p_score,
    p_interpretation
  )
  RETURNING id INTO v_new_assessment_id;

  -- Return success
  RETURN QUERY SELECT TRUE, v_new_assessment_id, v_new_balance, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-grant permissions
GRANT EXECUTE ON FUNCTION public.save_assessment_with_credit(UUID, TEXT, JSONB, INTEGER, JSONB, BOOLEAN) TO authenticated;
