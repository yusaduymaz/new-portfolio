# Phase Specification: Stil Altyapısı ve Layout Polishing (Phase 02)

## 1. Style System Updates
We are updating `globals.css` to define a premium, light-mode glassmorphic design language.

### CSS Class Definitions:
- **`.glass-panel`, `.glass-card`**:
  - Background: `rgba(255, 255, 255, 0.65)`
  - Backdrop Filter: `blur(24px)`
  - Border: `1px solid rgba(255, 255, 255, 0.7)` (with optional subtle gold border transition on hover: `rgba(197, 160, 89, 0.3)`)
  - Shadows: Soft diffuse ambient shadow (`box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04)`) plus a clean white inset ring.
- **`.glass-terminal`**:
  - A specialized console card surface for light backgrounds (`background: #14171A; border: 1px solid rgba(255, 255, 255, 0.1)`).
- **`.border-glow-hover`**:
  - CSS rule that transitions the border color to a faint champagne gold on hover.

---

## 2. Layout Elements Redesign

### 2.1 Navigation Header (`src/components/layout/Header.tsx`)
- Transform into a floating capsule layout.
- Capsule attributes: `max-w-4xl mx-auto mt-6 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-lg`.
- Add a tiny, live "Pulse Dot" in gold next to a label: `/sys/nodes/active`.
- Smooth slide-in-down animation on initial render.

### 2.2 Footer (`src/components/layout/Footer.tsx`)
- Align style with the header's frosted glass style.
- Include subtle copyright and system status text in monospace font.
