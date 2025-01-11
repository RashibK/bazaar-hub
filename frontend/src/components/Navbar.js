import { Link, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/authContext";
import SearchBar from "./SearchBar";

export const Navbar = () => {

  const { user, userLogout } = useContext(AuthContext);


  return (
    <div>
        <Link to='/'>Home</Link>
        <SearchBar />
        {!user && <Link to='/register'>Register</Link>}
        {!user && <Link to='/login'>Login</Link>}
        {user && <p style={{cursor: 'pointer'}} onClick={() => {userLogout()}}> Logout </p>}
        <Link to='/products/add'>Add Product</Link>
        
    </div>
  )
}
