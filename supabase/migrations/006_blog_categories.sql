-- ============================================
-- Migration: Add more blog categories
-- ============================================
-- This migration updates the blog_posts category constraint
-- to include additional categories used by the content

-- First, drop the existing constraint
ALTER TABLE public.blog_posts
DROP CONSTRAINT IF EXISTS blog_posts_category_check;

-- Add the new constraint with all categories
ALTER TABLE public.blog_posts
ADD CONSTRAINT blog_posts_category_check
CHECK (category IN (
  'resources',
  'education',
  'series',
  'playlist',
  'research',
  'case-study',
  'practitioner-tips',
  'news',
  'framework-updates'
));
