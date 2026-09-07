import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Outlet />   {/* ← login/register render here */}
    </div>
  )
}
