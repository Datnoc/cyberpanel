'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { useState } from 'react'

export default function DarkWeb(){
  const [indicator, setIndicator] = useState('user@example.com')
  const [res, setRes] = useState<any>(null)

  const submit = async () => {
    setRes({status:'Gönderiliyor...'})
    const r = await fetch('/api/darkweb/scan',{
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ indicator })
    })
    const j = await r.json().catch(()=>({error:'parse'}))
    setRes(j)
  }

  return (
    <div className="flex">
      <Sidebar/><div className="flex-1"><Topbar/>
        <div className="p-6 space-y-4">
          <div className="neon-card p-4 flex gap-3 items-center">
            <input value={indicator} onChange={e=>setIndicator(e.target.value)} placeholder="email / domain / keyword"/>
            <button className="btn-neon" onClick={submit}>Tara</button>
          </div>
          <div className="neon-card p-4 whitespace-pre-wrap text-sm">{res ? JSON.stringify(res,null,2) : 'Sonuç burada.'}</div>
        </div>
      </div></div>
  )
}
