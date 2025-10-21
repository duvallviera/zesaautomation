#!/bin/bash

# 🚀 Clean Redeploy Script for Vercel
# This script cleans up any cached configurations and redeploys

echo "🧹 Cleaning up previous deployments..."

# Remove any cached Vercel configurations
rm -rf .vercel
rm -rf .vercelignore

# Clean build directory
rm -rf dist

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "🚀 Deploying to Vercel..."
npx vercel --prod --force

echo "✅ Deployment complete!"
echo "🌐 Your app should be live at the provided URL"









