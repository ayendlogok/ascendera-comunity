'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mountain, Users, Download, Star, ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { useState, useEffect } from 'react'

const MotionLink = motion.create(Link)

export default function Home() {
  const { status } = useSession()
  const [stats, setStats] = useState({ devs: '1,200+', maps: '3,450', downloads: '45k+', ratings: '12k+' })
  const [featuredMap, setFeaturedMap] = useState<any>(null)
  const [showInterview, setShowInterview] = useState(false)
  const [groupInfo, setGroupInfo] = useState<any>(null)

  useEffect(() => {
    const fetchStats = () => {
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(() => {})
    }

    const fetchFeatured = () => {
      fetch('/api/play-maps')
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const sorted = [...data].sort((a, b) => (b.plays || 0) - (a.plays || 0))
            setFeaturedMap(sorted[0])
          }
        })
        .catch(() => {})
    }

    const fetchGroupInfo = () => {
      fetch('/api/roblox-group')
        .then(res => res.json())
        .then(data => setGroupInfo(data))
        .catch(() => {})
    }

    fetchStats()
    fetchFeatured()
    fetchGroupInfo()
    const intervalId = setInterval(fetchStats, 30000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a] z-10" />
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
            alt="Mountain background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase"
          >
            Roblox <span className="text-[#22c55e]">Ascendera</span><br />
            Community
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Wadah bagi para pengunjung untuk menemukan dan menjelajahi map pegunungan yang penuh tantangan bersama Ascendera Community
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MotionLink
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/maps"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Explore Maps <ArrowRight className="w-5 h-5" />
            </MotionLink>
            {status === 'authenticated' ? (
              <MotionLink
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/assets"
                className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Access Hub
              </MotionLink>
            ) : (
              <MotionLink
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/api/auth/signin"
                className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Developer Login
              </MotionLink>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-800 bg-[#0f172a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {[
              { label: 'Members of Discord', value: stats.devs, icon: Users },
              { label: 'Roblox Group Members', value: groupInfo?.memberCount ? groupInfo.memberCount.toLocaleString() : '1,200+', icon: Users },
              { label: 'Maps Uploaded', value: stats.maps, icon: Mountain },
              { label: 'Asset Downloads', value: stats.downloads, icon: Download },
              { label: 'Community Ratings', value: stats.ratings, icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="bg-gray-800 p-4 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-[#f97316]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roblox Group Section */}
      <section className="py-20 bg-[#070b13] border-y border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900 via-gray-900 to-[#101b2a] rounded-3xl p-8 border border-gray-800 flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto shadow-xl relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute right-0 top-0 w-72 h-72 bg-[#22c55e]/5 rounded-full filter blur-3xl -z-10" />

            {/* Left Box Image Group */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#22c55e] opacity-20 filter blur-xl group-hover:opacity-40 transition-opacity rounded-full"></div>
                <img 
                  src={groupInfo?.icon || "https://images.rbxcdn.com/9748ecf1627b0f44f2fb9f6ddae5b08e.png"} 
                  alt="Ascendera Group icon" 
                  className="w-44 h-44 rounded-3xl border border-gray-700 shadow-2xl relative z-10 p-1 bg-gray-950/80 object-cover"
                />
              </div>
            </div>

            {/* Right Box Info stats */}
            <div className="w-full md:w-2/3 flex flex-col justify-center text-center md:text-left">
              <span className="text-[#22c55e] font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2 justify-center md:justify-start">
                <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                Featured Roblox Group
              </span>
              <h2 className="text-3xl font-extrabold text-white mb-2">
                {groupInfo?.name || "Ascendera Community"}
              </h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                {groupInfo?.description || "Wadah bagi para pengunjung untuk menjelajahi map pegunungan yang penuh tantangan bersama kami."}
              </p>
              
              <div className="flex gap-4 mb-6 justify-center md:justify-start">
                <div className="bg-gray-800/80 px-4 py-2 rounded-lg border border-gray-700/80 flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold">MEMBERS</span>
                  <span className="text-lg font-extrabold text-[#f97316]">
                    {groupInfo?.memberCount ? groupInfo.memberCount.toLocaleString() : '1,200+'}
                  </span>
                </div>
                {groupInfo?.owner && (
                  <div className="bg-gray-800/80 px-4 py-2 rounded-lg border border-gray-700/80 flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold">OWNER</span>
                    <span className="text-base font-bold text-gray-200 truncate max-w-[120px]">
                      {groupInfo.owner}
                    </span>
                  </div>
                )}
              </div>

              <a 
                href="https://www.roblox.com/id/communities/461646009/Ascendera-Community#!/about" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" /> Join Group on Roblox
              </a>
            </div>

          </motion.div>
        </div>
      </section>



      {/* Map of the Month & CTA */}
      <section className="py-24 bg-gradient-to-t from-gray-900 to-[#0f172a] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-800 to-[#0f172a] rounded-3xl p-8 md:p-12 border border-gray-700 shadow-2xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">

            <div className="absolute -right-20 -top-20 text-[#22c55e]/10">
              <Mountain className="w-96 h-96" />
            </div>

            <div className="w-full md:w-1/2 relative z-10">
              <div className="inline-block bg-[#f97316]/20 text-[#f97316] font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-[#f97316]/30">
                🏆 Gunung Teramai Bulan Ini
              </div>
              <h2 className="text-4xl font-extrabold mb-6">{featuredMap ? featuredMap.title : "Mount Plenger"}</h2>
              <p className="text-gray-400 text-lg mb-8">
                {featuredMap && featuredMap.type === 'Volcano' 
                  ? "Recreasi skala luas Gunung Berapi aktif dengan material medan (*lava*) kustom yang paling banyak dikunjungi dan dimainkan komunitas." 
                  : "Map pegunungan paling banyak dikunjungi bulan ini yang didesain estetik dan optimal oleh Ascendera Community."}
                <br />
                <span className="text-[#22c55e] text-sm font-bold mt-2 flex items-center gap-1">
                  🔥 {featuredMap ? featuredMap.plays?.toLocaleString() : "1,500"} Kunjungan Live
                </span>
              </p>
              <div className="flex gap-4">
                <a 
                  href={featuredMap ? featuredMap.link : "https://www.roblox.com/games"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg flex items-center justify-center"
                >
                  Play on Roblox
                </a>
                <button 
                  onClick={() => setShowInterview(true)} 
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-gray-600"
                >
                  Read Developer Interview
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative z-10">
              <div className="aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                <img
                  src={featuredMap ? featuredMap.img : "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80"}
                  alt={featuredMap ? featuredMap.title : "Yosemite Recreation"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Developer Interview Modal */}
      {showInterview && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowInterview(false)}>
          <div className="max-w-xl w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 relative" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="inline-block bg-[#f97316]/20 text-[#f97316] font-bold px-3 py-1 rounded-full text-xs mb-4 border border-[#f97316]/30">
                 🎤 Interview Eksklusif
              </div>
              <h2 className="text-2xl font-extrabold mb-4">Wawancara Kreator {featuredMap ? featuredMap.title : "Mount Plenger"}</h2>
              
              <div className="space-y-4 text-gray-300">
                <p><strong>Q: Apa inspirasi di balik peta gunung ini?</strong></p>
                <p>A: Kami ingin membawakan keindahan visual lanskap pegunungan yang sangat detail di Roblox namun tetap berukuran stabil untuk semua pengguna Asia.</p>
                <p><strong>Q: Berapa lama waktu yang dibutuhkan untuk membangun model ini?</strong></p>
                <p>A: Membutuhkan waktu sekitar 2-3 minggu pengerjaan detail terrain modeling dan lighting setups.</p>
              </div>
              <button onClick={() => setShowInterview(false)} className="mt-6 w-full bg-[#22c55e] hover:bg-[#16a34a] py-3 rounded-lg font-bold text-white transition-colors">
                Tutup Sesi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
