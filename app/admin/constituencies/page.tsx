'use client'

import { useState } from 'react'
import AdminTable from '@/components/AdminTable'

export default function ConstituenciesAdmin() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [seeding, setSeeding] = useState(false)

  const handleSeedTN = async () => {
    if (!confirm('This will add all 40 Tamil Nadu constituencies. Continue?')) {
      return
    }

    setSeeding(true)
    try {
      const apiKey = localStorage.getItem('adminApiKey')
      const response = await fetch('/api/constituencies/seed', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey || '',
        },
      })

      if (response.status === 401) {
        alert('Unauthorized. Please login again.');
        localStorage.removeItem('adminApiKey');
        window.location.href = '/admin';
        return;
      }

      const data = await response.json()

      if (data.ok) {
        alert(`✅ ${data.message}`)
        setRefreshKey(prev => prev + 1) // Refresh the table
      } else {
        alert(`❌ ${data.error}`)
      }
    } catch (error) {
      alert('Failed to seed constituencies')
      console.error(error)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={handleSeedTN}
          disabled={seeding}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {seeding ? '⏳ Seeding...' : '🌱 Add 40 TN Constituencies'}
        </button>
      </div>
      
      <AdminTable
        key={refreshKey}
        endpoint="constituencies"
        title="Constituencies"
        icon="🗺️"
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'state', label: 'State' },
          { key: 'code', label: 'Code' },
        ]}
        createFields={[
          { name: 'name', label: 'Constituency Name', type: 'text', required: true },
          { name: 'state', label: 'State', type: 'text', required: true },
          { name: 'code', label: 'Code', type: 'text' },
        ]}
      />
    </div>
  )
}

