# Design System: DoctorPe

**Sources:** [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (Cal.com scheduling clarity, Intercom conversational trust), Leonxlnx taste-skill (Soft Structuralism / health), generated section comps in `frontend/public/images/design/`.

**Design read:** Redesign of a telehealth marketplace for patients, trust-first clinical language, forest accent, Outfit grotesk, island nav.

**Dials:** Variance 4 · Motion 3 · Density 4

## 1. Visual Theme & Atmosphere
A quiet clinic lobby: bone canvas, forest ink, one accent. Airy, left-aligned, no cyan marketing gradients. Care should feel calm, not promotional.

## 2. Color Palette & Roles
- **Bone Canvas** (#F4F1EA) - page background
- **Paper Surface** (#FBF9F4) - elevated panels
- **Forest Ink** (#1C2A24) - headings and primary text
- **Moss Mute** (#5C6B64) - body, metadata
- **Canopy Accent** (#2F6A56) - primary CTAs, focus rings, active nav
- **Canopy Hover** (#275B49) - pressed/hover fill
- **Hairline** (rgba(28,42,36,0.08)) - structural edges
- **Tinted shadow** (rgba(28,42,36,0.08)) - 24px blur, never black

Banned: Inter, cyan-to-blue gradients, purple glow, pure #000, more than one accent.

## 3. Typography Rules
- **Display / body:** Outfit (400, 500, 600, 700). Tracking -0.03em on display. Headings use `text-wrap: balance`.
- **Numbers:** `tabular-nums` on prices and quantities.
- **Body measure:** max 65ch.
- Banned: Inter, Fraunces, Instrument Serif.

## 4. Component Stylings
- **Island nav:** floating pill, `mt-4`, glass fallback `bg-[color-mix(in_srgb,var(--surface)_88%,transparent)]`, `backdrop-blur` only on this sticky island. Max height 72px.
- **Primary button:** `rounded-full`, canopy fill, white label, nested circular arrow. `active:scale-[0.98]`. `transition-transform, transition-colors` 220ms `cubic-bezier(0.32,0.72,0,1)`.
- **Secondary button:** hairline border, ink text, pill.
- **Cards:** outer shell `p-1.5 rounded-[2rem] ring-1 ring-ink/5`; inner `rounded-[1.6rem] bg-surface`. Use only when grouping a photo + action.
- **Inputs:** label above, error below, forest focus ring, `autocomplete` + `name`.
- **Loaders:** layout-shaped skeletons, not spinners.

## 5. Layout Principles
- Max width 72rem, `px-4` mobile, `px-8` desktop.
- Hero: split `1.1fr / 0.9fr`, stacks under 768px. `min-h-[100dvh]` never `h-screen`.
- Services: bento 2fr + 1fr, not four equal cards.
- Concerns: horizontal snap row, not a 6-up equal grid.
- Skip link to `#main`. Semantic `header` `nav` `main` `footer`.

## 6. Motion
Honor `prefers-reduced-motion`. Animate transform and opacity only. No `transition: all`.

## 7. Anti-patterns
No emojis, no “Elevate / Seamless / Unleash”, no three equal feature towers, no scroll cues, no em-dashes, no fake 99.9% stats.
