---
name: Antem Industrial
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#7e7576'
  outline-variant: '#c6c6cd'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#016a61'
  on-secondary: '#ffffff'
  secondary-container: '#9defe3'
  on-secondary-container: '#0d6f66'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#a0f1e6'
  secondary-fixed-dim: '#84d5ca'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#d3e3ff'
  tertiary-fixed-dim: '#b7c7e2'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485e'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-base:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  margin-mobile: 16px
  margin-desktop: 40px
  gutter: 24px
  section-gap: 80px
  container-max: 1280px
---

## Brand & Style
The brand identity centers on **reliability, professional hygiene, and industrial efficiency**. It targets institutional clients—hospitals, hotels, and factories—where trust and supply chain consistency are paramount.

The design style is **Corporate / Modern** with a focus on high-clarity information architecture. It utilizes a systematic "clean-room" aesthetic: ample whitespace, a disciplined primary palette of deep charcoal and professional teals, and subtle ambient shadows that suggest a premium, organized service. The visual language balances the "heavy duty" nature of industrial supplies with a sophisticated, user-friendly digital interface.

## Colors
The palette is grounded in a high-contrast foundation to evoke cleanliness and precision.

- **Primary (Black/Deep Charcoal):** Used for headlines and core brand elements to provide an authoritative anchor.
- **Secondary (Teal):** Represents the "hygiene" and "water" aspect of the business. Used for highlights, call-to-action buttons, and active states.
- **Tertiary (Navy):** A deep professional blue used for secondary containers and dark-themed sections like the footer to provide contrast without the harshness of pure black.
- **Neutral (Cool Greys):** A range of cool-toned greys (`#f7f9fb` to `#eceef0`) creates the "Surface" and "Background" tiers, ensuring the interface feels airy and clinical.

## Typography
The system exclusively uses **Plus Jakarta Sans**, a modern geometric sans-serif with soft curves that make industrial content feel more approachable. 

- **Headlines:** Use tight letter-spacing and heavy weights (600-700) to command attention.
- **Body Text:** Uses a generous line height (1.6) to improve readability in product descriptions and corporate information.
- **Labels:** Uppercase styles with increased letter-spacing are used for small metadata or categorical tags to maintain hierarchy.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop, centering content within a 1280px max-width container to maintain a controlled editorial feel.

- **Grid:** A 12-column system is used on desktop with 24px gutters.
- **Rhythm:** An 8px base unit drives all padding and margin increments.
- **Sections:** Large vertical gaps (80px) are used to clearly separate different content modules (Hero, Products, Process), reinforcing the "organized" brand value.
- **Mobile:** Transitions to a single-column fluid layout with 16px side margins.

## Elevation & Depth
Depth is created through **Ambient Shadows** and **Tonal Layering** rather than aggressive highlights.

- **Surface Tiers:** The background uses `surface-container` (light grey), while primary content cards use `surface-container-lowest` (white). This 1-step tonal shift creates a natural "lift."
- **Shadows:** A very soft, diffused shadow (`rgba(15, 23, 42, 0.05)`) with a large 20px blur is applied to cards to make them feel like they are floating just above the surface.
- **Interactivity:** Hover states often involve a border-color transition to the Secondary Teal, adding depth through color rather than increased shadow.

## Shapes
The shape language is **hybrid**. While standard UI elements like buttons use a "Soft" 8px (`0.5rem`) radius, primary content containers like product cards use an exaggerated "Rounded" 24px radius.

- **Standard Elements:** 8px (Buttons, Inputs).
- **Featured Cards:** 24px (Product categories).
- **Circular:** Used for process steps and icons to provide a friendly counterpoint to the structured grid.

## Components
- **Buttons:** Primary CTAs use the Tertiary Navy background with white text and 8px rounding. Secondary buttons use a Teal outline with no fill.
- **Cards:** Product cards are white with a subtle `outline-variant` border. They feature a 24px corner radius and an "ambient shadow" that deepens slightly on hover.
- **Process Steps:** Visualized as numbered circles using the Tertiary or Secondary colors, connected by a 2px horizontal line to show flow.
- **Navigation:** The TopNavBar is sticky, utilizing a subtle `shadow-sm` and a bottom border to separate it from the main content.
- **Iconography:** Uses "Material Symbols Outlined" with a light weight (300-400) to match the clean, professional aesthetic of the typography.