'use client'

import AdminTable from '@/components/AdminTable'
import Image from 'next/image'

export default function CandidatesAdmin() {
  const loadOptions = async () => {
    const [partiesRes, constituenciesRes] = await Promise.all([
      fetch('/api/parties?limit=100'),
      fetch('/api/constituencies?limit=300'),
    ])

    const parties = await partiesRes.json()
    const constituencies = await constituenciesRes.json()

    return {
      partyId: (parties.data || []).map((p: any) => ({ value: p.id, label: p.name })),
      constituencyId: (constituencies.data || []).map((c: any) => ({ value: c.id, label: c.name })),
    }
  }

  return (
    <AdminTable
      endpoint="candidates"
      title="Candidates"
      icon="👤"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        {
          key: 'Party',
          label: 'Party',
          render: (value) => value?.name || '-',
        },
        {
          key: 'Constituency',
          label: 'Constituency',
          render: (value) => value?.name || '-',
        },
        {
          key: 'photoUrl',
          label: 'Photo',
          render: (value) => value ? (
            <Image src={value} alt="Candidate" width={48} height={48} className="rounded-full object-cover" />
          ) : '-',
        },
      ]}  
      createFields={[
        { name: 'name', label: 'Candidate Name', type: 'text', required: true },
        { name: 'partyId', label: 'Party', type: 'select', required: true },
        { name: 'constituencyId', label: 'Constituency', type: 'select', required: true },
        { name: 'photoUrl', label: 'Photo URL', type: 'url' },
        { name: 'bio', label: 'Biography', type: 'textarea' },
      ]}
      onLoadOptions={loadOptions}
    />
  )
}
