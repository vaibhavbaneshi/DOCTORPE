# Modernization Roadmap

Phases align with mission Section 15. Status as of **2026-10-11**.

| Phase | Objective | Status |
|-------|-----------|--------|
| 0 Discovery | Audits, inventory | **In progress** — docs created |
| 1 Architecture | Target structure, API rules | **Started** — `lib/api.js`, auth middleware |
| 2 Design system | Tokens, shadcn eval | **Partial** — `DESIGN.md` + Tailwind tokens |
| 3 App shell | Nav, footer, loading | **Partial** — island nav, RouteFallback |
| 4 Features | Incremental refactors | **Ongoing** — DoctorGrid, ProtectedRoute |
| 5 UI redesign | Screen-by-screen | **Partial** — home, medicines, auth touched |
| 6 Perf & security | Splitting, hardening | **Started** — lazy routes, fetchAppointment auth |
| 7 Validation | E2E + a11y | **Partial** — Playwright smoke |
| 8 Cleanup | Dead code, deps | **Not started** |

## Sequenced work (recommended)

### Sprint 1 — Safety & perf (current)
- [x] Route-based code splitting (`App.jsx`)
- [x] Protect `GET /user/fetchAppointment`
- [ ] Scope appointments by `doctorId` query
- [ ] Chatbot: require auth or API key + rate limit
- [ ] Expand E2E: sign-in mock, booking happy path

### Sprint 2 — Design system + shadcn
- [ ] Init shadcn (JS mode), map tokens
- [ ] Replace `InputBox` / alerts with shadcn primitives
- [ ] Nav dropdown migration off Flowbite

### Sprint 3 — Data layer
- [ ] Migrate `BookDoctor`, `ProductsScreen` to React Query
- [ ] Retire static JSON where API exists
- [ ] Normalize API errors in UI

### Sprint 4 — AI & chat UX
- [ ] Prompt Kit evaluation for ChatBot UI only
- [ ] Medical disclaimer on chat open
- [ ] Remove conversation from localStorage

### Sprint 5 — Video & payments
- [ ] Lazy Stream sub-imports if SDK allows
- [ ] Single payment provider decision (Stripe vs Razorpay)

### Sprint 6 — Cleanup
- [ ] Remove unused `@chakra-ui/*`, sweet-alert, duplicate icons libs
- [ ] Backend unit tests for appointment + auth controllers

## Approval gates (do not proceed without user)

- Framework migration (Next.js, etc.)
- Mongo schema breaking changes
- Replacing JWT auth model
- New paid AI provider
- Production deploy / infra changes

## Graphify

Optional install for import graphs before large refactors:

`uv tool install graphifyy` — not installed in current environment; use ripgrep + build analysis until added.
