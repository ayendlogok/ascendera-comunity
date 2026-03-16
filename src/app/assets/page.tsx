'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, FileArchive, Package, Image as ImageIcon, LockKeyhole } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const MOCK_ASSETS = [
  { id: 1, title: "High-Res Pine Trees Pack", category: "Trees", author: "NatureScripter", downloads: "4.2k", size: "45 MB", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80" },
  { id: 2, title: "Volcanic Rock Textures", category: "Rocks", author: "LavaDev", downloads: "2.1k", size: "128 MB", img: "https://images.unsplash.com/photo-1541819612995-154dfaeab10c?auto=format&fit=crop&q=80" },
  { id: 3, title: "Dynamic Mountain Fog System", category: "Fog effects", author: "WeatherMage", downloads: "8.5k", size: "2 MB", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80" },
  { id: 4, title: "Alpine Ambience Soundscape", category: "Sound ambience", author: "AudioGuru", downloads: "1.2k", size: "85 MB", img: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80" },
  { id: 5, title: "Realistic Terrain Heightmap", category: "Mountain terrain", author: "GeoArchitect", downloads: "5k", size: "15 MB", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" },
]

export default function AssetsPage() {
  const { status } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Mountain terrain', 'Rocks', 'Trees', 'Fog effects', 'Sound ambience']

  const filteredAssets = MOCK_ASSETS.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || asset.category === activeCategory
    return matchesSearch && matchesCategory
  })

  if (status === 'loading') {
    return <div className="min-h-screen bg-[#0f172a] text-white py-12 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div></div>
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white py-12 flex flex-col items-center justify-center">
        <LockKeyhole className="w-16 h-16 text-[#f97316] mb-6" />
        <h1 className="text-3xl font-bold mb-4">Developer Access Required</h1>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          The Asset Library is exclusive to registered Ascendera Community developers. Sign in to download and share terrain materials, models, and scripts.
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
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-extrabold mb-4">Asset Library</h1>
            <p className="text-gray-400 text-lg">
              Download community-created trees, rocks, weather effects, and terrain generation tools for your next mountain map.
            </p>
          </div>
          <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
            <Package className="w-5 h-5" /> Upload Asset
          </button>
        </div>

        {/* Search and Columns Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 text-sm text-white rounded pl-9 pr-3 py-2 focus:outline-none focus:border-[#22c55e]"
                />
              </div>

              <h3 className="font-semibold text-gray-300 mb-4 uppercase text-xs tracking-wider">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                        activeCategory === cat 
                          ? 'bg-[#22c55e]/10 text-[#22c55e]' 
                          : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAssets.map((asset, i) => (
                <motion.div 
                  key={asset.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col group"
                >
                  <div className="h-40 overflow-hidden relative border-b border-gray-700 bg-gray-900">
                    <img 
                      src={asset.img} 
                      alt={asset.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 bg-[#0f172a]/90 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold text-gray-300">
                      {asset.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1 leading-tight text-white group-hover:text-[#22c55e] transition-colors line-clamp-2">
                        {asset.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">By <span className="font-medium text-gray-300">{asset.author}</span></p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-2">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> {asset.downloads}</span>
                        <span className="flex items-center gap-1"><FileArchive className="w-3.5 h-3.5" /> {asset.size}</span>
                      </div>
                      <button className="bg-gray-700 hover:bg-[#22c55e] text-white p-2 rounded-lg transition-colors group-hover:bg-[#22c55e]">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredAssets.length === 0 && (
              <div className="text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
                <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-300 mb-1">No assets found</h3>
                <p className="text-sm text-gray-500">Wait for community members to upload assets here.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
