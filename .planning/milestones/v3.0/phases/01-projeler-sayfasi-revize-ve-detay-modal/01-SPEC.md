# Phase Specification: Projeler Sayfası Revize ve Detay Modalı (Phase 01 — v3.0)

## 0. Refero-First Grounding (Zorunlu — GSD-ARCHITECTURE.md §2)

> **Şeffaflık notu:** Bu ajanın çalışma zamanı toolsetinde canlı Refero MCP araçları (`refero_search_styles`, `refero_search_screens`) mevcut değildi. Refero skill metodolojisinin "designs and validates with evidence" kuralına uyularak grounding, aşağıdaki gerçek ürün/kaynak kalıplarıyla yapıldı. Her görsel karar bir real-product kuralına veya craft kuralına izlenebilir.

### Referans Kaynaklar
1. **Linear (Refero "best-designed" seti)** — issue/project detail overlay desenleri: `role="dialog"` + aria-modal, koyu scrim backdrop + blur, sağ-üst close (X), içeriğin scroll edilebilir tek sütun yapısı, status/kategori pill, technology chips, monospace meta. → Modal erişilebilirlik, layout ve motion kararları buradan ground edildi. (https://linear.app)
2. **Refero Portfolio kategorisi** (https://refero.design/categories/portfolio) — premium portfolyo proje listeleme kalıpları: browser-chrome viewport kartlar, hover image zoom, kategori etiketleri. → Grid kart dili.
3. **Mevcut v2.0 Refero-hizalı sistem** (v2.0 Phase 04 SPEC'inde zaten Refero ile kilitlenmiş) — DESIGN.md + globals.css `.glass-panel`/`.btn-primary`/`.btn-secondary`/`.input-glass` + macOS/browser-chrome viewport kart dili. → Tutarlılık için birebir kullanıldı.
4. **Craft kuralları (refero skill rehberleri)** — Typography (Space Grotesk başlık + Inter gövde, tightened tracking), color (HSL-tailored Champagne Gold `#775a19`/`#C5A059`, slate chrome `#0b0d10`), motion (cubic-bezier(0.16,1,0.3,1), 0.25–0.5s), anti-AI-slop (gradient restraint, hairline specular borders).

---

## 1. Projects Grid Kartı (`src/components/projects/ProjectShowcaseCard.tsx`)
- **Concept:** Tıkla-açılır, premium browser-viewport kartı. Anasayfa (v2.0 Phase 04) kart diliyle birebir tutarlı; tek fark: tıklanabilir `button` semantiği ve "Detayları Gör" affordance'ı.
- **Specs:**
  - Kök eleman `<button type="button">` (_nested interactive_ yok → erişilebilir; native Enter/Space ile açar, ayrı onKeyDown gerekmez).
  - Browser-chrome header: 3 macOS dotu + mono kategori etiketi (lowercase, alt çizgi).
  - Screenshot frame: `h-[220px] sm:h-[260px]`, `object-cover`, `group-hover:scale-[1.04]` (7s yumuşak zoom), üstüne `from-black/45` gradient.
  - Details panel: Space Grotesk başlık (`group-hover:text-secondary`), Inter açıklama (`line-clamp-2`), max 4 teknoloji chip + `+n`, ve "Detayları Gör" mono label with `arrow_outward` material icon.
  - Hover: glass-panel gold border glow (`hover:border-secondary/40`).
  - Focus-visible: `ring-secondary/60` (erişilebilirlik).
  - Motion: framer-motion `whileInView` fade-up, staggered `delay: min(index*0.06, 0.3)`.

## 2. Project Detail Modal (`src/components/projects/ProjectDetailModal.tsx`)
- **Concept:** Linear-style erişilebilir detail overlay — premium, glass, scrollable.
- **Specs:**
  - `role="dialog" aria-modal="true" aria-labelledby`. `AnimatePresence` ile enter/exit (backdrop fade + panel y/scale).
  - **Kapatma (3 yol):** Sağ-üst `X` tuşu (material `close`), `Escape`, backdrop tıklama.
  - **Erişilebilirlik:** Focus trap (Tab/Shift+Tab panel içinde döner), açıkta `document.body.style.overflow` scroll lock, kapatınca önceki focus'a geri dön.
  - **Layout:** Browser-chrome header (3 dot + `kategori.html` mono + X) → hero image (`h-[220px] sm:h-[320px]`) → scrollable body.
  - **Body:** kategori chip + tarih (tr-TR, yıl+ay) → başlık (`font-display-lg`) → kısa açıklama → `content` blokları (paragraflara böl, sol secondary border) → teknoloji chip'leri → GitHub (btn-secondary) + Canlı Demo (btn-primary) aksiyonları.
  - **Content render:** Admin textarea'ya düz metin yazıldığı için; çift-newline'a göre paragraf, yoksa tek-newline'a göre satır bölme. Markdown bağımlılığı yok.
  - Renk: panel `bg-white/95 glass-panel`, backdrop `bg-[#0b0d10]/60 backdrop-blur-md` (Linear detail overlay kuralı).

## 3. Projects Explorer (Orchestrator) (`src/components/projects/ProjectsExplorer.tsx`)
- **Concept:** Server-fetched veriyi alan, grid + modal state'i yöneten client bileşen.
- **Specs:**
  - State: `selectedId`. Modal `project` objesi `projects.find` ile çözülür.
  - **URL senkron (?p=<id>):** Paylaşılabilir link + geri-tuşu-kapatır. `open` → `history.pushState`; `close` → biz push yaptıysak `history.back()`, direkt link geldiyse `replaceState` ile `p`'yi temizle (sayfadan ayrılmadan). `popstate` dinleyicisi senkron tutar.
  - Boş durum: glass-panel + `folder_open` material icon + "Henüz proje eklenmedi."

## 4. /projects Page (`src/app/projects/page.tsx`)
- Server component, `force-dynamic`. Profile + projects Supabase fetch (mevcut sıralama korunur: sort_order then created_at).
- Header + hero (WordPullUp "Seçkin Projeler", anasayfayla tutarlı) + `<ProjectsExplorer projects={projects} />` + Footer.

## 5. Out of Scope
- Yeni DB kolonu/slug eklenmez (modal yeterli, `content` alanı zaten mevcut).
- `/projects/[id]` ayrı route eklenmez (kullanıcı modal istedi; `?p=` query senkronu paylaşım + geri-tuşu ihtiyacını karşılar).
- Anasayfa (`/`) proje bölümü veya admin tarafı dokunulmaz.