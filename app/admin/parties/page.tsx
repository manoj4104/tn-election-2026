'use client'

import AdminTable from '@/components/AdminTable'
import Image from 'next/image'
import ColorPreview from '@/components/ColorPreview'

export default function PartiesAdmin() {
  return (
    <AdminTable
      endpoint="parties"
      title="Parties"
      icon="🏛️"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'abbreviation', label: 'Abbreviation' },
        { 
          key: 'color', 
          label: 'Color',
          render: (value) => value ? <ColorPreview color={value} /> : '-'
        },
        {
          key: 'logoUrl',
          label: 'Logo',
          render: (value) => value ? (
            <Image src={value} alt="Logo" width={48} height={48} className="object-contain" />
          ) : '-'
        },
      ]}
      createFields={[
        { name: 'name', label: 'Party Name', type: 'text', required: true },
        { name: 'abbreviation', label: 'Abbreviation', type: 'text' },
        { name: 'color', label: 'Color (hex)', type: 'text' },
        { name: 'logoUrl', label: 'Logo URL', type: 'url' },
      ]}
    />
  )
}
