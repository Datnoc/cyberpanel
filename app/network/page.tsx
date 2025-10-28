'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { useState } from 'react'

export default function Network(){
  const [ip, setIp] = useState('1.1.1.1')
  const [data, setData] = useState<any>(null)

  const query = async () => {
    setData({loading:true})
    const r = await fetch('/api/intel/ip?ip='+encodeURIComponent(ip))
    const j = await r.json().catch(()=>({error:'parse'}))
    setData(j)
  }

  return (
    <div className="flex">
      <Sidebar/><div className="flex-1"><Topbar/>
        <div className="p-6 space-y-4">
          <div className="neon-card p-4 flex gap-3 items-center">
            <input value={ip} onChange={e=>setIp(e.target.value)} placeholder="IP gir (örn. 1.1.1.1)" className="flex-1"/>
            <button className="btn-neon" onClick={query}>Sorgula</button>
          </div>
          <div className="neon-card p-4 whitespace-pre-wrap text-sm">{data ? JSON.stringify(data,null,2) : 'Sonuç burada.'}</div>
        </div>
      </div></div>
  )
}
