# MIP Monorepo Migration Guide

## 🎯 Overview
This guide walks through converting the MIP repository from a multi-repo structure to a proper PNPM monorepo structure **without breaking anything**.

## ⏱️ Estimated Time: 30-45 minutes

---

## Phase 1: Preparation (5 minutes)

### 1.1 Backup Current State
```bash
cd /c/MIP
git status                    # Verify clean working directory
git branch -b monorepo-setup  # Create feature branch
```

### 1.2 Verify Prerequisites
```bash
# Check Node.js version (should be 18+)
node --version

# Install pnpm globally (if not already)
npm install -g pnpm

# Verify installation
pnpm --version  # Should be 8.0.0 or higher
```

---

## Phase 2: Create Root Configuration (10 minutes)

### 2.1 Create Root `package.json`
```bash
cd /c/MIP
cp package.json.template package.json
```

**Then edit `/c/MIP/package.json` to match your project details** (update name, repo URL, etc.)

### 2.2 Create `pnpm-workspace.yaml`
```bash
cp pnpm-workspace.yaml.template pnpm-workspace.yaml
```

### 2.3 Create `.npmrc`
```bash
cp .npmrc.template .npmrc
```

### 2.4 Create Root `tsconfig.json`
```bash
cp tsconfig.json.template tsconfig.json
```

### 2.5 Verify These Files Exist
```bash
ls -la /c/MIP/*.json
ls -la /c/MIP/*.yaml
ls -la /c/MIP/.npmrc
```

Expected output:
```
-rw-r--r-- ... package.json
-rw-r--r-- ... pnpm-workspace.yaml
-rw-r--r-- ... tsconfig.json
-rw-r--r-- ... .npmrc
```

---

## Phase 3: Create Monorepo Structure (10 minutes)

### 3.1 Create `packages/` Directory
```bash
cd /c/MIP
mkdir -p packages
```

### 3.2 Move Backend Package
```bash
# Rename and move to packages/ directory
mv mip-backend packages/backend

# Verify move
ls -la /c/MIP/packages/backend/
```

### 3.3 Move Frontend Package
```bash
# Rename and move to packages/ directory
mv mock-Interview-Panel packages/frontend

# Verify move
ls -la /c/MIP/packages/frontend/
```

### 3.4 Verify Package Structure
```bash
tree -L 2 /c/MIP/packages/

# Expected:
# /c/MIP/packages/
# ├── backend/
# │   ├── src/
# │   ├── package.json
# │   └── ...
# └── frontend/
#     ├── src/
#     ├── package.json
#     └── ...
```

---

## Phase 4: Update Package Names (5 minutes)

### 4.1 Update Backend `package.json`

Edit `/c/MIP/packages/backend/package.json`:

**Find:**
```json
{
  "name": "mip-backend",
  "version": "0.0.1",
  ...
}
```

**Replace with:**
```json
{
  "name": "@mip/backend",
  "version": "1.0.0",
  ...
}
```

### 4.2 Update Frontend `package.json`

Edit `/c/MIP/packages/frontend/package.json`:

**Find:**
```json
{
  "name": "tanstack_start_ts",
  "private": true,
  ...
}
```

**Replace with:**
```json
{
  "name": "@mip/frontend",
  "private": true,
  ...
}
```

### 4.3 Verify Changes
```bash
cat /c/MIP/packages/backend/package.json | grep '"name"'
cat /c/MIP/packages/frontend/package.json | grep '"name"'

# Expected:
# "name": "@mip/backend"
# "name": "@mip/frontend"
```

---

## Phase 5: Move Documentation (5 minutes)

### 5.1 Create Documentation Structure
```bash
cd /c/MIP
mkdir -p docs/architecture
mkdir -p docs/setup
mkdir -p docs/guides
```

### 5.2 Move Architecture Documentation
```bash
mv AI_LAYER_EXPLANATION.md docs/architecture/
mv AI_PROVIDER_ARCHITECTURE.md docs/architecture/
mv CODE_FLOW_EXPLANATION.md docs/architecture/
```

### 5.3 Move Setup Documentation
```bash
mv SARVAM_AI_INTEGRATION_SUMMARY.md docs/setup/
mv SARVAM_AI_SETUP.md docs/setup/
mv INTEGRATION_GUIDE.md docs/setup/
```

### 5.4 Create Documentation Index
```bash
cat > /c/MIP/docs/README.md << 'EOF'
# MIP Documentation

## Architecture
- [AI Layer Explanation](./architecture/AI_LAYER_EXPLANATION.md)
- [AI Provider Architecture](./architecture/AI_PROVIDER_ARCHITECTURE.md)
- [Code Flow](./architecture/CODE_FLOW_EXPLANATION.md)

## Setup & Integration
- [Sarvam AI Setup](./setup/SARVAM_AI_SETUP.md)
- [Integration Guide](./setup/INTEGRATION_GUIDE.md)
- [Sarvam AI Integration Summary](./setup/SARVAM_AI_INTEGRATION_SUMMARY.md)

## Guides
- Coming soon...
EOF
```

### 5.5 Verify Documentation Structure
```bash
tree /c/MIP/docs/

# Expected:
# /c/MIP/docs/
# ├── README.md
# ├── architecture/
# │   ├── AI_LAYER_EXPLANATION.md
# │   ├── AI_PROVIDER_ARCHITECTURE.md
# │   └── CODE_FLOW_EXPLANATION.md
# ├── setup/
# │   ├── INTEGRATION_GUIDE.md
# │   ├── SARVAM_AI_INTEGRATION_SUMMARY.md
# │   └── SARVAM_AI_SETUP.md
# └── guides/
```

---

## Phase 6: Install Dependencies (5 minutes)

### 6.1 Remove Old Lock Files (if any)
```bash
cd /c/MIP

# Remove old lock files from each package
rm -f packages/backend/package-lock.json
rm -f packages/backend/pnpm-lock.yaml
rm -f packages/frontend/package-lock.json
rm -f packages/frontend/pnpm-lock.yaml
```

### 6.2 Install All Workspaces
```bash
cd /c/MIP
pnpm install

# This will:
# 1. Create a root node_modules/
# 2. Link workspace packages
# 3. Install all dependencies
# 4. Create pnpm-lock.yaml
```

⏳ **This may take 3-5 minutes. Be patient.**

### 6.3 Verify Installation
```bash
# Check root node_modules
ls /c/MIP/node_modules/ | head -20

# Check that workspace packages are linked
ls -la /c/MIP/node_modules/@mip/

# Expected output showing symlinks:
# lrwxr-xr-x ... @mip/backend -> ../packages/backend
# lrwxr-xr-x ... @mip/frontend -> ../packages/frontend
```

---

## Phase 7: Verify Everything Works (5 minutes)

### 7.1 Type Check
```bash
pnpm type-check

# Should complete without errors
```

### 7.2 Lint All Packages
```bash
pnpm lint

# Should complete without errors
# (Or with only pre-existing errors)
```

### 7.3 Test All Packages
```bash
pnpm test

# Should complete without errors
```

### 7.4 Build All Packages
```bash
pnpm build

# Should complete without errors
```

### 7.5 Test Individual Package Scripts

**Backend:**
```bash
pnpm --filter @mip/backend run build
pnpm --filter @mip/backend run start:dev
```

**Frontend:**
```bash
pnpm --filter @mip/frontend run build
pnpm --filter @mip/frontend run dev
```

---

## Phase 8: Commit Changes (5 minutes)

### 8.1 Check What Changed
```bash
cd /c/MIP
git status
```

### 8.2 Stage Files
```bash
# Stage all changes
git add .

# Or stage selectively
git add package.json pnpm-workspace.yaml tsconfig.json .npmrc
git add packages/
git add docs/
```

### 8.3 Create Commit
```bash
git commit -m "refactor: restructure as pnpm monorepo

- Create root package.json with workspace configuration
- Move backend to packages/backend with @mip/backend scope
- Move frontend to packages/frontend with @mip/frontend scope
- Organize documentation in docs/ folder
- Add root TypeScript and ESLint configuration
- Add pnpm-workspace.yaml and .npmrc
- Update root-level build/dev/lint scripts"
```

### 8.4 Verify Commit
```bash
git log --oneline -5

# Should show your new commit at the top
```

---

## Phase 9: Optional - Update CI/CD Workflows

If you have GitHub Actions workflows, update them:

### 9.1 Example: `.github/workflows/test.yml`
```yaml
name: Test

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm type-check
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

---

## Phase 10: Troubleshooting

### Problem: `pnpm install` fails with peer dependency errors
```bash
# Solution: Use auto-install-peers
pnpm install --auto-install-peers

# Or update .npmrc:
# auto-install-peers=true
```

### Problem: Build fails after migration
```bash
# Clean everything and reinstall
pnpm clean
pnpm install
pnpm build
```

### Problem: TypeScript can't find workspace packages
```bash
# Verify tsconfig.json path aliases are correct
# Verify package names in package.json match @mip/* scope
# Restart TypeScript server in your IDE
```

### Problem: Can't run `pnpm --filter` commands
```bash
# Verify package names in package.json:
cat packages/backend/package.json | grep '"name"'
cat packages/frontend/package.json | grep '"name"'

# Should show:
# "@mip/backend"
# "@mip/frontend"
```

---

## ✅ Verification Checklist

Before considering this complete:

- [ ] Root `package.json` exists with workspaces config
- [ ] `pnpm-workspace.yaml` exists
- [ ] Both packages are in `packages/` directory
- [ ] Package names updated to `@mip/backend` and `@mip/frontend`
- [ ] Documentation moved to `docs/` folder
- [ ] `pnpm install` completes successfully
- [ ] `pnpm build` works
- [ ] `pnpm test` works
- [ ] `pnpm lint` works
- [ ] `pnpm dev` can start services
- [ ] Git commit created with all changes
- [ ] Verified on feature branch before merging

---

## 🎉 Next Steps

1. **Test the monorepo on this branch**
   ```bash
   pnpm dev  # Start all services
   ```

2. **Create a pull request** for code review

3. **Once approved and tests pass, merge to main**

4. **Update documentation** with new setup instructions

5. **Share with team** on how to work with the monorepo

---

## 📖 New Team Workflow

### First Time Setup
```bash
git clone <repo>
cd MIP
pnpm install
```

### Development
```bash
# Start all services in parallel
pnpm dev

# Or start specific service
pnpm dev:backend
pnpm dev:frontend
```

### Building
```bash
# Build everything
pnpm build

# Build specific package
pnpm build:backend
pnpm build:frontend
```

### Linting & Testing
```bash
pnpm lint       # Lint all packages
pnpm lint:fix   # Fix lint issues
pnpm test       # Run all tests
pnpm format     # Format all code
```

---

## 📚 More Resources

- [PNPM Documentation](https://pnpm.io/)
- [PNPM Workspaces](https://pnpm.io/workspaces)
- [Monorepo Tools Comparison](https://monorepo.tools/)
- [Node Modules Best Practices](https://pnpm.io/motivation#creating-a-non-flat-node_modules-directory)
