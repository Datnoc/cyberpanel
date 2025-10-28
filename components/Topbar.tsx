export default function Topbar(){
  return (
    <header className="ml-64 px-8 py-5 flex items-center justify-between">
      <h1 className="text-2xl font-bold neon-text">Cyber Panel — Neon Glass</h1>
      <div className="flex items-center gap-3">
        <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-textMuted text-sm">Realtime Connected</span>
      </div>
    </header>
  )
}
