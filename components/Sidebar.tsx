'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, Bell, Shield, Network, Bug, Map, FileText, Users, KeyRound } from 'lucide-react'
const items = [
  { href: '/', icon: Activity, label: 'Dashboard' },
  { href: '/advisor', icon: Shield, label: 'Advisor' },
  { href: '/alerts', icon: Bell, label: 'Alerts' },
  { href: '/network', icon: Network, label: 'Network' },
  { href: '/darkweb', icon: Bug, label: 'Dark Web' },
  { href: '/map', icon: Map, label: 'Attack Map' },
  { href: '/reports', icon: FileText, label: 'Reports' },
  { href: '/admin', icon: Users, label: 'Admin' },
  { href: '/ingest', icon: KeyRound, label: 'Ingest Secret' }
]
export default function Sidebar(){
  const path = usePathname()
  return (
    <aside className="w-64 p-4 border-r border-[rgba(0,255,168,0.15)] min-h-screen sticky top-0">
      <div className="text-lg font-semibold mb-4">DatNoc</div>
      <nav className="space-y-2">
        {items.map(({href, icon:Icon, label})=>{
          const active = path === href
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 ${active?'sidebar-item-active':''}`}>
              <Icon size={18} /><span>{label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <a className="btn-neon block text-center" href="/api/auth/login">Sign In</a>
      </div>
    </aside>
  )
}
