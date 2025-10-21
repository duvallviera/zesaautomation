@echo off
echo Starting ZESA AI Backend Development Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo WARNING: .env file not found
    echo Copying from env.example...
    copy env.example .env
    echo.
    echo Please edit .env file with your configuration
    echo.
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
    echo.
)

REM Start the development server
echo Starting development server on port 5051...
echo.
echo Backend will be available at: http://localhost:5051
echo Health check: http://localhost:5051/health
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
