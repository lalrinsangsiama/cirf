-- Migration 016: Capture subscriber role on the newsletter signup form.
-- The NewsletterForm collects a "role" (researcher/practitioner/policymaker/
-- community/other) but it was previously dropped on submit. Store it.

ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS role TEXT;
