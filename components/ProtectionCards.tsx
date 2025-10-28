import Card from './Card'

const items = [
  { label: 'Brand', status: 'active' },
  { label: 'Device', status: 'warning' },
  { label: 'Network', status: 'active' },
  { label: 'Domain', status: 'active' },
  { label: 'Identity', status: 'alert' },
]

const badge = (s:string) => s==='active' ? 'text-emerald-300' : s==='warning' ? 'text-yellow-300' : 'text-red-400'

export default function ProtectionCards(){
  return (
    <Card title="Protection Modules">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {items.map(i => (
          <div key={i.label} className="rounded-lg px-3 py-3 bg-black/40 border border-white/5">
            <div className="text-sm">{i.label}</div>
            <div className={`text-xs mt-1 ${badge(i.status)}`}>{i.status.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
