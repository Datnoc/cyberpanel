import Card from './Card'

export default function AdvisorPanel(){
  const recs = [
    'Enable 2FA for all admin users',
    'Add 5/min rate-limit on /login',
    'Block top 5 malicious IP ranges /24',
    'Tighten WAF rule 942100 (SQLi)',
    'Force password reset for 3 users'
  ]
  return (
    <Card title="AI Threat Advisor">
      <ul className="list-disc ml-5 text-sm space-y-1">
        {recs.map((r,i)=>(<li key={i} className="text-white/90">{r}</li>))}
      </ul>
    </Card>
  )
}
