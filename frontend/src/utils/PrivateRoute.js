import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const authenticated = false
  return !authenticated ? <Navigate to='/login' /> : <Outlet />
}

export default PrivateRoute