-- Set admin role for the platform owner
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'hello@culturalinnovationlab.org';
