import { NextRequest } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { requireApiKey } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type (images only)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: 'Invalid file type. Only images allowed.' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return Response.json({ error: 'File too large. Max 5MB.' }, { status: 400 })
    }

    // Generate safe filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${originalName}`
    
    // Determine subdirectory from form data (optional)
    const subdir = (formData.get('subdir') as string) || ''
    const validSubdirs = ['news', 'candidates', 'parties', 'logos', '']
    if (!validSubdirs.includes(subdir)) {
      return Response.json({ error: 'Invalid subdirectory' }, { status: 400 })
    }

    // Create target directory
    const uploadDir = join(process.cwd(), 'public', 'images', subdir)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // Return public URL
    const publicUrl = `/images/${subdir ? subdir + '/' : ''}${filename}`
    
    return Response.json({
      success: true,
      filename,
      url: publicUrl,
      size: file.size,
      type: file.type,
    }, { status: 201 })

  } catch (error: any) {
    console.error('Upload error:', error)
    return Response.json({ error: 'Upload failed', details: error.message }, { status: 500 })
  }
}
