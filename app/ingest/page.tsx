'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
export default function Ingest(){ return (
  <div className="flex">
    <Sidebar/><div className="flex-1"><Topbar/>
      <div className="p-6 neon-card">API Key / Secret ekleme alanı (yakında).</div>
    </div></div>
)}
