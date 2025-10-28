import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import AuthSync from '@/components/auth/AuthSync'
import Link from 'next/link'
export default function Page(){
  return (
    <div>
      <Sidebar/><Topbar/><AuthSync/>
      <main className="ml-64 px-8 pb-20 grid gap-6 md:grid-cols-2">
        <div className="glass neon-border rounded-xl p-6">
          <h2 className="text-xl font-semibold neon-text mb-3">Başlangıç</h2>
          <p className="text-textMuted">Auth0 ile giriş yap. Dashboard üzerinden modüllere erişebilirsin.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/advisor" className="btn-neon">AI Advisor</Link>
            <Link href="/network" className="link-soft">Network</Link>
            <Link href="/map" className="link-soft">3D Map</Link>
          </div>
        </div>
        <div className="glass neon-border rounded-xl p-6">
          <h2 className="text-xl font-semibold neon-text mb-3">Raporlar</h2>
          <p className="text-textMuted">PDF/CSV rapor oluştur ve indir (Functions).</p>
          <Link href="/reports" className="mt-4 inline-block link-soft">Rapor sayfasına git</Link>
        </div>
      </main>
    </div>
  )
}
