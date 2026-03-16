'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Heart, Play, Mountain } from 'lucide-react'

function LivePlayerCount({ baseCount }: { baseCount: number }) {
  const [players, setPlayers] = useState(baseCount)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prev => Math.max(0, prev + (Math.floor(Math.random() * 11) - 5)))
    }, Math.random() * 5000 + 4000)
    return () => clearInterval(interval)
  }, [])

  return <>{players}</>
}

export default function MapsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [maps, setMaps] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/maps-review')
      .then(res => res.json())
      .then(data => setMaps(data))
      .catch(err => console.error(err))
  }, [])

  const filteredMaps = maps.filter(map => {
    const matchesSearch = map.title.toLowerCase().includes(searchQuery.toLowerCase()) || map.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'All' || map.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-4">Map Showcase</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore the best mountain maps built by the community. Find inspiration, download open-source projects, and rate your favorites.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by map name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMaps.length > 0 ? (
            filteredMaps.map((map, i) => (
              <motion.div 
                key={map.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 flex flex-col group cursor-pointer hover:border-gray-500 transition-colors"
              >
                <div className="h-56 relative overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 bg-[#0f172a]/90 backdrop-blur px-3 py-1 rounded-md text-xs font-semibold border border-gray-600">
                    {map.type}
                  </div>
                  <button className="absolute top-3 right-3 z-10 p-2 bg-[#0f172a]/80 hover:bg-red-500/20 text-gray-300 hover:text-red-500 rounded-full transition-colors backdrop-blur border border-gray-600">
                    <Heart className="w-4 h-4" />
                  </button>
                  <img 
                    src={map.img} 
                    alt={map.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <a href={map.link} target="_blank" rel="noopener noreferrer" className="bg-[#f97316] hover:bg-[#ea580c] text-white p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Play className="w-6 h-6 ml-1" />
                    </a>
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white group-hover:text-[#22c55e] transition-colors">{map.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">By <span className="font-medium text-gray-300">{map.author}</span></p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-1 text-[#f97316]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{map.rating}</span>
                    </div>
                    <div className="text-sm font-medium text-[#22c55e] bg-green-500/10 px-3 py-1 rounded-md border border-green-500/20 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <LivePlayerCount baseCount={map.plays as number} /> Playing
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Mountain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No maps found</h3>
              <p className="text-gray-400">Try adjusting your search query or filters.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}
