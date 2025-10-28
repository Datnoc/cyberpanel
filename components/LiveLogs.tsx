'use client'
import { useEffect, useState } from 'react'
import Card from './Card'

type Log = { ts: string, attack: string, ip: string, sev: 'low'|'medium'|'high' }

const attacks = ['SQLi', 'XSS', 'LFI', 'RCE', 'Brute Force', 'Dir Bust']

export default function LiveLogs(){
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date().toLocaleTimeString()
      const atk = attacks[Math.floor(Math.random()*attacks.length)]
      const ip = Array(4).fill(0).map(()=>Math.floor(Math.random()*255)).join('.')
      const sev = (['low','medium','high'] as const)[Math.floor(Math.random()*3)]
      setLogs(prev => [{ ts: now, attack: atk, ip, sev }, ...prev].slice(0, 120))
    }, 900)
    return () => clearInterval(t)
  }, [])

  const sevColor = (s: Log['sev']) => s==='high' ? 'text-red-400' : s==='medium' ? 'text-yellow-300' : 'text-textMuted'

  return (
    <Card title="Live Attack Stream">
      <div className="code-grid rounded-lg p-3 bg-black/40 border border-white/5 max-h-[360px] overflow-auto font-mono text-sm">
        {logs.map((l,i)=>(
          <div key={i} className="py-0.5">
            <span className="text-textMuted mr-3">{l.ts}</span>
            <span className={`${sevColor(l.sev)} mr-3`}>{l.attack}</span>
            <span className="text-white/90">{l.ip}</span>
          </div>
        ))}
        {logs.length===0 && <div className="text-textMuted">Waiting for events…</div>}
      </div>
    </Card>
  )
}
