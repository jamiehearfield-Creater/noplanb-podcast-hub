-- Fix subscribers table security
-- Remove any existing admin SELECT policy that may reference dropped functions
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.subscribers;

-- Create a secure SELECT policy that only allows service role access
-- This means subscribers can only be viewed through backend/admin interfaces
-- not through the public API
CREATE POLICY "Service role only can view subscribers"
ON public.subscribers
FOR SELECT
USING (false); -- No public SELECT access at all

-- Ensure the INSERT policy exists for public signups
-- (it should already exist from previous migration)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscribers' 
    AND policyname = 'Public can subscribe with valid email'
  ) THEN
    CREATE POLICY "Public can subscribe with valid email"
    ON public.subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
      email IS NOT NULL 
      AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
      AND privacy_consent = true
    );
  END IF;
END $$;

-- Prevent UPDATE and DELETE from public
-- Only service role (admin dashboard) can modify
DROP POLICY IF EXISTS "Public cannot update subscribers" ON public.subscribers;
DROP POLICY IF EXISTS "Public cannot delete subscribers" ON public.subscribers;