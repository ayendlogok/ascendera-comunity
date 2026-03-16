import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/news.json')

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (err) {
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, tags, content } = body

    const data = fs.readFileSync(filePath, 'utf-8')
    const news = JSON.parse(data)

    const newItem = {
      id: String(Date.now()),
      title,
      tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
      content,
      createdAt: new Date().toISOString()
    }

    news.unshift(newItem) // Add to top
    fs.writeFileSync(filePath, JSON.stringify(news, null, 2))

    return NextResponse.json({ success: true, newItem })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to write data' }, { status: 500 })
  }
}
