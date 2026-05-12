-- CV'ler için storage bucket oluştur
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', true)
ON CONFLICT (id) DO NOTHING;

-- Olası eski/kısıtlayıcı policy'leri temizle
DROP POLICY IF EXISTS "Public cvs are publicly accessible." ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload a cv." ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update their own cv." ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete their own cv." ON storage.objects;
DROP POLICY IF EXISTS "CVs are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload cvs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update cvs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete cvs" ON storage.objects;

-- Herkes CV dosyasını görüntüleyebilir/indirebilir
CREATE POLICY "CVs are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'cvs');

-- Giriş yapmış kullanıcılar CV yükleyebilir
CREATE POLICY "Authenticated users can upload cvs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'cvs' AND auth.role() = 'authenticated');

-- Giriş yapmış kullanıcılar CV güncelleyebilir
CREATE POLICY "Authenticated users can update cvs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'cvs' AND auth.role() = 'authenticated');

-- Giriş yapmış kullanıcılar CV silebilir
CREATE POLICY "Authenticated users can delete cvs"
ON storage.objects FOR DELETE
USING (bucket_id = 'cvs' AND auth.role() = 'authenticated');
