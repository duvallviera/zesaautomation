#!/bin/bash

echo "Starting ZESA AI Backend Development Server..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "WARNING: .env file not found"
    echo "Copying from env.example..."
    cp env.example .env
    echo
    echo "Please edit .env file with your configuration"
    echo
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo
fi

# Start the development server
echo "Starting development server on port 5051..."
echo
echo "Backend will be available at: http://localhost:5051"
echo "Health check: http://localhost:5051/health"
echo
echo "Press Ctrl+C to stop the server"
echo

npm run dev
