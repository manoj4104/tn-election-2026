'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Column {
  key: string
  label: string
  render?: (value: any, item: any) => React.ReactNode
}

interface AdminTableProps {
  endpoint: string
  title: string
  icon: string
  columns: Column[]
  createFields: Array<{
    name: string
    label: string
    type: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'url'
    required?: boolean
    options?: Array<{ value: string | number; label: string }>
  }>
  onLoadOptions?: () => Promise<any>
}

export default function AdminTable({ endpoint, title, icon, columns, createFields, onLoadOptions }: AdminTableProps) {
  const router = useRouter()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<any>(null)
  const [options, setOptions] = useState<any>({})

  useEffect(() => {
    const apiKey = localStorage.getItem('adminApiKey')
    if (!apiKey) {
      router.push('/admin')
      return
    }
    loadData()
    if (onLoadOptions) {
      onLoadOptions().then(setOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/${endpoint}?page=${page}&limit=20`)
      const data = await response.json()
      setItems(data.data || [])
      setMeta(data.meta)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const apiKey = localStorage.getItem('adminApiKey')
    
    try {
      const url = editingId ? `/api/${endpoint}/${editingId}` : `/api/${endpoint}`
      const method = editingId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey!,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowForm(false)
        setEditingId(null)
        setFormData({})
        loadData()
      } else {
        const error = await response.json()
        alert('Error: ' + (error.error || 'Failed to save'))
      }
    } catch (error) {
      alert('Connection error')
    }
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    const apiKey = localStorage.getItem('adminApiKey')
    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': apiKey! },
      })

      if (response.ok) {
        loadData()
      }
    } catch (error) {
      alert('Delete failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-red-600 hover:text-red-700 text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">{icon} {title}</h1>
            </div>
            <button
              onClick={() => {
                setFormData({})
                setEditingId(null)
                setShowForm(true)
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              + Add New
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Create'} {title}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {createFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-600">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                        rows={4}
                        required={field.required}
                        placeholder={field.label}
                        title={field.label}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: field.name.endsWith('Id') ? Number(e.target.value) : e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                        required={field.required}
                        title={field.label}
                        aria-label={field.label}
                      >
                        <option value="">Select...</option>
                        {(field.options || options[field.name] || []).map((opt: any) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={formData[field.name] || false}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
                        className="w-5 h-5"
                        title={field.label}
                        aria-label={field.label}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                        required={field.required}
                        placeholder={field.label}
                        title={field.label}
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingId(null)
                      setFormData({})
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No items found. Click &quot;Add New&quot; to create one.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {columns.map((col) => (
                        <th key={col.key} className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          {col.label}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        {columns.map((col) => (
                          <td key={col.key} className="px-6 py-4 text-sm text-gray-900">
                            {col.render ? col.render(item[col.key], item) : item[col.key]}
                          </td>
                        ))}
                        <td className="px-6 py-4 text-right text-sm space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Page {meta.page} of {meta.totalPages} ({meta.total} total)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(1)}
                      disabled={!meta.hasPrev}
                      className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      First
                    </button>
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={!meta.hasPrev}
                      className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={!meta.hasNext}
                      className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => setPage(meta.totalPages)}
                      disabled={!meta.hasNext}
                      className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Last
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
