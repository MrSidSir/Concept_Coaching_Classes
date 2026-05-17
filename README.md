# Concept Coaching Classes — by Mr. Sidsir

> **India's premium enterprise EdTech SaaS platform** — built for scalability, performance, and maintainability.

[![CI](https://github.com/MrSidSir/Concept_Coaching_Classes/actions/workflows/ci.yml/badge.svg)](https://github.com/MrSidSir/Concept_Coaching_Classes/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

**Concept Coaching Classes** is a full-stack, production-grade coaching platform offering:

- Free video lectures, study notes, and coding quizzes — **no login required**
- Full student dashboard with course progress and test history
- Enterprise admin CMS for content management
- Role-based authentication (student / teacher / admin / super_admin)
- Dark/Light theme with system preference detection

---

## Tech Stack

| Layer          | Technology                                                    |
|----------------|---------------------------------------------------------------|
| Framework      | Next.js 16 App Router (React 18)                             |
| Language       | TypeScript 5 (strict mode)                                   |
| Styling        | Tailwind CSS 3 + CSS design tokens                           |
| UI Library     | Material UI (MUI) 7                                          |
| Authentication | Firebase Auth (Google, Facebook, Email/Password)             |
| Database       | Firestore (normalized collections)                            |
| File Storage   | Firebase Storage (resumable uploads, progress tracking)      |
| Forms          | React Hook Form + Zod validation                             |
| Server State   | TanStack Query v5                                            |
| Client State   | Zustand / Redux Toolkit                                      |
| Animation      | Framer Motion                                                |
| Charts         | Recharts                                                     |
| Testing        | Vitest + React Testing Library + Playwright                  |
| CI/CD          | GitHub Actions → Vercel                                      |
| Deployment     | Vercel (edge runtime optimized)                              |

---

## Architecture

```
concept-coaching-classes/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Lint + Types + Unit Tests + Build
│       └── deploy.yml      # Auto-deploy to Vercel on main push
├── frontend/
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── (public)/         # Public routes (no auth)
│   │   │   ├── admin/            # Admin-only routes
│   │   │   ├── dashboard/        # Student dashboard
│   │   │   ├── api/              # API routes
│   │   │   ├── robots.ts         # SEO: robots.txt
│   │   │   ├── sitemap.ts        # SEO: sitemap.xml
│   │   │   └── layout.tsx        # Root layout
│   │   ├── components/
│   │   │   └── ui/               # Reusable UI primitives
│   │   ├── context/              # React Context (AuthContext)
│   │   ├── features/             # Feature-driven modules
│   │   ├── hooks/                # Custom hooks
│   │   ├── lib/
│   │   │   ├── env.ts            # Centralized env validation
│   │   │   └── firebase/         # Firebase initialization
│   │   ├── providers/            # App-level providers
│   │   ├── schemas/              # Zod validation schemas
│   │   ├── services/             # Firebase service layer
│   │   ├── tests/                # Unit + Integration + E2E tests
│   │   ├── types/                # TypeScript type definitions
│   │   └── utils/                # Utility functions
│   ├── public/                   # Static assets
│   ├── .env.example              # Environment variable template
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── vitest.config.ts
│   └── playwright.config.ts
├── firestore.rules               # Firebase security rules
├── .gitignore
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- Firebase project (see setup below)

### 1. Clone & Install

```bash
git clone git@github.com:MrSidSir/Concept_Coaching_Classes.git
cd Concept_Coaching_Classes/frontend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase credentials (see [Firebase Setup](#firebase-setup)).

### 3. Run Development Server

```bash
npm run dev
# → http://localhost:3000
```

---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) → Create Project
2. Enable **Authentication** → Sign-in methods: Google, Facebook, Email/Password
3. Create **Firestore Database** → Start in test mode, then apply `firestore.rules`
4. Enable **Firebase Storage**
5. Copy credentials from **Project Settings → Your apps → Web app**
6. Paste into `.env.local`

### Deploy Firestore Security Rules

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ✅ | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ✅ | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ✅ | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ✅ | Firebase app ID |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | Optional | YouTube Data API v3 key |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | Optional | YouTube channel ID |
| `NEXT_PUBLIC_SENTRY_DSN` | Optional | Sentry error tracking DSN |

> **Never commit `.env.local`** — it is in `.gitignore`

---

## Available Scripts

```bash
npm run dev           # Development server (Turbopack)
npm run build         # Production build
npm run start         # Production server
npm run lint          # ESLint check
npm run lint:fix      # Auto-fix lint errors
npm run type-check    # TypeScript type checking
npm run test          # Run unit tests (Vitest)
npm run test:watch    # Unit tests in watch mode
npm run test:coverage # Unit tests + coverage report
npm run test:e2e      # End-to-end tests (Playwright)
npm run test:all      # type-check + lint + unit tests
```

---

## Testing

### Unit & Integration (Vitest + RTL)

```bash
npm run test            # Run all unit tests
npm run test:coverage   # Generate coverage report (HTML in coverage/)
```

Tests live in `src/tests/`:
- `unit/` — utility functions, Zod schemas, services
- `components/` — React component tests
- `e2e/` — Playwright end-to-end tests

### E2E (Playwright)

```bash
npm run test:e2e         # Headless
npm run test:e2e:ui      # Playwright UI mode
```

---

## Database Schema (Firestore)

| Collection | Description |
|---|---|
| `users` | User profiles with role, status |
| `videos` | Video lectures (YouTube/uploaded) |
| `notes` | Study material & PDFs |
| `quizzes` | MCQ & coding quizzes |
| `courses` | Course catalog |
| `batches` | Course batches |
| `tests` | Scheduled tests |
| `results` | Quiz/test results |
| `attendance` | Class attendance |
| `announcements` | Admin broadcasts |
| `payments` | Fee records |
| `analytics` | Usage analytics |

---

## Role-Based Access Control

| Role | Access |
|---|---|
| `public` | Videos, Notes, Quizzes (read-only) |
| `student` | + Dashboard, enrolled courses, test attempts |
| `teacher` | + Upload content, create tests |
| `admin` | + Full CMS, student management, analytics |
| `super_admin` | + Role management, system config |

---

## Deployment (Vercel)

### Manual

```bash
npm install -g vercel
vercel --prod
```

### CI/CD (Automatic)

Push to `main` → GitHub Actions runs CI → Auto-deploys to Vercel.

**Required GitHub Secrets:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| First Contentful Paint | < 1.2s |
| Time to Interactive | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Core Web Vitals | All Green |

---

## Security

- Firebase Auth for identity management
- Firestore Security Rules for data access control
- RBAC middleware (`proxy.ts`) for route protection
- CSP + security headers via `next.config.js`
- File type + size validation before upload
- Environment variables never committed to git
- Input sanitization via Zod schemas

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## Contact

**Mr. Sidsir**
- Email: irshad1554@gmail.com
- Mobile: +91-7355534404
- GitHub: [@MrSidSir](https://github.com/MrSidSir)

---

© 2025 Concept Coaching Classes. All rights reserved.
