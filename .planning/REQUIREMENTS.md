# Active Requirements: Milestone v3.0 (Public Pages & Detail Experiences)

## Goal
v2.0'da kurulan premium landing-page tasarım dilini, public alt-sayfalara ve detay/overlay deneyimlerine taşıyarak genişletmek. İlk odak: /projects sayfası revizyonu + proje detay modalı. Tüm görsel kararlar Refero/Linear referanslarına ve mevcut glassmorphism + Champagne Gold sistemine dayalı olmalı (AI slop yok).

## Functional & Aesthetic Requirements

### REQ-PUB-01: Projects Page Revision
- /projects grid'i, anasayfadaki browser-viewport kart diliyle premium seviyeye yükseltilmeli (macOS chrome header + screenshot frame + details panel).
- Kartlar tam-yüzey tıklanabilir olmalı (button semantiği, klavye Enter/Space ile açılır) ve net "Detayları Gör" affordance'ı içermeli; iç içe interaktif eleman (nested button>a) hatası oluşturmamalı.
- Boş DB durumu zarif bir empty-state ile ele alınmalı.

### REQ-PUB-02: Project Detail Modal
- Projeye tıklandığında erişilebilir bir modal/pencere açılmalı; 3 yolla kapanabilmeli: sağ-üst X tuşu, Escape, backdrop tıkı.
- Modal içeriği: browser-chrome header, hero görsel, kategori + tarih, başlık, kısa açıklama, full `content` (paragraflara bölünmüş), teknoloji chip'leri ve GitHub/Canlı Demo aksiyonları.
- Erişilebilirlik: focus trap, body scroll lock, kapatınca önceki focus'a dönüş; framer-motion ile yumuşak enter/exit.
- URL senkronu (?p=<id>): paylaşılabilir link ve tarayıcı geri tuşu modalı kapatır (sayfadan ayrılmadan).

### REQ-PUB-03: Design Alignment
- Tüm görsel kararlar mevcut glassmorphism + Champagne Gold sistemine (DESIGN.md, globals.css `.glass-panel`/`.btn-primary`/`.btn-secondary`) ve Refero/Linear referanslarına dayanmalı.
- Motion: cubic-bezier(0.16,1,0.3,1), 0.25–0.5s; typography: Space Grotesk başlık + Inter gövde; renk: HSL-tailored Champagne Gold (#775a19/#C5A059) + slate chrome (#0b0d10).


### REQ-PUB-04: End-to-End English Localization (i18n) — Phase 04
- Add full bilingual (TR/EN) support across the entire public portfolio: static UI strings, dynamic Supabase content, and SEO metadata.
- Implement URL-based locale routing (`/tr`, `/en`) via `next-intl`; default locale Turkish, root `/` resolves to TR.
- Merge next-intl locale middleware with the existing Supabase auth middleware (admin/login auth flow preserved).
- Provide a premium locale switcher (TR/EN) in the header reusing the locked glassmorphic + Champagne Gold design tokens (Refero/v2.0 system); no new visual language.
- Translate ALL hard-coded Turkish UI strings (nav, hero, about, expertise, projects, certificates, contact, footer, form, metadata) into `tr.json`/`en.json` with zero hardcoded TR strings remaining.
- Make dynamic DB content bilingual via nullable `_en` columns (profiles, about, projects, expertise, certificates, education, experience) with a `coalesce(<en>, <base>)` fallback so empty EN gracefully shows TR.
- Extend admin forms with EN input fields so English content is manageable.
- Ensure correct `<html lang>`, hreflang canonical alternates, and locale-aware `generateMetadata` for SEO.
