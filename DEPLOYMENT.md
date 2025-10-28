# Deployment Guide - Tamil Nadu Election 2026

This guide will help you deploy your Next.js election website to Vercel or Netlify.

## Prerequisites

- Git installed on your computer
- A GitHub account (recommended) or GitLab/Bitbucket
- Your project code ready

---

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser - login with GitHub, GitLab, or email.

### Step 3: Deploy

Navigate to your project folder and run:

```bash
vercel
```

**Follow the prompts:**
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **election-2026** (or your preferred name)
- In which directory is your code located? **./** (just press Enter)
- Want to override the settings? **N**

**Done!** Vercel will build and deploy your site. You'll get a URL like:
- `https://election-2026.vercel.app`

### Step 4: Custom Domain (Optional)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Settings" → "Domains"
4. Add your custom domain (e.g., `election2026.com`)
5. Follow DNS configuration instructions

### Environment Variables

If you need to add environment variables:

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Environment Variables"
3. Add `DATABASE_URL=file:./prisma/dev.db`

---

## Option 2: Deploy to Netlify

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

### Step 3: Initialize Netlify

```bash
netlify init
```

**Follow the prompts:**
- What would you like to do? **Create & configure a new site**
- Team? Select your team
- Site name? **election-2026** (or your preferred name)
- Build command? **npm run build**
- Directory to deploy? **.next**
- Netlify functions folder? **.netlify/functions**

### Step 4: Deploy

```bash
netlify deploy --prod
```

**Done!** Your site will be live at:
- `https://election-2026.netlify.app`

### Install Next.js Plugin

For better Next.js support, install the Netlify Next.js plugin:

```bash
npm install -D @netlify/plugin-nextjs
```

This is already configured in `netlify.toml`.

### Environment Variables

Add environment variables on Netlify:

1. Go to https://app.netlify.com
2. Select your site
3. Go to "Site settings" → "Environment variables"
4. Add `DATABASE_URL=file:./prisma/dev.db`

---

## Alternative: Deploy via GitHub (Easiest for beginners)

### For Vercel:

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/election-2026.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Click "Import Git Repository"
4. Select your GitHub repository
5. Click "Deploy"

**Done!** Vercel automatically detects Next.js and configures everything.

### For Netlify:

1. Push your code to GitHub (same as above)
2. Go to https://app.netlify.com/start
3. Click "Import from Git"
4. Select GitHub and authorize
5. Choose your repository
6. Click "Deploy site"

**Done!** Netlify will build and deploy automatically.

---

## Database Considerations

### SQLite (Current Setup)
- ✅ Works fine for development and small sites
- ✅ Included in deployment
- ⚠️ Limited to single instance (no scaling)
- ⚠️ Data resets on redeployment (Vercel/Netlify are ephemeral)

### Recommended for Production:

Use a managed database like:

1. **Vercel Postgres** (Vercel only)
   - Free tier: 256 MB
   - Automatic setup
   
2. **PlanetScale** (MySQL compatible)
   - Free tier: 5GB
   - Works with Vercel/Netlify
   
3. **Supabase** (PostgreSQL)
   - Free tier: 500 MB
   - Works with Vercel/Netlify

To switch to PostgreSQL:

1. Update `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   ```

2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // changed from sqlite
     url      = env("DATABASE_URL")
   }
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

---

## Post-Deployment Checklist

✅ Test all pages:
- [ ] Home page (/)
- [ ] TN Election (/tn-election)
- [ ] Candidates (/candidates)
- [ ] Results (/results)
- [ ] Voting (/voting)
- [ ] News (/news)
- [ ] Admin (/admin/dashboard)

✅ Test APIs:
- [ ] /api/candidates
- [ ] /api/parties
- [ ] /api/constituencies
- [ ] /api/results

✅ Configure:
- [ ] Custom domain (if needed)
- [ ] Environment variables
- [ ] Database (switch from SQLite if needed)

---

## Automatic Deployments

Both Vercel and Netlify support automatic deployments:

1. Connect your GitHub repository
2. Every push to `main` branch → automatic deployment
3. Pull requests → preview deployments

**Setup:**
- Vercel: https://vercel.com/docs/git
- Netlify: https://docs.netlify.com/site-deploys/create-deploys/

---

## Troubleshooting

### Build fails?
- Check Node.js version (requires 18+)
- Run `npm install` locally first
- Check build logs for errors

### Database errors?
- Verify `DATABASE_URL` environment variable
- Run `npx prisma generate` before deploying
- Consider switching to PostgreSQL for production

### API routes not working?
- Check function configuration in `vercel.json` or `netlify.toml`
- Verify API routes are in `/app/api/` folder

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Next.js Docs**: https://nextjs.org/docs

---

## Quick Commands Reference

### Vercel
```bash
vercel                    # Deploy to preview
vercel --prod             # Deploy to production
vercel domains add        # Add custom domain
vercel env add            # Add environment variable
vercel logs               # View deployment logs
```

### Netlify
```bash
netlify deploy            # Deploy to preview
netlify deploy --prod     # Deploy to production
netlify open              # Open site dashboard
netlify env:set KEY value # Add environment variable
netlify functions:invoke  # Test functions
```

---

**Your site is now ready for the 2026 Tamil Nadu Elections! 🎉**
