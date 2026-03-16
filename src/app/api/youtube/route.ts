import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')

  if (!q) return NextResponse.json([])

  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    return NextResponse.json({ 
      success: false, 
      error: 'API_KEY_MISSING',
      message: 'Tambahkan YOUTUBE_API_KEY di file .env Anda untuk mengaktifkan pencarian live YouTube!'
    }, { status: 400 })
  }

  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(q + " roblox")}&type=video&key=${apiKey}`)
    const data = await res.json()

    if (data.error) {
      return NextResponse.json({ success: false, error: data.error.message }, { status: 500 })
    }

    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      category: "YouTube",
      author: item.snippet.channelTitle,
      duration: "Video",
      views: "Live"
    }))

    return NextResponse.json(videos)
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Fetch failed' }, { status: 500 })
  }
}
