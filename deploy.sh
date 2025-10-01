#!/bin/bash

# Deploy script for GitHub Pages
# This script builds the app and copies the built files to the root for GitHub Pages

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building application..."
pnpm build:client

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Copy built files to root (GitHub Pages serves from root by default)
echo "📋 Copying built files to root..."
cp -r dist/spa/* .

# Add a .nojekyll file to prevent Jekyll processing
touch .nojekyll

echo "✅ Files copied successfully!"
echo "📝 Don't forget to commit and push the changes:"
echo "   git add ."
echo "   git commit -m 'Deploy built application'"
echo "   git push origin main"
echo ""
echo "🌐 Your site will be available at: https://igfsite.github.io"