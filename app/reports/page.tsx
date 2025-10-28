'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function Reports(){
  return (
    <div className="flex">
      <Sidebar/><div className="flex-1"><Topbar/>
        <div className="p-6 grid md:grid-cols-2 gap-4">
          <div className="neon-card p-4">
            <div className="font-semibold mb-2">CSV Rapor</div>
            <a className="btn-neon" href="/api/reports/csv" target="_blank">İndir</a>
          </div>
          <div className="neon-card p-4">
            <div className="font-semibold mb-2">PDF Rapor</div>
            <a className="btn-neon" href="/api/reports/pdf" target="_blank">İndir</a>
          </div>
        </div>
      </div></div>
  )
}
