'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { LockKeyhole, PlusCircle, Map as MapIcon, Newspaper, MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DevelopmentDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'events'>('dashboard')
  const [formData, setFormData] = useState({ title: '', tags: '', content: '', rating: '', link: '', author: '' })
  const [imageFile, setImageFile] = useState<File | null>(null)
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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const submitForm = async (url: string, data: any) => {
    setLoading(true)
    try {
      let imageUrl = '';
      
      if (imageFile) {
        imageUrl = await convertToBase64(imageFile)
      }

      const finalData = { ...data, image: imageUrl }

      const res = await fetch(url, { 
         method: 'POST', 
         body: JSON.stringify(finalData), 
         headers: { 'Content-Type': 'application/json' } 
      })
      if (res.ok) {
        alert('Konten berhasil ditambahkan!')
        setFormData({ title: '', tags: '', content: '', rating: '', link: '', author: '' })
        setImageFile(null)
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
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2 flex items-center justify-center gap-2">
            <LockKeyhole className="w-8 h-8 text-[#22c55e]" /> Development Panel
          </h1>
          <p className="text-gray-400">Selamat datang di Panel Kontrol Admin Ascendera.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-10 bg-gray-800/40 backdrop-blur p-2 rounded-xl border border-gray-800 max-w-lg mx-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LockKeyhole },
            { id: 'news', label: 'Add News', icon: Newspaper },
            { id: 'events', label: 'Add Event', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md ${
                activeTab === tab.id 
                  ? 'bg-[#22c55e] text-white shadow-[#22c55e]/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="text-center py-16 bg-gray-800/50 backdrop-blur rounded-2xl border border-gray-800/60 shadow-xl">
            <h2 className="text-2xl font-bold mb-2">Welcome Back, {session?.user?.name || 'Admin'}!</h2>
            <p className="text-gray-400">Pilih tab di atas untuk mengelola rilis berita dan event terbaru Anda.</p>
          </div>
        )}

        {activeTab === 'news' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/80 backdrop-blur rounded-2xl p-8 border border-gray-800/60 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Newspaper className="w-6 h-6 text-[#22c55e]" /> Tambahkan Berita Baru</h2>
            <form onSubmit={(e) => { e.preventDefault(); submitForm('/api/news', { title: formData.title, tags: formData.tags, content: formData.content }) }} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Judul Berita</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-900/80 border border-gray-700/80 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#22c55e] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Tags (Pisahkan dengan koma)</label>
                <input type="text" value={formData.tags} placeholder="Update, Event, Info" onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full bg-gray-900/80 border border-gray-700/80 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#22c55e] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Konten Berita</label>
                <textarea required rows={5} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full bg-gray-900/80 border border-gray-700/80 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#22c55e] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Gambar Berita</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-gray-900/80 border border-gray-700/80 rounded-lg p-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-green-500/20">
                {loading ? 'Mengirim...' : 'Kirim Berita'}
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/80 backdrop-blur rounded-2xl p-8 border border-gray-800/60 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><MessageSquare className="w-6 h-6 text-[#f97316]" /> Tambahkan Event Baru</h2>
            <form onSubmit={(e) => { e.preventDefault(); submitForm('/api/events', { title: formData.title, content: formData.content, image: formData.link }) }} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Judul Event</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-900/80 border border-gray-700/80 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#f97316] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Konten / Deskripsi Event</label>
                <textarea required rows={5} value={formData.content} placeholder="Detail event, Periode, Hadiah dll..." onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full bg-gray-900/80 border border-gray-700/80 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#f97316] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Gambar Banner Event</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-gray-900/80 border border-gray-700/80 rounded-lg p-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-orange-500/20">
                {loading ? 'Mengirim...' : 'Kirim Event'}
              </button>
            </form>
          </motion.div>
        )}

      </div>
    </div>
  )
}
