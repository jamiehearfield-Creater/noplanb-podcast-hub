-- Grant admin role to jamiehearfield@hotmail.co.uk
INSERT INTO public.user_roles (user_id, role)
VALUES ('b087b0fc-1845-4947-be5f-c4cc01324bac', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;