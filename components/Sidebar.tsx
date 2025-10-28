'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Activity, Bell, FileText, Brain, Network, Users, Globe, Settings } from 'lucide-react'

const menu = [
  {href:'/',label:'Dashboard',icon:Activity},
  {href:'/advisor',label:'Advisor',icon:Brain},
  {href:'/alerts',label:'Alerts',icon:Bell},
  {href:'/network',label:'Network',icon:Network},
  {href:'/darkweb',label:'Dark Web',icon:Globe},
  {href:'/map',label:'Attack Map',icon:Globe},
  {href:'/reports',label:'Reports',icon:FileText},
  {href:'/admin',label:'Admin',icon:Users},
  {href:'/admin/ingest',label:'Ingest Secret',icon:Settings},
]

export default function Sidebar(){
  const path = usePathname()
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 p-5 glass neon-border flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="h-3 w-3 rounded-full bg-[var(--neon,#00ffa8)] animate-pulse" />
          <div className="text-[var(--neon,#00ffa8)] font-bold text-lg tracking-wider neon-text">DatNoc</div>
        </div>
        <nav className="space-y-1">
          {menu.map((m)=>{
            const A = m.icon as any
            const active = path === m.href
            return (
              <Link key={m.href} href={m.href}
                className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150
                ${active ? 'bg-[var(--neon,#00ffa8)]/15 text-[var(--neon,#00ffa8)] shadow-neon' :
                  'text-textMuted hover:text-[var(--neon,#00ffa8)] hover:bg-white/5'}`}>
                <A size={18} className={`${active?'text-[var(--neon,#00ffa8)]':'text-textMuted'}`} />
                <span>{m.label}</span>
                {active && <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--neon,#00ffa8)] shadow-neon rounded-l-lg" />}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex flex-col gap-3 mt-10">
        <a href="/api/auth/login" className="block text-center font-semibold py-2 rounded-lg bg-[var(--neon,#00ffa8)] text-black hover:opacity-90 transition">Sign In</a>
        <div className="text-xs text-textMuted text-center opacity-60">© 2025 DatNoc</div>
      </div>
    </aside>
  )
}
