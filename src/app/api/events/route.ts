import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/events.json')

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]')
    }
    const data = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (err) {
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, content, image } = body

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]')
    }

    const data = fs.readFileSync(filePath, 'utf-8')
    const events = JSON.parse(data)

    const newItem = {
      id: String(Date.now()),
      title,
      content,
      image: image || '/ramadan_hero.png', // Fallback to our beautiful ramadan_hero
      createdAt: new Date().toISOString()
    }

    events.unshift(newItem) // Add to top
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2))

    return NextResponse.json({ success: true, newItem })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to write data' }, { status: 500 })
  }
}
