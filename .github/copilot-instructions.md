# Copilot Instructions for InterviewPrep AI

## 🏛️ Project Overview

- **InterviewPrep AI** is a fullstack platform for simulating technical interviews, optimized for speed (Groq LPU), modularity (Service-Controller pattern), and smooth UX (React 19 + Framer Motion).
- **Architecture:** Client-server split with a decoupled AI service layer. Backend (Node.js/Express/MongoDB) and frontend (React/Vite/Tailwind) are in separate folders.

## 📂 Key Structure & Patterns

- **Backend:**
  - `controllers/`: Fat Controller pattern by domain (AI, Auth, Session)
  - `models/`: Mongoose schemas for User, Session, Question
  - `middlewares/`: Auth, rate limiting, file upload
  - `utils/prompts.ts`: AI prompt templates for Groq
  - `routes/`: REST API endpoints
  - `tests/`: Jest + Supertest, organized by unit/integration
- **Frontend:**
  - `src/pages/`: Route-level containers (e.g., `InterviewPrep.tsx` is the main loop)
  - `src/components/`: Atomic UI elements (cards, loaders, modals)
  - `src/context/`, `src/hooks/`: Theme/User state via React Context & hooks
  - `src/utils/axiosInstance.ts`: Singleton Axios client

## 🔄 Developer Workflows

- **Backend:**
  - Start: `npm run dev` (nodemon)
  - Test: `npm test` or `npm run test:watch`
  - Coverage: `npm run test:coverage`
  - Env: Copy `.env.example` to `.env` and configure
- **Frontend:**
  - Start: `npm run dev` (Vite)
  - Build: `npm run build`
- **Testing:**
  - Use in-memory MongoDB for isolation
  - Mock Groq API with `nock` in tests
  - Test helpers in `tests/helpers/testUtils.ts`

## 🧩 Integration & Data Flow

- **AI Integration:**
  - Backend `aiController` builds prompts and calls Groq API (OpenAI-compatible)
  - Responses are sanitized and structured as JSON before returning to frontend
- **Auth:**
  - Dual JWT tokens (access/refresh), stored in localStorage
  - Refresh handled via `/api/auth/refresh-token` endpoint and frontend Axios interceptor
- **Session/Question Flow:**
  - Session creation triggers AI question generation, then persists to MongoDB
  - Frontend displays questions one-by-one, supports answer reveal/explanation

## 📝 Conventions & Tips

- Follow controller/route patterns for new features
- Always write/extend tests for new logic (unit/integration)
- Update `ARCHITECTURE.md` for major changes
- Use `utils/prompts.ts` for AI prompt logic
- Use `authMiddleware` for protected routes
- Keep frontend state logic in context/hooks, not global stores

## 📚 Reference Files

- [ARCHITECTURE.md](../ARCHITECTURE.md): Full system design, workflows, and conventions
- [backend/tests/](../backend/tests/): Test patterns and helpers
- [frontend/interview-prep-ai/src/utils/axiosInstance.ts](../frontend/interview-prep-ai/src/utils/axiosInstance.ts): API client setup
- [backend/utils/prompts.ts](../backend/utils/prompts.ts): AI prompt templates

---

For any unclear or missing conventions, consult `ARCHITECTURE.md` or ask for clarification before proceeding.
