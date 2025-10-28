'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Stats {
  parties: number
  constituencies: number
  candidates: number
  articles: number
  results: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiKey = localStorage.getItem('adminApiKey')
    if (!apiKey) {
      router.push('/admin')
      return
    }
    loadStats()
  }, [router])

  const loadStats = async () => {
    try {
      const [parties, constituencies, candidates, articles, results] = await Promise.all([
        fetch('/api/parties?limit=1').then(r => r.json()),
        fetch('/api/constituencies?limit=1').then(r => r.json()),
        fetch('/api/candidates?limit=1').then(r => r.json()),
        fetch('/api/news?limit=1').then(r => r.json()),
        fetch('/api/results?limit=1').then(r => r.json()),
      ])

      setStats({
        parties: parties.meta?.total || 0,
        constituencies: constituencies.meta?.total || 0,
        candidates: candidates.meta?.total || 0,
        articles: articles.meta?.total || 0,
        results: results.meta?.total || 0,
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminApiKey')
    router.push('/admin')
  }

  const menuItems = [
    { href: '/admin/parties', label: 'Parties', icon: '🏛️', color: 'bg-blue-500' },
    { href: '/admin/constituencies', label: 'Constituencies', icon: '🗺️', color: 'bg-green-500' },
    { href: '/admin/candidates', label: 'Candidates', icon: '👤', color: 'bg-purple-500' },
    { href: '/admin/news', label: 'News Articles', icon: '📰', color: 'bg-orange-500' },
    { href: '/admin/results', label: 'Results', icon: '📊', color: 'bg-red-500' },
    { href: '/admin-upload.html', label: 'Upload Images', icon: '📸', color: 'bg-pink-500' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Admin Dashboard Header */}
      <div className="bg-white shadow-sm border rounded-lg p-6 mb-8">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Left: Title */}
          <div className="justify-self-start">
            <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Election 2026 Content Management System</p>
          </div>

          {/* Right: Actions (Back + Logout) */}
          <div className="justify-self-end flex items-center gap-4 h-16">
            <Link href="/" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Website
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <StatCard title="Parties" value={stats?.parties || 0} icon="🏛️" color="bg-blue-500" />
            <StatCard title="Constituencies" value={stats?.constituencies || 0} icon="🗺️" color="bg-green-500" />
            <StatCard title="Candidates" value={stats?.candidates || 0} icon="👤" color="bg-purple-500" />
            <StatCard title="News Articles" value={stats?.articles || 0} icon="📰" color="bg-orange-500" />
            <StatCard title="Results" value={stats?.results || 0} icon="📊" color="bg-red-500" />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${item.color} hover:opacity-90 text-white p-6 rounded-xl transition transform hover:scale-105 shadow-lg`}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="font-bold text-lg">{item.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  )
}
