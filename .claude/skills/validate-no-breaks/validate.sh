#!/bin/bash
set -e

echo "=== Mock Interview Panel Validation ==="
echo ""

cd "c:/MIP/mock-Interview-Panel" || exit 1

echo "Step 1: TypeScript Type Checking..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript check failed"
  exit 1
fi
echo "✅ TypeScript check passed"
echo ""

echo "Step 2: ESLint Validation..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ ESLint check failed"
  exit 1
fi
echo "✅ ESLint check passed"
echo ""

echo "Step 3: Vite Build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi
echo "✅ Build passed"
echo ""

echo "=== ✅ All checks passed! Nothing is breaking. ==="
