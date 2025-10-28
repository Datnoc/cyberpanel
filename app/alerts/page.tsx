'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { db } from '@/lib/firebase'
import { collection, onSnapshot, orderBy, query, limit } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Alerts(){
  const [items,setItems] = useState<any[]>([])
  useEffect(()=>{
    try{
      const q = query(collection(db,'alerts'), orderBy('ts','desc'), limit(100))
      const unsub = onSnapshot(q, snap => setItems(snap.docs.map(d=>({id:d.id, ...d.data()}))))
      return ()=>unsub()
    }catch{}
  },[])
  return (
    <div className="flex">
      <Sidebar/><div className="flex-1"><Topbar/>
        <div className="p-6 space-y-3">
          {items.length===0 && <div className="neon-card p-4">Henüz alert yok. Firestore'da <code>alerts</code> koleksiyonuna belge ekleyin.</div>}
          {items.map(a=>(
            <div key={a.id} className="neon-card p-4 flex justify-between">
              <div>
                <div className="font-semibold">{a.title || a.type || 'Alert'}</div>
                <div className="opacity-80 text-sm">{a.desc || a.message}</div>
              </div>
              <div className="text-sm opacity-70">{a.severity || 'info'} • {new Date(a.ts||Date.now()).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div></div>
  )
}
