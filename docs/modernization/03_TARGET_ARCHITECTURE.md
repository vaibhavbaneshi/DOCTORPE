# Target Architecture

## Principles (aligned with stack)

- Stay on **React 18 + Vite + Express + MongoDB**
- **Incremental** moves; no big-bang rewrite
- **One API client**, one error shape, auth at trust boundaries
- **Feature folders** only where features exist today

## Proposed frontend layout (migration target)

```
frontend/src/
  app/                    # Optional: App shell, providers (move from main.jsx)
    providers.jsx
  components/
    ui/                   # shadcn primitives (Button, Input, Dialog…) — adopt gradually
    layout/               # Navigation, SiteFooter, ProtectedRoute
    shared/               # Alerts, loaders matching DESIGN.md
  features/
    auth/                 # Signin, Signup, OAuth wrapper
    home/
    doctors/              # SearchDoctor, BookDoctor, DoctorGrid, SpecialtyFilter, Calendar
    medicines/            # ProductsScreen, ProductDetail, cart slice usage
    ai-lab/               # AiLab + screening forms
    consult/              # VideoCall (Stream)
    chat/                 # ChatBot + button
  lib/
    api.js                # Existing — extend with typed helpers / normalize errors
    query-keys.js         # TanStack Query keys (when migrating fetches)
  redux/                  # Keep until cart/user migration justified
  hooks/
  pages/                  # Thin re-exports during migration, then deprecate
```

**Why:** Matches actual routes in `App.jsx` without empty abstraction layers.

## API layer

**Keep** `API_BASE` + axios instance. Add:

- `normalizeApiError(error)` → user-safe message
- Optional response unwrap `{ status, data, message }` to match backend

**Do not** introduce a second fetch wrapper.

## State management

| Concern | Target |
|---------|--------|
| Session user + cart | Redux persist (current) until cart moves to server cart API |
| Doctors, products, appointments | TanStack Query with staleTime; remove duplicate `useEffect` loads |
| Chat thread | React Query mutation + optional sessionStorage (not localStorage for PHI-lite content) |
| UI modals | Local `useState` |

No new global state library.

## Backend

```
backend/
  routes/          # unchanged mount
  controllers/     # thin — delegate validation
  services/        # optional: appointment.service.js when logic grows
  middleware/
    auth.js
    rateLimit.js   # chatbot, auth (future)
  utils/
```

**Appointment API evolution:**

- `GET /user/fetchAppointment?doctorId=` — required query, indexed
- Keep `requireAuth`

## Validation

- Expand Zod to appointment body and product checkout payloads
- Frontend: mirror required fields with native HTML validation + server messages

## Error handling

- Route-level: `NotFound`, existing alerts
- Add one `ErrorBoundary` around `<Suspense>` routes (future)
- API: 401 clears token (already in `api.js`)

## shadcn/ui compatibility

- React 18 ✓
- Tailwind 3.4 ✓
- Project is **JSX** — shadcn works with `components.json` + path aliases; TypeScript optional
- **Strategy:** init once, add Button/Input/Dialog only; map tokens to `canopy`, `ink`, `surface` in `tailwind.config.js`
- **Avoid** keeping Flowbite + shadcn for the same primitives — migrate nav dropdown last

## Watermelon `card-split-accordian`

- Registry reachable; depends on `motion`, TSX, `'use client'`
- **Defer install** until shadcn baseline exists; port to JSX or add TSX island for FAQ on home
- Equivalent accessible pattern: native `<details>` + CSS transitions per `DESIGN.md` motion rules

## Prompt Kit

- **Justified use case exists:** `ChatBot.jsx` + `/chatbot/ask`
- Defer Prompt Kit until shadcn chat primitives land; document in roadmap Phase 2
- Do not add new LLM providers without approval

## Migration boundaries

1. Shell + tokens (done partially)
2. API consolidation per feature
3. shadcn primitives for forms
4. Page redesigns using `DESIGN.md`
5. Security hardening (chatbot, appointments scoping)
6. Remove dead deps (Chakra, sweet-alert)
