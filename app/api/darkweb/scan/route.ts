export const runtime = 'edge'
export async function POST(req: Request){
  try{
    const { indicator } = await req.json()
    if(!indicator) return new Response(JSON.stringify({ error:'indicator required' }),{status:400})
    // In production: push to a queue / Firestore 'dw_jobs', then a background worker crawls.
    // Here we simulate an immediate result (no TOR here).
    const result = {
      indicator,
      sourcesChecked: ['hibp','forums','paste'],
      hits: [],
      note: 'Demo: gerçek tarama için self-hosted worker + TOR önerilir.'
    }
    return new Response(JSON.stringify(result), { headers:{'content-type':'application/json'} })
  }catch(e:any){
    return new Response(JSON.stringify({ error:e.message }),{status:500})
  }
}
