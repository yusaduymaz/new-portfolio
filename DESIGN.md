---
name: Premium Light Mode Portfolio
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444748'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#141d23'
  on-tertiary-container: '#7c858d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#dbe4ed'
  tertiary-fixed-dim: '#bfc8d0'
  on-tertiary-fixed: '#141d23'
  on-tertiary-fixed-variant: '#3f484f'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 120px
---

## Brand & Style

This design system centers on a high-performance, gallery-inspired aesthetic tailored for elite creative professionals. It fuses the airy transparency of **Glassmorphism** with a strictly disciplined **Minimalist** structure. 

The tone is sophisticated and "boutique," evoking the feeling of a physical high-end studio. Visual interest is generated through light refraction, subtle movement, and tactile surfaces rather than heavy ornamentation. This design system prioritizes clarity and speed, ensuring that the portfolio content remains the primary focus while the UI provides a luxurious, interactive frame.

## Colors

The palette is anchored in "Gallery White" and "Studio Grays," ensuring a clean backdrop for visual work. The primary color is a deep, near-black charcoal used for high-contrast typography.

The accent color is a "Champagne Gold" (#C5A059), a direct evolution of the warm tones found in the reference imagery, optimized for visibility against light surfaces. Gradients should be used sparingly, primarily as "Atmospheric Fills" behind glass surfaces, using a soft transition from a warm off-white to a faint cool gray to simulate natural lighting and depth.

## Typography

This design system utilizes a high-contrast typographic pairing. **Space Grotesk** is used for all headings and display elements, providing a technical, avant-garde edge that feels modern and high-performance. Letter spacing is tightened on larger headlines to create a cohesive "block" look.

**Inter** handles all body and utilitarian text. It is selected for its neutral, systematic character, ensuring maximum legibility across project descriptions and metadata. Upper-case labels with increased tracking are used for category tags and navigation to maintain a professional, architectural feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy. A 12-column grid is centered within the viewport, with generous outer margins to simulate the "white space" of a physical art gallery. 

Spacing is governed by an 8px base unit. Section-to-section gaps are intentionally large (120px+) to allow the portfolio pieces breathing room and to signify a premium, unhurried browsing experience. On mobile, the margins compress significantly, and the 12-column grid collapses into a single-column vertical stack, while maintaining the same 8px-derived internal padding for components.

## Elevation & Depth

Hierarchy is achieved through **Glassmorphism** and light-based depth. Instead of traditional drop shadows, this design system uses:

1.  **Backdrop Filters:** All floating surfaces (cards, navbars) must utilize a `blur(20px)` or higher to create a sense of being "above" the background.
2.  **Subtle Outlines:** A 1px semi-transparent white border (`rgba(255, 255, 255, 0.4)`) acts as a "specular highlight" on the top and left edges of glass cards.
3.  **Tonal Stacking:** Surfaces closer to the user are lighter and more transparent, while the background remains a solid, clean white. This creates a vertical stacking order without the "muddiness" of heavy shadows.

## Shapes

The shape language is refined and approachable, utilizing a "Rounded" (Level 2) logic. This softens the technical feel of the Space Grotesk typography. Large glass cards and primary container elements should use the `rounded-xl` (1.5rem) setting to emphasize their "object-like" quality, while smaller buttons and input fields use the standard `rounded` (0.5rem) for a crisp, functional appearance.

## Components

### Glassmorphic Navbar
The navbar is a floating persistent element. It should be semi-transparent with a heavy backdrop blur. It uses a thin, hairline border at the bottom. Navigation links are set in `label-md` and use a subtle "Champagne Gold" underline on hover.

### Glass Cards
Portfolio items are housed in glass cards. The card background should be a gradient from `rgba(255, 255, 255, 0.8)` to `rgba(255, 255, 255, 0.4)`. On hover, the backdrop blur intensity should increase, and the 1px border should brighten to simulate light catching the edge.

### Interactive Buttons
Buttons use a subtle linear gradient (from #1A1A1A to #333333). When clicked, a ripple effect using the Champagne Gold color should radiate from the point of contact. Secondary buttons are "ghost style" with a 1px charcoal border and a glass background.

### Input Fields
Inputs follow the glass aesthetic—minimal, semi-transparent backgrounds with a focus state that transforms the bottom border into a Champagne Gold highlight.

### Chips & Tags
Tags are small, pill-shaped elements with a very low-opacity gray fill and charcoal `label-md` text. They serve as organizational metadata without competing for visual attention.