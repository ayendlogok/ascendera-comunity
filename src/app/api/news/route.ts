import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(news)
  } catch (err) {
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, tags, content, image } = body

    const newItem = await prisma.news.create({
      data: {
        title,
        tags: tags || '', 
        content,
        img: image || ''
      }
    })

    return NextResponse.json({ success: true, newItem })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to write to database' }, { status: 500 })
  }
}
