'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { useState } from 'react'

export default function Advisor(){
  const [input, setInput] = useState('')
  const [res, setRes] = useState<string>('')

  const run = async () => {
    setRes('Çalışıyor...')
    const r = await fetch('/api/advisor',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ prompt: input || 'DDoS alert geldi; önerilen adımlar?' })
    })
    const j = await r.json().catch(()=>({error:'parse'}))
    setRes(j.error ? 'Hata: '+j.error : j.answer || JSON.stringify(j,null,2))
  }

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <Topbar/>
        <div className="p-6 space-y-4">
          <div className="neon-card p-4">
            <div className="font-semibold mb-2">AI Threat Advisor</div>
            <textarea rows={5} value={input} onChange={e=>setInput(e.target.value)} className="w-full mb-3" placeholder="Olay detayını yaz..."/>
            <button className="btn-neon" onClick={run}>Analiz Et</button>
          </div>
          <div className="neon-card p-4 whitespace-pre-wrap">{res || 'Yanıt burada görünecek.'}</div>
        </div>
      </div>
    </div>
  )
}
