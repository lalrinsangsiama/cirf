-- CIRF Admin User Setup
-- Run this in your Supabase SQL Editor after creating the user via the Auth dashboard

-- ============================================
-- STEP 1: Create the user via Supabase Dashboard
-- ============================================
-- 1. Go to Authentication → Users → Add User
-- 2. Enter your ADMIN_EMAIL and a secure password
-- 3. Click "Create User"

-- ============================================
-- STEP 2: Run this SQL to promote to admin
-- ============================================
-- Replace 'your-admin-email@example.com' with your actual admin email

-- Promote user to admin role
UPDATE public.profiles
SET role = 'admin', updated_at = NOW()
WHERE email = 'your-admin-email@example.com';

-- Verify it worked
SELECT id, email, role, full_name, created_at
FROM public.profiles
WHERE role = 'admin';

-- ============================================
-- ALTERNATIVE: Create admin and promote in one go
-- (if you know the auth.users UUID)
-- ============================================
-- First, find your user's UUID:
-- SELECT id, email FROM auth.users WHERE email = 'your-admin-email@example.com';

-- Then update using the UUID:
-- UPDATE public.profiles
-- SET role = 'admin', updated_at = NOW()
-- WHERE id = 'your-user-uuid-here';
