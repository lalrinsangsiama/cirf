-- Migration 010: Fix constraints, missing columns, and policy issues
-- Addresses bugs found during production audit

-- ============================================
-- 1. FIX credit_transactions type CHECK constraint
-- Add 'earned' to allowed types (used by grantCreditsOnCompletion)
-- ============================================

-- Drop ALL check constraints on the type column (handles any auto-generated name)
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT con.conname
    FROM pg_constraint con
    JOIN pg_attribute att ON att.attnum = ANY(con.conkey)
      AND att.attrelid = con.conrelid
    WHERE con.conrelid = 'public.credit_transactions'::regclass
      AND con.contype = 'c'
      AND att.attname = 'type'
  LOOP
    EXECUTE format('ALTER TABLE public.credit_transactions DROP CONSTRAINT %I', r.conname);
  END LOOP;
END $$;

ALTER TABLE public.credit_transactions
  ADD CONSTRAINT credit_transactions_type_check
  CHECK (type IN ('purchase', 'usage', 'bonus', 'refund', 'earned'));

-- ============================================
-- 2. ADD missing reference_id column to credit_transactions
-- Used by assessmentUnlockService.ts for tracking which assessment granted credits
-- ============================================
ALTER TABLE public.credit_transactions
  ADD COLUMN IF NOT EXISTS reference_id TEXT;

-- ============================================
-- 3. FIX add_credits_with_order_update to set paid_at
-- ============================================
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

  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 0, 'User not found'::TEXT;
    RETURN;
  END IF;

  v_new_credits := COALESCE(v_current_credits, 0) + credit_amount;

  UPDATE public.profiles
  SET credits = v_new_credits, updated_at = NOW()
  WHERE id = user_uuid;

  INSERT INTO public.credit_transactions (
    user_id, amount, type, description,
    razorpay_payment_id, razorpay_order_id, metadata
  ) VALUES (
    user_uuid, credit_amount, 'purchase',
    credit_amount || ' credits purchased' || COALESCE(' (' || pack_id || ')', ''),
    payment_id, order_id,
    CASE WHEN pack_id IS NOT NULL THEN jsonb_build_object('packId', pack_id) ELSE NULL END
  );

  -- FIX: Also set paid_at when marking as paid
  UPDATE public.payment_orders
  SET status = 'paid', paid_at = NOW(), updated_at = NOW()
  WHERE order_id = add_credits_with_order_update.order_id
    AND status != 'paid';

  RETURN QUERY SELECT TRUE, v_new_credits, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. FIX duplicate policies from migration 003
-- Ensure clean state regardless of migration history
-- ============================================

-- assessment_unlocks policies (created in both 001 and 003)
DROP POLICY IF EXISTS "Service role can manage unlocks" ON public.assessment_unlocks;
CREATE POLICY "Service role can manage unlocks"
  ON public.assessment_unlocks FOR ALL
  USING (true) WITH CHECK (true);

-- tool_access policies (created in both 001 and 003)
DROP POLICY IF EXISTS "Service role can manage tool access" ON public.tool_access;
CREATE POLICY "Service role can manage tool access"
  ON public.tool_access FOR ALL
  USING (true) WITH CHECK (true);

-- email_logs policies (created in 001 without service role, added in 003)
DROP POLICY IF EXISTS "Service role can manage email logs" ON public.email_logs;
CREATE POLICY "Service role can manage email logs"
  ON public.email_logs FOR ALL
  USING (true) WITH CHECK (true);

-- ============================================
-- 5. FIX storage policy — restrict write to service_role
-- ============================================
DROP POLICY IF EXISTS "Service role can manage resources" ON storage.objects;
CREATE POLICY "Service role can manage resources" ON storage.objects
  FOR ALL
  USING (bucket_id = 'resources' AND auth.role() = 'service_role')
  WITH CHECK (bucket_id = 'resources' AND auth.role() = 'service_role');

-- ============================================
-- 6. GRANT save_assessment_with_credit to service_role
-- (called from API route via createServiceClient)
-- ============================================
GRANT EXECUTE ON FUNCTION public.save_assessment_with_credit(UUID, TEXT, JSONB, INTEGER, JSONB, BOOLEAN) TO service_role;

-- Also grant add_credits_with_order_update to service_role (re-grant after replacement)
GRANT EXECUTE ON FUNCTION public.add_credits_with_order_update(UUID, INTEGER, TEXT, TEXT, TEXT) TO service_role;
