-- =============================================================================
-- Razorpay Test User Seed Script
-- =============================================================================
-- Purpose: Creates a test user account for Razorpay integration testing
--
-- Test Credentials:
--   Email: razorpay-test@cirf-framework.org
--   Password: CirfTest2024!
--
-- Usage:
--   1. Create the user in Supabase Auth Dashboard first (or via API)
--   2. Run this script to set up the profile and credits
--   3. The user can then test the full checkout flow
--
-- Note: This script assumes the user has already been created in Supabase Auth.
--       You need to create the auth user first, then run this script.
-- =============================================================================

-- First, check if the user exists and get their ID
-- (Run this after creating the user in Supabase Auth)
DO $$
DECLARE
    test_user_id UUID;
BEGIN
    -- Get the user ID from auth.users
    SELECT id INTO test_user_id
    FROM auth.users
    WHERE email = 'razorpay-test@cirf-framework.org';

    IF test_user_id IS NULL THEN
        RAISE NOTICE 'Test user not found in auth.users. Please create the user first with:';
        RAISE NOTICE 'Email: razorpay-test@cirf-framework.org';
        RAISE NOTICE 'Password: CirfTest2024!';
        RETURN;
    END IF;

    -- Insert or update the user profile
    INSERT INTO public.profiles (id, email, full_name, credits, created_at, updated_at)
    VALUES (
        test_user_id,
        'razorpay-test@cirf-framework.org',
        'Razorpay Test User',
        100,  -- Pre-loaded credits for testing
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        credits = 100,
        full_name = 'Razorpay Test User',
        updated_at = NOW();

    RAISE NOTICE 'Test user profile created/updated successfully!';
    RAISE NOTICE 'User ID: %', test_user_id;
    RAISE NOTICE 'Credits: 100';

END $$;

-- =============================================================================
-- Alternative: Manual insertion if you know the user ID
-- =============================================================================
-- If you've already created the user and know their UUID, uncomment and modify:
--
-- INSERT INTO public.profiles (id, email, full_name, credits, created_at, updated_at)
-- VALUES (
--     'YOUR-USER-UUID-HERE',
--     'razorpay-test@cirf-framework.org',
--     'Razorpay Test User',
--     100,
--     NOW(),
--     NOW()
-- )
-- ON CONFLICT (id) DO UPDATE SET
--     credits = 100,
--     full_name = 'Razorpay Test User',
--     updated_at = NOW();

-- =============================================================================
-- Verification Query
-- =============================================================================
-- Run this to verify the test user setup:
--
-- SELECT
--     p.id,
--     p.email,
--     p.full_name,
--     p.credits,
--     p.created_at
-- FROM public.profiles p
-- WHERE p.email = 'razorpay-test@cirf-framework.org';

-- =============================================================================
-- Checkout Flow Testing Instructions
-- =============================================================================
--
-- 1. Login at /auth/login with:
--    Email: razorpay-test@cirf-framework.org
--    Password: CirfTest2024!
--
-- 2. Navigate to /pricing
--
-- 3. Select any credit pack
--
-- 4. Complete Razorpay checkout using Razorpay test mode:
--    - Test Card: 4111 1111 1111 1111
--    - Expiry: Any future date
--    - CVV: Any 3 digits
--    - OTP: 1234 (for test mode)
--
-- 5. Verify credits added in /dashboard
--
-- 6. Test assessment flow with the purchased credits
--
-- =============================================================================
