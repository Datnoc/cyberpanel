'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'
import { getAuth, signInWithCustomToken, signOut as fbSignOut } from 'firebase/auth'
import { app } from '@/lib/firebase'
export default function AuthSync(){
  const { user, isLoading } = useUser()
  useEffect(()=>{(async()=>{
    const auth = getAuth(app)
    if (isLoading) return
    if (!user){ try{ await fbSignOut(auth) }catch{}; return }
    const r = await fetch('/api/auth/firebase'); if(!r.ok) return
    const data = await r.json(); if(data.firebaseCustomToken){ await signInWithCustomToken(auth, data.firebaseCustomToken) }
  })()},[user,isLoading])
  return null
}
