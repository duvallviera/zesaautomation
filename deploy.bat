@echo off
REM 🚀 SEZA Contact Form Deployment Script (Windows)
REM 🔧 Full-Stack Engineer - Automated deployment

echo 🌟 SEZA Team Contact Form - Production Deployment
echo ==================================================

REM Check if .env file exists
if not exist .env (
    echo ⚠️  .env file not found. Creating template...
    (
        echo # Google Cloud Configuration
        echo VITE_GOOGLE_API_KEY=your_gmail_api_key_here
        echo VITE_GOOGLE_CLIENT_ID=665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com
        echo VITE_GOOGLE_PROJECT_ID=zesaautomation
        echo VITE_GOOGLE_SERVICE_ACCOUNT=seza.studio.website@gmail.com
        echo.
        echo # Production Configuration
        echo VITE_APP_URL=https://your-project-name.vercel.app
        echo VITE_APP_NAME=SEZA Team Contact Form
    ) > .env
    echo ✅ .env template created. Please add your Gmail API key!
    echo 📝 Edit .env file and add your VITE_GOOGLE_API_KEY
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Type check
echo 🔍 Running type check...
call npm run type-check

REM Build for production
echo 🏗️  Building for production...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    
    REM Deploy to Vercel
    echo 🚀 Deploying to Vercel...
    call npx vercel --prod
    
    if %errorlevel% equ 0 (
        echo 🎉 Deployment successful!
        echo 📧 Your contact form is now live!
        echo 🔗 Visit your Vercel URL to test the form
        echo.
        echo 📋 Next steps:
        echo 1. Test form submission
        echo 2. Check email delivery
        echo 3. Verify automated responses
        echo 4. Monitor analytics
    ) else (
        echo ❌ Deployment failed. Check Vercel logs.
        pause
        exit /b 1
    )
) else (
    echo ❌ Build failed. Check the errors above.
    pause
    exit /b 1
)

echo.
echo 🌟 SEZA Team - Consciousness-Driven Automation
echo 📧 duvallviera@gmail.com
echo 🌐 www.sezateamengineers.com
pause
