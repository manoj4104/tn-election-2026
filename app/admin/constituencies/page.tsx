'use client'

import AdminTable from '@/components/AdminTable'

export default function ConstituenciesAdmin() {
  return (
    <AdminTable
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
  )
}
