# MIP (Mock Interview Panel) - Local Setup Guide

Complete step-by-step setup instructions for **Windows**, **macOS**, and **Linux**.

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation by Platform](#installation-by-platform)
3. [Project Setup](#project-setup)
4. [Running the Application](#running-the-application)
5. [Available Commands](#available-commands)
6. [Project Structure](#project-structure)
7. [Troubleshooting](#troubleshooting)
8. [Git Workflow](#git-workflow)

---

## 🔧 System Requirements

### All Platforms Require:
- **Node.js**: v20 LTS or higher ([Download](https://nodejs.org/))
- **pnpm**: v8 or higher (package manager)
- **Git**: v2.x or higher ([Download](https://git-scm.com/))
- **4GB RAM** minimum
- **2GB disk space** for project and dependencies

### Check Your System:
```bash
node --version      # Should be v20.x or higher
npm --version       # Should be v10.x or higher
git --version       # Should be v2.x or higher
```

---

## 💻 Installation by Platform

### 🪟 WINDOWS Setup

#### **Step 1: Install Node.js**
1. Go to [nodejs.org](https://nodejs.org/)
2. Click **"LTS"** (Long Term Support) - v20 or higher
3. Click **Download for Windows**
4. Run the `.msi` installer
5. Follow the installer steps (accept defaults)
6. **Important:** Check the box: `Add to PATH`
7. Restart your computer

#### **Step 2: Verify Node.js Installation**
Open **PowerShell** or **Command Prompt** and run:
```powershell
node -v
npm -v
```

#### **Step 3: Install pnpm Globally**
```powershell
npm install -g pnpm
pnpm --version    # Should show v8.x or higher
```

#### **Step 4: Install Git**
1. Go to [git-scm.com](https://git-scm.com/)
2. Click **Download for Windows**
3. Run the installer
4. Keep all default options

#### **Step 5: Verify Git Installation**
```powershell
git --version
```

---

### 🍎 MACOS Setup

#### **Step 1: Install Homebrew** (if not already installed)
Open **Terminal** and run:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### **Step 2: Install Node.js via Homebrew**
```bash
brew install node@20
brew link node@20
```

#### **Step 3: Verify Installation**
```bash
node --version    # Should be v20.x or higher
npm --version     # Should be v10.x or higher
```

#### **Step 4: Install pnpm Globally**
```bash
npm install -g pnpm
pnpm --version    # Should show v8.x or higher
```

#### **Step 5: Verify Git** (usually pre-installed on macOS)
```bash
git --version
```

If Git is not installed:
```bash
brew install git
```

---

### 🐧 LINUX Setup

#### **For Ubuntu/Debian:**

```bash
# Update package manager
sudo apt update

# Install Node.js (v20 LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Git
sudo apt install -y git

# Verify installations
node --version
npm --version
git --version
```

#### **For macOS via Homebrew** (see macOS section above)

#### **For Fedora/RHEL:**

```bash
# Install Node.js
sudo dnf install nodejs

# Install Git
sudo dnf install git

# Verify
node --version
git --version
```

#### **Step: Install pnpm Globally**
```bash
npm install -g pnpm
pnpm --version
```

---

## 📦 Project Setup

### **Step 1: Clone the Repository**

**Windows (PowerShell):**
```powershell
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
```

**macOS/Linux (Terminal):**
```bash
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
```

### **Step 2: Install Dependencies**

**All Platforms:**
```bash
pnpm install
```

**Expected Output:**
```
Progress: resolved 476, reused 61, downloaded 380, added 436
...
Done in XX.Xs using pnpm v10.33.4
```

> ℹ️ **Note:** First install may take 2-5 minutes. Subsequent installs are much faster.

### **Step 3: Verify Installation**

**All Platforms:**
```bash
pnpm --version
node --version
```

---

## 🚀 Running the Application

### **Start the Development Server**

**All Platforms:**
```bash
# Option 1: From root directory (runs all workspaces with Turbo)
pnpm dev

# Option 2: From web app directory (runs just the Next.js app)
cd apps/web
pnpm dev
```

### **Expected Output:**

```
> @mip/web@1.0.0 dev
> next dev

  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  ✓ Ready in 2.5s
```

> ℹ️ **Port Note:** If port 3000 is in use, Next.js will automatically try 3001, 3002, 3003, etc.

### **Access the App in Browser**

1. Open your web browser (Chrome, Firefox, Safari, Edge, etc.)
2. Go to: **http://localhost:3000**
   - If that doesn't work, check the terminal output for the actual port
   - Common ports: 3000, 3001, 3002, 3003

### **Stop the Development Server**

In the terminal where the app is running, press:
```
Ctrl + C
```

---

## 📝 Available Commands

### **Development**

```bash
# Start dev server (Turbo - all workspaces)
pnpm dev

# Start dev server (just Next.js web app)
cd apps/web && pnpm dev

# Build the app for production
pnpm build

# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Format code with Prettier
pnpm format

# Run tests
pnpm test
```

### **Git Commands**

```bash
# Check git status
git status

# See your changes
git diff

# Stage changes
git add .

# Commit changes
git commit -m "your commit message"

# Push to develop branch
git push origin develop

# Pull latest changes
git pull origin develop

# View commit history
git log --oneline
```

---

## 📁 Project Structure

```
mock-Interview-Panel/
├── apps/
│   └── web/                    # Next.js 14 frontend application
│       ├── src/
│       │   ├── app/            # App Router pages and layouts
│       │   ├── components/     # Reusable React components
│       │   ├── context/        # Auth and Sessions contexts
│       │   ├── data/           # Mock data and types
│       │   ├── hooks/          # Custom React hooks
│       │   └── lib/            # Utilities and helpers
│       ├── public/             # Static assets
│       ├── package.json        # App dependencies
│       ├── tsconfig.json       # TypeScript config
│       ├── next.config.js      # Next.js config
│       └── tailwind.config.ts  # Tailwind CSS config
├── packages/                   # Shared libraries (for future backend)
├── pnpm-workspace.yaml         # Monorepo workspace config
├── turbo.json                  # Turborepo pipeline config
├── tsconfig.base.json          # Base TypeScript config
├── package.json                # Root workspace package.json
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project README
```

---

## 🌐 Available Routes

After starting the dev server, access these routes:

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/login` | Login page |
| `/signup` | Sign up page |
| `/onboarding` | 4-step onboarding wizard |
| `/dashboard` | Main dashboard |
| `/schedule` | Schedule interview wizard |
| `/sessions` | View past sessions |
| `/interview/:id` | Live interview (full-screen) |
| `/report/:id` | Interview report |
| `/progress` | Progress tracking (charts) |
| `/settings` | User settings |

---

## 🆘 Troubleshooting

### **Common Issues & Solutions**

#### **Issue: `pnpm: command not found`**

**Windows:**
```powershell
# Reinstall pnpm
npm install -g pnpm

# Restart PowerShell/Command Prompt and try again
```

**macOS/Linux:**
```bash
# Reinstall pnpm
npm install -g pnpm

# Refresh shell
source ~/.bashrc    # For bash
# or
source ~/.zshrc     # For zsh
```

---

#### **Issue: Port 3000 already in use**

The app will automatically try ports 3001, 3002, 3003, etc.

Check the terminal output for which port was assigned.

**To manually kill the process:**

**Windows (PowerShell):**
```powershell
# Find process on port 3000
Get-NetTCPConnection -LocalPort 3000

# Kill it (replace PID with actual process ID)
Stop-Process -Id <PID> -Force
```

**macOS/Linux:**
```bash
# Find process on port 3000
lsof -i :3000

# Kill it (replace PID with actual process ID)
kill -9 <PID>
```

---

#### **Issue: `git clone` fails**

**Windows:**
```powershell
# Make sure Git is installed
git --version

# Try cloning with HTTPS
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
```

**macOS/Linux:**
```bash
# Make sure Git is installed
git --version

# If not installed, install it
# macOS: brew install git
# Ubuntu: sudo apt install git
```

---

#### **Issue: `pnpm install` fails with permission error**

**All Platforms:**
```bash
# Clear pnpm cache
pnpm store prune

# Remove lock file and try again
rm pnpm-lock.yaml
pnpm install
```

**Windows (if still failing):**
```powershell
# Run PowerShell as Administrator
# Then retry: pnpm install
```

---

#### **Issue: App shows blank white page**

1. **Check the browser console** for errors (Press `F12`)
2. **Wait 10-15 seconds** - Next.js might still be compiling
3. **Refresh the page** - Press `F5` or `Ctrl+R` (Windows/Linux) or `Cmd+R` (macOS)
4. **Check terminal** - Look for error messages in the terminal running the dev server

---

#### **Issue: TypeScript errors**

```bash
# Run type checking
pnpm type-check

# Check for any reported errors
```

If errors exist, check the `src/` directory for issues or contact the development team.

---

### **Verify Everything Works**

Run this health check:

**All Platforms:**
```bash
# Check all tools
echo "Node version:" && node --version
echo "NPM version:" && npm --version
echo "pnpm version:" && pnpm --version
echo "Git version:" && git --version

# Navigate to project
cd mock-Interview-Panel

# Install and start
pnpm install
pnpm dev

# In browser, go to: http://localhost:3000
```

---

## 📤 Git Workflow

### **Before You Start Work**

```bash
# Make sure you're on develop branch
git checkout develop

# Get latest changes
git pull origin develop
```

### **While You Work**

```bash
# Check what changed
git status

# See your changes
git diff

# Stage changes
git add .

# Commit your work
git commit -m "feat: your feature description"

# Push to remote
git push origin develop
```

### **Verify Your Push**

```bash
# Check your commits
git log --oneline -5

# Verify it's on GitHub
# Go to: https://github.com/nishant-gird/mock-Interview-Panel/commits/develop
```

---

## 📚 Quick Reference Cheat Sheet

### **Windows PowerShell**

```powershell
# Setup
npm install -g pnpm
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
pnpm install

# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm type-check            # Check TypeScript errors
pnpm lint                  # Run ESLint
pnpm format                # Format code

# Git
git status                 # Check status
git add .                  # Stage all changes
git commit -m "message"    # Create commit
git push origin develop    # Push to develop
```

### **macOS/Linux Terminal**

```bash
# Setup
npm install -g pnpm
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
pnpm install

# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm type-check            # Check TypeScript errors
pnpm lint                  # Run ESLint
pnpm format                # Format code

# Git
git status                 # Check status
git add .                  # Stage all changes
git commit -m "message"    # Create commit
git push origin develop    # Push to develop
```

---

## 🎯 Getting Started (TL;DR)

**Copy and paste these commands:**

### **Windows (PowerShell):**
```powershell
npm install -g pnpm
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
pnpm install
pnpm dev
```

Then open: **http://localhost:3000**

### **macOS/Linux (Terminal):**
```bash
npm install -g pnpm
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
pnpm install
pnpm dev
```

Then open: **http://localhost:3000**

---

## 📞 Need Help?

1. **Check this guide** - Most issues are covered in [Troubleshooting](#troubleshooting)
2. **Check the terminal** - Error messages often tell you what's wrong
3. **Check browser console** - Press `F12` to open Developer Tools
4. **Restart everything** - Stop the dev server and start again
5. **Contact the team** - Reach out on Slack or GitHub Issues

---

## ✅ Success Checklist

- [ ] Node.js v20+ installed
- [ ] pnpm v8+ installed
- [ ] Git installed
- [ ] Repository cloned
- [ ] `pnpm install` completed without errors
- [ ] `pnpm dev` running without errors
- [ ] App opens in browser at http://localhost:3000
- [ ] Can see landing page
- [ ] Can click "Sign up" button
- [ ] Can navigate through the app

---

**You're all set! Start building! 🚀**

Last Updated: May 2026
