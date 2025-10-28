'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
export default function AuthButton(){
  const { user, isLoading, error } = useUser()
  if (isLoading) return <div className="text-textMuted">Loading...</div>
  if (error) return <div className="text-red-400">Auth error</div>
  if (!user) return <a href="/api/auth/login" className="px-3 py-1 bg-[var(--neon,#00ffa8)] rounded text-black font-semibold">Sign in</a>
  return (<div className="flex items-center gap-3">
    <div className="text-sm">
      <div className="text-white/90">{user.name ?? user.email}</div>
      <a href="/api/auth/logout" className="text-xs text-textMuted underline">Sign out</a>
    </div>
  </div>)
}
