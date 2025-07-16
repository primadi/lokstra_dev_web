#!/bin/bash

# Deploy Script untuk Lokstra Framework Website
# Script ini membantu deploy website ke GitHub Pages

echo "🚀 Lokstra Framework - Deploy Script"
echo "=================================="

# Check git status
echo "📋 Checking git status..."
git status

echo ""
echo "📝 Current changes:"
git diff --name-only

echo ""
read -p "🤔 Deploy changes to GitHub Pages? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 Adding all changes..."
    git add .
    
    echo "💾 Committing changes..."
    read -p "📝 Enter commit message (or press enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Update website for social sharing optimization"
    fi
    git commit -m "$commit_msg"
    
    echo "🌐 Pushing to GitHub..."
    git push origin main
    
    echo ""
    echo "✅ Deploy completed!"
    echo "🔗 Website URL: https://lokstra.dev/"
    echo "📱 Test WhatsApp preview dengan URL diatas"
    echo ""
    echo "🧪 Testing tools:"
    echo "- Facebook Debugger: https://developers.facebook.com/tools/debug/"
    echo "- Twitter Card Validator: https://cards-dev.twitter.com/validator"
    echo "- Open Graph Preview: https://www.opengraph.xyz/"
    echo ""
else
    echo "❌ Deploy cancelled"
fi
