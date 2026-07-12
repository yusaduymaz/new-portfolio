# Phase UAT: Projeler Sayfası Revize ve Detay Modalı (Phase 01 — v3.0)

Manual, browser-based acceptance test. Run `npm run dev` and open http://localhost:3000/projects.

## Scenario 1: Listing
- [ ] `/projects` premium browser-chrome viewport kartlar render olur (macOS dotları + mono kategori + screenshot + details).
- [ ] Kart dili anasayfa proje kartlarıyla tutarlı.
- [ ] Boş DB (proj yok) zarif glass empty-state (`folder_open`) gösterir.
- [ ] Kartlar scroll'da fade-up (staggered); responsive: mobile 1-col, desktop 2-col.

## Scenario 2: Detay Modalı Aç
- [ ] Karta tıklayınca modal overlay açılır (backdrop blur + panel scale-in).
- [ ] Modal: chrome header (`kategori.html`), hero görsel, kategori pill, tarih, başlık, açıklama, full `content` paragrafları, teknoloji chip'leri, GitHub + Canlı Demo butonları gösterir.
- [ ] Kart üzerinde "Detayları Gör" affordance görünür.

## Scenario 3: Modal Kapat (3 yol)
- [ ] Sağ-üst X tuşu kapatır.
- [ ] Escape kapatır.
- [ ] Backdrop tıkı kapatır.

## Scenario 4: Erişilebilirlik
- [ ] Tab kartlar arasında döner; Enter/Space modal açar.
- [ ] Modal içinde Tab yalnızca modal içinde döner (focus trap); Shift+Tab tersine.
- [ ] Kapatınca focus tıklanan karta döner.
- [ ] Modal açıkken body scroll kilitli.
- [ ] Ekran okuyucu dialog olarak duyurur (role=dialog, aria-modal).

## Scenario 5: Deep-link & Geri Tuşu
- [ ] Kart açınca URL `/projects?p=<id>` olur (paylaşılabilir).
- [ ] Bu URL yeniden yüklenince aynı projenin modalı açık gelir.
- [ ] Tarayıcı Geri tuşu modalı kapatır (`/projects`'e döner, sayfadan ayrılmaz).
- [ ] Direkt-link sonra kapat: `?p`'yi sayfadan ayrılmadan temizler.

## Scenario 6: Robustness
- [ ] `image_url` null olan proje placeholder icon gösterir (kart + modal).
- [ ] `content` null olan proje yalnız açıklama gösterir.
- [ ] `technologies` null ise chip bölümü gizli.

## Result
- [ ] Tüm senaryolar geçer → Phase 01 UAT PASSED.