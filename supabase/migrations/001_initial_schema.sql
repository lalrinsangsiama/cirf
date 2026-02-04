-- CIRF Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- Extends Supabase auth.users with additional fields
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  organization TEXT,
  role TEXT DEFAULT 'user', -- 'user', 'researcher', 'practitioner', 'community_leader', 'policymaker', 'admin'
  credits INTEGER DEFAULT 1, -- Free users get 1 credit
  avatar_url TEXT,
  -- Contact Information
  phone TEXT,
  website TEXT,
  linkedin_url TEXT,
  twitter_handle TEXT,
  -- Location
  country TEXT,
  city TEXT,
  timezone TEXT,
  -- Business Information
  industry TEXT,
  business_stage TEXT, -- idea, startup, growth, established
  years_operating INTEGER,
  team_size TEXT, -- solo, 2-5, 6-10, 11-25, 26-50, 51+
  revenue_range TEXT, -- pre-revenue, <10k, 10k-50k, 50k-100k, 100k-500k, 500k+
  -- Cultural Context
  cultural_tradition TEXT,
  community_affiliation TEXT,
  -- Profile Completion Status
  profile_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ASSESSMENTS TABLE
-- Stores user assessment results
-- ============================================
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE,
  score INTEGER NOT NULL,
  answers JSONB NOT NULL, -- { questionId: { answer: boolean, notes: string } }
  interpretation JSONB, -- { level, successRate, description }
  matched_case_studies TEXT[], -- Array of case study IDs
  assessment_type TEXT DEFAULT 'cirf', -- cirf, cimm, cira, tbl, ciss, pricing
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Assessments policies
CREATE POLICY "Users can view their own assessments"
  ON public.assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments"
  ON public.assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all assessments"
  ON public.assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- CREDIT TRANSACTIONS TABLE
-- Tracks credit purchases and usage
-- ============================================
CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- Positive for purchases, negative for usage
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'bonus', 'refund')),
  description TEXT,
  stripe_payment_id TEXT,
  stripe_session_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- Credit transactions policies
CREATE POLICY "Users can view their own transactions"
  ON public.credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert transactions"
  ON public.credit_transactions FOR INSERT
  WITH CHECK (true); -- Controlled by service role key

-- ============================================
-- BLOG POSTS TABLE
-- Stores blog/research content
-- ============================================
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES public.profiles,
  author_name TEXT,
  category TEXT CHECK (category IN ('research', 'case-study', 'practitioner-tips', 'news', 'framework-updates')),
  tags TEXT[],
  featured_image TEXT,
  citations JSONB, -- Array of { author, year, title, journal, doi, url }
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Published posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authors can view their own posts"
  ON public.blog_posts FOR SELECT
  USING (auth.uid() = author_id);

CREATE POLICY "Admins can view all posts"
  ON public.blog_posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update posts"
  ON public.blog_posts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Newsletter policies
CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON public.newsletter_subscribers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Contact policies
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view submissions"
  ON public.contact_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- ASSESSMENT UNLOCKS TABLE
-- Tracks which assessments users have unlocked
-- ============================================

CREATE TABLE public.assessment_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  assessment_type TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  unlocked_by_assessment_id UUID REFERENCES public.assessments(id) ON DELETE SET NULL,
  UNIQUE(user_id, assessment_type)
);

-- Enable RLS
ALTER TABLE public.assessment_unlocks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessment_unlocks
CREATE POLICY "Users can view their own unlocks"
  ON public.assessment_unlocks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own unlocks"
  ON public.assessment_unlocks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- TOOL ACCESS TABLE
-- Tracks which tools users have access to
-- ============================================

CREATE TABLE public.tool_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  tool_id TEXT NOT NULL,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by_assessment_type TEXT,
  UNIQUE(user_id, tool_id)
);

-- Enable RLS
ALTER TABLE public.tool_access ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tool_access
CREATE POLICY "Users can view their own tool access"
  ON public.tool_access FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tool access"
  ON public.tool_access FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- EMAIL LOGS TABLE
-- Track sent emails for assessment results
-- ============================================

CREATE TABLE public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE,
  email_type TEXT NOT NULL, -- 'assessment_results', 'newsletter', 'contact', etc.
  recipient_email TEXT NOT NULL,
  subject TEXT,
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  metadata JSONB
);

-- Enable RLS
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_logs
CREATE POLICY "Users can view their own email logs"
  ON public.email_logs FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to decrement user credits
CREATE OR REPLACE FUNCTION public.use_credit(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits
  SELECT credits INTO current_credits
  FROM public.profiles
  WHERE id = user_uuid;

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

-- Function to add credits
CREATE OR REPLACE FUNCTION public.add_credits(
  user_uuid UUID,
  credit_amount INTEGER,
  payment_id TEXT DEFAULT NULL,
  session_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Add credits
  UPDATE public.profiles
  SET credits = credits + credit_amount, updated_at = NOW()
  WHERE id = user_uuid;

  -- Record transaction
  INSERT INTO public.credit_transactions (
    user_id, amount, type, description, stripe_payment_id, stripe_session_id
  )
  VALUES (
    user_uuid, credit_amount, 'purchase',
    credit_amount || ' credits purchased',
    payment_id, session_id
  );

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_assessments_user_id ON public.assessments(user_id);
CREATE INDEX idx_assessments_created_at ON public.assessments(created_at DESC);
CREATE INDEX idx_assessments_type ON public.assessments(assessment_type);
CREATE INDEX idx_assessments_user_type ON public.assessments(user_id, assessment_type);
CREATE INDEX idx_assessment_unlocks_user_id ON public.assessment_unlocks(user_id);
CREATE INDEX idx_assessment_unlocks_type ON public.assessment_unlocks(assessment_type);
CREATE INDEX idx_tool_access_user_id ON public.tool_access(user_id);
CREATE INDEX idx_tool_access_tool_id ON public.tool_access(tool_id);
CREATE INDEX idx_email_logs_user_id ON public.email_logs(user_id);
CREATE INDEX idx_email_logs_type ON public.email_logs(email_type);
CREATE INDEX idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- ============================================
-- STORAGE BUCKETS (run in Dashboard)
-- ============================================
-- Create these buckets manually in Supabase Dashboard:
-- 1. 'avatars' - for user profile pictures
-- 2. 'blog-images' - for blog post images
-- 3. 'resources' - for downloadable files (PDFs, etc.)
