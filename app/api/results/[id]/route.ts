import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { requireApiKey } from '@/lib/auth'

const ResultUpdate = z.object({
  constituencyId: z.number().optional(),
  partyId: z.number().optional().nullable(),
  candidateId: z.number().optional().nullable(),
  votes: z.number().nonnegative().optional(),
  leading: z.boolean().optional(),
  won: z.boolean().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const item = await prisma.result.findUnique({ where: { id }, include: { Party: true, Candidate: true, Constituency: true } })
  if (!item) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const { id: idStr } = await params;
  const id = Number(idStr);
  const body = await req.json()
  const parsed = ResultUpdate.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.result.update({ where: { id }, data: parsed.data })
  return Response.json(item)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized
  const { id: idStr } = await params;
  const id = Number(idStr);
  await prisma.result.delete({ where: { id } })
  return Response.json({ ok: true })
}
