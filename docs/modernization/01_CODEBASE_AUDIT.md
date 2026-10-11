# DoctorPe — Codebase Audit

**Date:** 2026-10-11  
**Scope:** Full repository (`frontend/`, `backend/`, static assets, E2E)

## 1. Current technology stack

| Layer | Technology | Evidence |
|-------|------------|----------|
| Frontend | React 18.2, Vite 5.2 | `frontend/package.json`, `frontend/vite.config.js` |
| Routing | React Router 6 | `frontend/src/App.jsx` |
| Styling | Tailwind 3.4 + CSS variables | `frontend/tailwind.config.js`, `frontend/src/index.css` |
| UI libraries | Flowbite React (nav), Chakra Alert (package only), Headless UI, Radix icons | `frontend/package.json`, `Navigation.jsx` |
| Client state | Redux Toolkit + redux-persist | `frontend/src/redux/` |
| Server state | TanStack Query (partial) | `main.jsx`, `ChatBot.jsx` |
| HTTP | Centralized axios (`lib/api.js`) + some legacy patterns | `frontend/src/lib/api.js` |
| Auth (client) | JWT in `localStorage`, Firebase OAuth | `api.js`, `OAuth/firebase.js` |
| Backend | Express 4, ESM | `backend/app.js`, `backend/index.js` |
| Database | MongoDB via Mongoose 8 | `backend/db/db.js`, `backend/model/` |
| Validation | Zod (auth) | `backend/utils/validation.js` |
| Payments | Stripe + Razorpay | `backend/controllers/product.controller.js`, `app.js` |
| AI | Google Generative AI + OpenAI utils | `backend/controllers/chatbot.controller.js`, `package.json` |
| Video | Stream.io SDK | `@stream-io/video-react-sdk`, `VideoCall/` |
| E2E | Playwright | `frontend/e2e/home.spec.js` |
| Deploy | Vercel configs | `frontend/vercel.json`, `backend/vercel.json` |
| Language | JavaScript (no TypeScript app code) | `.jsx`/`.js` throughout |

**Graphify:** CLI not installed (`graphifyy` absent). Dependency analysis performed via ripgrep, imports, and build output.

## 2. Existing architecture

```
DOCTORPE/
├── frontend/          # Vite SPA
│   └── src/
│       ├── pages/     # Route-level screens
│       ├── components/
│       ├── redux/
│       ├── lib/api.js # Shared API client
│       └── hooks/
└── backend/
    ├── routes/        # /api/v1 mount
    ├── controllers/
    ├── model/
    └── middleware/auth.js
```

- **API prefix:** `/api/v1` (`backend/app.js`)
- **Routers:** auth, user (doctors/appointments), chatbot, product (`backend/routes/router.js`)
- **Frontend shell:** `Navigation` + `Routes` + `SiteFooter` (`App.jsx`)

## 3. Feature inventory (from code, not assumed)

| Feature | Routes / entry | Backend |
|---------|------------------|---------|
| Marketing home | `/` | Static + local JSON via `useFetch` |
| Sign up / sign in | `/signup`, `/signin` | `POST /auth/signup`, `/signin`, `/google` |
| Doctor discovery & booking | `/bookDoctor` | `GET /user/searchDoctor`, `POST /user/bookAppointment` |
| Appointments calendar | BookDoctor → `Calendar` | `GET /user/fetchAppointment` (auth required after 2026-10-11 fix) |
| Teleconsult / video | `/searchDoctor`, `/consult` | Stream client-side |
| Medicine catalog | `/medicines`, `/medicines/:title` | `GET /product/getProduct` |
| Cart & checkout | `/shoppingCart`, `/purchaseProductSuccess` | Stripe session, quantity update |
| AI Lab screenings | `/AI_Lab`, Diabetes, Heart, Stress | Likely external/ML endpoints in page code |
| Health chatbot | Floating button (multiple pages) | `POST /chatbot/ask` |
| 404 | `*` | — |

**User roles:** Single patient/user model (`backend/model/user.model.js`); doctors are records in doctor collection, not a separate auth role in routes reviewed.

## 4. Dependency inventory

### Retain (core)
- react, react-dom, react-router-dom, vite, tailwindcss, axios, mongoose, express, zod, bcryptjs, jsonwebtoken

### Use consistently / expand adoption
- `@tanstack/react-query` — only ChatBot uses mutations; doctor/product pages use manual `useEffect` + axios
- `frontend/src/lib/api.js` — not used everywhere (`useFetch` still loads `/database/*.json`)

### Review / consolidate (P2)
- **Three UI stacks:** Tailwind custom + Flowbite + Chakra packages (Chakra barely imported)
- **Duplicate payment SDKs:** Stripe and Razorpay on both tiers
- **Heavy optional deps:** Stream video (~596KB chunk), slick-carousel, react-awesome-reveal
- **Suspicious deps:** `package.json` npm package, `nodemailer` in frontend bundle path via EmailSend
- **Legacy:** `sweet-alert`, `text-encoding`

### Update when safe (P2–P3)
- npm audit: moderate issues in `@babel/runtime`, `@babel/helpers` (dev/transitive); run `npm audit fix` in CI cadence

## 5. Architectural weaknesses

| ID | Priority | Finding | Files | Impact |
|----|----------|---------|-------|--------|
| A1 | P1 | Monolithic initial JS bundle (pre-split) | `App.jsx` | Slow first load; mitigated by route lazy loading |
| A2 | P1 | Mixed data access: `api`, raw axios, static JSON | `useFetch.jsx`, various pages | Inconsistent errors, caching, auth headers |
| A3 | P2 | Redux + React Query overlap | `redux/`, `main.jsx` | Mental overhead; cart/user in Redux, chat in RQ |
| A4 | P2 | No feature folders; large page components | `pages/home/HomePage.jsx` | Harder refactors |
| A5 | P2 | Typo persistence in API paths | `auth.controlller.js` | Confusing onboarding |
| A6 | P3 | `PersistGate` without loading UI | `main.jsx` | Brief blank flash possible |

## 6. UI/UX weaknesses (summary)

See `04_UI_UX_AUDIT.md`. Highlights:
- Design system documented in root `DESIGN.md` but legacy CSS files coexist (`HomePage.css`, skeleton loader bootstrap-style classes)
- Nav labels: "Find doctors" → `/bookDoctor`, "Consult" → `/searchDoctor` (cognitive mismatch)
- AI Lab route casing `/AI_Lab` (redirects exist but URLs are awkward)

## 7. Security concerns

| ID | Priority | Finding | Files | Impact |
|----|----------|---------|-------|--------|
| S1 | P0 | ~~Public `fetchAppointment` exposed all slot occupancy~~ | `user.router.js` | **Fixed:** `requireAuth` added |
| S2 | P0 | Unauthenticated chatbot proxy to LLM | `chatbot.router.js` | Cost abuse, prompt injection surface |
| S3 | P1 | JWT in `localStorage` | `api.js`, `ProtectedRoute.jsx` | XSS → token theft |
| S4 | P1 | `fetchAppointment` returns all doctors’ slots | `appointment.controller.js` | Authenticated users still see global calendar |
| S5 | P2 | Chat history in `localStorage` | `ChatBot.jsx` | Device access reads conversation |
| S6 | P2 | No rate limiting on auth/chat | backend routes | Brute force / spam |

## 8. Performance bottlenecks

| ID | Priority | Finding | Measurement |
|----|----------|---------|-------------|
| P1 | P1 | Single 1.37MB JS chunk (before) | `npm run build` 2026-10-11 |
| P2 | P1 | Route lazy loading | Main chunk **440KB** gzip **135KB** after change |
| P3 | P1 | Stream VideoCall chunk **596KB** | Build output |
| P4 | P2 | CSS 211KB (Flowbite + slick + app) | Build output |
| P5 | P2 | HomePage chunk 75KB (carousels/reveal) | Build output |

## 9. Technical debt

- Static doctor/product JSON in `frontend/public/database/` parallel to API
- Email sending from browser (`EmailSend.js`) — credentials exposure risk if misconfigured
- Inconsistent route naming (`purshaseProductSuccess` redirect only)
- Backend tests: `echo "Error: no test specified"`
- ESLint max-warnings 0 but no unit test runner on frontend

## 10. Recommended modernization priorities

1. **P0:** Lock down chatbot (auth + rate limit + env guard); scope appointments by `doctorId`
2. **P1:** Complete API layer migration; lazy-load VideoCall; expand Playwright for auth/booking/cart
3. **P2:** shadcn/ui incremental adoption aligned with `DESIGN.md`; remove unused UI deps
4. **P2:** Feature folders for auth, doctors, medicines, ai-lab
5. **P3:** TypeScript migration (optional); consolidate payment provider
