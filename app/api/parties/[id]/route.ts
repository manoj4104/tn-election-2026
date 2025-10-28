import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { requireApiKey } from '@/lib/auth'

const PartyUpdate = z.object({
  name: z.string().min(2).optional(),
  abbreviation: z.string().optional(),
  color: z.string().optional(),
  logoUrl: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const item = await prisma.party.findUnique({ where: { id } })
  if (!item) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const id = Number(params.id)
  const body = await req.json()
  const parsed = PartyUpdate.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.party.update({ where: { id }, data: parsed.data })
  return Response.json(item)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const id = Number(params.id)
  await prisma.party.delete({ where: { id } })
  return Response.json({ ok: true })
}
