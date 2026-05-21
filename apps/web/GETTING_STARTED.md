# Getting Started — MIP Frontend

This is a complete Next.js 14 frontend for the Mock Interview Panel (MIP) — an AI-powered mock interview platform.

## Quick Start

### 1. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install
```

### 2. Start Development Server

```bash
# From the root directory
pnpm dev

# Or from the web app directory
cd apps/web
pnpm dev
```

The app will be available at **http://localhost:3000**

### 3. Test the Flow

**Landing Page:**
- Visit http://localhost:3000
- Click "Get started"

**Sign Up:**
- Create an account (any email/password)
- You'll be directed to onboarding

**Onboarding:**
- Complete the 4-step wizard
- Redirects to dashboard

**Dashboard:**
- See your stats and recent sessions
- Click "Schedule your next interview"

**Schedule Interview:**
- 5-step wizard to set up an interview
- Select role, panel, difficulty, date/time

**Live Interview:**
- Click "Schedule interview" to go live
- Full-screen interview session with questions
- Timer, panel avatars, and notes

**Report:**
- After finishing, see your scored report
- Breakdown by skill
- Per-question feedback with Q&A

**Other Pages:**
- /sessions — View all past/scheduled interviews
- /progress — Charts, heatmap, trends
- /settings — Profile, account, notifications, billing

## Project Structure

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # Reusable UI components
│   │   ├── ui/                # Base UI (Button, Input, Card, etc.)
│   │   ├── layout/            # Layout components (Sidebar, Topbar, AppLayout)
│   │   ├── auth/              # Auth guard (RequireAuth)
│   │   ├── charts/            # Chart components (LineChart, RadarChart, Heatmap)
│   │   └── *.tsx              # Component modules (Avatar, StatCard, ProgressBar, etc.)
│   ├── context/               # React contexts (AuthContext, SessionsContext)
│   ├── hooks/                 # Custom hooks (useAuth, useToast)
│   ├── data/                  # Dummy data and types
│   ├── lib/                   # Utilities (cn, formatDate, scoreColor)
│   └── app/globals.css        # Design tokens and Tailwind
├── package.json               # Next.js app dependencies
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── public/                    # Static assets
```

## Tech Stack

- **Next.js 14** — React framework with App Router
- **TypeScript** — Strict mode for type safety
- **Tailwind CSS** — Utility-first CSS with design tokens
- **lucide-react** — Icon library
- **Recharts** — Charts and visualizations
- **clsx** — Class name utility
- **React Context** — Client-side state management

## Design System

All colors are defined as CSS variables in `src/app/globals.css`:

```css
--primary: 212 74% 37%;        /* #185FA5 - brand blue */
--muted: 210 20% 96%;          /* light gray */
--success: 142 71% 45%;        /* green */
--warning: 38 92% 50%;         /* yellow */
--danger: 0 84% 60%;           /* red */
```

All components use these tokens for a cohesive, themeable design.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/login` | Login form |
| `/signup` | Sign up form |
| `/onboarding` | 4-step onboarding wizard |
| `/dashboard` | Dashboard (requires auth) |
| `/schedule` | 5-step schedule wizard |
| `/sessions` | Interview sessions table |
| `/interview/:id` | Live interview (full-screen) |
| `/report/:id` | Interview report & feedback |
| `/progress` | Charts, heatmap, trends |
| `/settings` | Profile & account settings |

## Authentication

**Currently client-side only** — no real backend. All data persists in React Context (`useAuth()`) and reverts on page refresh.

To integrate a real backend:
1. Replace `AuthContext` with API calls
2. Add session storage (cookies/localStorage)
3. Implement API client for microservices

## Building for Production

```bash
# From root
pnpm build

# Or from apps/web
cd apps/web
pnpm build
pnpm start
```

## Troubleshooting

**"Module not found" errors:**
- Ensure you've run `pnpm install`
- Check TypeScript path aliases in `tsconfig.json`
- Rebuild with `pnpm turbo build`

**Charts not rendering:**
- Recharts requires a client component (already wrapped with `'use client'`)
- Ensure you're viewing /progress in the browser

**Context errors:**
- `useAuth()` must be called from a child of `<AuthProvider>`
- All app routes are wrapped by `(app)/layout.tsx` which includes AppLayout

**Port 3000 already in use:**
- Kill the process: `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill`
- Or specify a different port: `pnpm dev -- -p 3001`

## Development Commands

```bash
# From root directory
pnpm dev              # Start all services
pnpm build            # Build all workspaces
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript check
pnpm format           # Format with Prettier

# From apps/web directory
pnpm dev              # Next.js dev server
pnpm build            # Next.js production build
pnpm start            # Start production server
```

## Next Steps

1. **Integrate a real backend** — Connect to a Node.js/NestJS API
2. **Add persistent storage** — Use a database (PostgreSQL + Prisma)
3. **Real authentication** — JWT tokens, session management
4. **Payment integration** — Stripe for billing (Pro plan)
5. **Email notifications** — Send session reminders
6. **Analytics** — Track user engagement and metrics
7. **Video integration** — Actual video for interviews (Twilio, Mux)
8. **Real AI evaluation** — Use Claude API for actual scoring

## Support

For issues or questions:
- Check the `/docs` folder for more information
- Review the build spec at the root of the repo
- Examine the dummy data in `src/data/seed.ts`

---

**Status:** MVP ✅ All routes functional, styled, and ready for integration with a backend.
