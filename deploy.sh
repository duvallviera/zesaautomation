#!/bin/bash

# 🚀 SEZA Contact Form Deployment Script
# 🔧 Full-Stack Engineer - Automated deployment

echo "🌟 SEZA Team Contact Form - Production Deployment"
echo "=================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating template..."
    cat > .env << EOF
# Google Cloud Configuration
VITE_GOOGLE_API_KEY=your_gmail_api_key_here
VITE_GOOGLE_CLIENT_ID=665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com
VITE_GOOGLE_PROJECT_ID=zesaautomation
VITE_GOOGLE_SERVICE_ACCOUNT=seza.studio.website@gmail.com

# Production Configuration
VITE_APP_URL=https://your-project-name.vercel.app
VITE_APP_NAME=SEZA Team Contact Form
EOF
    echo "✅ .env template created. Please add your Gmail API key!"
    echo "📝 Edit .env file and add your VITE_GOOGLE_API_KEY"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Type check
echo "🔍 Running type check..."
npm run type-check

# Build for production
echo "🏗️  Building for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    npx vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "📧 Your contact form is now live!"
        echo "🔗 Visit your Vercel URL to test the form"
        echo ""
        echo "📋 Next steps:"
        echo "1. Test form submission"
        echo "2. Check email delivery"
        echo "3. Verify automated responses"
        echo "4. Monitor analytics"
    else
        echo "❌ Deployment failed. Check Vercel logs."
        exit 1
    fi
else
    echo "❌ Build failed. Check the errors above."
    exit 1
fi

echo ""
echo "🌟 SEZA Team - Consciousness-Driven Automation"
echo "📧 duvallviera@gmail.com"
echo "🌐 www.sezateamengineers.com"
