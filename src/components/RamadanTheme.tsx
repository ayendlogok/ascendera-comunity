'use client'

import { motion } from 'framer-motion'
import { Moon, Star, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export function RamadanTheme() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Generate random particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    type: i % 3 === 0 ? 'moon' : i % 3 === 1 ? 'star' : 'sparkle',
    size: Math.random() * 20 + 15, // 15px to 35px
    left: `${Math.random() * 90 + 5}%`, // 5% to 95%
    duration: Math.random() * 12 + 15, // 15s to 27s
    delay: Math.random() * 8,
    hue: Math.random() * 20 + 40, // Golden/Yellow (Hues 40-60)
  }))

  return (
    <div className="relative z-50 pointer-events-none">
      {/* Top Greeting Banner */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-800 text-white z-50 border-b border-yellow-500/40 shadow-xl pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3 text-center">
          <Moon className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
          <span className="font-semibold text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="text-yellow-400 font-extrabold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Marhaban Ya Ramadan 1447 H</span> 
            <span className="hidden sm:inline text-gray-200">|</span>
            <span className="hidden sm:inline text-gray-100">Selamat Menunaikan Ibadah Puasa</span>
          </span>
          <Sparkles className="w-5 h-5 text-yellow-400 animate-bounce" />
        </div>
      </motion.div>

      {/* Floating Elements Background Layer */}
      <div className="fixed inset-0 overflow-hidden select-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ y: '110vh', opacity: 0, rotate: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.7, 0.7, 0],
              rotate: [0, 180, 360],
              x: ['0px', '25px', '-25px', '0px']
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              left: particle.left,
              width: particle.size,
              height: particle.size,
              color: `hsl(${particle.hue}, 100%, 60%)`,
              filter: 'drop-shadow(0 0 10px rgba(234, 179, 8, 0.4))',
            }}
          >
            {particle.type === 'moon' && <Moon className="w-full h-full fill-current" />}
            {particle.type === 'star' && <Star className="w-full h-full fill-current" />}
            {particle.type === 'sparkle' && <Sparkles className="w-full h-full" />}
          </motion.div>
        ))}
      </div>

      {/* Decorative Hanging Lanterns at Corners */}
      <div className="fixed top-[48px] left-4 md:left-12 z-40 hidden md:block">
        <motion.div
          animate={{ rotate: [4, -4, 4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative origin-top flex flex-col items-center"
        >
          <div className="w-0.5 h-16 bg-yellow-500/60" />
          <div className="w-8 h-12 bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-700 rounded-b-2xl rounded-t-lg shadow-lg shadow-yellow-500/30 flex items-center justify-center border border-yellow-300/40 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent up to-yellow-300/20 rounded-t-lg" />
            <div className="w-4 h-4 bg-white rounded-full blur-md animate-pulse" />
            <div className="w-2 h-2 bg-yellow-100 rounded-full" />
          </div>
        </motion.div>
      </div>

      <div className="fixed top-[48px] right-4 md:right-12 z-40 hidden md:block">
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative origin-top flex flex-col items-center"
        >
          <div className="w-0.5 h-12 bg-yellow-500/60" />
          <div className="w-6 h-10 bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-700 rounded-b-2xl rounded-t-lg shadow-lg shadow-yellow-500/30 flex items-center justify-center border border-yellow-300/40 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-yellow-300/20 rounded-t-lg" />
            <div className="w-3 h-3 bg-white rounded-full blur-md animate-pulse" />
            <div className="w-1.5 h-1.5 bg-yellow-100 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Optional decorative bottom corners or sides */}
    </div>
  )
}
