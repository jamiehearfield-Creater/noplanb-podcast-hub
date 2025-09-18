-- Create admin user role for admin@noplanb.com
-- This will assign admin role to the user with email admin@noplanb.com

INSERT INTO public.user_roles (user_id, role)
SELECT 
  au.id,
  'admin'::app_role
FROM auth.users au
WHERE au.email = 'admin@noplanb.com'
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = au.id AND ur.role = 'admin'::app_role
  );