'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { LockKeyhole, PlusCircle, Map as MapIcon, Newspaper, MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DevelopmentDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'maps_review' | 'play_maps'>('dashboard')
  
  const [formData, setFormData] = useState({ title: '', tags: '', content: '', rating: '', link: '', author: '' })
  const [loading, setLoading] = useState(false)

  if (status === 'loading') {
    return <div className="min-h-screen bg-transparent text-white py-12 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div></div>
  }

  const userRole = (session?.user as any)?.role

  if (status === 'unauthenticated' || userRole !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-transparent text-white py-12 flex flex-col items-center justify-center">
        <LockKeyhole className="w-16 h-16 text-[#f97316] mb-6" />
        <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          The Development Dashboard is strictly reserved for Ascendera Community Administrators.
        </p>
        <Link href="/api/auth/signin" className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 rounded-lg font-bold transition-colors">
          Sign In as Admin
        </Link>
      </div>
    )
  }

  const submitForm = async (url: string, data: any) => {
    setLoading(true)
    try {
      const res = await fetch(url, { 
         method: 'POST', 
         body: JSON.stringify(data), 
         headers: { 'Content-Type': 'application/json' } 
      })
      if (res.ok) {
        alert('Data berhasil ditambahkan!')
        setFormData({ title: '', tags: '', content: '', rating: '', link: '', author: '' })
        setActiveTab('dashboard')
      } else {
        alert('Gagal meluncurkan konten.')
      }
    } catch (err) {
      alert('Gagal mengirim data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center py-12">
          <h1 className="text-4xl font-extrabold mb-4">Development Dashboard</h1>
          <p className="text-gray-400">Selamat datang di Panel Kontrol Admin Ascendera Community.</p>
        </div>
      </div>
    </div>
  )
}
