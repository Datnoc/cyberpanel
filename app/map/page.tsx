'use client'

import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import AuthSync from '@/components/auth/AuthSync'
import { db } from '@/lib/firebase'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'
import { useEffect, useMemo, useRef, useState } from 'react'

// ⬇️ Burada fark var — react-globe.gl kullanıyoruz:
const ReactGlobe = dynamic(() => import('react-globe.gl'), { ssr: false })

export default function AttackMap() {
  const [flows, setFlows] = useState<any[]>([])
  const [hover, setHover] = useState<any | null>(null)
  const [selected, setSelected] = useState<any | null>(null)
  const globeRef = useRef<any>(null)

  useEffect(() => {
    const q = query(collection(db, 'attacks', 'global', 'flows'), orderBy('ts', 'desc'), limit(500))
    const unsub = onSnapshot(q, snap => {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
      setFlows(items.reverse())
    })
    return () => unsub()
  }, [])

  const arcData = useMemo(
    () =>
      flows.map((f: any) => ({
        id: f.id,
        ts: f.ts,
        startLat: f.src.lat,
        startLng: f.src.lng,
        endLat: f.dst.lat,
        endLng: f.dst.lng,
        color:
          f.magnitude >= 0.75
            ? '#ff5555'
            : f.magnitude >= 0.5
            ? '#ffd166'
            : '#00ffa8',
        arcAlt: 0.12 + (f.magnitude || 0.2) * 0.6,
        magnitude: f.magnitude,
        meta: f.meta
      })),
    [flows]
  )

  useEffect(() => {
    const g = globeRef.current
    if (!g) return
    try {
      g.controls().autoRotate = true
      g.controls().autoRotateSpeed = 0.5
    } catch {}
  }, [])

  return (
    <div>
      <Sidebar />
      <Topbar />
      <AuthSync />
      <main className="ml-64 p-0">
        <div className="relative h-[calc(100vh-80px)]">
          <ReactGlobe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            arcsData={arcData}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor="color"
            arcAltitude="arcAlt"
            arcStroke={1.2}
            arcDashLength={0.35}
            arcDashGap={0.15}
            arcDashAnimateTime={1800}
            backgroundColor="rgba(0,0,0,1)"
            onArcHover={(d: any) => setHover(d)}
            onArcClick={(d: any) => setSelected(d)}
          />

          <div className="absolute top-4 right-4 glass neon-border rounded-lg px-4 py-2 text-sm">
            <div className="font-semibold text-[var(--neon,#00ffa8)]">3D Attack Map</div>
            <div className="text-textMuted">Flows: {flows.length}</div>
            <div className="text-textMuted">Source: attacks/global/flows</div>
          </div>
        </div>
      </main>
    </div>
  )
}
