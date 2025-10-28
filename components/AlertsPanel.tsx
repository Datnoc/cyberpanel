import Card from './Card'

const alerts = [
  { ts: '19:42:10', title: 'WAF blocked SQLi', sev: 'high' },
  { ts: '19:41:02', title: 'Bruteforce detected', sev: 'medium' },
  { ts: '19:39:44', title: 'New dark web mention', sev: 'high' }
]

const sev = (s:string) => s==='high' ? 'text-red-400' : s==='medium' ? 'text-yellow-300' : 'text-textMuted'

export default function AlertsPanel(){
  return (
    <Card title="Alert Center">
      <div className="space-y-2">
        {alerts.map((a,i)=>(
          <div key={i} className="flex items-center justify-between bg-black/40 border border-white/5 px-3 py-2 rounded">
            <div className={`text-sm ${sev(a.sev)}`}>{a.title}</div>
            <div className="text-xs text-textMuted">{a.ts}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
