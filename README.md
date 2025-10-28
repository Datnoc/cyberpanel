# DatNoc Cyber Intelligence v6+

## Ne var?
- Advisor: `/api/advisor` (OpenAI) + UI
- Alerts: Firestore `alerts` koleksiyonu canlı
- Reports: CSV `/api/reports/csv`, PDF `/api/reports/pdf`
- Dark Web: `/api/darkweb/scan` (job placeholder)
- Network Intel: `/api/intel/ip?ip=1.1.1.1` (ASN + VT + AbuseIPDB)

## Kurulum
cp .env.local.example .env.local
# env değerlerini doldur
npm install
npm run dev
