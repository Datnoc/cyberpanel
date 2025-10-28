export default function Card({ title, children }: { title?: string, children: React.ReactNode }){
  return (
    <div className="glass neon-border rounded-xl p-4">
      {title && <div className="mb-3 text-sm uppercase tracking-widest text-textMuted">{title}</div>}
      {children}
    </div>
  )
}
