'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import AuthSync from '@/components/auth/AuthSync'
import { db } from '@/lib/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function IngestAdmin(){
  const [secret, setSecret] = useState('')
  const [saved, setSaved] = useState(false)
  useEffect(()=>{(async()=>{
    const ref = doc(db,'adminConfig','ingest')
    const s = await getDoc(ref)
    if(s.exists()) setSecret((s.data() as any)?.secret || '')
  })()},[])
  const save = async ()=>{
    const ref = doc(db,'adminConfig','ingest')
    await setDoc(ref,{ secret }, { merge:true })
    setSaved(true); setTimeout(()=>setSaved(false),3000)
  }
  return (<div><Sidebar/><Topbar/><AuthSync/><main className='ml-64 p-8'><div className='glass neon-border rounded-xl p-6 max-w-2xl'><h2 className='neon-text text-xl font-semibold'>Ingest secret (HMAC)</h2><p className='text-textMuted text-sm'>Crawler/edge POST'ları için ortak gizli anahtar.</p><div className='mt-4'><input className='w-full bg-black/30 p-2 rounded' value={secret} onChange={e=>setSecret(e.target.value)} placeholder='32+ chars secret' /><div className='mt-3 flex gap-2'><button className='btn-neon' onClick={save}>Save</button>{saved && <span className='text-textMuted'>Saved</span>}</div></div></div></main></div>)}
