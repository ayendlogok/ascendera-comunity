import Link from 'next/link'
import { Github, Twitter, DiscIcon as Discord } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-gray-800 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Ascendera" className="h-10 w-10 object-contain rounded" />
              <span className="font-bold text-white tracking-tight uppercase">Ascendera Community</span>
            </div>
            <p className="text-sm">
              Wadah bagi para pengunjung untuk menemukan dan menjelajahi map pegunungan yang penuh tantangan bersama Ascendera Community
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/maps" className="hover:text-[#22c55e] transition-colors">Map Showcase</Link></li>
              <li><Link href="/assets" className="hover:text-[#22c55e] transition-colors">Asset Library</Link></li>
              <li><Link href="/tutorials" className="hover:text-[#22c55e] transition-colors">Tutorials</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/developers" className="hover:text-[#22c55e] transition-colors">Developers</Link></li>
              <li><Link href="/news" className="hover:text-[#22c55e] transition-colors">News & Updates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://discord.gg/tYw9PKb7J7" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5865F2] transition-colors flex items-center">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.114 18.055a.066.066 0 0 0 .027.047 21.179 21.179 0 0 0 6.377 3.22.079.079 0 0 0 .085-.028c.15-.205.281-.421.393-.65a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-2.003-1.025.077.077 0 0 1-.002-.128c.133-.1.264-.204.39-.311a.078.078 0 0 1 .081-.011c4.168 1.912 8.682 1.912 12.8 0a.078.078 0 0 1 .081.011c.126.107.257.211.39.311a.077.077 0 0 1-.002.128 13.3 13.3 0 0 1-2.003 1.025.076.076 0 0 0-.041.106c.112.229.244.445.394.65a.079.079 0 0 0 .085.028 21.18 21.18 0 0 0 6.377-3.22a.066.066 0 0 0 .027-.047c.487-5.185-.826-9.713-3.076-13.658a.07.07 0 0 0-.032-.027zm-11.85 11.23c-1.2 0-2.18-1.1-2.18-2.45s.96-2.44 2.18-2.44c1.21 0 2.18 1.1 2.18 2.45s-.96 2.44-2.18 2.44zm8.68 0c-1.21 0-2.18-1.1-2.18-2.45s.96-2.44 2.18-2.44c1.22 0 2.18 1.1 2.18 2.45s-.97 2.44-2.18 2.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Ascendera Community. Not affiliated with Roblox Corporation.</p>
        </div>
      </div>
    </footer>
  )
}
