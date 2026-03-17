import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const filePath = path.join(uploadDir, uniqueName)

    await fs.promises.writeFile(filePath, buffer)

    return NextResponse.json({ success: true, url: `/uploads/${uniqueName}` })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
