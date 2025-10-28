import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import * as admin from 'firebase-admin'
let inited=false
function init(){
  if (inited) return
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON missing')
  const cred = JSON.parse(raw)
  if(admin.apps.length===0){ admin.initializeApp({ credential: admin.credential.cert(cred) }) }
  inited=true
}
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try{
    init()
    const session = await getSession(req, res)
    if (!session?.user) return res.status(401).json({ error:'no session' })
    const uid = session.user.sub as string
    const db = admin.firestore()
    const ref = db.collection('users').doc(uid)
    const snap = await ref.get()
    if(!snap.exists) await ref.set({ role:'client', plan:'basic', modules:{advisor:true,alerts:true,network:true,reports:true,darkweb:true}, email: session.user.email||null, name: session.user.name||null, created_at:new Date().toISOString() }, { merge:true })
    const role = (snap.data()?.role || 'client') as string
    const token = await admin.auth().createCustomToken(uid, { role })
    return res.status(200).json({ firebaseCustomToken: token })
  }catch(e:any){ console.error(e); return res.status(500).json({ error:'server_error' }) }
}
