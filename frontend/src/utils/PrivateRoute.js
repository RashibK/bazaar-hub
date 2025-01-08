import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
    const authenticated = false
  return !authenticated ? <Navigate to='/login' /> : <Outlet />
}

export default PrivateRoutes;