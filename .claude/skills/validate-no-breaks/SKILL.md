---
name: validate-no-breaks
description: "Verify that no code changes are breaking the build. Runs TypeScript type checking, ESLint, and builds the project."
---

# Validate No Breaks

Comprehensive validation to ensure code changes don't break the project. Runs in order:
1. **TypeScript type checking** — catches compilation errors
2. **ESLint validation** — enforces code quality rules
3. **Vite build** — validates the full build pipeline

## Usage

Use this skill after making changes to verify nothing is broken:

```
/validate-no-breaks
```

## What It Checks

| Check | Command | Purpose |
|-------|---------|---------|
| Types | `npx tsc --noEmit` | Ensures no TypeScript errors |
| Lint | `npm run lint` | Checks code style and patterns |
| Build | `npm run build` | Full production build validation |

## Expected Output

✅ **Success**: All checks pass, no errors  
❌ **Failure**: Detailed error messages with file locations and fixes

## Notes

- Runs from `mock-Interview-Panel/` directory
- Stops at first failure to surface issues quickly
- Check error output for specific fixes needed
- TypeScript errors block other checks (fix types first)
