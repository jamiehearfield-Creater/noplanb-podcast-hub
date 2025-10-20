-- Drop all unused tables that pose security risks
-- These tables are not used by the podcast website

DROP TABLE IF EXISTS public.maintenance_history CASCADE;
DROP TABLE IF EXISTS public.maintenance_photos CASCADE;
DROP TABLE IF EXISTS public.maintenance_logs CASCADE;
DROP TABLE IF EXISTS public.equipment_types CASCADE;
DROP TABLE IF EXISTS public.message_recipients CASCADE;
DROP TABLE IF EXISTS public.marketing_messages CASCADE;
DROP TABLE IF EXISTS public.workout_reviews CASCADE;
DROP TABLE IF EXISTS public.workout_programs CASCADE;
DROP TABLE IF EXISTS public.checkins CASCADE;
DROP TABLE IF EXISTS public.admin_activities CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.hosts CASCADE;

-- Drop unused functions
DROP FUNCTION IF EXISTS public.get_overdue_equipment_checks() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.progress_workout_program(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_roles(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.get_message_stats(uuid) CASCADE;

-- Drop unused enum types
DROP TYPE IF EXISTS public.app_role CASCADE;
DROP TYPE IF EXISTS public.maintenance_status CASCADE;
DROP TYPE IF EXISTS public.maintenance_priority CASCADE;