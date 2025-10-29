#!/bin/bash
# This script will be run after you set up Vercel Postgres

echo "🚀 Setting up database for Vercel Postgres..."

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Push the schema to the database (creates tables)
echo "📊 Creating database tables..."
npx prisma db push --accept-data-loss

# Seed the database with initial data
echo "🌱 Seeding database with sample data..."
npx tsx prisma/seed.ts

echo "✅ Database setup complete!"
echo "🎉 Your application is ready to use!"
