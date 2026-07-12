# Phase Specification: i18n & English Localization (Phase 04 — v3.0)

## 0. Refero-First Grounding (Zorunlu — GSD-ARCHITECTURE.md §2)

> **Şeffaflık notu:** Bu ajanın çalışma zamanı toolsetinde canlı Refero MCP araçları (`refero_search_styles`, `refero_search_screens`) mevcut değildi. Refero skill metodolojisinin "designs and validates with evidence" kuralına uyularak grounding, aşağıdaki gerçek örnek/kaynak kalıplarıyla yapıldı. Her görsel karar bir real-product kuralına veya craft kuralına izlenebilir.

### Referans Kaynaklar
1. **Linear (Refero "best-designed" seti)** — account/locale settings: in-app language switcher, subtle segmented control, aktif segment accent vurgusu. → Locale Switcher (TR/EN) segmented toggle görsel kararı buradan ground edildi. (https://linear.app)
2. **Mevcut v2.0 Refero-hizalı sistem** (v2.0 Phase 01-02 SPEC'lerinde Refero ile kilitlendi) — DESIGN.md + globals.css `.glass-panel`/`.btn-primary`/`.btn-secondary` + Champagne Gold `#C5A059`/`#775a19` + Space Grotesk/Inter + underline hover. → Locale Switcher görsel dili birebir buradan miras alır; yeni görsel dil tanıtılmaz.
3. **Craft kuralları (refero skill rehberleri)** — anti-AI-slop (gradient restraint, hairline borders), motion (cubic-bezier(0.16,1,0.3,1), 0.25–0.5s), typography (Space Grotesk başlık + Inter gövde).

---

## 1. Hedef & Kapsam
Portfolyoyu uçtan uca çift dilli (Türkçe + İngilizce) hâle getirmek. Statik UI stringleri + dinamik Supabase içeriği + metadata/SEO'nun tamamı, kullanıcı bir dil geçiş toggle'ı ile TR/EN arasında sorunsuz değişebilmeli.

**Kullanıcı Kararı (Discuss Phase): Seçenek A** — URL tabanlı locale routing (`/tr`, `/en`) + Supabase çift dilli `_en` kolonları. Tam SEO (hreflang, canonical), uçtan uca EN.

**Kapsam Dışı:** `admin/*` ve `login` rotaları tek dilli kalır (locale segmentine taşınmaz); admin formlarına EN içerik girişi için alanlar eklenir (Plan 04-03).

## 2. i18n Kütüphanesi: next-intl
- App Router'a native `[locale]` desteği; server + client çeviri.
- Mevcut `"use client"` bileşenlerle (Header, HeroSection, ExpertiseBento, ContactForm, v3.0 ProjectsExplorer/ProjectShowcaseCard/ProjectDetailModal) tam uyumlu.
- Supabase auth `middleware.ts` ile `createMiddleware` tek `matcher`'da birleştirilir (admin/login auth akışı korunur).

## 3. Routing Mimarisi
```
src/app/
├── [locale]/
│   ├── layout.tsx        # html lang, NextIntlClientProvider, fontlar
│   ├── page.tsx          # home
│   ├── expertise/page.tsx
│   ├── projects/page.tsx
│   ├── certificates/page.tsx
│   └── contact/page.tsx
├── admin/...             # tek dilli, locale segment dışı
├── login/page.tsx        # tek dilli
└── auth/callback/...     # tek dilli
```
- `src/i18n/routing.ts`: `locales: ['tr','en']`, `defaultLocale: 'tr'`, `localePrefix: 'as-needed'` (kök `/` = tr, `/en` = en).
- `src/i18n/request.ts`: server `getRequestConfig` (`src/messages/{locale}.json`).
- `src/middleware.ts`: next-intl `createMiddleware` + mevcut Supabase auth redirect tek `matcher`'da.
- Linkler: `next-intl` `Link`/`usePathname` ile locale-aware.
- `generateStaticParams`: `[{locale:'tr'},{locale:'en'}]`.

## 4. Çeviri Dosya Yapısı
`src/messages/{tr,en}.json` — kategoriler: `nav`, `hero`, `about`, `expertise`, `projects`, `certificates`, `contact`, `footer`, `form`, `common`, `meta`. Server `getTranslations()`, client `useTranslations()`.

## 5. Dinamik DB Çift Dilli Stratejisi (`_en` nullable kolonlar)
- `profiles`(title_en,description_en), `about`(title_en,description_en), `projects`(title_en,description_en,category_en), `expertise`(title_en,description_en), `certificates`(title_en,details_en), `education`(title_en,description_en), `experience`(title_en,description_en).
- `src/lib/supabase/localized.ts`: `localizedSelect(locale, baseCol, enCol)` → `coalesce(<en>, <base>)` (EN boşsa TR fallback → graceful).
- Public sorgular locale-aware; admin formlarına EN alanları.

## 6. Locale Switcher (UI)
Header kapsülüne premium glass segmented toggle: TR | EN. §0'daki Linear pattern + mevcut glass/gold sistem. `useLocale()` + `useRouter().replace(pathname,{locale})`. Aktif dil altın vurgu; mobil menüde de görünür.

## 7. SEO & Metadata
`[locale]/layout.tsx` `generateMetadata({params:{locale}})`: locale'a göre title/description; `alternates.languages` hreflang; `<html lang={locale}>`.

## 8. Kabul Kriterleri (Done)
- Hard-coded TR UI string kalmadı (grep denetimi).
- `/tr` ve `/en` tüm public rotalarda eksiksiz.
- `<html lang>` + hreflang canonical doğru.
- EN DB içeriği boşsa graceful TR fallback, hata yok.
- `npm run build` + lint temiz.
- Header/mobil toggle TR↔EN çalışıyor; URL kalıcı.
