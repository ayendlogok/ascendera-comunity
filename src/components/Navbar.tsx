'use client'

import Link from 'next/link'
import { Search, Menu, User, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path ? 'text-[#22c55e] font-bold' : 'text-gray-300 hover:text-[#22c55e]'

  return (
    <nav className="w-full border-b border-gray-800 bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Ascendera" className="h-14 w-14 object-contain rounded-lg" />
            <Link href="/" className="font-bold text-xl tracking-tight uppercase">
              Ascendera Community
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {/* Public Links (Disembunyikan jika ADMIN) */}
              {(!session || (session?.user as any)?.role !== 'ADMIN') && (
                <>
                  <Link href="/maps" className={`${isActive('/maps')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Maps Review</Link>
                  <Link href="/play" className={`${isActive('/play')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Play Maps</Link>
                  <Link href="/news" className={`${isActive('/news')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>News</Link>
                </>
              )}
              <Link href="/developers" className={`${isActive('/developers')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Members</Link>
              
              {/* Protected Links (Devs/Admins) */}
              {status === 'authenticated' && (
                <>
                  <Link href="/assets" className={`${isActive('/assets')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Dev Assets</Link>
                  <Link href="/tutorials" className={`${isActive('/tutorials')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Tutorials</Link>
                </>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {status === 'loading' ? (
              <div className="w-20 h-8 bg-gray-800 animate-pulse rounded-md" />
            ) : status === 'authenticated' ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="font-semibold text-white">{session.user?.name}</span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="bg-gray-800 hover:bg-red-500/20 hover:text-red-500 text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 border border-gray-700 hover:border-red-500/50"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link href="/api/auth/signin" className="bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Developer Sign In
              </Link>
            )}
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
