import { NextResponse } from 'next/server'

export async function GET() {
  const checks = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    ADMIN_API_KEY: !!process.env.ADMIN_API_KEY,
    SEED_SECRET: !!process.env.SEED_SECRET,
  }

  const allGood = Object.values(checks).every(v => v === true)

  return NextResponse.json({
    ok: allGood,
    checks,
    message: allGood 
      ? 'All environment variables are configured' 
      : 'Some environment variables are missing',
    missing: Object.entries(checks)
      .filter(([_, exists]) => !exists)
      .map(([key]) => key),
  })
}
