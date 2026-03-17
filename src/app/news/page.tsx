'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, BellRing, Calendar } from 'lucide-react'

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [selectedNews, setSelectedNews] = useState<any | null>(null)

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err))
  }, [])

  const defaultImg = "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80"
  
  return (
    <div className="min-h-screen bg-transparent text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-12 border-b border-gray-800 pb-8">
          <div className="p-4 bg-gray-800 rounded-2xl">
            <Newspaper className="w-10 h-10 text-[#22c55e]" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Community News</h1>
            <p className="text-gray-400 text-lg">
              Tetap terhubung dengan platform pembaruan, acara, dan spotlight terbaru dari Indonesia.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {news.map((item, i) => {
            const tagsArray = typeof item.tags === 'string' ? item.tags.split(',').map((t: string) => t.trim()) : item.tags || []
            const itemType = tagsArray[0] || "Update"
            const itemDate = new Date(item.createdAt).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })
            const itemImg = item.img || defaultImg

            return (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedNews(item)}
              >
                <div className="flex flex-col md:flex-row gap-8 items-start bg-gray-800/20 p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
                  <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden shrink-0 border border-gray-700">
                    <img src={itemImg} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  
                  <div className="w-full md:w-2/3 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        itemType === 'Event' ? 'bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/30' :
                        itemType === 'Update' ? 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {itemType}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                        <Calendar className="w-4 h-4" /> {itemDate}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-[#22c55e] transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {item.content}
                    </p>
                    
                    <button onClick={(e) => { e.stopPropagation(); setSelectedNews(item) }} className="text-[#22c55e] font-semibold flex items-center gap-2 hover:text-[#16a34a] transition-colors w-fit">
                      Read Full Article <BellRing className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
        
        {/* News Details Modal Modal */}
        {selectedNews && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedNews(null)}>
            <div className="max-w-2xl w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedNews(null)} 
                className="absolute top-4 right-4 bg-black/60 p-2 rounded-full hover:bg-black/90 text-gray-400 hover:text-white transition-colors"
                aria-label="Close News Modal"
              >
                <BellRing className="w-5 h-5 rotate-45 transform" />
              </button>
              
              <img src={selectedNews.img || defaultImg} alt={selectedNews.title} className="w-full h-56 object-cover border-b border-gray-800" />
              
              <div className="p-6 md:p-8">
                <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 rounded-full text-xs font-bold w-fit block mb-4">
                  {(() => {
                    const tagsArray = typeof selectedNews.tags === 'string' ? selectedNews.tags.split(',').map((t: string) => t.trim()) : selectedNews.tags || []
                    return tagsArray[0] || "Update"
                  })()}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4">{selectedNews.title}</h2>
                <p className="text-gray-400 text-sm mb-6 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(selectedNews.createdAt).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedNews.content}</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
