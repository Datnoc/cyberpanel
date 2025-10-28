export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    const key = process.env.OPENAI_API_KEY
    if(!key) return new Response(JSON.stringify({ error: 'OPENAI_API_KEY missing' }), { status: 500 })
    const body = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a SOC analyst assistant. Give concise, actionable steps.' },
        { role: 'user', content: String(prompt||'DDoS alert geldi; önerilen adımlar?') }
      ]
    }
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{ 'content-type':'application/json', 'authorization':'Bearer '+key },
      body: JSON.stringify(body)
    })
    const j = await r.json()
    const answer = j?.choices?.[0]?.message?.content || 'Yanıt alınamadı.'
    return new Response(JSON.stringify({ answer }), { headers:{'content-type':'application/json'} })
  } catch (e:any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
