import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"

const PrivateRoutes = () => {

    const { user } = useContext(AuthContext);

  return !user ? <Navigate to='/login' /> : <Outlet />
}

export default PrivateRoutes;