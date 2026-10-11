# Design System — DoctorPe

**Canonical spec:** `/DESIGN.md` (Soft Structuralism / clinical calm).

This document maps tokens to implementation files.

## Color tokens

| Token | Hex / value | Tailwind | CSS var |
|-------|-------------|----------|---------|
| Bone canvas | `#F4F1EA` | `bg-canvas` | `--canvas` |
| Paper surface | `#FBF9F4` | `bg-surface` | `--surface` |
| Forest ink | `#1C2A24` | `text-ink` | `--ink` |
| Moss mute | `#5C6B64` | `text-mute` | `--muted` |
| Canopy accent | `#2F6A56` | `bg-canopy` | `--accent` |
| Canopy hover | `#275B49` | `bg-canopy-hover` | `--accent-hover` |
| Hairline | `rgba(28,42,36,0.08)` | `border-ink/10` | `--hairline` |

**Banned:** Inter, cyan gradients, purple glow, pure black fills.

## Typography

- **Family:** Outfit via `@fontsource/outfit` in `main.jsx`
- **Scale:** Display headings `text-4xl`–`text-6xl` with `font-semibold`; body `text-base`; labels `text-sm font-medium`
- **Numbers:** `tabular-nums` on prices, times, quantities

## Spacing & layout

- Max width `max-w-5xl` / `72rem` for content
- Page padding `px-4` mobile, `px-8` desktop
- Section gaps `py-16`–`py-24` for marketing sections

## Radius & elevation

- Pills: `rounded-full` (buttons, nav)
- Cards: outer `rounded-[2rem]`, inner `rounded-[1.6rem]`
- Shadow: `shadow-tint` only (`tailwind.config.js`)

## Components (implemented patterns)

| Pattern | Location |
|---------|----------|
| Island nav | `Navigation.jsx`, `.island-nav` |
| Primary CTA | canopy pill buttons across pages |
| Health forms | `.health-form` in `index.css` |
| Skip link | `App.jsx`, `.skip-link` |
| Route loading skeleton | `App.jsx` `RouteFallback` |

## Motion

- `ease-spring` timing in Tailwind config
- `prefers-reduced-motion` global dampening in `index.css`
- No `transition-all`

## shadcn/ui integration plan

1. Add `components.json` with `@/` → `src/`
2. Extend `tailwind.config.js` with shadcn CSS variables mapped to canopy/ink/surface
3. Install: `button`, `input`, `label`, `dialog`, `skeleton`, `alert`
4. Deprecate duplicate Flowbite form controls over time

## Watermelon accordion

Use for **home FAQ / service details** only after shadcn base. Customize icons to healthcare copy (consult, medicines, AI lab). Respect reduced motion (reduce spring amplitude).

## Accessibility checklist

- Focus rings: `focus-visible:ring-2 focus-visible:ring-canopy`
- Dialogs: `role="dialog"`, `aria-modal`, labelled titles (`Calender.jsx` model)
- Landmarks: `header`, `nav`, `main`, `footer`
- Target WCAG 2.2 AA for contrast on mute text (verify with axe on key pages)
