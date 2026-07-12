# Phase Specification: Expertise & Projects Redesign (Phase 04)

## 1. Core Capabilities Redesign (`src/components/ExpertiseBento.tsx`)
- **Concept**: Interactive engineering workspace panel.
- **Specs**:
  - Keep the two core columns ("Data Science" and "Full-stack Development").
  - Wrap columns inside high-fidelity glass panels (`glass-panel`).
  - Upgrade the category icons and number labels ("01" and "02") to Space Grotesk layout style.
  - Implement capsule skill chips that transition on hover: they will get a subtle gold border outline (`border-secondary/50`) and a slight upward translate.
  - Background overlay: Faint glowing gradient behind the active hovered card.

---

## 2. Selected Work (Projects) Redesign (`src/app/page.tsx`)
- **Concept**: High-fidelity UI screenshots in custom browser viewport cards.
- **Specs**:
  - Redesign project cards into a macOS window mockup with window border chrome:
    - Top header: 3 macOS buttons (red/yellow/green), project category title in mono font, and a gray border.
    - Screenshot image: Enclosed in the body with a smooth zoom transition (`group-hover:scale-[1.03]`).
  - Slide up content panel overlaying the image viewport:
    - Space Grotesk heading, Inter body copy, elegant action icon links (GitHub / Live Link) with custom tooltips or slide underlines.
    - Modern category tag: Rounded capsule with a white-glass background.
