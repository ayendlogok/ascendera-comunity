'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LockKeyhole, MessageSquare, ExternalLink } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

// Simulated fallback members when Widget is disabled
const FALLBACK_MEMBERS = [
  { username: "yantooooo", role: "Owner", color: "#f97316", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix" },
  { username: "Remindaniel", role: "Co-Owner", color: "#e11d48", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Easton" },
  { username: "MasBi", role: "Admin", color: "#3b82f6", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam" },
  { username: "ZikS", role: "Admin", color: "#3b82f6", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo" },
  { username: "joeyzn", role: "Web Dev", color: "#d946ef", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver" },
]

export default function DevelopersPage() {
  const { data: session } = useSession()
  const [counts, setCounts] = useState<{ online: number, members: number } | null>(null)
  const [liveMembers, setLiveMembers] = useState<any[]>([])
  const [widgetEnabled, setWidgetEnabled] = useState<boolean>(false)

  useEffect(() => {
    async function fetchDiscordCounts() {
      try {
        const res = await fetch('https://discord.com/api/v10/invites/tYw9PKb7J7?with_counts=true')
        const data = await res.json()
        if (data.approximate_member_count) {
          setCounts({
            members: data.approximate_member_count,
            online: data.approximate_presence_count || 0
          })
        }
      } catch (err) {
        console.error("Failed to fetch discord status:", err)
      }
    }

    async function fetchLiveMembers() {
      try {
        const res = await fetch('https://discord.com/api/guilds/1467248848521924815/widget.json')
        const data = await res.json()
        if (data && data.members) {
          setLiveMembers(data.members)
          setWidgetEnabled(true)
        } else {
          setWidgetEnabled(false)
        }
      } catch (err) {
        setWidgetEnabled(false)
      }
    }

    fetchDiscordCounts()
    fetchLiveMembers()
    const int = setInterval(() => { fetchDiscordCounts(); fetchLiveMembers(); }, 30000)
    return () => clearInterval(int)
  }, [])

  // Choose display list
  const displayMembers = widgetEnabled 
    ? liveMembers.map(m => ({
        username: m.nick || m.username,
        role: m.game ? `Playing ${m.game.name}` : "Online", 
        color: "#22c55e", 
        avatar: m.avatar_url 
      }))
    : FALLBACK_MEMBERS

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <MessageSquare className="w-12 h-12 text-[#5865F2] mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4">Ascendera Discord Members</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Koneksi dan kolaborasi langsung dengan para kreator terbaik kami di server Discord resmi Ascendera.
          </p>

          <div className="flex justify-center gap-4 sm:gap-6 mb-8 text-sm">
            {counts ? (
              <>
                <div className="flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 px-4 py-2 rounded-full text-[#22c55e] font-bold">
                  <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full animate-pulse" />
                  {counts.online} Online
                </div>
                <div className="flex items-center gap-2 bg-[#5865F2]/10 border border-[#5865F2]/30 px-4 py-2 rounded-full text-[#5865F2] font-bold">
                  {counts.members} Anggota
                </div>
              </>
            ) : (
                <p className="text-gray-500">Memuat status Discord...</p>
            )}
          </div>

          <a href="https://discord.gg/tYw9PKb7J7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold px-6 py-3 rounded-xl shadow-xl transition-all hover:scale-105">
            {(session?.user as any)?.role === 'ADMIN' ? 'Go to Discord' : 'Join Discord'} <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Member Cards Showcase Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {displayMembers.map((member, i) => (
            <motion.div
              key={member.username + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, borderColor: member.color + '50' }}
              className="bg-gray-800 rounded-2xl p-5 border border-gray-700 transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex flex-col items-center relative w-full max-w-[160px] sm:max-w-[180px]"
            >
              <div className="relative mb-3">
                <img src={member.avatar} alt={member.username} className="w-16 h-16 rounded-full border-2 border-gray-600 shadow-xl" />
                <div className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full border-2 border-gray-800" style={{ backgroundColor: member.color }} />
              </div>

              <h3 className="font-bold text-center text-sm mb-1 truncate w-full">{member.username}</h3>
              
              <div 
                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border" 
                style={{ 
                  color: member.color, 
                  borderColor: member.color + '30',
                  backgroundColor: member.color + '10'
                }}
              >
                {member.role}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
