ALTER TABLE profiles
ADD COLUMN cv_url TEXT,
ADD COLUMN linkedin_url TEXT,
ADD COLUMN github_url TEXT,
ADD COLUMN twitter_url TEXT;

-- NOTE: After running migrations, you might need to create a "cvs" bucket in Supabase Storage and set it to public.
-- You can do this in your Supabase project dashboard under Storage > Buckets.
--
-- Example SQL to create a public bucket (run in Supabase SQL Editor):
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('cvs', 'cvs', true);
--
-- And set policies for access:
-- CREATE POLICY "Public cvs are publicly accessible."
-- ON storage.objects FOR SELECT
-- USING ( bucket_id = 'cvs' );
--
-- CREATE POLICY "Anyone can upload a cv."
-- ON storage.objects FOR INSERT
-- WITH CHECK ( bucket_id = 'cvs' );
--
-- CREATE POLICY "Anyone can update their own cv."
-- ON storage.objects FOR UPDATE
-- USING ( auth.uid() = owner )
-- WITH CHECK ( bucket_id = 'cvs' );
--
-- CREATE POLICY "Anyone can delete their own cv."
-- ON storage.objects FOR DELETE
-- USING ( auth.uid() = owner );
