# Phase 05 SPEC: PageSpeed 100 / Core Web Vitals Mükemmelleştirme

> **Hedef:** Google PageSpeed Insights — **Mobil VE Masaüstü** için dört kategoride de **100/100**:
> Performans · Erişilebilirlik · En İyi Uygulamalar · SEO.

**Milestone:** v3.0 (Public Pages & Detail Experiences)
**Durum:** Active (Plan)
**Gereksinim Kaynağı:** Kullanıcı kararı — "tüm PageSpeed değerlerinden 100, özellikle performans mobilede ve webte 100"

---

## 0. Kapsam & Prensip

Bu phase **tamamen** Lighthouse/PageSpeed optimizasyonuna ayrılmıştır. Görsel dil (glassmorphism + Champagne Gold + Space Grotesk/Inter) ve mevcut fonksiyonalite **korunur**; yalnıza render yolu, asset teslimatı, bundle boyutu, SEO metaverisi ve erişilebilirlik iyileştirilir. "Premium görünüm → 100 performans" çelişkisini mühendislikle çözeriz: ağır efektleri CSS/SVG ileştir, shader'ı kaldır, font'u self-host et, görselleri AVIF/WebP'ye dönüştür, SSR'i ISR'a çek.

### Hedef Metrikler (Lighthouse — her iki form faktörü)
| Kategori | Hedef | Önemli alt-metrik |
| :--- | :---: | :--- |
| Performance | 100 | LCP < 1.2s, TBT < 0s, CLS < 0.05, FCP < 0.9s |
| Accessibility | 100 | Tüm denetimler pass (kontrast, label, aria, lang) |
| Best Practices | 100 | HTTPS, CSP, HSTS, console errors yok, güncel kütüphaneler |
| SEO | 100 | meta, canonical, hreflang, sitemap, robots, yapılandırılmış veri |

---

## 1. Mevcut Durum Denetimi (Audit Findings)

### 🔴 Kritik Performans Blokları
| # | Bulgu | Dosya | Etki |
| :-- | :--- | :--- | :--- |
| P1 | Render-blocking Material Symbols font `@import` (Google Fonts CDN) | `src/app/globals.css:1` | Harici istek, render-blok, ~200KB+ font |
| P2 | `unoptimized` tüm `next/image`'larda | `HeroSection.tsx`, `app/page.tsx`, `bento-grid.tsx`, `ProjectDetailModal.tsx`, `ProjectShowcaseCard.tsx` | WebP/AVIF/responsive yok → mobil LCP |
| P3 | `force-dynamic` (her istekte SSR + 4 Supabase) | `src/app/page.tsx:13` | Yüksek TTFB, önbellek yok |
| P4 | WebGL mesh-gradient shader (client init) | `HeroSection.tsx` + `@paper-design/shaders-react` | Main thread blok, LCP/TBT, ekstra JS |
| P5 | Yinelenen animasyon: `framer-motion` + `motion` | `package.json`, `magic-card.tsx` | Bundle yinelenmesi |
| P6 | 3 ikon kütüphanesi + MS web font | `lucide-react`, `@heroicons/react`, `@radix-ui/react-icons` | Fazla JS/font ağırlığı |
| P7 | `backdrop-filter: blur(24px)` her `.glass-panel` | `globals.css` | Ağır GPU compositing |
| P8 | `@import "tw-animate-css"` ekstra CSS | `globals.css:2` | CSS şişirmesi |

### 🟡 SEO Eksikleri
S1 `sitemap.ts` yok · S2 `robots.ts` yok · S3 `manifest.ts` yok · S4 `public/` yok (favicon/og-image yok) · S5 metadata minimal (openGraph/twitter/canonical yok) · S6 `<html lang="en">` ama içerik Türkçe · S7 JSON-LD yapılandırılmış veri yok.

### 🟢 Erişilebilirlik Eksikleri
A1 ikon-butonlarda `aria-label` yok · A2 form inputları placeholder-only label · A3 düşük kontrastlı gri metinler (`variant/80`, mono `[9px]`) · A4 `prefers-reduced-motion` saygısı yok.

### 🔵 En İyi Uygulamalar Eksikleri
B1 `Content-Security-Policy` yok · B2 `Strict-Transport-Security` yok · B3 statik asset cache-control optimize değil.

---

## 2. Gereksinimler (Requirements)

### REQ-PERF-01: Render Yolu & Font Optimizasyonu
- Material Symbols web font `@import`'u kaldırılacak; ikonlar inline SVG'ye (lucide-react) veya self-host subset fonta taşınacak. **Render-blok harici CSS isteği sıfır olacak.**
- `next/font` (Inter + Space Grotesk) `display: "swap"` ve `preload: true` ile yüklenecek.
- Kullanılmayan CSS `@import`'lar (tw-animate-css vb.) değerlendirilecek.

### REQ-PERF-02: Görsel Optimizasyonu
- Tüm `next/image` kullanımlarından `unoptimized` kaldırılacak → AVIF/WebP, responsive `sizes`, lazy-load, blur placeholder.
- LCP görsellerine (hero portresi) `priority` + `sizes`. CLS için ölçülü container/aspect.

### REQ-PERF-03: Render Stratejisi (SSR → ISR/Static)
- `force-dynamic` kaldırılacak; homepage `revalidate` (ISR, 300s) ile önbelleklenecek.
- Supabase çağrıları `next: { revalidate }` ile cache'lenecek.

### REQ-PERF-04: Ağır İstemci Bağımlılıklarını Kaldır / Değiştir
- `@paper-design/shaders-react` WebGL mesh gradient → saf CSS conic/radial-gradient + SVG (görsel dil korunarak). Hero `StaticMeshGradient` kaldırılacak.
- `framer-motion`/`motion` yinelenmesi giderilecek; kullanılmayan paket kaldırılacak.
- İkon kütüphaneleri tekelleştirilecek (lucide-react tercih). `backdrop-filter` mobil için hafifletilecek.

### REQ-SEO-01: Metaveri & Sosyal
- `metadataBase`, `openGraph`, `twitter`, `alternates.canonical`, `robots`, `authors`, `keywords` ile zengin `Metadata`. Tüm public sayfalar için sayfa-bazı metadata. `<html lang="tr">`.

### REQ-SEO-02: Tarama Altyapısı
- `src/app/sitemap.ts` (tüm public rotalar) · `src/app/robots.ts` (allow /, disallow /admin + /login, sitemap ref) · `src/app/manifest.ts` (PWA) · JSON-LD `Person`/`WebSite`.

### REQ-SEO-03: Public Varlıklar
- `public/` klasörü: favicon.ico, apple-touch-icon, og-image (1200x630), manifest ikonları (192/512).

### REQ-A11Y-01: Erişilebilirlik
- Tüm ikon-butonlara `aria-label`. Form inputları `<label htmlFor>`. Kontrast ≥ 4.5:1. `prefers-reduced-motion` CSS. Skip-to-content + landmark rolleri.

### REQ-BP-01: Güvenlik & Önbellek Header'ları
- `Content-Security-Policy` + `Strict-Transport-Security`. Statik varlıklar `Cache-Control: public, max-age=31536000, immutable`.

---

## 3. Strateji & Sıralama (Etki × Çaba)

Yüksek etki / düşük çaba öncelikli:
1. **Font (P1)** — render-blok kaldırma → en büyük FCP/LCP kazancı.
2. **Görsel (P2)** — `unoptimized` kaldırma → mobil LCP kazancı.
3. **SSR→ISR (P3)** — TTFB kazancı.
4. **Mesh gradient → CSS (P4)** — TBT + bundle kazancı.
5. **SEO infra (S1-S7)** — SEO 100 için zorunlu.
6. **A11y (A1-A4)** — Accessibility 100 için.
7. **Header'lar (B1-B3)** — Best Practices 100 için.
8. **Bundle dedup (P5-P6)** — TBT azalma.

---

## 4. Kabul Kriterleri (Done)

- [ ] Lighthouse Mobil: Performance=100, Accessibility=100, Best Practices=100, SEO=100
- [ ] Lighthouse Masaüstü: 4 kategori 100
- [ ] `npm run build` başarılı (0 hata), `npm run lint` temiz
- [ ] Render-blok harici CSS isteği yok (CSS `@import` kaldırıldı)
- [ ] `unoptimized` prop'u koddan tamamen kaldırıldı
- [ ] `force-dynamic` kaldırıldı, ISR/önbellek aktif
- [ ] `sitemap.ts`, `robots.ts`, `manifest.ts` mevcut ve geçerli
- [ ] Zengin metadata (openGraph/twitter/canonical/metadataBase) tüm public sayfalarda
- [ ] Tüm ikon-butonlarda `aria-label`, formlarda `<label>`
- [ ] CSP + HSTS header'ları aktif
- [ ] Görsel dil (glassmorphism/Champagne Gold/typography) korunmuş

---

## 5. Referanslar
- Lighthouse scoring: https://developer.chrome.com/docs/lighthouse/performance/performance-scoring
- Next.js Image: https://nextjs.org/docs/app/api-reference/components/image
- Next.js Metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Core Web Vitals: https://web.dev/articles/vitals
- Material Symbols self-host: https://developers.google.com/fonts/docs/material_symbols