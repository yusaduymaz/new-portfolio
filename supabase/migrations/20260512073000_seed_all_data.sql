-- ============================================================
-- SEED DATA: Tüm portfolyo içerikleri
-- ============================================================

-- ===================== EXPERTISE ============================

-- Full Stack Developer kategorisi
INSERT INTO public.expertise (title, description, icon, category) VALUES
(
  'Modern Frontend',
  'React.js ile modüler (Component-Based) mimari ve ES6+ JavaScript standartlarına uygun kodlama.',
  'code',
  'Full-stack Development'
),
(
  'Kurumsal Backend',
  'ASP.NET Core ile Dependency Injection ve Middleware yapılarında ölçeklenebilir RESTful Web API mimarileri.',
  'dns',
  'Full-stack Development'
),
(
  'Veritabanı & ORM',
  'PostgreSQL veya MSSQL üzerinde Entity Framework Core ile Code-First yaklaşımı.',
  'database',
  'Full-stack Development'
),
(
  'Güvenlik',
  'ASP.NET Core Identity ve JWT entegrasyonu ile Claims-tabanlı kimlik doğrulama.',
  'security',
  'Full-stack Development'
),
(
  'Mühendislik Standartları',
  'OOP, SOLID prensipleri ve Agile/Scrum metodolojileri ile test edilebilir, temiz kod üretimi.',
  'engineering',
  'Full-stack Development'
);

-- Data Science & AI Engineer kategorisi
INSERT INTO public.expertise (title, description, icon, category) VALUES
(
  'Veri Analizi',
  'Python (Pandas, NumPy) ile karmaşık veri setlerini temizleme, işleme ve istatistiksel analiz.',
  'data_exploration',
  'Data Science'
),
(
  'Veri Görselleştirme',
  'SQL ve Excel ile veri işleme, Power BI ile dinamik raporlar ve Dashboard oluşturma.',
  'insights',
  'Data Science'
),
(
  'Veritabanı & Big Data',
  'İleri seviye SQL sorgulama ve Google BigQuery ile büyük veri ambarı yönetimi.',
  'query_stats',
  'Data Science'
),
(
  'Makine Öğrenmesi (ML)',
  'Scikit-learn ve TensorFlow ile ML modelleri geliştirme.',
  'model_training',
  'Data Science'
),
(
  'Derin Öğrenme & LLM',
  'LLM ve RAG mimarileri ile akıllı çözümler üretme.',
  'psychology',
  'Data Science'
),
(
  'MLOps & Deployment',
  'Model deployment ve CI/CD süreçleri yönetimi.',
  'cloud_upload',
  'Data Science'
);

-- =================== CERTIFICATES ===========================

INSERT INTO public.certificates (title, organization, issue_date) VALUES
('İleri Seviye Python', 'BTK Akademi', 'Aralık 2024'),
('FullStack Web Geliştirme Kursu', 'Udemy', 'Kasım 2024'),
('İleri Seviye SQL Veritabanı Yönetimi', 'Coursera', 'Ekim 2024'),
('İleri Seviye C# Programlama', 'Udemy', 'Ekim 2025'),
('Adım Adım Katmanlı Mimari ve EF Core', 'Udemy', 'Kasım 2025'),
('TensorFlow ve Veri Bilimi', 'BTK Akademi', 'Aralık 2025'),
('Makine Öğrenmesi', 'BTK Akademi', 'Aralık 2025');

-- ==================== PROJECTS ==============================

INSERT INTO public.projects (title, description, category, technologies) VALUES
(
  'E-Commerce Data Analysis',
  'E-ticaret verileri üzerinde Python ile kapsamlı veri analizi ve görselleştirme projesi.',
  'VERİ BİLİMİ',
  ARRAY['Python', 'Pandas', 'Matplotlib', 'Seaborn']
),
(
  'MYD Digital — Multi-Tenant SaaS',
  'Çoklu kiracı mimarisine sahip modern SaaS dijital ajans platformu.',
  'WEB TASARIM',
  ARRAY['Next.js 14', 'TypeScript', 'Supabase', 'Clerk', 'Tailwind']
),
(
  'OmnixEngine — B2B SaaS',
  'İşletmeler arası ölçeklenebilir SaaS motor platformu.',
  'WEB TASARIM',
  ARRAY['Next.js 14 App Router', 'TypeScript', 'Supabase', 'Clerk', 'Tailwind', 'Zustand', 'Zod']
),
(
  'NotikalIdentityEmail',
  'Kimlik doğrulama ve AI destekli e-posta sistemi.',
  'API',
  ARRAY['ASP.NET Core Identity', 'JWT', 'Hugging Face AI']
),
(
  'E-Ticaret Platformu',
  'Full-stack e-ticaret web uygulaması.',
  'E-TİCARET',
  ARRAY['React', '.NET Core', 'MSSQL', 'HTML', 'CSS', 'JavaScript']
),
(
  'Dynamic CV Website',
  'Dinamik içerik yönetimli kişisel CV web sitesi.',
  'WEB TASARIM',
  ARRAY['.NET Core', 'Bootstrap', 'MSSQL', 'HTML5', 'CSS', 'JavaScript']
);
