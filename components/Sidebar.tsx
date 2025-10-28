'use client'
import { useState } from 'react'

const items = [
  { label: 'Dashboard', icon: '📊' },
  { label: 'Protection', icon: '🛡️' },
  { label: 'Alerts', icon: '🚨' },
  { label: 'Reports', icon: '📁' },
  { label: 'Advisor', icon: '🤖' },
  { label: 'Network', icon: '🌐' }
]

export default function Sidebar() {
  const [active, setActive] = useState('Dashboard')
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 px-4 py-6 glass neon-border">
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="h-3 w-3 rounded-full bg-neon shadow-neon" />
        <div className="text-neon font-bold tracking-widest neon-text">DATNOC</div>
      </div>
      <nav className="space-y-2">
        {items.map(it => (
          <button
            key={it.label}
            onClick={() => setActive(it.label)}
            className={`w-full text-left px-3 py-2 rounded-md transition
              ${active===it.label ? 'bg-card/70 text-neon' : 'text-textMuted hover:bg-card/50'}
            `}
          >
            <span className="mr-2">{it.icon}</span>{it.label}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-0 right-0 px-4 text-xs text-textMuted/80">
        Auth: <span className="text-neon">Auth0</span>
      </div>
    </aside>
  )
}
