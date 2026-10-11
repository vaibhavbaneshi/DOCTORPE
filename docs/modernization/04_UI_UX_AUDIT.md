# UI/UX Audit — Screen by Screen

Design reference: root `DESIGN.md` (bone canvas, canopy accent, island nav, Outfit).

---

## `/` — Home

**Current:** Redesigned hero (“Care that meets you where you are”), bento services, concern chips, carousel/reveal sections (`HomePage.jsx`, `HomePage.css`).

**Problems:** Mixed legacy CSS + Tailwind; some sections still template-heavy; carousels increase motion noise (P2).

**Proposed:** Single layout system (Tailwind only); replace legacy skeleton patterns; FAQ/services accordion (Watermelon or native details).

**Benefit:** Faster paint, calmer first impression.

**Priority:** P1

---

## `/signin`, `/signup`

**Current:** Form components (`InputBox`, `Heading`), OAuth (`OAuth.jsx`), design-system focus rings in places.

**Problems:** Split visual language vs home; error messages not always tied to fields (P2).

**Proposed:** Unify with shared form field component; post-auth redirect from `location.state.from`.

**Benefit:** Fewer drop-offs on protected flows.

**Priority:** P1

---

## `/bookDoctor`

**Current:** Specialty filter, doctor grid, calendar modal, success/error alerts, chat FAB.

**Problems:** Nav label “Find doctors” vs “Consult” on `/searchDoctor` confuses IA (P1); loading state basic (P2).

**Proposed:** Rename nav to match mental model; skeleton cards from DESIGN.md; doctor-scoped slot availability.

**Benefit:** Clearer booking path.

**Priority:** P0 (IA), P1 (visual)

---

## `/searchDoctor`

**Current:** Doctor search / consult entry toward video.

**Problems:** Overlap with book flow; Stream weight (P2).

**Proposed:** Clarify copy: “Video consult” vs “Book in-person slot”; lazy video bundle (route split done).

**Benefit:** Users pick correct modality.

**Priority:** P1

---

## `/consult` — VideoCall

**Current:** Stream.io layout components.

**Problems:** 596KB chunk; styling partially separate `style.css` (P1 perf).

**Proposed:** Load only from consult route; pre-call device check UI; medical disclaimer prominent.

**Benefit:** Perceived performance + trust.

**Priority:** P1

---

## `/medicines`, `/medicines/:title`

**Current:** API-driven grid, design-system headings (E2E verified).

**Problems:** Cart affordance only when logged in; detail page density varies (P2).

**Proposed:** Consistent product card; sticky add-to-cart on mobile.

**Benefit:** Higher conversion.

**Priority:** P2

---

## `/shoppingCart`, `/purchaseProductSuccess`

**Current:** Redux cart, Stripe checkout session.

**Problems:** Legacy CSS files; payment errors generic (P2).

**Proposed:** Checkout step indicator; success page next actions (book doctor, home).

**Benefit:** Completion clarity.

**Priority:** P2

---

## `/AI_Lab` + screenings

**Current:** Hub + Diabetes, Heart Health, Stress forms (`health-form` in `index.css`).

**Problems:** Mixed URL casing; forms long on mobile (P2); disclaimers need uniform placement (P1 healthcare).

**Proposed:** Single route prefix `/ai-lab` with redirects; sticky submit; `MedicalDisclaimer` on all screening pages.

**Benefit:** Trust + compliance awareness.

**Priority:** P1

---

## Global — Navigation & footer

**Current:** Island nav (`Navigation.jsx`), Flowbite avatar dropdown, mobile sheet, `SiteFooter`.

**Problems:** Flowbite vs custom tokens (P2); cart hidden until login (OK).

**Proposed:** Replace dropdown with shadcn DropdownMenu when integrated; active state already good.

**Benefit:** Consistent component behavior/a11y.

**Priority:** P2

---

## Global — Chatbot

**Current:** Mutation-based send, localStorage history.

**Problems:** UI not aligned with Prompt Kit patterns; history persistence privacy (P2).

**Proposed:** Prompt Kit message list + input after shadcn init; session-only history.

**Benefit:** Modern AI UX without new backend.

**Priority:** P2

---

## `*` — NotFound

**Current:** Accessible heading + “Go home” (E2E covered).

**Problems:** None significant.

**Priority:** P3
