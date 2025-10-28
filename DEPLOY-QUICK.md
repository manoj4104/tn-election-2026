# Quick Deploy Commands

## First-time Setup

### Vercel
```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

### Netlify
```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

## Quick Deploy (after setup)

```bash
# Vercel
npm run deploy:vercel

# Netlify
npm run deploy:netlify
```

## Deploy via Git (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/election-2026.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repo
   - Click "Deploy"

3. **Or Connect to Netlify:**
   - Go to https://app.netlify.com/start
   - Click "Import from Git"
   - Select your repo
   - Click "Deploy site"

**That's it!** 🚀 Your site will be live in 2-3 minutes.

## Your Live URLs

After deployment, you'll get:
- **Vercel**: `https://election-2026.vercel.app`
- **Netlify**: `https://election-2026.netlify.app`

Add your custom domain in the dashboard settings.

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
