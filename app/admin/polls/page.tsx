'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Party { id: number; name: string }
interface Constituency { id: number; name: string }
interface PollOptionInput { text: string; textTamil?: string; partyId?: number | '' }

export default function PollsAdmin() {
  const router = useRouter()
  const [polls, setPolls] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [parties, setParties] = useState<Party[]>([])
  const [constituencies, setConstituencies] = useState<Constituency[]>([])
  const [form, setForm] = useState({
    title: '',
    titleTamil: '',
    question: '',
    questionTamil: '',
    constituencyId: '' as number | '' ,
    type: 'prediction',
    endDate: '' as string | '',
    options: [
      { text: '', textTamil: '', partyId: '' },
      { text: '', textTamil: '', partyId: '' },
    ] as PollOptionInput[],
  })

  useEffect(() => {
    const apiKey = localStorage.getItem('adminApiKey')
    if (!apiKey) {
      router.push('/admin')
      return
    }

    async function loadLists() {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch('/api/parties?limit=200'),
          fetch('/api/constituencies?limit=500'),
        ])
        const p = await pRes.json()
        const c = await cRes.json()
        setParties(p.data || [])
        setConstituencies(c.data || [])
      } catch (e) {
        console.error('Failed to load lists', e)
      }
    }

    loadLists()
    loadPolls()
  }, [router])

  async function loadPolls() {
    setLoading(true)
    try {
      const res = await fetch('/api/polls?all=1')
      const data = await res.json()
      setPolls(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Failed to load polls', e)
    } finally {
      setLoading(false)
    }
  }

  function updateOption(idx: number, patch: Partial<PollOptionInput>) {
    setForm(prev => {
      const next = { ...prev, options: [...prev.options] }
      next.options[idx] = { ...next.options[idx], ...patch }
      return next
    })
  }

  function addOption() {
    setForm(prev => ({ ...prev, options: [...prev.options, { text: '', textTamil: '', partyId: '' }] }))
  }

  function removeOption(idx: number) {
    setForm(prev => ({ ...prev, options: prev.options.filter((_, i) => i !== idx) }))
  }

  async function createPoll(e: React.FormEvent) {
    e.preventDefault()
    const apiKey = localStorage.getItem('adminApiKey')
    if (!apiKey) {
      alert('Not authorized. Please login again.')
      return
    }

    try {
      const payload: any = {
        title: form.title,
        titleTamil: form.titleTamil || undefined,
        question: form.question,
        questionTamil: form.questionTamil || undefined,
        constituencyId: form.constituencyId || undefined,
        type: form.type,
        endDate: form.endDate || undefined,
        options: form.options
          .filter(o => o.text.trim().length > 0)
          .map(o => ({
            text: o.text,
            textTamil: o.textTamil || undefined,
            partyId: o.partyId ? Number(o.partyId) : undefined,
          })),
      }

      const res = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to create poll')
      }

      setShowForm(false)
      setForm({
        title: '', titleTamil: '', question: '', questionTamil: '', constituencyId: '', type: 'prediction', endDate: '',
        options: [{ text: '', textTamil: '', partyId: '' }, { text: '', textTamil: '', partyId: '' }],
      })
      loadPolls()
    } catch (e: any) {
      alert(e.message || 'Failed to create poll')
    }
  }

  async function closePoll(id: number) {
    const apiKey = localStorage.getItem('adminApiKey')
    if (!apiKey) return
    await fetch(`/api/polls/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey }, body: JSON.stringify({ status: 'closed' }) })
    loadPolls()
  }

  async function deletePoll(id: number) {
    if (!confirm('Delete this poll?')) return
    const apiKey = localStorage.getItem('adminApiKey')
    if (!apiKey) return
    await fetch(`/api/polls/${id}`, { method: 'DELETE', headers: { 'x-api-key': apiKey } })
    loadPolls()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <Link href="/admin/dashboard" className="text-red-600 hover:text-red-700 text-sm mb-2 inline-block">← Back to Dashboard</Link>
            <h1 className="text-2xl font-bold text-gray-800">🗳️ Polls</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition">+ Create Poll</button>
            <button
              onClick={async () => {
                try {
                  const apiKey = localStorage.getItem('adminApiKey')
                  const res = await fetch('/api/polls/seed', { method: 'POST', headers: { 'x-api-key': apiKey || '' } })
                  if (res.status === 401) {
                    alert('Unauthorized. Please login again.')
                    localStorage.removeItem('adminApiKey')
                    window.location.href = '/admin'
                    return
                  }
                  const data = await res.json()
                  if (!res.ok) throw new Error(data.error || 'Failed to seed polls')
                  alert(`Seeded ${Array.isArray(data.polls) ? data.polls.length : 0} demo polls`)
                  loadPolls()
                } catch (e: any) {
                  alert(e.message || 'Failed to seed demo polls')
                }
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
              title="Add 5 demo polls"
            >
              + Add 5 Demo Polls
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Create Poll</h2>
            <form onSubmit={createPoll} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border px-3 py-2 rounded" required placeholder="Title" title="Title" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Title (Tamil)</label>
                  <input value={form.titleTamil} onChange={e => setForm({ ...form, titleTamil: e.target.value })} className="w-full border px-3 py-2 rounded" placeholder="Title (Tamil)" title="Title (Tamil)" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Question</label>
                  <input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} className="w-full border px-3 py-2 rounded" required placeholder="Question" title="Question" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Question (Tamil)</label>
                  <input value={form.questionTamil} onChange={e => setForm({ ...form, questionTamil: e.target.value })} className="w-full border px-3 py-2 rounded" placeholder="Question (Tamil)" title="Question (Tamil)" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full border px-3 py-2 rounded" title="Poll Type" aria-label="Poll Type">
                    <option value="prediction">Prediction</option>
                    <option value="opinion">Opinion</option>
                    <option value="satisfaction">Satisfaction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Constituency (optional)</label>
                  <select value={form.constituencyId} onChange={e => setForm({ ...form, constituencyId: e.target.value ? Number(e.target.value) : '' })} className="w-full border px-3 py-2 rounded" title="Constituency" aria-label="Constituency">
                    <option value="">—</option>
                    {constituencies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">End Date (optional)</label>
                  <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="w-full border px-3 py-2 rounded" title="End Date" placeholder="End Date" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Options</h3>
                  <button type="button" onClick={addOption} className="text-sm text-red-600">+ Add option</button>
                </div>
                <div className="space-y-3">
                  {form.options.map((opt, idx) => (
                    <div key={idx} className="grid md:grid-cols-3 gap-3 items-end">
                      <div>
                        <label className="block text-sm font-semibold mb-1">Text</label>
                        <input value={opt.text} onChange={e => updateOption(idx, { text: e.target.value })} className="w-full border px-3 py-2 rounded" required placeholder="Option text" title="Option text" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Text (Tamil)</label>
                        <input value={opt.textTamil || ''} onChange={e => updateOption(idx, { textTamil: e.target.value })} className="w-full border px-3 py-2 rounded" placeholder="Option text (Tamil)" title="Option text (Tamil)" />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-semibold mb-1">Party (optional)</label>
                          <select value={opt.partyId || ''} onChange={e => updateOption(idx, { partyId: e.target.value ? Number(e.target.value) : '' })} className="w-full border px-3 py-2 rounded" title="Party" aria-label="Party">
                            <option value="">—</option>
                            {parties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                          </select>
                        </div>
                        <button type="button" onClick={() => removeOption(idx)} className="h-10 px-3 border rounded text-sm">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded">Create</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Polls list */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : polls.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No polls found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total Votes</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Options</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {polls.map((p: any) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{p.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.title}</td>
                      <td className="px-6 py-4 text-sm">{p.type}</td>
                      <td className="px-6 py-4 text-sm">{p.status}</td>
                      <td className="px-6 py-4 text-sm">{p.totalVotes}</td>
                      <td className="px-6 py-4 text-sm">{p.options?.length || 0}</td>
                      <td className="px-6 py-4 text-right text-sm space-x-2">
                        {p.status !== 'closed' && (
                          <button onClick={() => closePoll(p.id)} className="text-blue-600 hover:text-blue-800 font-medium">Close</button>
                        )}
                        <button onClick={() => deletePoll(p.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
