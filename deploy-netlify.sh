#!/bin/bash

# God Panel Documentation - Netlify Deployment Script
# This script builds and deploys the documentation to Netlify

set -e

echo "🚀 Starting God Panel Documentation deployment to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed. Please install it first:"
    echo "npm install -g netlify-cli"
    exit 1
fi

# Check if user is logged in to Netlify
if ! netlify status &> /dev/null; then
    echo "❌ Not logged in to Netlify. Please login first:"
    echo "netlify login"
    exit 1
fi

# Build the documentation
echo "📦 Building documentation..."
npm run docs:build

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --dir=.vitepress/dist --prod

echo "✅ Deployment completed successfully!"
echo "🎉 Your documentation is now live on Netlify!"

