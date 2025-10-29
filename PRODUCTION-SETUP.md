# Production Setup Guide

## Current Issues
- Production site returning 500 errors on all API endpoints
- Cause: DATABASE_URL not configured on Vercel
- Solution: Follow steps below

## Step 1: Get Your Neon Database URL

### If you already have a Neon database:
1. Go to https://console.neon.tech
2. Select your project
3. Go to Dashboard → Connection Details
4. Copy the connection string (starts with `postgresql://`)
5. Example: `postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb`

### If you need to create a Neon database:
1. Go to https://neon.tech and sign up (free tier available)
2. Create a new project
3. Copy the connection string from the dashboard

## Step 2: Configure Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your `tn-election-2026` project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables:

   **DATABASE_URL**
   - Value: Your Neon connection string from Step 1
   - Environments: Production, Preview, Development (check all)

   **ADMIN_API_KEY**
   - Value: A strong password (e.g., `your-secure-admin-key-2026`)
   - Environments: Production, Preview, Development (check all)
   - IMPORTANT: Save this value - you'll use it to login at /admin

   **SEED_SECRET** (optional)
   - Value: A random string (e.g., `demo-seed-secret-2026`)
   - Environments: Production, Preview, Development (check all)

5. Click **Save** for each variable

## Step 3: Initialize Production Database

Update your local `.env.local` temporarily:

```bash
# Replace the DATABASE_URL line with your Neon connection string
DATABASE_URL="postgresql://your-neon-connection-string-here"
ADMIN_API_KEY="changeme-dev-key"
```

Then run:
```powershell
npx prisma db push
```

This creates all tables in your production database.

After success, you can revert `.env.local` back to:
```bash
DATABASE_URL="file:./dev.db"
```

## Step 4: Redeploy on Vercel

Option A (via Vercel Dashboard):
1. Go to your project → Deployments tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"

Option B (via Git Push):
```powershell
git commit --allow-empty -m "Trigger redeploy"
git push
```

## Step 5: Verify Production

After redeployment (wait ~2 minutes), test these URLs:

1. **Health Check:**
   - https://tn-election-2026.vercel.app/api/health
   - Should return: `{"ok":true,"ts":...}`

2. **Database Health:**
   - https://tn-election-2026.vercel.app/api/health/db
   - Should return: `{"ok":true,"db":"connected"}`

3. **Parties API:**
   - https://tn-election-2026.vercel.app/api/parties
   - Should return: `{"data":[],"meta":{...}}` (not 500)

## Step 6: Create Demo Content

1. Go to https://tn-election-2026.vercel.app/admin
2. Login with the ADMIN_API_KEY you set in Step 2
3. You'll see the Admin Dashboard
4. Navigate to **Polls** (or go to /admin/polls)
5. Click **"+ Add 5 Demo Polls"**
6. Visit https://tn-election-2026.vercel.app/polls to see them

## Step 7: Add Election Data

From Admin Dashboard, add in this order:

1. **Parties** (/admin/parties)
   - Add DMK, AIADMK, BJP, etc.
   - Include party colors (hex codes like #dc2626)

2. **Constituencies** (/admin/constituencies)
   - Add Tamil Nadu constituencies

3. **Candidates** (/admin/candidates)
   - Link candidates to parties and constituencies

4. **Results** (/admin/results)
   - Enter vote counts, mark leading/won

5. **News** (/admin/news)
   - Add election news articles

Once you add results, the /tn-election page will populate automatically.

## Troubleshooting

**Still seeing 500 errors after redeploy?**
- Check that DATABASE_URL is saved in Vercel (Settings → Environment Variables)
- Verify you ran `npx prisma db push` against the production DB
- Check Vercel deployment logs for errors

**Can't login to Admin?**
- Make sure ADMIN_API_KEY matches exactly what you're typing
- Clear browser localStorage and try again
- Check browser console for specific error messages

**Polls seed returns 401?**
- Ensure you're logged in to /admin first
- ADMIN_API_KEY must be set in Vercel

**Database connection failing?**
- Verify your Neon database is active (check Neon dashboard)
- Check the connection string is copied correctly (no extra spaces)
- Ensure Neon project hasn't been paused (free tier auto-pauses after inactivity)

## Quick Reference

**Your Deployment:**
- Main site: https://tn-election-2026.vercel.app
- Admin panel: https://tn-election-2026.vercel.app/admin
- Polls page: https://tn-election-2026.vercel.app/polls
- Dashboard: https://tn-election-2026.vercel.app/tn-election

**Admin Pages:**
- Dashboard: /admin/dashboard
- Parties: /admin/parties
- Constituencies: /admin/constituencies
- Candidates: /admin/candidates
- Results: /admin/results
- News: /admin/news
- Polls: /admin/polls

**Environment Variables Needed:**
- DATABASE_URL (required)
- ADMIN_API_KEY (required)
- SEED_SECRET (optional)
