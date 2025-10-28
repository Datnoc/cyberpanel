import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import AuthSync from '@/components/auth/AuthSync'
export default function Page(){
  return (<div><Sidebar/><Topbar/><AuthSync/><main className='ml-64 p-8'><div className='glass neon-border rounded-xl p-6'>Alerts Module</div></main></div>) }
