export const runtime = 'nodejs'
export async function GET() {
  const rows = [
    ['timestamp','type','severity','source'],
    [new Date().toISOString(),'DDoS','high','edge-firewall'],
    [new Date().toISOString(),'SQLi','medium','waf'],
    [new Date().toISOString(),'XSS','low','cdn']
  ]
  const csv = rows.map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(',')).join('\n')
  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="datnoc-report.csv"'
    }
  })
}
