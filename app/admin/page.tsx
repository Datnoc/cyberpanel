'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { useUser } from '@auth0/nextjs-auth0/client'
export default function Admin(){
  const { user } = useUser()
  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS||'').split(',').map(s=>s.trim()).filter(Boolean)
  const isAdmin = user && (admins.includes(user.email||''))
  return (<div className="flex">
    <Sidebar/><div className="flex-1"><Topbar/>
      <div className="p-6 neon-card">
        {isAdmin ? 'Admin paneli: kullanıcı/modül yönetimi (yakında).' : 'Bu alan sadece admin kullanıcılar için.'}
      </div>
    </div></div>)
}
