import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(events)
  } catch (err) {
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, content, image } = body

    const newItem = await prisma.event.create({
      data: {
        title,
        content,
        image: image || '/ramadan_hero.png'
      }
    })

    return NextResponse.json({ success: true, newItem })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to write to database' }, { status: 500 })
  }
}
