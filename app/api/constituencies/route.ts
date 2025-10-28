import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { requireApiKey } from '@/lib/auth'
import { getPaginationParams, createPaginationMeta, getFilterParams, getSearchParam } from '@/lib/query-helpers'

const ConstituencyInput = z.object({
  name: z.string().min(2),
  state: z.string().default('Tamil Nadu').optional(),
  code: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const { page, limit, skip } = getPaginationParams(req)
  const filters = getFilterParams(req, ['state'])
  const search = getSearchParam(req, 'search')

  const where: any = { ...filters }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { code: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [items, total] = await Promise.all([
    prisma.constituency.findMany({
      where,
      orderBy: { name: 'asc' },
      skip,
      take: limit,
    }),
    prisma.constituency.count({ where }),
  ])

  const meta = createPaginationMeta(page, limit, total)

  return Response.json({ data: items, meta })
}

export async function POST(req: NextRequest) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const body = await req.json()
  const parsed = ConstituencyInput.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.constituency.create({ data: parsed.data })
  return Response.json(item, { status: 201 })
}
