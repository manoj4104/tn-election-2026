import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { requireApiKey } from '@/lib/auth'

const ArticleUpdate = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  summary: z.string().optional(),
  content: z.string().min(1).optional(),
  imageUrl: z.string().url().optional(),
  published: z.boolean().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const item = await prisma.article.findUnique({ where: { id } })
  if (!item) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const { id: idStr } = await params;
  const id = Number(idStr);
  const body = await req.json()
  const parsed = ArticleUpdate.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  try {
    const item = await prisma.article.update({ where: { id }, data: parsed.data })
    return Response.json(item)
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const { id: idStr } = await params;
  const id = Number(idStr);
  try {
    await prisma.article.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
