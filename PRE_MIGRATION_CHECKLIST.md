# Pre-Migration Checklist

**Before you start the migration, verify all these items:**

---

## ✅ Environment Prerequisites

- [ ] **Node.js Version**
  - Run: `node --version`
  - Required: `18.0.0` or higher
  - Recommended: `20.x` or `22.x`

- [ ] **PNPM Installation**
  - Run: `npm install -g pnpm`
  - Verify: `pnpm --version`
  - Required: `8.0.0` or higher

- [ ] **Git Setup**
  - Run: `git config --global user.name` and `git config --global user.email`
  - Current branch: `master` or `main`
  - Status: `git status` shows clean repository (no uncommitted changes)

- [ ] **Disk Space**
  - At least **5GB** free space (for dependencies + build artifacts)
  - Check: `df -h` or system storage settings

---

## ✅ Repository Prerequisites

- [ ] **Git History**
  - Repository has valid commit history
  - No conflicting branches
  - Test: `git log --oneline` shows commits

- [ ] **Remote Connection**
  - Run: `git remote -v`
  - Shows correct GitHub/GitLab remote

- [ ] **Existing Packages**
  - [ ] `mip-backend/package.json` exists and valid
  - [ ] `mock-Interview-Panel/package.json` exists and valid
  - [ ] Both have `src/` directories
  - [ ] Both build successfully: 
    ```bash
    cd mip-backend && npm run build
    cd ../mock-Interview-Panel && npm run build
    ```

---

## ✅ Documentation Prerequisites

- [ ] **Documentation Files Present**
  - [ ] `AI_LAYER_EXPLANATION.md` exists
  - [ ] `AI_PROVIDER_ARCHITECTURE.md` exists
  - [ ] `CODE_FLOW_EXPLANATION.md` exists
  - [ ] `INTEGRATION_GUIDE.md` exists
  - [ ] `SARVAM_AI_INTEGRATION_SUMMARY.md` exists
  - [ ] `SARVAM_AI_SETUP.md` exists

- [ ] **No Conflicting Docs**
  - No `docs/` directory already exists (or empty)
  - No conflicts with planned documentation structure

---

## ✅ Configuration Files

- [ ] **Root Files**
  - [ ] No `package.json` exists at root level (yet)
  - [ ] No `pnpm-workspace.yaml` exists
  - [ ] No root `tsconfig.json` exists
  - [ ] No root `.npmrc` exists

- [ ] **Package-Level Configs**
  - [ ] `mip-backend/tsconfig.json` exists
  - [ ] `mock-Interview-Panel/tsconfig.json` exists (or uses default)

---

## ✅ Dependencies & Build

- [ ] **Backend Builds**
  ```bash
  cd mip-backend
  npm install
  npm run build  # Should succeed
  ```

- [ ] **Frontend Builds**
  ```bash
  cd mock-Interview-Panel
  npm install
  npm run build  # Should succeed
  ```

- [ ] **No Conflicting Versions**
  - [ ] Each package has its own `node_modules/`
  - [ ] Each has `package-lock.json` or similar
  - [ ] No errors in current build process

---

## ✅ Team Communication

- [ ] **Team Informed**
  - Notify team about upcoming changes
  - Share timeline (will take 30-45 min)
  - Plan the work during slow period (not mid-sprint)

- [ ] **Branch Protection**
  - Confirm `main`/`master` branch has protection enabled
  - PR reviews required before merge
  - CI/CD checks must pass

- [ ] **Documentation Shared**
  - [ ] Share `MONOREPO_IMPLEMENTATION_SUMMARY.md`
  - [ ] Share `MONOREPO_QUICK_REFERENCE.md`
  - Share estimated timeline with team

---

## ✅ Backup & Safety

- [ ] **Local Backup**
  - [ ] Entire `/MIP` directory backed up (optional but recommended)
  - Or rely on Git (you can always revert)

- [ ] **Git Branch**
  - [ ] Create feature branch: `git checkout -b monorepo-setup`
  - [ ] Don't work on `main` or `master`
  - [ ] This branch is isolated and safe

- [ ] **CI/CD Status**
  - [ ] All current CI checks are passing
  - [ ] No active deployments
  - [ ] Stable state before changes

---

## ✅ Hardware & Network

- [ ] **Stable Internet**
  - Not on unstable WiFi
  - Good connection speed (for `pnpm install`)

- [ ] **System Performance**
  - [ ] Computer not heavily loaded
  - [ ] No critical processes running
  - [ ] Disk not nearly full
  - [ ] No background updates/scans

- [ ] **Power**
  - [ ] Laptop plugged in or well-charged
  - [ ] Will be available for 45+ minutes

---

## ✅ IDE / Editor Setup

- [ ] **VS Code / WebStorm / IDE Ready**
  - [ ] IDE closed or set to reload workspaces
  - [ ] No unsaved changes in editor
  - [ ] Ready to reload after migration

- [ ] **Terminal Ready**
  - [ ] Terminal or shell open and ready
  - [ ] Currently in `/c/MIP` or `/mip` directory
  - [ ] Can execute bash commands

---

## ✅ Documentation & Resources

- [ ] **Have These Files Ready**
  - [ ] `MONOREPO_STRUCTURE_REVIEW.md` - For understanding
  - [ ] `MIGRATION_GUIDE.md` - Step-by-step instructions
  - [ ] `MONOREPO_QUICK_REFERENCE.md` - Commands reference
  - [ ] `MONOREPO_VISUAL_GUIDE.md` - Visual structure guide
  - [ ] `package.json.template` - Template for root config
  - [ ] `pnpm-workspace.yaml.template` - Template for workspace config
  - [ ] `.npmrc.template` - Template for npm config
  - [ ] `tsconfig.json.template` - Template for TypeScript config

- [ ] **Bookmarked Resources**
  - [ ] PNPM documentation: https://pnpm.io/
  - [ ] PNPM Workspaces: https://pnpm.io/workspaces
  - [ ] Monorepo tools: https://monorepo.tools/

---

## ✅ Final Verification

### Run This Command Set Before Starting:
```bash
# Navigate to repo
cd /c/MIP

# Verify clean state
git status

# Verify Node/PNPM
node --version
npm --version
pnpm --version

# Verify packages can build
cd mip-backend && npm run build && cd ..
cd mock-Interview-Panel && npm run build && cd ..

# Verify documentation files
ls -la *.md | grep -E "AI_|INTEGRATION|SARVAM|CODE_FLOW"
```

**Expected Output:**
```
✓ git status shows clean repository
✓ node --version shows 18.0.0 or higher
✓ pnpm --version shows 8.0.0 or higher
✓ Both packages build successfully
✓ All 6 documentation files present
```

---

## 📋 Pre-Migration Checklist Summary

### Category: Environment
- [ ] Node.js 18+
- [ ] PNPM 8+
- [ ] Git configured
- [ ] 5GB+ disk space
- [ ] Stable internet
- [ ] Computer not loaded

### Category: Repository
- [ ] Clean git status
- [ ] No uncommitted changes
- [ ] Correct remote configured
- [ ] All packages present
- [ ] All packages build

### Category: Documentation
- [ ] All 6 doc files present
- [ ] No conflicts with `docs/` folder
- [ ] All templates available

### Category: Team & Process
- [ ] Team informed
- [ ] Feature branch ready
- [ ] CI/CD stable
- [ ] No active deployments

---

## 🚀 Ready to Start?

If you have checked all boxes above, you're ready to:

1. **Start the migration** following `MIGRATION_GUIDE.md`
2. **Use the templates** provided
3. **Run the commands** as documented
4. **Test thoroughly** with `pnpm build`, `pnpm test`, `pnpm dev`

---

## 🆘 If Something Fails

1. **Stop immediately** - Don't force ahead
2. **Check this list** - Did you verify prerequisites?
3. **Read the error** - What exactly failed?
4. **Check `MIGRATION_GUIDE.md` troubleshooting** - Similar issue?
5. **Revert if needed** - `git reset --hard` gets you back
6. **Try again** - Start from Phase 1 of migration guide

---

## ✅ Go/No-Go Decision

**All boxes checked?** → ✅ **Ready to proceed!**

**Some boxes unchecked?** → ⏸️ **Fix those items first**

**Any blockers?** → 🔧 **Troubleshoot or reschedule**

---

**Remember: This is a non-breaking change that can be reverted. Take your time and follow the steps carefully.**
