-- Drop the existing restrictive select policy
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;

-- Allow everyone to view profiles so the landing page can display data to anonymous visitors
CREATE POLICY "Everyone can view profiles" 
  ON public.profiles FOR SELECT 
  USING ( true );

-- Allow authenticated users to insert their own profile record
CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT 
  WITH CHECK ( auth.uid() = id );

-- Ensure update policy is correctly configured
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile." 
  ON public.profiles FOR UPDATE 
  USING ( auth.uid() = id );
