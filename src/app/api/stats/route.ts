import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // 1. Ambil jumlah Maps dari data JSON lokal (Unik berdasarkan Judul)
    const mapsReviewPath = path.join(process.cwd(), 'src/data/maps_review.json')
    const playMapsPath = path.join(process.cwd(), 'src/data/play_maps.json')

    let mapsReviewList: any[] = []
    let playMapsList: any[] = []

    if (fs.existsSync(mapsReviewPath)) {
      mapsReviewList = JSON.parse(fs.readFileSync(mapsReviewPath, 'utf-8'))
    }
    if (fs.existsSync(playMapsPath)) {
      playMapsList = JSON.parse(fs.readFileSync(playMapsPath, 'utf-8'))
    }

    // Gabungkan Judul unik (Tanpa case-sensitive & spasi)
    const allTitles = [
      ...mapsReviewList.map(m => m.title?.trim().toLowerCase()),
      ...playMapsList.map(m => m.title?.trim().toLowerCase())
    ].filter(Boolean)

    const uniqueTitles = new Set(allTitles)
    const totalMaps = uniqueTitles.size

    // 2. Ambil jumlah Anggota (Member) dari Discord Invite Widget
    let discordMembers = 4 // Fallback jika gagal fetch
    try {
      const res = await fetch('https://discord.com/api/v10/invites/tYw9PKb7J7?with_counts=true')
      const data = await res.json()
      if (data.approximate_member_count) {
         discordMembers = data.approximate_member_count
      }
    } catch (err) {
      console.error(err)
    }

    return NextResponse.json({
      devs: `${discordMembers}`,
      maps: `${totalMaps}`,
      downloads: "45k+",
      ratings: "12k+"
    })
  } catch (err) {
    return NextResponse.json({
      devs: "4",
      maps: "2",
      downloads: "45k+",
      ratings: "12k+"
    })
  }
}
