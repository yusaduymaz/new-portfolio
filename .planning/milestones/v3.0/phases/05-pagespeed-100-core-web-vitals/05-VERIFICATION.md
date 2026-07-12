# Phase 05 VERIFICATION: PageSpeed 100 / Core Web Vitals

> Lighthouse temel denetimleri — mobil + masaüstü. Her kategori 100 hedefli.

## V0: Build & Lint (Pre)
- [ ] `npm run lint` → 0 hata, 0 uyarı
- [ ] `npm run build` → başarılı, 0 error
- [ ] `package.json`'da `@paper-design/*`, `motion`/`framer-motion` yinelenmesi yok
- [ ] `grep -r "unoptimized" src/` boş
- [ ] `grep -r "force-dynamic" src/app/page.tsx` boş
- [ ] `grep -r "@import url" src/app/globals.css` boş (harici font yok)
- [ ] `grep -r "@paper-design" src/` boş

## V1: Performance (100)
- [ ] Lighthouse Mobil Performance = 100
- [ ] Lighthouse Masaüstü Performance = 100
- [ ] LCP < 1.2s (mobil), < 0.9s (masaüstü)
- [ ] TBT < 0s
- [ ] CLS < 0.05
- [ ] FCP < 0.9s
- [ ] Render-blok kaynak yok (elimine edildi)
- [ ] Ana thread uzun görev (long task) yok

## V2: Accessibility (100)
- [ ] Lighthouse Accessibility = 100
- [ ] Tüm ikon-butonlarda `aria-label`
- [ ] Tüm form inputlarında `<label htmlFor>`
- [ ] Renk kontrastı ≥ 4.5:1 (normal metin), ≥ 3:1 (büyük metin)
- [ ] `<html lang="tr">` doğru
- [ ] Skip-to-content linki çalışıyor
- [ ] Tüm interaktif elementler klavye ile erişilebilir
- [ ] `prefers-reduced-motion` animasyonları devre dışı bırakıyor

## V3: Best Practices (100)
- [ ] Lighthouse Best Practices = 100
- [ ] HTTPS geçerli (lokalde bypass)
- [ ] `Content-Security-Policy` header set
- [ ] `Strict-Transport-Security` header set
- [ ] Console error/warning yok
- [ ] Güncel kütüphaneler (no deprecated API)

## V4: SEO (100)
- [ ] Lighthouse SEO = 100
- [ ] `<meta name="description">` mevcut
- [ ] `<link rel="canonical">` mevcut
- [ ] openGraph + twitter kart etiketleri mevcut
- [ ] `<html lang>` doğru
- [ ] `robots.txt` geçerli ve `/admin` disallow
- [ ] `sitemap.xml` geçerli, tüm public rotalar
- [ ] Tüm linkler `href` dolu, `rel="noopener"` harici
- [ ] Font boyutu okunaklı (≥ 16px gövde)

## V5: Görsel Koruma (Regresyon)
- [ ] Glassmorphism (`.glass-panel`) görünür
- [ ] Champagne Gold (#C5A059/#775a19) vurguları korunmuş
- [ ] Space Grotesk başlık + Inter gövde korunmuş
- [ ] Hero premium tonu korunmuş (CSS gradient ile)
