# MIP — Mock Interview Panel

An AI-powered mock interview scheduling and session platform. Practice technical, HR, and managerial interviews with an AI panel. Get instant, detailed feedback and track your progress over time.

> 📖 **[Complete Setup Guide (SETUP.md)](./SETUP.md)** — Step-by-step instructions for Windows, macOS, and Linux
>
> 🎨 **[Lovable UI Integration (LOVABLE_INTEGRATION.md)](./LOVABLE_INTEGRATION.md)** — How to design components in Lovable and export to MIP
>
> 🎯 **[Lovable Pixel Perfect Integration (LOVABLE_PIXEL_PERFECT.md)](./LOVABLE_PIXEL_PERFECT.md)** — Export your Lovable app URL and integrate exactly

## Quick Start

### Prerequisites
- Node.js 20+ (LTS)
- pnpm 8+
- Git 2.x+

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server (all services)
pnpm dev

# Visit http://localhost:3000
```

### Project Structure

This is a Turborepo monorepo with the following structure:

```
├── apps/
│   └── web/              # Next.js 14 frontend (MIP)
├── packages/             # Shared libraries (future)
├── docs/                 # Documentation
├── scripts/              # Utility scripts
├── turbo.json           # Turborepo config
└── pnpm-workspace.yaml  # Workspace definition
```

### Available Scripts

- `pnpm dev` — Start development server (all workspaces)
- `pnpm build` — Build all workspaces
- `pnpm lint` — Run ESLint on all code
- `pnpm type-check` — TypeScript type checking
- `pnpm test` — Run tests
- `pnpm format` — Format code with Prettier
- `pnpm generate:docs` — Generate setup guide PDF

### Tech Stack

- **Frontend:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3 with CSS variables
- **Icons:** lucide-react
- **Charts:** Recharts
- **State:** React Context (client-side only in v1)

### Features

- 🎯 AI-powered mock interviews
- 📊 Live session scoring and feedback
- 📈 Progress tracking with charts and heatmaps
- 🎨 Professional, clean UI with Tailwind CSS
- 📱 Responsive design (1024px+)
- ✨ No backend required in v1 — all data is client-side

### Project Status

**Phase:** MVP — All routes and pages implemented, fully functional client-side demo.

### License

MIT
