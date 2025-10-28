import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
export const runtime = 'nodejs'
export async function GET() {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595, 842]) // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  page.drawText('DatNoc Security Report', { x: 50, y: 780, size: 20, font, color: rgb(0,1,0.66) })
  const lines = [
    '• DDoS – high – edge-firewall',
    '• SQLi – medium – waf',
    '• XSS – low – cdn'
  ]
  let y = 740
  for(const ln of lines){
    page.drawText(ln, { x: 60, y, size: 12, font, color: rgb(0.9,0.9,0.9) })
    y -= 20
  }
  const bytes = await pdf.save()
  return new Response(bytes, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'attachment; filename="datnoc-report.pdf"'
    }
  })
}
