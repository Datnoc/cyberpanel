'use client'
import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import AuthSync from '@/components/auth/AuthSync'
import { db } from '@/lib/firebase'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'
import { useEffect, useMemo, useRef, useState } from 'react'
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

export default function AttackMap(){
  const [flows, setFlows] = useState([])
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)
  const globeRef = useRef(null)

  useEffect(()=>{
    const q = query(collection(db,'attacks','global','flows'), orderBy('ts','desc'), limit(500))
    const unsub = onSnapshot(q, snap => {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setFlows(items.reverse())
    })
    return ()=>unsub()
  },[])

  const arcData = useMemo(()=>flows.map(f=>({ id:f.id, startLat:f.src.lat, startLng:f.src.lng, endLat:f.dst.lat, endLng:f.dst.lng, color: f.magnitude>=0.75? '#ff5555': f.magnitude>=0.5? '#ffd166':'#00ffa8', arcAlt: 0.12 + (f.magnitude||0.2)*0.6, meta: f.meta })),[flows])

  useEffect(()=>{
    const g = globeRef.current
    if (!g) return
    try { g.controls().autoRotate = true; g.controls().autoRotateSpeed = 0.5 } catch {}
  },[])

  return (
    <div>
      <Sidebar/>
      <Topbar/>
      <AuthSync/>
      <main className="ml-64 p-0">
        <div className="relative h-[calc(100vh-80px)]">
          <Globe
            ref={globeRef}
            backgroundColor="rgba(0,0,0,1)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            arcsData={arcData}
            arcStartLat={'startLat'}
            arcStartLng={'startLng'}
            arcEndLat={'endLat'}
            arcEndLng={'endLng'}
            arcColor={'color'}
            arcAltitude={'arcAlt'}
            arcStroke={1.2}
            arcDashLength={0.35}
            arcDashGap={0.15}
            arcDashAnimateTime={1800}
            onArcHover={d=>setHover(d)}
            onArcClick={d=>setSelected(d)}
            pointsData={[]}
          />
          <div className="absolute top-4 right-4 glass neon-border rounded-lg px-4 py-2 text-sm">
            <div className="font-semibold text-[var(--neon,#00ffa8)]">3D Attack Map</div>
            <div className="text-textMuted">Flows: {flows.length}</div>
            <div className="text-textMuted">Source: attacks/global/flows</div>
            <div className="mt-2 text-xs text-textMuted">Hover an arc to preview — click to inspect</div>
          </div>

          {/* Hover tooltip */}
          {hover && <div className="absolute left-6 bottom-6 tooltip text-sm text-white">
            <div><strong>From:</strong> {hover.meta?.srcIp || 'n/a'}:{hover.meta?.srcPort || ''}</div>
            <div><strong>To:</strong> {hover.meta?.dstIp || 'n/a'}:{hover.meta?.dstPort || ''}</div>
            <div className="text-xs text-textMuted">proto: {hover.meta?.proto || 'tcp'}</div>
          </div>}

          {/* Inspector modal */}
          {selected && <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-xl w-full glass neon-border rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold neon-text">Flow Inspector</div>
                  <div className="text-textMuted text-sm">{new Date(selected.ts||Date.now()).toLocaleString()}</div>
                </div>
                <button className="text-textMuted" onClick={()=>setSelected(null)}>Close</button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div><div className="text-sm text-textMuted">Source IP</div><div className="font-mono">{selected.meta?.srcIp}</div></div>
                <div><div className="text-sm text-textMuted">Dest IP</div><div className="font-mono">{selected.meta?.dstIp}</div></div>
                <div><div className="text-sm text-textMuted">Proto / Ports</div><div className="font-mono">{selected.meta?.proto} {selected.meta?.srcPort}→{selected.meta?.dstPort}</div></div>
                <div><div className="text-sm text-textMuted">Magnitude</div><div className="font-semibold">{Math.round((selected.magnitude||0)*100)}</div></div>
              </div>
              <div className="mt-4 flex gap-3">
                <a className="px-3 py-2 bg-[var(--neon,#00ffa8)] text-black rounded" href={"https://www.abuseipdb.com/check/"+selected.meta?.srcIp} target="_blank">Check Src AbuseIPDB</a>
                <a className="px-3 py-2 bg-white/10 rounded" href={"https://www.abuseipdb.com/check/"+selected.meta?.dstIp} target="_blank">Check Dst AbuseIPDB</a>
              </div>
            </div>
          </div>}
        </div>
      </main>
    </div>
  )
}
