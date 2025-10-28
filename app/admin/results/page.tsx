'use client'

import AdminTable from '@/components/AdminTable'

export default function ResultsAdmin() {
  const loadOptions = async () => {
    const [partiesRes, constituenciesRes, candidatesRes] = await Promise.all([
      fetch('/api/parties?limit=100'),
      fetch('/api/constituencies?limit=300'),
      fetch('/api/candidates?limit=1000'),
    ])

    const parties = await partiesRes.json()
    const constituencies = await constituenciesRes.json()
    const candidates = await candidatesRes.json()

    return {
      partyId: (parties.data || []).map((p: any) => ({ value: p.id, label: p.name })),
      constituencyId: (constituencies.data || []).map((c: any) => ({ value: c.id, label: c.name })),
      candidateId: (candidates.data || []).map((c: any) => ({ value: c.id, label: c.name })),
    }
  }

  return (
    <AdminTable
      endpoint="results"
      title="Election Results"
      icon="📊"
      columns={[
        { key: 'id', label: 'ID' },
        {
          key: 'Constituency',
          label: 'Constituency',
          render: (value) => value?.name || '-',
        },
        {
          key: 'Party',
          label: 'Party',
          render: (value) => value?.name || '-',
        },
        {
          key: 'Candidate',
          label: 'Candidate',
          render: (value) => value?.name || '-',
        },
        { key: 'votes', label: 'Votes' },
        {
          key: 'leading',
          label: 'Leading',
          render: (value) => value ? '✅' : '-',
        },
        {
          key: 'won',
          label: 'Won',
          render: (value) => value ? '🏆' : '-',
        },
      ]}
      createFields={[
        { name: 'constituencyId', label: 'Constituency', type: 'select', required: true },
        { name: 'partyId', label: 'Party', type: 'select' },
        { name: 'candidateId', label: 'Candidate', type: 'select' },
        { name: 'votes', label: 'Votes', type: 'number', required: true },
        { name: 'leading', label: 'Leading', type: 'checkbox' },
        { name: 'won', label: 'Won', type: 'checkbox' },
      ]}
      onLoadOptions={loadOptions}
    />
  )
}
