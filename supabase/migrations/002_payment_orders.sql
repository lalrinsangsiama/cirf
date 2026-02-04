-- Migration: Add payment_orders table and additional indexes
-- Run this in your Supabase SQL Editor

-- ============================================
-- PAYMENT ORDERS TABLE
-- Track order lifecycle for reconciliation
-- ============================================
CREATE TABLE IF NOT EXISTS public.payment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT UNIQUE NOT NULL, -- Razorpay order_id
  user_id UUID REFERENCES public.profiles ON DELETE SET NULL,
  pack_id TEXT NOT NULL,
  credits INTEGER NOT NULL,
  amount INTEGER NOT NULL, -- Amount in smallest currency unit (paise/cents)
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'attempted', 'paid', 'failed', 'refunded', 'expired')),
  payment_id TEXT, -- Razorpay payment_id (set after payment)
  refund_id TEXT, -- Razorpay refund_id (if refunded)
  refund_amount INTEGER, -- Amount refunded (if partial refund)
  refund_reason TEXT,
  failure_reason TEXT,
  receipt TEXT,
  notes JSONB,
  metadata JSONB,
  expires_at TIMESTAMPTZ, -- Order expiry time
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;

-- Payment orders policies
CREATE POLICY "Users can view their own orders"
  ON public.payment_orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON public.payment_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Service role can insert orders"
  ON public.payment_orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update orders"
  ON public.payment_orders FOR UPDATE
  USING (true);

-- ============================================
-- WAITLIST TABLE
-- For platform beta signups
-- ============================================
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  organization TEXT,
  interest TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'joined')),
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Waitlist policies
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view waitlist"
  ON public.waitlist FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update waitlist"
  ON public.waitlist FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- ADDITIONAL INDEXES
-- ============================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Newsletter indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON public.newsletter_subscribers(subscribed) WHERE subscribed = true;

-- Contact submissions indexes
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_submissions(created_at DESC);

-- Payment orders indexes
CREATE INDEX IF NOT EXISTS idx_payment_orders_user_id ON public.payment_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_order_id ON public.payment_orders(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON public.payment_orders(status);
CREATE INDEX IF NOT EXISTS idx_payment_orders_created_at ON public.payment_orders(created_at DESC);

-- Credit transactions indexes
CREATE INDEX IF NOT EXISTS idx_credit_transactions_payment_id ON public.credit_transactions(razorpay_payment_id) WHERE razorpay_payment_id IS NOT NULL;

-- Blog posts composite index
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published ON public.blog_posts(status, published_at DESC) WHERE status = 'published';

-- Waitlist indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist(status);

-- ============================================
-- UPDATE TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to payment_orders
DROP TRIGGER IF EXISTS update_payment_orders_updated_at ON public.payment_orders;
CREATE TRIGGER update_payment_orders_updated_at
  BEFORE UPDATE ON public.payment_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- FUNCTION: Process Refund
-- ============================================
CREATE OR REPLACE FUNCTION public.process_refund(
  p_order_id TEXT,
  p_refund_id TEXT,
  p_refund_amount INTEGER,
  p_reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_order RECORD;
  v_credits_to_remove INTEGER;
BEGIN
  -- Get the order
  SELECT * INTO v_order
  FROM public.payment_orders
  WHERE order_id = p_order_id AND status = 'paid';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found or not in paid status';
  END IF;

  -- Calculate credits to remove (proportional to refund amount)
  IF p_refund_amount >= v_order.amount THEN
    -- Full refund
    v_credits_to_remove := v_order.credits;
  ELSE
    -- Partial refund (proportional)
    v_credits_to_remove := FLOOR(v_order.credits::DECIMAL * p_refund_amount / v_order.amount);
  END IF;

  -- Update the order
  UPDATE public.payment_orders
  SET
    status = 'refunded',
    refund_id = p_refund_id,
    refund_amount = p_refund_amount,
    refund_reason = p_reason,
    refunded_at = NOW()
  WHERE order_id = p_order_id;

  -- Remove credits from user (if they still have them)
  UPDATE public.profiles
  SET credits = GREATEST(0, credits - v_credits_to_remove)
  WHERE id = v_order.user_id;

  -- Record the refund transaction
  INSERT INTO public.credit_transactions (
    user_id, amount, type, description, razorpay_payment_id, razorpay_order_id, metadata
  )
  VALUES (
    v_order.user_id,
    -v_credits_to_remove,
    'refund',
    'Refund: ' || v_credits_to_remove || ' credits removed',
    v_order.payment_id,
    v_order.order_id,
    jsonb_build_object(
      'refund_id', p_refund_id,
      'refund_amount', p_refund_amount,
      'reason', p_reason
    )
  );

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ADD TOS ACCEPTED COLUMN TO PROFILES
-- For terms of service acceptance tracking
-- ============================================
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tos_accepted_at TIMESTAMPTZ;

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS privacy_accepted_at TIMESTAMPTZ;
