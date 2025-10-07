@echo off
REM 🚀 Clean Redeploy Script for Vercel (Windows)
REM This script cleans up any cached configurations and redeploys

echo 🧹 Cleaning up previous deployments...

REM Remove any cached Vercel configurations
if exist .vercel rmdir /s /q .vercel
if exist .vercelignore del .vercelignore

REM Clean build directory
if exist dist rmdir /s /q dist

echo 📦 Installing dependencies...
npm install

echo 🔨 Building project...
npm run build

echo 🚀 Deploying to Vercel...
npx vercel --prod --force

echo ✅ Deployment complete!
echo 🌐 Your app should be live at the provided URL
pause
