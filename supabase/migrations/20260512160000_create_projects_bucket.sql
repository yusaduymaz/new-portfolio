-- Create the projects bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Everyone can view project images
CREATE POLICY "Public Access to project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');

-- Policy: Authenticated users can upload project images
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');

-- Policy: Authenticated users can update project images
CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

-- Policy: Authenticated users can delete project images
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'projects' AND auth.role() = 'authenticated');
