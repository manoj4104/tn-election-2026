import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Simple connectivity check
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, db: 'connected' })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'DB connection failed' }, { status: 500 })
  }
}
