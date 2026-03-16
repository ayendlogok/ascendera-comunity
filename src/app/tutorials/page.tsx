'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Clock, PlayCircle, LockKeyhole, X, Eye } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const YOUTUBE_VIDEOS = [
  { 
    id: "gWhVPrhV2qY", 
    title: "How to Make Realistic Mountains in Roblox Studio!", 
    category: "Terrain", 
    author: "RoBuilder", 
    duration: "12:15", 
    views: "45K views" 
  },
  { 
    id: "E0Nnd_GvbeM", 
    title: "Roblox Studio - Smooth Terrain Editor Masterclass", 
    category: "Editor", 
    author: "AlvinBlox", 
    duration: "15:30", 
    views: "120K views" 
  },
  { 
    id: "7IQL_o6v6_c", 
    title: "Creating Epic Mountain Trails & Hiking Paths", 
    category: "Building", 
    author: "PluginGamer", 
    duration: "9:45", 
    views: "18K views" 
  },
  { 
    id: "8bYnF6U3W90", 
    title: "Volumetric Fog & Snowy Mountain Lighting Guide", 
    category: "Lighting", 
    author: "Ascendera Devs", 
    duration: "20:10", 
    views: "22K views" 
  }
]

export default function TutorialsPage() {
  const { status } = useSession()
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [videos, setVideos] = useState(YOUTUBE_VIDEOS)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      setVideos(YOUTUBE_VIDEOS)
      return
    }

    setIsSearching(true)
    try {
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()

      if (data.success !== false) {
        setVideos(data)
      } else {
        // Fallback filter lokal jika api key belum dipasang
        const filtered = YOUTUBE_VIDEOS.filter(v => 
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setVideos(filtered)
        alert("Pencarian Live YouTube: " + data.message + "\n\nMenampilkan hasil pencarian lokal sementara.")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSearching(false)
    }
  }

  if (status === 'loading') {
    return <div className="min-h-screen bg-[#0f172a] text-white py-12 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div></div>
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white py-12 flex flex-col items-center justify-center">
        <LockKeyhole className="w-16 h-16 text-[#f97316] mb-6" />
        <h1 className="text-3xl font-bold mb-4">Developer Access Required</h1>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          Tutorials and guides are exclusive resources for registered members of the Ascendera Community.
        </p>
        <Link href="/api/auth/signin" className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 rounded-lg font-bold transition-colors">
          Sign In as Developer
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <PlayCircle className="w-12 h-12 text-[#f97316] mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4">Video Tutorials</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Pelajari trik pembuatan map pegunungan Roblox untuk membuat rute pendakian realistis di Ascendera.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Cari video tutorial..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#22c55e]"
            />
            <button type="submit" disabled={isSearching} className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 rounded-xl font-bold transition-colors">
              {isSearching ? 'Loading...' : 'Cari'}
            </button>
          </form>
        </div>

        {/* Featured Guide (Gunakan video pertama) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Featured Guide</h2>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedVideo(YOUTUBE_VIDEOS[0].id)}
            className="flex flex-col lg:flex-row bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl cursor-pointer hover:border-gray-500 transition-colors group"
          >
            <div className="lg:w-2/3 h-64 lg:h-96 relative">
              <img src={`https://img.youtube.com/vi/${YOUTUBE_VIDEOS[0].id}/maxresdefault.jpg`} alt={YOUTUBE_VIDEOS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <PlayCircle className="w-20 h-20 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>
            <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center bg-gray-800 relative z-10">
              <div className="text-[#22c55e] font-bold text-sm uppercase tracking-wider mb-4">{YOUTUBE_VIDEOS[0].category}</div>
              <h3 className="text-3xl font-extrabold mb-4 leading-tight group-hover:text-[#22c55e] transition-colors">{YOUTUBE_VIDEOS[0].title}</h3>
              <p className="text-gray-400 mb-8">Panduan video terperinci cara membuat topologi pegunungan realistis menggunakan Terrain Editor di Roblox Studio.</p>
              <div className="flex items-center gap-4 text-sm font-medium text-gray-400 mt-auto">
                <span>By {YOUTUBE_VIDEOS[0].author}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {YOUTUBE_VIDEOS[0].duration}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video Grid */}
        <h2 className="text-2xl font-bold mb-6 text-gray-200">Recent Videos</h2>
        {videos.length <= 1 ? (
          <p className="text-gray-400 text-center py-8">Tidak ada video lain yang ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.slice(1).map((tutorial: any, i: number) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedVideo(tutorial.id)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="h-48 rounded-xl overflow-hidden mb-4 relative border border-gray-800 shadow-lg">
                  <img src={`https://img.youtube.com/vi/${tutorial.id}/hqdefault.jpg`} alt={tutorial.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-black/80 rounded-full p-2 backdrop-blur-sm">
                    <PlayCircle className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/90 backdrop-blur px-2 py-0.5 rounded text-xs font-mono text-gray-300">
                    {tutorial.duration}
                  </div>
                  <div className="absolute top-3 left-3 bg-[#0f172a]/90 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold text-gray-300">
                     {tutorial.category}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#22c55e] transition-colors leading-snug">
                    {tutorial.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                    <span>{tutorial.author}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {tutorial.views}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Video Modal Overlay */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <button 
                onClick={() => setSelectedVideo(null)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-8 h-8" />
              </button>
              
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
              >
                <iframe 
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
