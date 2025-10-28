import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { requireApiKey } from '@/lib/auth'
import { getPaginationParams, createPaginationMeta, getFilterParams } from '@/lib/query-helpers'

const ResultInput = z.object({
  constituencyId: z.number(),
  partyId: z.number().optional(),
  candidateId: z.number().optional(),
  votes: z.number().nonnegative().default(0).optional(),
  leading: z.boolean().optional(),
  won: z.boolean().optional(),
})

export async function GET(req: NextRequest) {
  const { page, limit, skip } = getPaginationParams(req)
  const filters = getFilterParams(req, ['constituencyId', 'partyId', 'candidateId', 'leading', 'won'])

  const where: any = { ...filters }

  const [items, total] = await Promise.all([
    prisma.result.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: { Party: true, Candidate: true, Constituency: true },
      skip,
      take: limit,
    }),
    prisma.result.count({ where }),
  ])

  const meta = createPaginationMeta(page, limit, total)

  return Response.json({ data: items, meta })
}

export async function POST(req: NextRequest) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const body = await req.json()
  const parsed = ResultInput.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.result.create({ data: parsed.data })
  return Response.json(item, { status: 201 })
}
