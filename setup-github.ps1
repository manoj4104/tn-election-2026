# Tamil Nadu Election 2026 - GitHub Setup and Deployment
# PowerShell Script for Windows

Write-Host "🗳️  Tamil Nadu Election 2026 - GitHub Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if git is initialized
Write-Host "Step 1: Initializing Git Repository" -ForegroundColor Blue
if (-not (Test-Path .git)) {
    git init
    Write-Host "✓ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git already initialized" -ForegroundColor Green
}
Write-Host ""

# Step 2: Add all files
Write-Host "Step 2: Adding files to Git" -ForegroundColor Blue
git add .
Write-Host "✓ Files added" -ForegroundColor Green
Write-Host ""

# Step 3: Commit
Write-Host "Step 3: Creating initial commit" -ForegroundColor Blue
git commit -m "Initial commit: Tamil Nadu Election 2026 website"
Write-Host "✓ Committed" -ForegroundColor Green
Write-Host ""

# Step 4: Rename branch to main
Write-Host "Step 4: Renaming branch to main" -ForegroundColor Blue
git branch -M main
Write-Host "✓ Branch renamed to main" -ForegroundColor Green
Write-Host ""

# Instructions
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "Next Steps - Create GitHub Repository:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://github.com/new"
Write-Host "2. Repository name: election-2026"
Write-Host "3. Description: Tamil Nadu Assembly Election 2026 - Live Results & Analysis"
Write-Host "4. Keep it Public (or Private if you prefer)"
Write-Host "5. DO NOT initialize with README, .gitignore, or license"
Write-Host "6. Click 'Create repository'"
Write-Host ""
Write-Host "Then run these commands with YOUR username:" -ForegroundColor Yellow
Write-Host ""
Write-Host "git remote add origin https://github.com/YOUR_USERNAME/election-2026.git" -ForegroundColor Green
Write-Host "git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

# Ask for GitHub username
$username = Read-Host "Enter your GitHub username (or press Enter to skip)"

if ($username) {
    Write-Host ""
    Write-Host "Adding remote and pushing to GitHub..." -ForegroundColor Blue
    git remote add origin "https://github.com/$username/election-2026.git"
    
    Write-Host ""
    Write-Host "Pushing to GitHub... (you may be asked for credentials)" -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your repository: https://github.com/$username/election-2026" -ForegroundColor Blue
        Write-Host ""
        Write-Host "Next: Deploy to Vercel or Netlify" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "VERCEL (Recommended):"
        Write-Host "  1. Go to: https://vercel.com/new"
        Write-Host "  2. Click 'Import Git Repository'"
        Write-Host "  3. Select: $username/election-2026"
        Write-Host "  4. Click 'Deploy'"
        Write-Host ""
        Write-Host "NETLIFY:"
        Write-Host "  1. Go to: https://app.netlify.com/start"
        Write-Host "  2. Click 'Import from Git'"
        Write-Host "  3. Select: $username/election-2026"
        Write-Host "  4. Click 'Deploy site'"
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "⚠ Push failed. You may need to:" -ForegroundColor Yellow
        Write-Host "  1. Create the repository on GitHub first"
        Write-Host "  2. Or check your credentials"
        Write-Host ""
        Write-Host "Run this command manually:"
        Write-Host "git push -u origin main" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Quick commands:" -ForegroundColor Cyan
Write-Host "  npm run dev              - Run development server"
Write-Host "  npm run build            - Build for production"
Write-Host "  npm run deploy:vercel    - Deploy to Vercel"
Write-Host "  npm run deploy:netlify   - Deploy to Netlify"
