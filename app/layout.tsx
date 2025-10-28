import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'DatNoc Cyber Intelligence v5',
  description: 'Neon SOC – Web + Mobile + Functions + 3D Map'
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="tr"><body className="min-h-screen">{children}</body></html>)
}
