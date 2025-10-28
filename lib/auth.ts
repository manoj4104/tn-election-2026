export function requireApiKey(request: Request) {
  const headerKey = request.headers.get('x-api-key') || ''
  const validKey = process.env.ADMIN_API_KEY || ''
  if (!validKey || headerKey !== validKey) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return null
}
