'use client'

import { motion } from 'framer-motion'
import { Mountain, DiscIcon as Discord, Users, CheckCircle } from 'lucide-react'

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16 flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-10 blur-sm pointer-events-none">
        <Mountain className="w-[800px] h-[800px] absolute -right-40 -bottom-40 text-[#22c55e]" />
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-extrabold mb-6 tracking-tight"
          >
            Join <span className="text-[#22c55e]">MountainMap</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto"
          >
            Become part of the fastest-growing community of Roblox terrain builders, modelers, and scripters.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-3xl p-8 hover:bg-[#5865F2]/20 transition-colors shadow-2xl relative group overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Discord className="w-64 h-64 text-[#5865F2]" />
            </div>
            
            <Discord className="w-16 h-16 text-[#5865F2] mb-6" />
            <h2 className="text-3xl font-bold mb-4">Discord Server</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Our official Discord server is the heart of the community. Chat with other developers in real-time, get immediate help with terrain generation, and participate in exclusive voice channel seminars!
            </p>
            
            <ul className="space-y-3 mb-8 text-sm text-gray-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22c55e]" /> 5,000+ Active Members</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22c55e]" /> Real-time Support & Feedback</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22c55e]" /> Exclusive Asset Drops</li>
            </ul>

            <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg">
              Join Discord
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8 hover:bg-gray-800 transition-colors shadow-2xl relative group overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-64 h-64 text-white" />
            </div>
            
            <Users className="w-16 h-16 text-white mb-6" />
            <h2 className="text-3xl font-bold mb-4">Roblox Group</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Join our Roblox Group to get the official in-game badge, participate in group payouts for official community games, and show off your MountainMap developer status on your profile.
            </p>
            
            <ul className="space-y-3 mb-8 text-sm text-gray-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22c55e]" /> Official Developer Rank</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22c55e]" /> Group Wall Discussions</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22c55e]" /> Monthly Giveaways</li>
            </ul>

            <button className="w-full bg-white hover:bg-gray-200 text-[#0f172a] font-bold py-4 rounded-xl transition-all shadow-lg text-lg">
              Join Roblox Group
            </button>
          </motion.div>

        </div>

      </div>
    </div>
  )
}
