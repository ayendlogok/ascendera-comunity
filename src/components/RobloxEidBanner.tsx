'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function RobloxEidBanner() {
  return (
    <section className="py-12 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-900/20 bg-gradient-to-r from-emerald-950 via-green-900 to-[#0f172a]"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/roblox_eid_banner.png" 
              alt="Roblox Eid Mubarak" 
              className="w-full h-full object-cover object-right opacity-80 md:opacity-100"
            />
            {/* Left side fading overlay for text readability on smaller screens */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-green-900/80 to-transparent md:bg-gradient-to-r md:from-emerald-950 md:via-emerald-950/70 md:to-transparent" />
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            <div className="max-w-xl text-center md:text-left">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
              >
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                Special Eid 1447 H
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow-md leading-tight">
                Selamat Hari Raya <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
                  Idul Fitri 1447 H
                </span>
              </h2>

              <p className="text-gray-200 text-base md:text-lg mb-6 drop-shadow-sm font-medium">
                Minal Aidin Wal Faizin, Mohon Maaf Lahir dan Batin. <br className="hidden md:inline" />
                Mari rayakan kemenangan bersama seluruh developer dan pemain di Ascendera Community!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  href="https://www.roblox.com/groups" 
                  target="_blank"
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-500/20 transition-all flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  Join Roblox Group <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/events"
                  className="bg-emerald-800/60 hover:bg-emerald-700/80 text-white border border-emerald-500/30 font-bold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Lihat Event Lebaran
                </Link>
              </div>
            </div>

            {/* Right side spacer to keep the background visible */}
            <div className="flex-grow md:max-w-md lg:max-w-lg hidden md:block" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
