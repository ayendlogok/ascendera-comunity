'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MessageSquare, Clock } from 'lucide-react'

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-transparent text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-12 border-b border-gray-800 pb-8">
          <Calendar className="w-12 h-12 text-[#f97316]" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Community Events</h1>
            <p className="text-gray-400 mt-1">Ikuti event seru dan raih hadiah menarik dari Ascendera Community.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Belum ada event</h3>
            <p className="text-gray-400">Nantikan informasi event seru berikutnya di sini!</p>
          </div>
        ) : (
          <div className="space-y-10">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-800/80 backdrop-blur rounded-2xl overflow-hidden border border-gray-700 shadow-xl flex flex-col group"
              >
                {/* Event Banner */}
                <div className="h-64 md:h-80 w-full relative overflow-hidden bg-gray-900">
                  <img 
                    src={event.image || '/roblox_eid_banner.png'} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-[#f97316] text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg border border-[#f97316]/30">
                    Active Event
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Diumumkan pada {new Date(event.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-4 group-hover:text-[#f97316] transition-colors leading-tight">
                    {event.title}
                  </h2>
                  
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm md:text-base">
                    {event.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
