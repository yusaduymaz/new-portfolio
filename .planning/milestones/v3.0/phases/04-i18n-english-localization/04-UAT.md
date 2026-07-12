# E2E UAT: Phase 04 — i18n & English Localization (v3.0)

Aşağıdaki senaryolar her iki locale (TR/EN) için elle yürütülür. Pass/Fail notu düşülür.

## U1: Dil Geçişi
- [ ] Header toggle'da TR→EN tıklanınca URL `/tr`→`/en` ve tüm metin EN.
- [ ] EN→TR tıklanınca geri TR.
- [ ] Sayfa yenileme dili korur (URL kalıcı).
- [ ] Mobil menüde toggle çalışıyor.

## U2: Tüm Rotalar (her dil)
- [ ] `/` (home): hero, about, expertise, projects, contact bölümleri dilde.
- [ ] `/expertise`: başlık, boş durum, eğitim/deneyim.
- [ ] `/projects`: başlık, kartlar, detay modalı, boş durum, "Canlı Demo"/"Kullanılan Teknolojiler"/"Detayları Gör".
- [ ] `/certificates`: başlık, kartlar, "Sertifikayı Gör".
- [ ] `/contact`: başlık, info kartı, form label/placeholder, submit butonu, toast mesajı.

## U3: Dinamik İçerik
- [ ] EN'si dolu proje/about `/en`'de İngilizce.
- [ ] EN boş kayıt `/en`'de TR fallback (hata yok).
- [ ] Admin'den EN alanı düzenlenip kaydediliyor.

## U4: SEO
- [ ] `<html lang>` doğru.
- [ ] hreflang `tr`/`en` canonical doğru.
- [ ] Metadata title/description dilde.

## U5: Admin & Auth
- [ ] `/admin` rotası tek dilli, auth redirect çalışıyor.
- [ ] `/login` → giriş → admin akışı bozulmadı.

## U6: Görsel Bütünlük
- [ ] Glass/gold tasarım dili korundu; layout kayması yok.
- [ ] Toggle premium görünüm (altın aktif-state, §0 Linear grounding).
