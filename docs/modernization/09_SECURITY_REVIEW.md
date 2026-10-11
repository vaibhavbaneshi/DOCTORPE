# Security Review — DoctorPe

**Disclaimer:** This is an engineering review, not legal/regulatory certification (HIPAA/GDPR applicability must be determined by product owners).

## Authentication & session

| Control | Status | Notes |
|---------|--------|-------|
| Password hashing | OK | bcrypt in `auth.controlller.js` |
| Input validation (auth) | OK | Zod schemas |
| JWT verification | OK | `middleware/auth.js` |
| Token storage | Risk | `localStorage` — XSS impact |
| Protected API routes | Partial | Product mutations protected; chatbot open |
| Client route guard | OK | `ProtectedRoute.jsx` — not sufficient alone |

## Authorization gaps

| Endpoint | Issue | Priority | Mitigation |
|----------|-------|----------|------------|
| `POST /chatbot/ask` | No auth, no rate limit | P0 | Add `requireAuth` or service token + rate limit |
| `GET /user/fetchAppointment` | Was public | **Mitigated** | `requireAuth` added 2026-10-11 |
| Same endpoint | Returns all doctors’ slots | P1 | Require `doctorId`, filter in controller |
| `GET /user/searchDoctor` | Public | Acceptable | Doctor directory is public marketing data |

## Data exposure

- Chat messages persisted in `localStorage` (`ChatBot.jsx`) — avoid storing sensitive health text; clear on sign out (partial: cleared on sign out in nav)
- Appointment responses leak occupancy patterns across doctors — scope by doctor
- Error handler returns `err.message` (`app.js`) — ensure controllers don’t throw internal details

## Frontend

- Centralized API client strips token on 401 — good
- Email from browser (`EmailSend.js`) — verify no secrets in client env; prefer server-side email
- Firebase OAuth — ensure API keys are restricted by domain in Firebase console

## Dependencies

- **2026-10-11 `npm audit --omit=dev`:** frontend **49** issues (4 critical, 20 high, mostly transitive e.g. Firebase/`@fastify/busboy`); backend **25** → **3 high** after `npm audit fix` (remaining nodemon/chokidar/braces — dev-only)
- Prefer targeted dependency bumps over `npm audit fix --force` on frontend (breaking risk)
- Remove unused packages to reduce supply chain surface (`package.json` meta-package, etc.)

## Healthcare-oriented recommendations

1. Medical disclaimer on AI Lab and chat (`MedicalDisclaimer.jsx` — extend coverage)
2. Do not log request bodies containing symptoms in production
3. Server-side authorization on all appointment mutations (already on book/delete)

## Secrets

- `.env.example` present for frontend/backend — do not commit `.env`
- Razorpay/Stripe/JWT/LLM keys must stay server-only
