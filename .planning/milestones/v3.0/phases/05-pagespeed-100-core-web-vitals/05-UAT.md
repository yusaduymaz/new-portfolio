# Phase 05 UAT: PageSpeed 100 — Son Kullanıcı Kabul Testi

> Lighthouse skorlarının gerçek tarayıcı + cihaz davranışıyla uyumu. Mobil + masaüstü.

## U1: Mobil Performans (Gerçek Cihaz / Moto G Power simülasyonu)
- [ ] Lighthouse Mobil — home: Performance 100, A11y 100, BP 100, SEO 100
- [ ] Lighthouse Mobil — /projects: 4 kategori 100
- [ ] Lighthouse Mobil — /contact: 4 kategori 100
- [ ] LCP görseli (hero portresi) hızlı yüklenir (WebP/AVIF)
- [ ] Kaydırma akıcı (60fps), glass-panel blur mobilde akıcı
- [ ] İlk yüklemede dev font/şeritlenme (FOUT) yok

## U2: Masaüstü Performans
- [ ] Lighthouse Desktop — home: 4 kategori 100
- [ ] Lighthouse Desktop — /projects: 4 kategori 100
- [ ] Lighthouse Desktop — /contact: 4 kategori 100

## U3: SEO Tarama
- [ ] `/sitemap.xml` tüm public rotaları listeler
- [ ] `/robots.txt` `/admin`, `/login`, `/auth` disallow, sitemap referansı
- [ ] Google Rich Results Test — JSON-LD `Person`/`WebSite` geçerli
- [ ] Sosyal paylaşım (og:image) önizlemesi doğru
- [ ] `<html lang="tr">` ve canonical her sayfada

## U4: Erişilebilirlik
- [ ] Ekran okuyucu (NVDA/VoiceOver) ikon-butonları okur
- [ ] Tab ile tüm interaktif elementler ulaşılır, görünen focus
- [ ] Form hataları bildirilir, label ilişkili
- [ ] Yüksek kontrast modunda içerik okunaklı

## U5: Regresyon — Görsel Dil Korunmuş
- [ ] Glassmorphism + Champagne Gold + Space Grotesk/Inter korunmuş
- [ ] Hero arka planı (CSS gradient) premium Sunset tonu verir
- [ ] Admin panel çalışıyor (CRUD, auth)
- [ ] Tüm navigasyon çalışıyor

## Kabul
Tüm maddeler işaretli → Phase 05 tamamlandı, SUMMARY yazılır.
