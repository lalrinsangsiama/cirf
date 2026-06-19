-- Migration: Add NOT NULL constraints on critical foreign keys
-- Ensures assessments, email_logs, and payment_orders always belong to a user

-- Pre-check: Verify no NULL user_id rows exist before applying constraints
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.assessments WHERE user_id IS NULL) THEN
    RAISE EXCEPTION 'Cannot apply NOT NULL: assessments table has rows with NULL user_id';
  END IF;
  IF EXISTS (SELECT 1 FROM public.email_logs WHERE user_id IS NULL) THEN
    RAISE EXCEPTION 'Cannot apply NOT NULL: email_logs table has rows with NULL user_id';
  END IF;
  IF EXISTS (SELECT 1 FROM public.payment_orders WHERE user_id IS NULL) THEN
    RAISE EXCEPTION 'Cannot apply NOT NULL: payment_orders table has rows with NULL user_id';
  END IF;
END $$;

-- assessments.user_id: every assessment must belong to a user
ALTER TABLE public.assessments ALTER COLUMN user_id SET NOT NULL;

-- email_logs.user_id: every email log must belong to a user
ALTER TABLE public.email_logs ALTER COLUMN user_id SET NOT NULL;

-- payment_orders: change ON DELETE SET NULL to ON DELETE RESTRICT
-- Payment records must be preserved for audit/refund purposes
ALTER TABLE public.payment_orders DROP CONSTRAINT IF EXISTS payment_orders_user_id_fkey;
ALTER TABLE public.payment_orders ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.payment_orders ADD CONSTRAINT payment_orders_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE RESTRICT;
