# VERCEL POSTGRES SETUP INSTRUCTIONS

## Step-by-Step Guide (Do This Now):

### 1. Go to Vercel Project
Open: https://vercel.com/manoj4104/tn-election-2026

### 2. Navigate to Storage Tab
- In your project dashboard, click the **"Storage"** tab in the top navigation

### 3. Create Postgres Database
- Click **"Create Database"** button
- Select **"Postgres"** from the options
- Choose **"Continue"**

### 4. Configure Database
- **Database Name:** tn-election-2026-db (or any name you want)
- **Region:** Select closest to your target audience (e.g., US East for Tamil Nadu visitors via CDN)
- Click **"Create"**

### 5. Connect to Project
- After creation, click **"Connect Project"**
- Select your project: **tn-election-2026**
- Click **"Connect"**
- Vercel will automatically add these environment variables:
  - `POSTGRES_URL`
  - `POSTGRES_PRISMA_URL` ← This is what we need
  - `POSTGRES_URL_NON_POOLING`

### 6. Update Environment Variable Name
Since our app uses `DATABASE_URL`, we need to add it:
- Go to **Settings** → **Environment Variables**
- Click **"Add New"**
- **Name:** `DATABASE_URL`
- **Value:** Copy the value from `POSTGRES_PRISMA_URL`
- **Environments:** Check all (Production, Preview, Development)
- Click **"Save"**

### 7. Redeploy
- Go to **Deployments** tab
- Click the **"..."** menu on the latest deployment
- Click **"Redeploy"**
- Wait for deployment to complete

### 8. Run Database Setup (After Deployment)
You need to run this ONCE to create tables and add sample data.

**Option A: Via Vercel CLI (if installed)**
```bash
vercel env pull .env.production
npx prisma db push
npx tsx prisma/seed.ts
```

**Option B: Via Terminal with Production URL**
```bash
# Set the DATABASE_URL to your Vercel Postgres URL temporarily
$env:DATABASE_URL="your-postgres-prisma-url-from-vercel"
npx prisma db push
npx tsx prisma/seed.ts
```

### 9. Test Your Site
Visit: https://tn-election-2026.vercel.app

The error should be gone! ✅

---

## Troubleshooting

### If you see "Environment variable not found: DATABASE_URL"
- Make sure you added `DATABASE_URL` in step 6
- Make sure you redeployed after adding it

### If you see "Table does not exist"
- Run the database setup commands in step 8
- This creates all the tables (Party, Poll, Candidate, etc.)

### If polls page is empty
- Run the seed script: `npx tsx prisma/seed.ts`
- This adds 4 sample polls to test

---

## Quick Summary
1. ✅ Vercel Dashboard → Storage → Create Postgres
2. ✅ Connect to tn-election-2026 project
3. ✅ Add DATABASE_URL environment variable
4. ✅ Redeploy
5. ✅ Run `npx prisma db push` and `npx tsx prisma/seed.ts`
6. ✅ Visit site - should work!

**Total time: ~5 minutes**
