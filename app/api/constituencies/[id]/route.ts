import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { requireApiKey } from '@/lib/auth'

const ConstituencyUpdate = z.object({
  name: z.string().min(2).optional(),
  state: z.string().optional(),
  code: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const item = await prisma.constituency.findUnique({ where: { id } })
  if (!item) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const id = Number(params.id)
  const body = await req.json()
  const parsed = ConstituencyUpdate.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.constituency.update({ where: { id }, data: parsed.data })
  return Response.json(item)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const id = Number(params.id)
  await prisma.constituency.delete({ where: { id } })
  return Response.json({ ok: true })
}
