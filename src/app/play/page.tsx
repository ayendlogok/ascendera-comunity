'use client'

import { motion } from 'framer-motion'
import { Play, ShieldAlert } from 'lucide-react'

import { useState, useEffect } from 'react'

function LivePlayerCount({ baseCount }: { baseCount: number }) {
  const [players, setPlayers] = useState(baseCount)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prev => {
        const fluctuate = Math.floor(Math.random() * 11) - 5
        return Math.max(0, prev + fluctuate)
      })
    }, Math.random() * 4000 + 3000)
    return () => clearInterval(interval)
  }, [])

  return <>{players}</>
}

export default function PlayMapsPage() {
  const [playableMaps, setPlayableMaps] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/play-maps')
      .then(res => res.json())
      .then(data => setPlayableMaps(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-transparent text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <Play className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4">Play Featured Maps</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the stunning environments built by our community directly in Roblox.
          </p>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {playableMaps.map((map, i) => (
            <motion.div
              key={map.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-[#22c55e]/50 transition-colors shadow-2xl group flex flex-col"
            >
              <div className="h-56 relative">
                <img src={map.img} alt={map.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-bold border border-gray-600 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <LivePlayerCount baseCount={map.plays} /> Playing
                </div>
              </div>
              <div className="p-6 text-center flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#22c55e] transition-colors">{map.title}</h3>
                  <p className="text-sm text-gray-400 mb-6">Built by {map.author}</p>
                </div>
                <a 
                  href={map.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group-hover:-translate-y-1"
                >
                  <Play className="w-5 h-5 fill-current" /> Play Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
