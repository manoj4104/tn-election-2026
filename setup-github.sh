#!/bin/bash

# Tamil Nadu Election 2026 - GitHub Setup and Deployment Script

echo "🗳️  Tamil Nadu Election 2026 - GitHub Setup"
echo "==========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if git is initialized
echo -e "${BLUE}Step 1: Initializing Git Repository${NC}"
if [ ! -d .git ]; then
    git init
    echo -e "${GREEN}✓ Git initialized${NC}"
else
    echo -e "${GREEN}✓ Git already initialized${NC}"
fi
echo ""

# Step 2: Add all files
echo -e "${BLUE}Step 2: Adding files to Git${NC}"
git add .
echo -e "${GREEN}✓ Files added${NC}"
echo ""

# Step 3: Commit
echo -e "${BLUE}Step 3: Creating initial commit${NC}"
git commit -m "Initial commit: Tamil Nadu Election 2026 website"
echo -e "${GREEN}✓ Committed${NC}"
echo ""

# Step 4: Rename branch to main
echo -e "${BLUE}Step 4: Renaming branch to main${NC}"
git branch -M main
echo -e "${GREEN}✓ Branch renamed to main${NC}"
echo ""

# Step 5: Instructions for GitHub
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Next Steps - Create GitHub Repository:${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Repository name: election-2026"
echo "3. Description: Tamil Nadu Assembly Election 2026 - Live Results & Analysis"
echo "4. Keep it Public (or Private if you prefer)"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
echo -e "${YELLOW}Then run these commands with YOUR username:${NC}"
echo ""
echo -e "${GREEN}git remote add origin https://github.com/YOUR_USERNAME/election-2026.git${NC}"
echo -e "${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${YELLOW}========================================${NC}"
echo ""

# Optional: Ask for GitHub username
read -p "Enter your GitHub username (or press Enter to skip): " username

if [ ! -z "$username" ]; then
    echo ""
    echo -e "${BLUE}Adding remote and pushing to GitHub...${NC}"
    git remote add origin "https://github.com/$username/election-2026.git"
    
    echo ""
    echo -e "${YELLOW}Pushing to GitHub... (you may be asked for credentials)${NC}"
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}✓ Successfully pushed to GitHub!${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "Your repository: ${BLUE}https://github.com/$username/election-2026${NC}"
        echo ""
        echo -e "${YELLOW}Next: Deploy to Vercel or Netlify${NC}"
        echo ""
        echo "VERCEL (Recommended):"
        echo "  1. Go to: https://vercel.com/new"
        echo "  2. Click 'Import Git Repository'"
        echo "  3. Select: $username/election-2026"
        echo "  4. Click 'Deploy'"
        echo ""
        echo "NETLIFY:"
        echo "  1. Go to: https://app.netlify.com/start"
        echo "  2. Click 'Import from Git'"
        echo "  3. Select: $username/election-2026"
        echo "  4. Click 'Deploy site'"
        echo ""
    else
        echo ""
        echo -e "${YELLOW}⚠ Push failed. You may need to:${NC}"
        echo "  1. Create the repository on GitHub first"
        echo "  2. Or check your credentials"
        echo ""
        echo "Run this command manually:"
        echo -e "${GREEN}git push -u origin main${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
