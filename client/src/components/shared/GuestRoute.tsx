import { Navigate } from "react-router-dom"
import { useAuthStore } from "../../api/auth.api"

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore()

  if (user) {
    return <Navigate to="/feed" replace />
  }

  return <>{children}</>
}

export default GuestRoute
