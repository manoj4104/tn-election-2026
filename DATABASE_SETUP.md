# Database Setup for Vercel

## Using Vercel Postgres (Recommended)

1. Go to your Vercel project: https://vercel.com/manoj4104/tn-election-2026
2. Click on the "Storage" tab
3. Click "Create Database" and select "Postgres"
4. Follow the prompts to create a free Postgres database
5. Vercel will automatically add the `DATABASE_URL` environment variable
6. Redeploy your application

## Alternative: Use Neon or Supabase

### Neon (Free PostgreSQL)
1. Go to https://neon.tech
2. Create a free account and database
3. Copy the connection string
4. Add to Vercel environment variables as `DATABASE_URL`

### Supabase (Free PostgreSQL)
1. Go to https://supabase.com
2. Create a free project
3. Go to Settings > Database > Connection string
4. Copy the connection string (use "Transaction" mode)
5. Add to Vercel environment variables as `DATABASE_URL`

## Running Migrations

After setting up the database, you need to run migrations:

```bash
# Connect to your production database
npx prisma migrate deploy

# Or reset and seed the database
npx prisma migrate reset --force
npm run prisma:seed
```

## Local Development

For local development, you can use SQLite:

```bash
# In .env.local
DATABASE_URL="file:./prisma/dev.db"
```

Then run migrations:

```bash
npx prisma migrate dev
npm run prisma:seed
```
