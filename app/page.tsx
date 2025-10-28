import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import ProtectionCards from '@/components/ProtectionCards'
import LiveLogs from '@/components/LiveLogs'
import AlertsPanel from '@/components/AlertsPanel'
import AdvisorPanel from '@/components/AdvisorPanel'
import Spark from '@/components/Spark'

export default function Page(){
  return (
    <div>
      <Sidebar/>
      <Topbar/>
      <main className="ml-64 px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProtectionCards/>
            <LiveLogs/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Spark title="Network Traffic"/>
              <Spark title="Firewall Throughput"/>
            </div>
          </div>
          <div className="space-y-6">
            <AlertsPanel/>
            <AdvisorPanel/>
          </div>
        </div>
      </main>
    </div>
  )
}
