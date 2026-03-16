import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const groupId = '461646009'
    const groupRes = await fetch(`https://groups.roblox.com/v1/groups/${groupId}`)
    const groupData = await groupRes.json()

    // Icon thumbnail
    const iconRes = await fetch(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=150x150&format=Png&isCircular=false`)
    const iconData = await iconRes.json()

    return NextResponse.json({
      name: groupData.name,
      description: groupData.description,
      memberCount: groupData.memberCount,
      owner: groupData.owner?.username,
      shout: groupData.shout?.body,
      icon: iconData.data?.[0]?.imageUrl
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch Roblox Group' }, { status: 500 })
  }
}
