# Active Roadmap: Milestone v3.0 (Public Pages & Detail Experiences)

## Phase 01: Projeler Sayfası Revize ve Detay Modalı
**Status:** Completed
**Goal:** /projects sayfasının premium, refero-grounded browser-viewport kartlarıyla yeniden tasarlanması ve projeye tıklandığında erişilebilir, kapanma tuşuna (X/Esc/backdrop) sahip detay modalının açılması. URL (?p=) senkronu ile paylaşılabilir + geri tuşu kapatır.
**Requirements:** [REQ-PUB-01, REQ-PUB-02, REQ-PUB-03]
**Plans:**
- [x] 01-01-PLAN.md — Projeler Sayfası Revizyonu + Erişilebilir Detay Modalı

## Phase 02: Blog / Yazı Detay Deneyimi (Upcoming)
**Status:** Upcoming
**Goal:** Blog yazıları için detay okuma deneyimi (modal veya route) ve liste sayfası polish'i.

## Phase 03: Final Polish & Performans (Upcoming)
**Status:** Upcoming
**Goal:** Tüm public alt-sayfalar için son görsel tutarlılık, performans ve E2E doğrulama; milestone audit.


## Phase 04: i18n & English Localization (Uçtan Uca Çift Dilli Destek)
**Status:** Upcoming (Plan Ready)
**Goal:** Portfolyoyu uçtan uca TR/EN çift dilli yapmak — statik UI stringleri + dinamik Supabase içeriği + metadata/SEO. URL tabanlı locale routing (`/tr`, `/en`) + çift dilli `_en` DB kolonları.
**Requirements:** [REQ-PUB-04]
**Plans:**
- [ ] 04-01-PLAN.md — i18n Altyapısı & Routing (next-intl, [locale] taşıma, middleware)
- [ ] 04-02-PLAN.md — Statik UI Stringlerinin Çevirisi + Locale Switcher
- [ ] 04-03-PLAN.md — Dinamik DB Çift Dilli Destek (_en kolonları + admin EN alanları)
- [ ] 04-04-PLAN.md — E2E Doğrulama, Build & UAT
