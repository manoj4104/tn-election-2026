import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { requireApiKey } from '@/lib/auth'
import { getPaginationParams, createPaginationMeta, getFilterParams, getSearchParam } from '@/lib/query-helpers'

const ArticleInput = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  summary: z.string().optional(),
  content: z.string().min(1),
  imageUrl: z.string().url().optional(),
  published: z.boolean().optional(),
})

export async function GET(req: NextRequest) {
  const { page, limit, skip } = getPaginationParams(req)
  const filters = getFilterParams(req, ['published'])
  const search = getSearchParam(req, 'search')

  // Build where clause
  const where: any = { ...filters }
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { summary: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [items, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.article.count({ where }),
  ])

  const meta = createPaginationMeta(page, limit, total)

  return Response.json({ data: items, meta })
}

export async function POST(req: NextRequest) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const body = await req.json()
  const parsed = ArticleInput.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  try {
    const article = await prisma.article.create({ data: parsed.data })
    return Response.json(article, { status: 201 })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
