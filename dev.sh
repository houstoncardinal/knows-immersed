#!/bin/bash

# KNOWS STUDIOS Development Helper Script
# This script provides automated development server management

echo "🚀 KNOWS STUDIOS Development Server"
echo "=================================="

# Function to check if port is in use
check_port() {
    if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port 8080 is already in use. Attempting to kill existing process..."
        lsof -ti:8080 | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
}

# Function to start development server with HMR
start_dev() {
    echo "🔥 Starting development server with Hot Module Replacement (HMR)..."
    echo "💡 Changes will be applied instantly without restarting!"
    echo "🌐 Open: http://localhost:8080"
    echo ""
    npm run dev
}

# Function to start with auto-restart (fallback)
start_auto() {
    echo "🔄 Starting development server with auto-restart (fallback mode)..."
    echo "⚠️  Note: This will restart the entire server on changes"
    echo "💡 For instant updates, use: ./dev.sh (no arguments)"
    npm run dev:restart
}

# Function to start with type checking and HMR
start_with_checks() {
    echo "🔍 Starting development server with type checking and HMR..."
    echo "💡 Changes apply instantly + real-time type checking"
    npm run dev:auto
}

# Function to run full checks
run_checks() {
    echo "🔍 Running full project checks..."
    npm run check
}

# Main menu
case "${1:-}" in
    "auto")
        check_port
        start_auto
        ;;
    "check")
        run_checks
        ;;
    "type")
        start_with_checks
        ;;
    "clean")
        echo "🧹 Cleaning development environment..."
        rm -rf node_modules/.vite dist
        npm install
        ;;
    "help"|"-h"|"--help")
        echo "Usage: ./dev.sh [command]"
        echo ""
        echo "Commands:"
        echo "  (no command)    Start normal development server"
        echo "  auto            Start with auto-restart on file changes"
        echo "  check           Run full type check, lint, and build"
        echo "  type            Start with concurrent type checking"
        echo "  clean           Clean and reinstall dependencies"
        echo "  help            Show this help message"
        echo ""
        echo "Alternative npm scripts:"
        echo "  npm run dev         - Normal development server"
        echo "  npm run dev:restart - Auto-restart on changes"
        echo "  npm run dev:auto    - With type checking"
        echo "  npm run check       - Full project validation"
        ;;
    *)
        check_port
        start_dev
        ;;
esac
