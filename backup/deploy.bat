@echo off
REM Deploy Script untuk Lokstra Framework Website (Windows)
REM Script ini membantu deploy website ke GitHub Pages

echo 🚀 Lokstra Framework - Deploy Script
echo ==================================

REM Check git status
echo 📋 Checking git status...
git status

echo.
echo 📝 Current changes:
git diff --name-only

echo.
set /p deploy="🤔 Deploy changes to GitHub Pages? (y/n): "

if /i "%deploy%"=="y" (
    echo 📦 Adding all changes...
    git add .
    
    echo 💾 Committing changes...
    set /p commit_msg="📝 Enter commit message (or press enter for default): "
    if "%commit_msg%"=="" set commit_msg=Update website for social sharing optimization
    git commit -m "%commit_msg%"
    
    echo 🌐 Pushing to GitHub...
    git push origin main
    
    echo.
    echo ✅ Deploy completed!
    echo 🔗 Website URL: https://lokstra.dev/
    echo 📱 Test WhatsApp preview dengan URL diatas
    echo.
    echo 🧪 Testing tools:
    echo - Facebook Debugger: https://developers.facebook.com/tools/debug/
    echo - Twitter Card Validator: https://cards-dev.twitter.com/validator
    echo - Open Graph Preview: https://www.opengraph.xyz/
    echo.
) else (
    echo ❌ Deploy cancelled
)

pause
