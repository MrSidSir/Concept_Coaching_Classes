# Concept Coaching Classes Frontend

A modern, full-featured Next.js (React + TypeScript + Tailwind CSS) frontend for Concept Coaching Classes.

## Features
- Google/Facebook Authentication (Firebase)
- Admin Panel: Faculty, Test, Video, Fee Management
- Student Dashboard: Notes, Test Schedule, Online Classes, Videos
- Redux Toolkit & React Query for state management
- TypeScript, Tailwind CSS, best practices

## Getting Started

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env.local` file in the `frontend` directory with your Firebase and YouTube API keys.
3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Folder Structure
- `app/` — Next.js app directory (pages, layouts, auth, admin, dashboard, student, etc.)
- `features/` — Redux slices, API logic
- `components/` — UI components
- `context/` — Auth context
- `hooks/` — Custom hooks
- `utils/` — Utility functions
- `firebase/` — Firebase config
- `types/` — TypeScript types
- `styles/` — Global styles

## Customization
- Update `tailwind.config.js` for your theme.
- Add your Firebase config in `src/firebase/config.ts`.
- Extend features as needed!

---
Built with ❤️ by Concept Coaching Classes 