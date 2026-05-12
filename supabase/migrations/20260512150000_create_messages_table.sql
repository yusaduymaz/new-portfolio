-- İletişim mesajları tablosunu oluştur
CREATE TABLE public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS'yi aktif et
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Herkes (anonim ziyaretçiler) yeni mesaj gönderebilir
CREATE POLICY "Anyone can insert messages"
  ON public.messages FOR INSERT
  WITH CHECK ( true );

-- Sadece giriş yapmış yetkili kullanıcılar mesajları görebilir, güncelleyebilir ve silebilir
CREATE POLICY "Authenticated users can view messages"
  ON public.messages FOR SELECT
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update messages"
  ON public.messages FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete messages"
  ON public.messages FOR DELETE
  USING ( auth.role() = 'authenticated' );
