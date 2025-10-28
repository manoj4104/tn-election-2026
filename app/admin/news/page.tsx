'use client'

import AdminTable from '@/components/AdminTable'
import Image from 'next/image'

export default function NewsAdmin() {
  return (
    <AdminTable
      endpoint="news"
      title="News Articles"
      icon="📰"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'slug', label: 'Slug' },
        {
          key: 'published',
          label: 'Status',
          render: (value) => (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {value ? 'Published' : 'Draft'}
            </span>
          ),
        },
        {
          key: 'imageUrl',
          label: 'Image',
          render: (value) => value ? (
            <Image src={value} alt="Article" width={64} height={40} className="object-cover rounded" />
          ) : '-',
        },
        {
          key: 'createdAt',
          label: 'Created',
          render: (value) => new Date(value).toLocaleDateString(),
        },
      ]}
      createFields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'slug', label: 'Slug', type: 'text', required: true },
        { name: 'summary', label: 'Summary', type: 'textarea' },
        { name: 'content', label: 'Content', type: 'textarea', required: true },
        { name: 'imageUrl', label: 'Image URL', type: 'url' },
        { name: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
