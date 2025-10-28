import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DatNoc Cyber Panel — Neon',
  description: 'Neon glass cyber dashboard mock'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
