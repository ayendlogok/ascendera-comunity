import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/maps_review.json')

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
    const { title, rating, link } = body

    const data = fs.readFileSync(filePath, 'utf-8')
    const maps = JSON.parse(data)

    const newItem = {
      id: String(Date.now()),
      title,
      author: "Admin", 
      type: "Review",
      img: "https://images.unsplash.com/photo-1549419163-9529949bb2d2?auto=format&fit=crop&q=80&w=600",
      rating: rating || "4.5",
      plays: Math.floor(Math.random() * 500) + 50,
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
