-- Migration 003: Security Fixes
-- Addresses critical payment, assessment, and authentication security issues

-- ============================================
-- 1. ATOMIC CREDIT USAGE WITH ROW LOCKING
-- Fixes TOCTOU race condition in use_credit()
-- ============================================

-- Drop existing function first if return type changed
DROP FUNCTION IF EXISTS public.use_credit_atomic(UUID, TEXT);

CREATE OR REPLACE FUNCTION public.use_credit_atomic(
  user_uuid UUID,
  p_assessment_type TEXT DEFAULT 'cirf'
)
RETURNS TABLE (success BOOLEAN, new_balance INTEGER, error_message TEXT) AS $$
DECLARE
  v_credits INTEGER;
BEGIN
  -- Acquire row lock with FOR UPDATE to prevent race conditions
  SELECT credits INTO v_credits
  FROM public.profiles
  WHERE id = user_uuid
  FOR UPDATE;

  -- Check if user exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 0, 'User not found'::TEXT;
    RETURN;
  END IF;

  -- Check if user has credits
  IF v_credits IS NULL OR v_credits <= 0 THEN
    RETURN QUERY SELECT FALSE, COALESCE(v_credits, 0), 'Insufficient credits'::TEXT;
    RETURN;
  END IF;

  -- Deduct credit atomically
  UPDATE public.profiles
  SET
    credits = credits - 1,
    updated_at = NOW()
  WHERE id = user_uuid;

  -- Record the transaction
  INSERT INTO public.credit_transactions (
    user_id,
    amount,
    type,
    description
  ) VALUES (
    user_uuid,
    -1,
    'usage',
    p_assessment_type || ' assessment completed'
  );

  -- Return success with new balance
  RETURN QUERY SELECT TRUE, v_credits - 1, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 2. ATOMIC ASSESSMENT SUBMISSION WITH CREDIT
-- Ensures assessment is saved AND credit is deducted atomically
-- ============================================

-- Drop existing function first if return type changed
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
BEGIN
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

-- ============================================
-- 3. ATOMIC CREDIT ADDITION WITH IDEMPOTENCY
-- Prevents duplicate credit additions from webhook retries
-- ============================================

-- Drop existing function first if return type changed
DROP FUNCTION IF EXISTS public.add_credits_with_order_update(UUID, INTEGER, TEXT, TEXT, TEXT);

CREATE OR REPLACE FUNCTION public.add_credits_with_order_update(
  user_uuid UUID,
  credit_amount INTEGER,
  payment_id TEXT,
  order_id TEXT,
  pack_id TEXT DEFAULT NULL
)
RETURNS TABLE (success BOOLEAN, new_balance INTEGER, error_message TEXT) AS $$
DECLARE
  v_existing_transaction_id UUID;
  v_current_credits INTEGER;
  v_new_credits INTEGER;
BEGIN
  -- Check for existing transaction (idempotency check)
  SELECT id INTO v_existing_transaction_id
  FROM public.credit_transactions
  WHERE razorpay_payment_id = payment_id;

  IF FOUND THEN
    -- Already processed - return current balance without error
    SELECT credits INTO v_current_credits
    FROM public.profiles
    WHERE id = user_uuid;

    RETURN QUERY SELECT TRUE, COALESCE(v_current_credits, 0), 'Payment already processed'::TEXT;
    RETURN;
  END IF;

  -- Lock the user's profile row
  SELECT credits INTO v_current_credits
  FROM public.profiles
  WHERE id = user_uuid
  FOR UPDATE;

  -- Check if user exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 0, 'User not found'::TEXT;
    RETURN;
  END IF;

  -- Add credits
  v_new_credits := COALESCE(v_current_credits, 0) + credit_amount;

  UPDATE public.profiles
  SET
    credits = v_new_credits,
    updated_at = NOW()
  WHERE id = user_uuid;

  -- Record the transaction
  INSERT INTO public.credit_transactions (
    user_id,
    amount,
    type,
    description,
    razorpay_payment_id,
    razorpay_order_id,
    metadata
  ) VALUES (
    user_uuid,
    credit_amount,
    'purchase',
    credit_amount || ' credits purchased' || COALESCE(' (' || pack_id || ')', ''),
    payment_id,
    order_id,
    CASE WHEN pack_id IS NOT NULL THEN jsonb_build_object('packId', pack_id) ELSE NULL END
  );

  -- Update payment order status to 'paid' if payment_orders table exists
  UPDATE public.payment_orders
  SET
    status = 'paid',
    updated_at = NOW()
  WHERE order_id = add_credits_with_order_update.order_id
    AND status != 'paid';

  -- Return success with new balance
  RETURN QUERY SELECT TRUE, v_new_credits, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. ATOMIC USER ACCOUNT DELETION
-- Deletes all user data in a single transaction
-- ============================================

-- Drop existing function first if return type changed
DROP FUNCTION IF EXISTS public.delete_user_account(UUID);

CREATE OR REPLACE FUNCTION public.delete_user_account(user_uuid UUID)
RETURNS TABLE (success BOOLEAN, error_message TEXT) AS $$
DECLARE
  v_user_email TEXT;
BEGIN
  -- Get user email for newsletter cleanup
  SELECT email INTO v_user_email
  FROM public.profiles
  WHERE id = user_uuid;

  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'User not found'::TEXT;
    RETURN;
  END IF;

  -- Delete in order respecting foreign key constraints

  -- 1. Delete email logs
  DELETE FROM public.email_logs
  WHERE user_id = user_uuid;

  -- 2. Delete tool access
  DELETE FROM public.tool_access
  WHERE user_id = user_uuid;

  -- 3. Delete assessment unlocks
  DELETE FROM public.assessment_unlocks
  WHERE user_id = user_uuid;

  -- 4. Delete assessments
  DELETE FROM public.assessments
  WHERE user_id = user_uuid;

  -- 5. Delete credit transactions
  DELETE FROM public.credit_transactions
  WHERE user_id = user_uuid;

  -- 6. Delete payment orders
  DELETE FROM public.payment_orders
  WHERE user_id = user_uuid;

  -- 7. Delete newsletter subscription if email exists
  IF v_user_email IS NOT NULL THEN
    DELETE FROM public.newsletter_subscribers
    WHERE email = v_user_email;
  END IF;

  -- 8. Delete profile (will be cascade deleted when auth.user is deleted, but clean explicitly)
  DELETE FROM public.profiles
  WHERE id = user_uuid;

  RETURN QUERY SELECT TRUE, NULL::TEXT;
EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY SELECT FALSE, SQLERRM::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. ADMIN JWT CLAIMS SYNC TRIGGER
-- Syncs profile role to JWT app_metadata for secure admin checks
-- ============================================

-- Drop existing trigger and function first if return type changed
DROP TRIGGER IF EXISTS on_profile_role_change ON public.profiles;
DROP FUNCTION IF EXISTS public.set_admin_claim();

CREATE OR REPLACE FUNCTION public.set_admin_claim()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update if role changed to or from admin
  IF (TG_OP = 'INSERT' AND NEW.role = 'admin') OR
     (TG_OP = 'UPDATE' AND NEW.role IS DISTINCT FROM OLD.role) THEN

    -- Update the user's app_metadata with the role
    UPDATE auth.users
    SET raw_app_meta_data =
      COALESCE(raw_app_meta_data, '{}'::jsonb) ||
      jsonb_build_object('role', NEW.role)
    WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_profile_role_change ON public.profiles;
CREATE TRIGGER on_profile_role_change
  AFTER INSERT OR UPDATE OF role ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_admin_claim();

-- ============================================
-- 6. UNIQUE CONSTRAINT FOR WEBHOOK IDEMPOTENCY
-- Prevents duplicate credit additions at database level
-- ============================================

-- Create unique partial index for razorpay_payment_id (only for non-null values)
DROP INDEX IF EXISTS idx_credit_transactions_payment_unique;
CREATE UNIQUE INDEX idx_credit_transactions_payment_unique
ON public.credit_transactions(razorpay_payment_id)
WHERE razorpay_payment_id IS NOT NULL;

-- ============================================
-- 7. PROCESS REFUND FUNCTION (if not exists)
-- Used by refund endpoint to update order status
-- ============================================

-- Drop existing function first if return type changed
DROP FUNCTION IF EXISTS public.process_refund(TEXT, TEXT, INTEGER, TEXT);

CREATE OR REPLACE FUNCTION public.process_refund(
  p_order_id TEXT,
  p_refund_id TEXT,
  p_refund_amount INTEGER,
  p_reason TEXT DEFAULT NULL
)
RETURNS TABLE (success BOOLEAN, error_message TEXT) AS $$
DECLARE
  v_order RECORD;
  v_credits_to_remove INTEGER;
BEGIN
  -- Get the order
  SELECT * INTO v_order
  FROM public.payment_orders
  WHERE order_id = p_order_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'Order not found'::TEXT;
    RETURN;
  END IF;

  IF v_order.status = 'refunded' THEN
    RETURN QUERY SELECT FALSE, 'Order already refunded'::TEXT;
    RETURN;
  END IF;

  -- Calculate credits to remove (proportional to refund amount)
  v_credits_to_remove := CEIL((p_refund_amount::DECIMAL / v_order.amount::DECIMAL) * v_order.credits);

  -- Update order status
  UPDATE public.payment_orders
  SET
    status = 'refunded',
    refund_id = p_refund_id,
    refund_amount = p_refund_amount,
    refund_reason = p_reason,
    updated_at = NOW()
  WHERE order_id = p_order_id;

  -- Deduct credits from user
  UPDATE public.profiles
  SET
    credits = GREATEST(0, credits - v_credits_to_remove),
    updated_at = NOW()
  WHERE id = v_order.user_id;

  -- Record refund transaction
  INSERT INTO public.credit_transactions (
    user_id,
    amount,
    type,
    description,
    razorpay_payment_id,
    razorpay_order_id,
    metadata
  ) VALUES (
    v_order.user_id,
    -v_credits_to_remove,
    'refund',
    'Refund: ' || COALESCE(p_reason, 'No reason provided'),
    v_order.payment_id,
    p_order_id,
    jsonb_build_object(
      'refund_id', p_refund_id,
      'refund_amount', p_refund_amount,
      'original_amount', v_order.amount
    )
  );

  RETURN QUERY SELECT TRUE, NULL::TEXT;
EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY SELECT FALSE, SQLERRM::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 8. GRANT NECESSARY PERMISSIONS
-- ============================================

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.use_credit_atomic(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_assessment_with_credit(UUID, TEXT, JSONB, INTEGER, JSONB, BOOLEAN) TO authenticated;

-- Service role only functions (called from server-side)
GRANT EXECUTE ON FUNCTION public.add_credits_with_order_update(UUID, INTEGER, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_user_account(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION public.process_refund(TEXT, TEXT, INTEGER, TEXT) TO service_role;

-- ============================================
-- 9. SYNC EXISTING ADMIN ROLES TO JWT
-- One-time update for existing admin users
-- ============================================

DO $$
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data =
    COALESCE(raw_app_meta_data, '{}'::jsonb) ||
    jsonb_build_object('role', p.role)
  FROM public.profiles p
  WHERE auth.users.id = p.id
    AND p.role = 'admin';
END $$;
