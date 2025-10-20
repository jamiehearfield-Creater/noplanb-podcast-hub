-- Add explicit restrictive policies for UPDATE and DELETE on subscribers table
-- This makes security posture explicit rather than relying on implicit default-deny behavior

-- Explicitly block all public UPDATE operations on subscribers
CREATE POLICY "No public updates to subscribers"
ON public.subscribers
FOR UPDATE
TO anon, authenticated
USING (false);

-- Explicitly block all public DELETE operations on subscribers
CREATE POLICY "No public deletes of subscribers"
ON public.subscribers
FOR DELETE
TO anon, authenticated
USING (false);