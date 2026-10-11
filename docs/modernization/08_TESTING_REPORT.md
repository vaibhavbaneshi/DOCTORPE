# Testing Report

## Existing automated coverage

| Layer | Tool | Location | Scope |
|-------|------|----------|-------|
| E2E | Playwright | `frontend/e2e/home.spec.js` | Home nav/hero, 404, medicines (mocked API), AI Lab links, protected redirect |
| Unit | None | — | — |
| Backend | Placeholder | `backend/package.json` `test` script exits 1 | — |
| Lint | ESLint | `npm run lint` | JS/JSX max-warnings 0 |

## Critical user journeys (manual + E2E target)

1. Register / sign in — **E2E not yet automated**
2. Browse medicines → add to cart — **partial** (medicines list mocked)
3. Book doctor slot — **redirect only** tested
4. AI Lab screening form submit — **not tested**
5. Chatbot message — **not tested**
6. Video consult — **not tested** (Stream credentials required)

## Baseline run (2026-10-11)

Execute: `cd frontend && npm run test:e2e`

Record results below after each modernization batch.

| Run | Build | E2E | Notes |
|-----|-------|-----|-------|
| 2026-10-11 | Pass (lazy routes) | Pass (5/5) after `npx playwright install chromium` | Post App.jsx split |

## Accessibility

- Automated: not configured (recommend `@axe-core/playwright` later)
- Manual checks: skip link, dialog labels on calendar, nav `aria-label="Primary"`

## Regression strategy

- Keep Playwright mock for product API to avoid backend dependency in CI
- Add auth fixture with stored token for booking flow
- Do not commit real JWT secrets or patient data in tests
