import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { requireApiKey } from '@/lib/auth'
import { getPaginationParams, createPaginationMeta, getSearchParam } from '@/lib/query-helpers'

const PartyInput = z.object({
  name: z.string().min(2),
  abbreviation: z.string().optional(),
  color: z.string().optional(),
  logoUrl: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const { page, limit, skip } = getPaginationParams(req)
  const search = getSearchParam(req, 'search')

  const where: any = {}
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { abbreviation: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [items, total] = await Promise.all([
    prisma.party.findMany({
      where,
      orderBy: { name: 'asc' },
      skip,
      take: limit,
    }),
    prisma.party.count({ where }),
  ])

  const meta = createPaginationMeta(page, limit, total)

  return Response.json({ data: items, meta })
}

export async function POST(req: NextRequest) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const body = await req.json()
  const parsed = PartyInput.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.party.create({ data: parsed.data })
  return Response.json(item, { status: 201 })
}
