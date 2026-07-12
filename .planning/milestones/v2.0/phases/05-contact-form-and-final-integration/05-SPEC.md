# Phase Specification: Contact Form & Final Integration (Phase 05)

## 1. Contact Form Redesign (`src/components/ContactForm.tsx`)
- **Concept**: Elegant input-glass form panel.
- **Specs**:
  - Main frame: High-blur glass container (`glass-panel`) border border-white/60 with balanced padding.
  - Form Fields:
    - Input text fields use custom `.input-glass` classes: white-glass background (`rgba(255,255,255,0.45)`) that becomes solid white (`rgba(255,255,255,0.85)`) on focus.
    - Focus state: Border outline turns to Champagne Gold (`#C5A059`) with a soft gold border shadow (`box-shadow: 0 0 15px rgba(197,160,89,0.15)`).
    - Labels: Placed in Space Grotesk / Inter tags.
  - Submit Button: Shimmer button or premium gradient black-button with clean feedback triggers (sending states, error states, and success indicators).

---

## 2. Landing Page Layout Wrap-up (`src/app/page.tsx`)
- **Concept**: Final styling and spacing checks.
- **Specs**:
  - Update sections in `src/app/page.tsx` (Hakkımda, Seçilmiş Çalışmalar, Bağlantı Başlat) to use uniform spacing tokens (`py-section-gap`).
  - Polish the connection details column:
    - Custom rounded-2xl glass-panels (`glass-panel`) for base location and email details.
    - Icons highlight in Champagne Gold on hover.
