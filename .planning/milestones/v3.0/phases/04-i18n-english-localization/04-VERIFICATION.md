# Verification: Phase 04 — i18n & English Localization (v3.0)

Bu dosya, fazın doğrulama döngülerini tanımlar. Her görev sonrası ilgili kutucuk işaretlenir.

## V1: Altyapı & Build (04-01 sonrası)
- [ ] `next-intl` kuruldu ve import edilebilir.
- [ ] `/` → `/tr`; `/en` render oluyor.
- [ ] Admin/login auth redirect korundu (middleware birleşik).
- [ ] `<html lang>` locale'a göre değişiyor.
- [ ] `npm run build` temiz.

## V2: Statik UI Çevirisi (04-02 sonrası)
- [ ] `grep` TR sabit string tarama → yalnız DB dinamik metin kalmalı.
- [ ] Toggle TR↔EN tüm UI stringleri anında değiştiriyor.
- [ ] `/en` %100 EN UI; `/tr` %100 TR UI.
- [ ] `generateMetadata` locale'a göre title/description.

## V3: Dinamik DB Çift Dilli (04-03 sonrası)
- [ ] `_en` migration uygulandı; RLS bozulmadı.
- [ ] EN dolu kayıtlar `/en`'de EN; boşsa TR fallback.
- [ ] Admin EN alanları düzenlenebilir + kaydedilir.
- [ ] TS tipleri güncellendi, derleme hatasız.

## V4: Final E2E (04-04 sonrası)
- [ ] Build + lint yeşil.
- [ ] Tüm public rotalar TR/EN eksiksiz.
- [ ] hreflang/canonical doğru.
- [ ] Mobil + desktop toggle çalışıyor.
- [ ] Premium görsel bütünlük korundu.
