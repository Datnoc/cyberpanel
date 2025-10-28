'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
export default function Dashboard(){
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <Topbar/>
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="neon-card p-5">
            <div className="text-xl font-semibold mb-2">Başlangıç</div>
            <p className="opacity-80 mb-4">Auth0 ile giriş yap. Dashboard üzerinden modüllere erişebilirsin.</p>
            <div className="flex gap-3">
              <Link className="btn-neon" href="/advisor">AI Advisor</Link>
              <Link className="btn-neon" href="/alerts">Alerts</Link>
              <Link className="btn-neon" href="/network">Network</Link>
              <Link className="btn-neon" href="/map">3D Map</Link>
              <Link className="btn-neon" href="/reports">Reports</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
