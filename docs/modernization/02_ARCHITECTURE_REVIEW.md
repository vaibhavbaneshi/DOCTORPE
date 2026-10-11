# Architecture Review

## Current state assessment

DoctorPe is a **classic MERN-style telehealth marketplace SPA** with a thin Express API. Business capabilities are real (auth, doctors, appointments, medicines, payments, AI screenings, chatbot, video) but boundaries are **page-centric** rather than domain-centric.

### Strengths already present (in-flight modernization)

- Central API client with JWT interceptor (`frontend/src/lib/api.js`)
- Backend auth middleware (`backend/middleware/auth.js`)
- Zod validation on auth (`backend/utils/validation.js`)
- Protected routes on client (`ProtectedRoute.jsx`)
- Design contract in `DESIGN.md` and Tailwind tokens
- Playwright smoke tests for home, 404, medicines, AI Lab, protected redirect

### Structural gaps

1. **Trust boundary inconsistency** — Some endpoints protected (`bookAppointment`), others were public (`fetchAppointment`, `chatbot/ask`). Client-side `ProtectedRoute` is not a substitute for server auth.
2. **Dual sources of truth** — `useFetch('/database/...')` vs Mongo/API for overlapping concepts.
3. **Presentation-heavy pages** — Booking, home, and cart mix fetch, UI, and side effects (email) in one file.
4. **State fragmentation** — Redux persist for user/cart; React Query only on chatbot; no shared query keys or error normalization.

### Coupling hotspots

| Module | Dependents | Risk if changed |
|--------|------------|-----------------|
| `lib/api.js` | Most authenticated flows | High — correct place for cross-cutting concerns |
| `redux/user/userSlice.js` | Nav, cart, protected routes | Medium |
| `VideoCall/` | `/consult` only | High weight; isolate lazy import (done at route level) |
| `appointment.controller.js` | Calendar, booking | Medium — needs doctor-scoped queries |

### Circular dependency check

No automated graph (Graphify unavailable). Manual review: routes → controllers → models → utils; frontend pages → components → api/redux. **No circular imports detected** in critical paths.

## Verdict

Architecture is **appropriate for incremental modernization** on React + Express. A framework migration (Next.js, etc.) is **not justified** until SSR/SEO or unified deployment is a product requirement.

Recommended direction: **feature modules + shared lib**, keep existing API contract, tighten security on open endpoints, split heavy routes (video, home) via lazy loading.
