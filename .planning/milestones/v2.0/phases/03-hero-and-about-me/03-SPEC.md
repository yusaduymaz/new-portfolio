# Phase Specification: Hero & About Me Redesign (Phase 03)

## 1. Hero Section Revamp
We are upgrading `src/components/HeroSection.tsx` based on the user's design selections.

### Structure:
- **Left Column**:
  - Technical tag `/sys/nodes/active` or `/sys/status: online`.
  - Big, confident `Space Grotesk` title (Muhammed Yuşa Duymaz).
  - Clear senior developer statement.
  - Interactive Action buttons (Primary gold shimmer button, Secondary glass outline button).
- **Right Column**:
  - An asymmetric panel containing a macOS window mockup. Inside is the portrait image, rendering with a clean zoom scale on hover.
  - Floating `developer.json` interactive widget styled as a code compiler screen using the `.glass-terminal` custom style.
  - The JSON widget will show system states:
    ```json
    {
      "name": "Muhammed Yuşa Duymaz",
      "role": "Senior Web Designer & Developer",
      "nodes": ["Data Science", "Full-Stack Dev"],
      "location": "Istanbul, TR"
    }
    ```
    And it will include a "Copy Code" button next to it!

---

## 2. About Me Section Revamp
We are upgrading the About Me grid in `src/app/page.tsx` into a high-fidelity Bento grid.

### Layout:
- Bento Grid with 3 columns / blocks:
  - **Block 1 (Large, spans 2 columns)**: Clean biography layout using Space Grotesk header and Inter body copy, plus premium social icons (GitHub, LinkedIn) inside custom circle buttons that glow on hover.
  - **Block 2 (Column 3, stacked)**: Metric cards for:
    - *Experience*: 5+ Yıl Deneyim
    - *Projects*: 50+ Proje
    - *Satisfaction*: %100 Müşteri Memnuniyeti
  - **Grid Card Hover Effect**: Card borders light up on mouse hover using subtle white/gold transitions.
