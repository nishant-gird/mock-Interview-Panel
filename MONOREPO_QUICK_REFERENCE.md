# MIP Monorepo - Quick Reference

## 📁 Repository Structure (After Migration)

```
mip/
├── packages/
│   ├── backend/           NestJS backend API
│   └── frontend/          React TanStack frontend
├── docs/                  Documentation
├── .github/               CI/CD workflows
├── package.json           Root workspace config
├── pnpm-workspace.yaml    PNPM configuration
├── tsconfig.json          Shared TypeScript config
├── .npmrc                 PNPM settings
└── README.md              Main README
```

---

## 🚀 Common Commands

### Setup
```bash
# One-time setup after cloning
pnpm install
```

### Development
```bash
# Run all services in parallel
pnpm dev

# Run only backend
pnpm dev:backend
# Access: http://localhost:3000

# Run only frontend  
pnpm dev:frontend
# Access: http://localhost:5173
```

### Building
```bash
# Build all packages
pnpm build

# Build backend only
pnpm build:backend

# Build frontend only
pnpm build:frontend
```

### Testing
```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:cov

# Watch mode (for specific package)
pnpm --filter @mip/backend run test:watch
```

### Code Quality
```bash
# Check TypeScript compilation
pnpm type-check

# Lint all code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting (dry run)
pnpm format:check
```

### Package Management
```bash
# Add dependency to specific package
pnpm add -w --save-peer react              # Add to all
pnpm --filter @mip/backend add express     # Add to backend only

# Remove dependency
pnpm --filter @mip/frontend remove axios

# Check outdated packages
pnpm deps:check

# Update packages
pnpm deps:update
```

### Cleanup
```bash
# Remove node_modules and lock files
pnpm clean

# Remove only dist/coverage folders
pnpm clean:deps
```

---

## 🔗 Working with Workspaces

### Run Command in Specific Package
```bash
pnpm --filter @mip/backend <command>
pnpm --filter @mip/frontend <command>

# Example:
pnpm --filter @mip/backend run prisma:migrate
pnpm --filter @mip/frontend run build
```

### Run Command in All Packages
```bash
pnpm --recursive run <command>

# Example:
pnpm --recursive run lint
pnpm --recursive run build
```

### Run in Parallel
```bash
pnpm --recursive --parallel run dev
```

---

## 📦 Adding Dependencies

### To Root (Devtools, shared utilities)
```bash
pnpm add -w --save-dev prettier typescript

# The -w flag means workspace root
```

### To Specific Package
```bash
# To backend
pnpm --filter @mip/backend add express cors

# To frontend
pnpm --filter @mip/frontend add react-router-dom
```

### Development Dependencies
```bash
# Use --save-dev or -D
pnpm --filter @mip/backend add -D @types/express
```

---

## 📝 Common Tasks

### Backend Tasks
```bash
# Database migrations
pnpm --filter @mip/backend run prisma:migrate

# Seed database
pnpm --filter @mip/backend run prisma:seed

# Open Prisma Studio
pnpm --filter @mip/backend run prisma:studio

# Start backend dev server
pnpm dev:backend

# Run backend tests
pnpm --filter @mip/backend run test
```

### Frontend Tasks
```bash
# Start frontend dev server
pnpm dev:frontend

# Build for production
pnpm build:frontend

# Preview production build
pnpm --filter @mip/frontend run preview

# Run frontend tests
pnpm --filter @mip/frontend run test
```

---

## 🐛 Debugging

### Check TypeScript Errors
```bash
pnpm type-check
```

### Check Package Linking
```bash
ls -la node_modules/@mip/
# Should show symlinks to packages/
```

### View Dependency Graph
```bash
# List dependencies (pnpm specific)
pnpm list
pnpm list @mip/backend
```

### Clear Cache
```bash
pnpm store prune
```

---

## 📚 IDE Setup

### VS Code

**Install extensions:**
- ESLint
- Prettier
- TypeScript Vue Plugin

**Settings (.vscode/settings.json):**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### WebStorm/IntelliJ

- Right-click project → "Configure" → check "Automatically Detect"
- Settings → Languages & Frameworks → TypeScript → Use `<repository root>/node_modules/typescript/lib`

---

## 🔄 Updating the Monorepo

### Add a New Package
```bash
# 1. Create new package
mkdir packages/shared
cd packages/shared
npm init -y

# 2. Update pnpm-workspace.yaml (already includes packages/*)
# 3. Run
pnpm install
```

### Update All Dependencies
```bash
# Check what needs updating
pnpm deps:check

# Update everything
pnpm deps:update

# Or update specific package
pnpm --filter @mip/backend update
```

---

## 🚨 Troubleshooting

### "Cannot find module" errors
```bash
# Reinstall everything
pnpm install

# If that doesn't help:
pnpm clean
pnpm install
```

### Port already in use
```bash
# Backend uses port 3000
# Frontend uses port 5173
# Kill the process and restart:

# Find process (Linux/Mac)
lsof -i :3000
kill -9 <PID>

# Or change port in .env files
```

### TypeScript can't find types
```bash
# Restart TS server in your IDE
# Verify tsconfig.json paths are correct
# Check package.json names match @mip/* scope
```

### Slow `pnpm install`
```bash
# Use hard-links for faster subsequent installs
# This is already set in .npmrc (node-linker=hard-links)

# Or clear cache and reinstall
pnpm store prune
pnpm install
```

---

## 📖 Learn More

- [PNPM Official Docs](https://pnpm.io/)
- [Monorepo Architecture Guide](../../docs/architecture/)
- [Integration Guide](../../docs/setup/)

---

## 💡 Tips & Tricks

### One-liner to update all and rebuild
```bash
pnpm deps:update && pnpm build
```

### Watch specific package
```bash
pnpm --filter @mip/backend run test:watch
```

### Build in CI (don't cache, clean rebuild)
```bash
pnpm clean
pnpm install
pnpm build
```

### Commit only changed files
```bash
# Git will show what changed in the monorepo
git status
git add <specific-files>
git commit -m "..."
```
