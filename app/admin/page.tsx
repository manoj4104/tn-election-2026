'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    const stored = localStorage.getItem('adminApiKey')
    if (stored) {
      router.push('/admin/dashboard')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Test the API key by hitting a protected endpoint
      const response = await fetch('/api/health', {
        headers: { 'x-api-key': apiKey }
      })

      if (response.ok) {
        localStorage.setItem('adminApiKey', apiKey)
        router.push('/admin/dashboard')
      } else {
        setError('Invalid API key')
      }
    } catch (err) {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">🗳️ Admin Panel</h1>
          <p className="text-gray-600">Election 2026 Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
              placeholder="Enter your API key"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Default key: changeme-dev-key</p>
          <p className="mt-1">Set ADMIN_API_KEY in .env.local</p>
        </div>
      </div>
    </div>
  )
}
