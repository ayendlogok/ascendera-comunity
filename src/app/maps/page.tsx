'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, Heart, Play, Mountain, X, MapPin, Box, ShoppingBag, Layout } from 'lucide-react'

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
  const [selectedMap, setSelectedMap] = useState<any | null>(null)

  const calculateTotalScore = (reviews: any) => {
    if (!reviews) return 0
    let sum = 0
    Object.values(reviews).forEach((cat: any) => {
      Object.values(cat).forEach((item: any) => {
        sum += typeof item.score === 'number' ? item.score : parseFloat(item.score) || 0
      })
    })
    return sum
  }

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
                onClick={() => setSelectedMap(map)}
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

      <AnimatePresence>
        {selectedMap && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedMap(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#0f172a] border border-gray-800 rounded-2xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMap(null)} 
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur border border-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image & Basic Info */}
              <div className="relative h-72 md:h-full flex flex-col">
                <div className="h-1/2 md:h-2/3 relative">
                  <img src={selectedMap.img} alt={selectedMap.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
                </div>
                <div className="p-6 flex-grow bg-[#0f172a] -mt-10 relative z-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#22c55e]/20 text-[#22c55e] text-xs px-2.5 py-1 rounded-md font-bold border border-[#22c55e]/20">
                        {selectedMap.type}
                      </span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-1">{selectedMap.title}</h2>
                    <p className="text-sm text-gray-400 mb-4">By {selectedMap.author}</p>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed bg-gray-800/50 p-3 rounded-lg border border-gray-800">
                      {selectedMap.description}
                    </p>
                  </div>
                  
                  {/* Quick Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <div className="bg-gray-800/50 backdrop-blur p-3 rounded-xl border border-gray-800 flex items-center gap-3">
                      <Box className="w-5 h-5 text-blue-400" />
                      <div>
                        <span className="text-[10px] text-gray-500 block">Model Type</span>
                        <span className="text-xs font-bold text-white">{selectedMap.model_type || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur p-3 rounded-xl border border-gray-800 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-red-400" />
                      <div>
                        <span className="text-[10px] text-gray-500 block">Checkpoints</span>
                        <span className="text-xs font-bold text-white">{selectedMap.checkpoints || '0'} Points</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur p-3 rounded-xl border border-gray-800 flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-orange-400" />
                      <div>
                        <span className="text-[10px] text-gray-500 block">Shop Items</span>
                        <span className="text-xs font-bold text-gray-200 truncate max-w-[120px] block">{selectedMap.shop_menu || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur p-3 rounded-xl border border-gray-800 flex items-center gap-3">
                      <Layout className="w-5 h-5 text-purple-400" />
                      <div>
                        <span className="text-[10px] text-gray-500 block">GUI Details</span>
                        <span className="text-xs font-bold text-gray-200 truncate max-w-[120px] block">{selectedMap.gui || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Review Dashboard */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh] bg-[#090d16] flex flex-col border-l border-gray-800/50">
                <div className="flex justify-between items-center mb-6 bg-gray-950/50 p-4 rounded-xl border border-gray-900/50 shadow-inner">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                    <Star className="text-yellow-400 w-5 h-5 fill-current" /> Review Indicator Score
                  </h3>
                  {selectedMap.reviews && (
                    <div className="bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-3 py-1.5 rounded-xl flex items-center gap-3 shadow-md">
                      <div className="bg-[#22c55e] text-black w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">
                        {Math.floor((calculateTotalScore(selectedMap.reviews) / 150) * 100)}%
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 block uppercase font-black">Skor Total</span>
                        <span className="text-base font-black">{calculateTotalScore(selectedMap.reviews)} <span className="text-[10px] text-gray-500">/150</span></span>
                      </div>
                    </div>
                  )}
                </div>

                {selectedMap.reviews ? (
                  <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    {Object.entries(selectedMap.reviews).map(([key, value]: any) => (
                      <div key={key} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md">
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#22c55e] border-b border-gray-800/80 pb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                          {key === 'visual_estetika' ? 'Visual dan Estetika' : 
                           key === 'ui' ? 'User Interface (UI)' : 
                           key === 'player_experience' ? 'Player Experience' : 
                           key === 'level_design' ? 'Level Design' : 'Fitur Tambahan'}
                        </h4>
                        <div className="space-y-4">
                          {Object.entries(value).map(([subKey, subValue]: any) => (
                            <div key={subKey} className="bg-gray-950/80 p-3 rounded-xl border border-gray-900/50">
                              <div className="flex justify-between mb-1 items-center">
                                <span className="text-xs font-bold text-gray-200 capitalize">{subKey.replace('_', ' ')}</span>
                                <span className="text-xs font-black text-[#ea580c] bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">{subValue.score}/10</span>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-relaxed mb-2 mt-1">{subValue.detail}</p>
                              {/* Progress Bar */}
                              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${subValue.score * 10}%` }}
                                  transition={{ duration: 0.8, delay: 0.1 }}
                                  className={`h-full rounded-full ${
                                    subValue.score >= 9 ? 'bg-[#22c55e]' : 
                                    subValue.score >= 8 ? 'bg-[#10b981]' : 'bg-[#f59e0b]'
                                  }`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-500">
                    No detailed review parameters available.
                  </div>
                )}

                <div className="mt-6">
                  <a href={selectedMap.link} target="_blank" rel="noopener noreferrer" className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                    <Play className="w-4 h-4 fill-current group-hover:translate-x-1 transition-transform" /> Play in Roblox
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
