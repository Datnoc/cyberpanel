import AuthButton from '@/components/auth/AuthButton'
export default function Topbar(){
  return (<header className="ml-64 px-8 py-5 flex items-center justify-between">
    <h1 className="text-2xl font-bold neon-text">DatNoc v5</h1>
    <AuthButton/>
  </header>)
}
