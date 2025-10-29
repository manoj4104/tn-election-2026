# VERCEL DATABASE CONNECTION FIX

## The Issue:
You're seeing "Application error: a client-side exception has occurred" because Vercel doesn't have the DATABASE_URL environment variable configured.

## Solution:

### Step 1: Add DATABASE_URL to Vercel
1. Go to: https://vercel.com/manoj4104/tn-election-2026/settings/environment-variables
2. Check if `DATABASE_URL` exists
   - If it exists, make sure it's the Neon URL
   - If it doesn't exist, click **"Add New"**

3. Add this variable:
   - **Name:** `DATABASE_URL`
   - **Value:** `postgresql://neondb_owner:npg_lida5TsI3oXM@ep-autumn-paper-ad9my4zv-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require`
   - **Environments:** Check all (Production, Preview, Development)
   - Click **"Save"**

### Step 2: Redeploy
1. Go to: https://vercel.com/manoj4104/tn-election-2026/deployments
2. Click the **three dots (...)** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (~1-2 minutes)

### Step 3: Verify
Visit: https://tn-election-2026.vercel.app

The error should be gone!

---

## Alternative Check:

If Neon already added environment variables, they might be named differently:
- `POSTGRES_URL`
- `DATABASE_URL`
- `NEON_DATABASE_URL`

In that case, you need to either:
1. Rename them to `DATABASE_URL`, OR
2. Add a new variable called `DATABASE_URL` with the same value

---

## Quick Test:
After redeploying, test these URLs:
- Homepage: https://tn-election-2026.vercel.app
- Polls: https://tn-election-2026.vercel.app/polls
- Dashboard: https://tn-election-2026.vercel.app/tn-election

All should load without errors!
