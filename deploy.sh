#!/bin/bash

# MindFlow Deployment Script
echo "🚀 Deploying MindFlow Landing Page..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "# MindFlow Landing Page" > README_GIT.md
    echo "Modern landing page for collecting user feedback on MindFlow - Mac-first flowchart app" >> README_GIT.md
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Initial MindFlow landing page setup"

# Instructions for different deployment options
echo ""
echo "🎯 Choose your deployment option:"
echo ""
echo "Option 1: Netlify (Recommended for analytics)"
echo "  1. Go to https://app.netlify.com/drop"
echo "  2. Drag & drop this entire folder"
echo "  3. Your site will be live instantly!"
echo "  4. Forms will work automatically"
echo "  5. View submissions in Netlify dashboard"
echo ""
echo "Option 2: GitHub + Netlify"
echo "  1. Create new repo on GitHub"
echo "  2. Run: git remote add origin YOUR_REPO_URL"
echo "  3. Run: git push -u origin main"
echo "  4. Connect Netlify to your GitHub repo"
echo ""
echo "Option 3: Vercel"
echo "  1. Run: npx vercel"
echo "  2. Follow the prompts"
echo "  3. Set up external form service for analytics"
echo ""
echo "✅ Files are ready for deployment!"
echo "📊 Your form is configured for Netlify Forms with built-in analytics"
