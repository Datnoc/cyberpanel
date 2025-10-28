export const runtime = 'edge'

async function safeFetch(url: string, init: RequestInit): Promise<any> {
  try {
    const r = await fetch(url, init)
    if(!r.ok) throw new Error(r.status+' '+r.statusText)
    return await r.json()
  } catch (e:any) {
    return { error: e.message, url }
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ip = searchParams.get('ip') || ''
  if(!ip) return new Response(JSON.stringify({ error:'ip missing' }), { status: 400 })
  const vtKey = process.env.VIRUSTOTAL_API_KEY
  const abuseKey = process.env.ABUSEIPDB_API_KEY
  const ipinfoKey = process.env.IPINFO_TOKEN

  const tasks: Promise<any>[] = []

  // ASN / org via ipinfo
  const ipinfoUrl = ipinfoKey ?
    `https://ipinfo.io/${ip}?token=${ipinfoKey}` :
    `https://ipapi.co/${ip}/json/` // fallback (no key)
  tasks.push(safeFetch(ipinfoUrl, {}))

  // VirusTotal (if key provided)
  if(vtKey){
    tasks.push(safeFetch(`https://www.virustotal.com/api/v3/ip_addresses/${ip}`, {
      headers: { 'x-apikey': vtKey }
    }))
  } else tasks.push(Promise.resolve({ skip:'VIRUSTOTAL_API_KEY missing' }))

  // AbuseIPDB (if key provided)
  if(abuseKey){
    tasks.push(safeFetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`, {
      headers: { 'Key': abuseKey, 'Accept':'application/json' }
    }))
  } else tasks.push(Promise.resolve({ skip:'ABUSEIPDB_API_KEY missing' }))

  const [asn, vt, abuse] = await Promise.all(tasks)
  return new Response(JSON.stringify({ ip, asn, vt, abuse }, null, 2), { headers:{'content-type':'application/json'} })
}
