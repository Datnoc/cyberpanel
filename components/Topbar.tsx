'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
export default function Topbar() {
  const { user } = useUser()
  return (
    <div className="flex justify-between items-center p-4 border-b border-[rgba(0,255,168,0.15)]">
      <div className="text-xl font-semibold">DatNoc v6+</div>
      <div className="flex items-center gap-3">
        {user ? (<>
            <span className="opacity-80 text-sm">Hoş geldin, {user.name || user.email}</span>
            <a className="btn-neon" href="/api/auth/logout">Sign out</a>
          </>) : (<a className="btn-neon" href="/api/auth/login">Sign in</a>)}
      </div>
    </div>
  )
}
