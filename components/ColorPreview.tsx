import React from 'react'
import { DynamicBgColor } from './DynamicColor'

interface ColorPreviewProps {
  color: string
}

export default function ColorPreview({ color }: ColorPreviewProps) {
  return (
    <div className="flex items-center gap-2">
      <DynamicBgColor 
        color={color} 
        className="w-6 h-6 rounded border border-gray-300"
      />
      <span>{color}</span>
    </div>
  )
}
