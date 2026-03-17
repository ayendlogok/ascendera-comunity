import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single item
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const newsItem = await prisma.news.findUnique({
      where: { id }
    })
    if (!newsItem) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(newsItem)
  } catch (err) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

// UPDATE single item
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { title, tags, content, image } = body

    const updatedItem = await prisma.news.update({
      where: { id },
      data: {
        title,
        tags: tags || undefined,
        content,
        img: image || undefined
      }
    })

    return NextResponse.json({ success: true, updatedItem })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update database' }, { status: 500 })
  }
}

// DELETE single item
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const deletedItem = await prisma.news.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, deletedItem })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
