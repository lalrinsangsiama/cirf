-- ============================================
-- PROTECT PRIVILEGED PROFILE COLUMNS
-- ============================================
-- The "Users can update their own profile" RLS policy allows an authenticated
-- user to UPDATE any column of their own profiles row — including `role` and
-- `credits`. Combined with the on_profile_role_change trigger (004) that syncs
-- profiles.role into auth.users.raw_app_meta_data, a user could promote
-- themselves to admin using only the public anon key and their own session.
--
-- This trigger blocks changes to role/credits when the update arrives through
-- a client-facing database role (anon/authenticated). Legitimate paths keep
-- working:
--   * SECURITY DEFINER RPCs (use_credit_atomic, save_assessment_with_credit,
--     increment_credits, add_credits_with_order_update, process_refund) run as
--     the function owner, not `authenticated`.
--   * The service-role key and SQL-editor admin changes (e.g. 013) run as
--     service_role/postgres.

CREATE OR REPLACE FUNCTION public.protect_privileged_profile_columns()
RETURNS TRIGGER AS $$
BEGIN
  IF current_user IN ('anon', 'authenticated') THEN
    IF TG_OP = 'UPDATE'
       AND (NEW.role IS DISTINCT FROM OLD.role
            OR NEW.credits IS DISTINCT FROM OLD.credits) THEN
      RAISE EXCEPTION 'Updating role or credits directly is not permitted'
        USING ERRCODE = '42501'; -- insufficient_privilege
    END IF;
    -- Profiles are normally created by handle_new_user(); if a client-side
    -- insert ever happens, it must not grant privileges.
    IF TG_OP = 'INSERT'
       AND (NEW.role = 'admin' OR COALESCE(NEW.credits, 1) > 1) THEN
      RAISE EXCEPTION 'Creating a privileged profile is not permitted'
        USING ERRCODE = '42501';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS protect_privileged_profile_columns ON public.profiles;
CREATE TRIGGER protect_privileged_profile_columns
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_privileged_profile_columns();

COMMENT ON FUNCTION public.protect_privileged_profile_columns() IS
  'Blocks client-side (anon/authenticated) updates to profiles.role and profiles.credits. See migration 017.';
