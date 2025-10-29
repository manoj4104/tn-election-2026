import { requireApiKey } from '@/lib/auth'

export async function GET(request: Request) {
  const unauthorized = requireApiKey(request)
  if (unauthorized) return unauthorized
  return Response.json({ ok: true })
}

export async function POST(request: Request) {
  const unauthorized = requireApiKey(request)
  if (unauthorized) return unauthorized
  return Response.json({ ok: true })
}
