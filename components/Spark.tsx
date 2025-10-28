'use client'
import { useMemo } from 'react'
import Card from './Card'

function gen(n=40){
  const a:number[] = []
  let v = 30 + Math.random()*20
  for(let i=0;i<n;i++){
    v += (Math.random()-0.5)*10
    v = Math.max(5, Math.min(95, v))
    a.push(v)
  }
  return a
}

export default function Spark({ title='Network Traffic'}:{title?:string}){
  const data = useMemo(()=>gen(60), [])
  const path = data.map((v,i)=> `${i*(180/data.length)},${100-v}`).join(' ')
  return (
    <Card title={title}>
      <svg viewBox="0 0 180 100" className="w-full h-28">
        <polyline fill="none" stroke="#00ffa8" strokeWidth="2" points={path} />
      </svg>
      <div className="text-textMuted text-xs">last ~5m</div>
    </Card>
  )
}
