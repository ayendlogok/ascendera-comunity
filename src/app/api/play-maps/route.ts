import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/play_maps.json')

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
    const { title, author, link } = body

    const data = fs.readFileSync(filePath, 'utf-8')
    const maps = JSON.parse(data)

    const newItem = {
      id: String(Date.now()),
      title,
      author: author || "Admin", 
      type: "Default",
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600",
      rating: "4.8",
      plays: Math.floor(Math.random() * 800) + 100,
      link,
      createdAt: new Date().toISOString()
    }

    maps.unshift(newItem)
    fs.writeFileSync(filePath, JSON.stringify(maps, null, 2))

    return NextResponse.json({ success: true, newItem })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 })
  }
}
