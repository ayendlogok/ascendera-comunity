'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, ExternalLink } from 'lucide-react'

export default function GroupsPage() {
  const [groupInfo, setGroupInfo] = useState<any>(null)

  useEffect(() => {
    fetch('/api/roblox-group')
      .then(res => res.json())
      .then(data => setGroupInfo(data))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-20 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center mb-12">
          <Users className="w-12 h-12 text-[#e11d48] mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4">Our Groups</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Discover and join our officially featured Roblox community hubs below.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-900 via-gray-900 to-[#101b2a] rounded-3xl p-8 border border-gray-800 flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden"
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
            <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight">
              {groupInfo?.name || "Ascendera Community"}
            </h2>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
              {groupInfo?.description || "Wadah bagi para pengunjung untuk menjelajahi map pegunungan yang penuh tantangan bersama kami."}
            </p>
            
            <div className="flex gap-4 mb-6 justify-center md:justify-start">
              <div className="bg-gray-800/80 px-4 py-2 rounded-xl border border-gray-700/80 flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold">MEMBERS</span>
                <span className="text-lg font-extrabold text-[#f97316]">
                  {groupInfo?.memberCount ? groupInfo.memberCount.toLocaleString() : '1,200+'}
                </span>
              </div>
              {groupInfo?.owner && (
                <div className="bg-gray-800/80 px-4 py-2 rounded-xl border border-gray-700/80 flex flex-col">
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
              className="w-full sm:w-auto bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group border border-transparent hover:border-white/10"
            >
              <Users className="w-5 h-5" /> Join Group on Roblox <ExternalLink className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
