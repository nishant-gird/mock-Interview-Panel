# MIP (Mock Interview Panel) - Local Setup Guide

Complete step-by-step setup instructions for **Windows**, **macOS**, and **Linux**.

> **Latest Update:** TanStack Start + Vite + Lovable UI Integration

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation by Platform](#installation-by-platform)
3. [Project Setup](#project-setup)
4. [Running the Application](#running-the-application)
5. [Available Commands](#available-commands)
6. [Project Structure](#project-structure)
7. [Available Routes](#available-routes)
8. [Component Library](#component-library)
9. [Troubleshooting](#troubleshooting)
10. [Git Workflow](#git-workflow)

---

## 🔧 System Requirements

### All Platforms Require:
- **Node.js**: v20 LTS or higher ([Download](https://nodejs.org/))
- **npm**: v10 or higher (comes with Node.js)
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

#### **Step 2: Verify Installation**
Open **PowerShell** or **Command Prompt** and run:
```powershell
node -v
npm -v
git --version
```

#### **Step 3: Install Git** (if not already installed)
1. Go to [git-scm.com](https://git-scm.com/)
2. Click **Download for Windows**
3. Run the installer and keep all default options

---

### 🍎 MACOS Setup

#### **Step 1: Install Homebrew** (if not already installed)
Open **Terminal** and run:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### **Step 2: Install Node.js**
```bash
brew install node@20
brew link node@20
```

#### **Step 3: Verify Installation**
```bash
node --version    # Should be v20.x or higher
npm --version     # Should be v10.x or higher
git --version
```

#### **Step 4: Install Git** (usually pre-installed)
```bash
# Usually already installed, but if not:
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
npm install
```

**Expected Output:**
```
added 450+ packages in XX.Xs
```

> ℹ️ **Note:** First install may take 2-5 minutes. Subsequent installs are much faster.

### **Step 3: Verify Installation**

**All Platforms:**
```bash
npm --version
node --version
```

---

## 🚀 Running the Application

### **Start the Development Server**

**All Platforms:**
```bash
npm run dev
```

### **Expected Output:**

```
  ▲ TanStack Start
  - Local:        http://localhost:5173

✓ Built in 1.23s
```

> ℹ️ **Port Note:** If port 5173 is in use, Vite will automatically try 5174, 5175, etc.

### **Access the App in Browser**

1. Open your web browser (Chrome, Firefox, Safari, Edge, etc.)
2. Go to: **http://localhost:5173**
   - If that doesn't work, check the terminal output for the actual port
   - Common ports: 5173, 5174, 5175

### **Stop the Development Server**

In the terminal where the app is running, press:
```
Ctrl + C
```

---

## 📝 Available Commands

### **Development**

```bash
# Start dev server (Vite - fast reload)
npm run dev

# Build the app for production
npm run build

# Build in development mode
npm run build:dev

# Preview production build locally
npm run preview

# Run linting (ESLint)
npm run lint

# Format code with Prettier
npm run format
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
├── src/
│   ├── routes/                 # TanStack Router file-based routes (11 routes)
│   │   ├── __root.tsx          # Root layout
│   │   ├── index.tsx           # Home page (/)
│   │   ├── login.tsx           # /login
│   │   ├── signup.tsx          # /signup
│   │   ├── onboarding.tsx      # /onboarding
│   │   ├── dashboard.tsx       # /dashboard
│   │   ├── schedule.tsx        # /schedule
│   │   ├── sessions.tsx        # /sessions
│   │   ├── interview.$id.tsx   # /interview/:id
│   │   ├── report.$id.tsx      # /report/:id
│   │   ├── progress.tsx        # /progress
│   │   └── settings.tsx        # /settings
│   ├── components/
│   │   ├── AppLayout.tsx       # Main app layout
│   │   └── ui/                 # 60+ Radix UI + shadcn components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── textarea.tsx
│   │       ├── checkbox.tsx
│   │       ├── badge.tsx
│   │       ├── avatar.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── accordion.tsx
│   │       ├── tabs.tsx
│   │       ├── table.tsx
│   │       └── ... and 45+ more
│   ├── hooks/
│   │   └── use-mobile.tsx      # Mobile detection hook
│   ├── lib/
│   │   ├── utils.ts            # Utility functions
│   │   ├── error-capture.ts    # Error handling
│   │   └── error-page.ts       # Error page
│   ├── router.tsx              # TanStack Router config
│   ├── start.ts                # Server entry point
│   ├── server.ts               # Server configuration
│   ├── styles.css              # Global styles
│   └── routeTree.gen.ts        # Auto-generated route tree
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── components.json             # shadcn/ui component registry
├── eslint.config.js            # ESLint configuration
├── wrangler.jsonc              # Cloudflare Workers config
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Prettier formatting config
├── .prettierignore             # Files to ignore in formatting
├── package.json                # Dependencies and scripts
├── SETUP.md                    # This file
├── CHANGES_REVIEW.md           # Detailed changelog
└── COMMIT_GUIDE.md             # Commit instructions
```

---

## 🌐 Available Routes

After starting the dev server, access these routes:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `index.tsx` | Landing/Home page |
| `/login` | `login.tsx` | Login page |
| `/signup` | `signup.tsx` | Sign up page |
| `/onboarding` | `onboarding.tsx` | 4-step onboarding wizard |
| `/dashboard` | `dashboard.tsx` | Main dashboard |
| `/schedule` | `schedule.tsx` | Schedule interview wizard |
| `/sessions` | `sessions.tsx` | View past sessions |
| `/interview/:id` | `interview.$id.tsx` | Live interview (full-screen) |
| `/report/:id` | `report.$id.tsx` | Interview report and feedback |
| `/progress` | `progress.tsx` | Progress tracking with charts |
| `/settings` | `settings.tsx` | User settings |

---

## 🎨 Component Library

### **Available Components (60+)**

**From Radix UI + shadcn/ui:**

```
Buttons & Links:
  • Button
  • Toggle
  • Toggle Group

Forms & Input:
  • Input
  • Select
  • Textarea
  • Checkbox
  • Radio Group
  • Switch
  • Label
  • Form

Data Display:
  • Table
  • Badge
  • Avatar
  • Progress
  • Skeleton
  • Card
  • Alert

Overlays & Popovers:
  • Dialog
  • Alert Dialog
  • Drawer
  • Sheet
  • Popover
  • Hover Card
  • Tooltip
  • Context Menu
  • Dropdown Menu

Navigation:
  • Breadcrumb
  • Navigation Menu
  • Menubar
  • Sidebar

Content Organization:
  • Tabs
  • Accordion
  • Collapsible
  • Separator
  • Scroll Area

Media:
  • Carousel
  • Aspect Ratio

And more...
```

### **How to Use Components**

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Click me</Button>
    </Card>
  )
}
```

---

## 🆘 Troubleshooting

### **Issue: `npm: command not found`**

**Windows:**
```powershell
# Reinstall Node.js from nodejs.org
# Restart PowerShell after installation
```

**macOS/Linux:**
```bash
# Reinstall Node.js
brew install node@20
brew link node@20

# Refresh shell
source ~/.bashrc    # For bash
# or
source ~/.zshrc     # For zsh
```

---

### **Issue: Port 5173 already in use**

The app will automatically try ports 5174, 5175, etc.

Check the terminal output for which port was assigned.

**To manually kill the process:**

**Windows (PowerShell):**
```powershell
# Find process on port 5173
Get-NetTCPConnection -LocalPort 5173

# Kill it (replace PID with actual process ID)
Stop-Process -Id <PID> -Force
```

**macOS/Linux:**
```bash
# Find process on port 5173
lsof -i :5173

# Kill it (replace PID with actual process ID)
kill -9 <PID>
```

---

### **Issue: `git clone` fails**

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

### **Issue: `npm install` fails**

**All Platforms:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Try installing again
npm install
```

**Windows (if still failing):**
```powershell
# Run PowerShell as Administrator
# Then retry: npm install
```

---

### **Issue: App shows blank page**

1. **Check the browser console** for errors (Press `F12`)
2. **Wait 10-15 seconds** - Vite might still be compiling
3. **Refresh the page** - Press `F5` or `Ctrl+R` (Windows/Linux) or `Cmd+R` (macOS)
4. **Check terminal** - Look for error messages in the terminal running the dev server

---

### **Issue: TypeScript errors**

Errors are shown in the terminal and browser console. Check:
- Syntax errors in `src/` files
- Import paths are correct
- Component props are passed correctly

---

### **Verify Everything Works**

Run this health check:

**All Platforms:**
```bash
# Check all tools
echo "Node version:" && node --version
echo "NPM version:" && npm --version
echo "Git version:" && git --version

# Navigate to project
cd mock-Interview-Panel

# Install and start
npm install
npm run dev

# In browser, go to: http://localhost:5173
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
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
npm install

# Development
npm run dev                     # Start dev server
npm run build                   # Build for production
npm run lint                    # Check code quality
npm run format                  # Format code

# Git
git status                      # Check status
git add .                       # Stage all changes
git commit -m "message"         # Create commit
git push origin develop         # Push to develop
```

### **macOS/Linux Terminal**

```bash
# Setup
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
npm install

# Development
npm run dev                     # Start dev server
npm run build                   # Build for production
npm run lint                    # Check code quality
npm run format                  # Format code

# Git
git status                      # Check status
git add .                       # Stage all changes
git commit -m "message"         # Create commit
git push origin develop         # Push to develop
```

---

## 🎯 Getting Started (TL;DR)

**Copy and paste these commands:**

### **Windows (PowerShell):**
```powershell
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
npm install
npm run dev
```

Then open: **http://localhost:5173**

### **macOS/Linux (Terminal):**
```bash
git clone https://github.com/nishant-gird/mock-Interview-Panel.git
cd mock-Interview-Panel
npm install
npm run dev
```

Then open: **http://localhost:5173**

---

## 🎨 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **TanStack Start** | 1.167.50 | React framework |
| **Vite** | 7.3.1 | Build tool |
| **React** | 19.2.0 | UI library |
| **TanStack Router** | 1.168.25 | File-based routing |
| **TanStack Query** | 5.83.0 | State management |
| **Tailwind CSS** | 4.2.1 | Styling |
| **Radix UI** | Latest | Component library |
| **shadcn/ui** | Latest | Pre-built components |
| **TypeScript** | 5.8.3 | Type safety |
| **ESLint** | 9.32.0 | Code quality |
| **Prettier** | 3.7.3 | Code formatting |

---

## 📞 Need Help?

1. **Check this guide** - Most issues are covered in [Troubleshooting](#troubleshooting)
2. **Check the terminal** - Error messages often tell you what's wrong
3. **Check browser console** - Press `F12` to open Developer Tools
4. **Restart everything** - Stop the dev server and start again
5. **Read the docs**:
   - `CHANGES_REVIEW.md` - What changed
   - `COMMIT_GUIDE.md` - Commit information

---

## ✅ Success Checklist

- [ ] Node.js v20+ installed
- [ ] npm v10+ installed
- [ ] Git installed
- [ ] Repository cloned
- [ ] `npm install` completed without errors
- [ ] `npm run dev` running without errors
- [ ] App opens in browser at http://localhost:5173
- [ ] Can see home page
- [ ] Can click and navigate routes
- [ ] Can see Radix UI components loaded
- [ ] Can see Lovable design integration

---

## 🎉 You're All Set!

Start building! Your modern React stack is ready to go! 🚀

---

**For more information:**
- Read: `CHANGES_REVIEW.md` (What changed from old to new)
- Read: `COMMIT_GUIDE.md` (Commit history)
- Check: `src/` directory (Project structure)
- Explore: http://localhost:5173 (The app!)

---

Last Updated: 2026-05-22
Stack: TanStack Start + Vite + Lovable UI
