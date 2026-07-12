# Design Specification: Premium Landing Page Revamp (Milestone v2.0)

## 1. Visual Identity & Brand Direction
Based on Refero styles and user choices, we are keeping the portfolio's **Açık Tema (Light Mode)** canvas while elevating it to a premium, modern "glassmorphic workspace" aesthetic.

### Key Visual Tokens:
- **Canvas / Background**: Clean Soft Grey/White (`#F8F9FA` with sections using `#F3F4F6`).
- **Accent Color**: Champagne Gold (`#C5A059` for highlights/active states, `#775a19` for deeper accents). The accent will be used sparingly and strictly for micro-interactions, primary highlights, and CTAs (disciplined accent rule).
- **Surfaces**: Frosted glass panels designed for light backgrounds (`background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(0, 0, 0, 0.06)`).
- **Shadows**: Soft, diffuse shadows (`box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)`) to give cards a floating presence.
- **Typography**:
  - Headings: `Space Grotesk` (clean, geometric, tech-oriented).
  - Body & Labels: `Inter` (high legibility, neutral-modern).

---

## 2. Section Redesign Specifications

### 2.1 Navigation (Header & Footer)
- **Concept**: A floating, glassmorphic capsule navbar.
- **Specs**:
  - `backdrop-filter: blur(24px) bg-white/60 border border-black/5`
  - Subtle gold hover state or fine underline animation.
  - Interactive "System Status" indicator (live pulse dot showing active/live connection).

### 2.2 Hero Section
- **Concept**: High-End Developer Studio.
- **Specs**:
  - Background overlay: Faint interactive canvas grid lines with subtle gold aura gradients.
  - Left column: Large Space Grotesk headline, compact tracking, subtext in low-contrast grey, and the primary CTA (Shimmer Button with a gold border-beam effect).
  - Right column: Portrait image framed in a customized blueprint overlay with macOS window chrome, alongside a light-mode monospace terminal panel (`developer.json`) with slate colors and elegant syntax highlighting.

### 2.3 About Me Section
- **Concept**: Bento Grid Diagnostic Dashboard.
- **Specs**:
  - Main panel: Bio with senior developer copy, interactive social link buttons.
  - Metric panels: Interactive cards for "Years of Experience", "Projects Completed", and "Satisfaction Rate".
  - Border illumination: CSS mouse-track glowing borders (border sweep animation) on hover.

### 2.4 Expertise / Capabilities Section
- **Concept**: Dual-Console Architecture Panel.
- **Specs**:
  - Two primary bento panels: "Data Science & AI" and "Full-Stack Development".
  - Skills displayed as capsule tokens with a subtle gold hover outline and code-syntax tag styling.
  - Floating background connection line SVGs that represent neural paths / tech stacks.

### 2.5 Selected Work (Projects) Section
- **Concept**: Embedded Project Viewports.
- **Specs**:
  - Grid: 2-column card layout.
  - Card style: macOS window mockups with actual project screenshots inside, transitioning on hover (slight translate up, hover image scale, gold border glow).
  - Clean metadata display (Title, Description, Category Tag, Code/Live Actions).

### 2.6 Contact Section
- **Concept**: Protocol Connection Portal.
- **Specs**:
  - Input fields: Underline style transition. Underline turns gold and glows on focus.
  - Integration: Form submission goes through existing serverless contact action.
