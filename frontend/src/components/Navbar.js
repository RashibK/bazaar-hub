import { Link, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/authContext";
import SearchBar from "./SearchBar";
import mainLogo from '../assets/main-logo.png'
import UserIcon from "../assets/UserIcon";
import CartIcon from "../assets/CartIcon";
export const Navbar = () => {

  const { user, userLogout } = useContext(AuthContext);


  return <>
  {user ? <div className="sticky bg-white-700 z-20 top-0 h-20 ">
  <nav className="h-full bg-white w-full">
  <ul className="flex h-full w-full items-center justify-center min-[320px]:gap-x-4  sm:gap-x-8 px-0.5">
  <li><Link to='/'><img src={mainLogo} width={48} height={48}></img></Link></li>
  <li><SearchBar /></li>
  <li><Link to='/users/profile'><UserIcon className='cursor-pointer' /></Link></li>
  <li><Link to='/users/cart'><CartIcon /></Link></li> 
  </ul></nav>
  </div> : <div className="sticky bg-white-700 z-20 top-0 h-20 ">
  <nav className="h-full bg-white w-full">
  <ul className="flex h-full w-full items-center justify-center min-[320px]:gap-x-4  sm:gap-x-8 px-0.5">
  <li><Link to='/'><img src={mainLogo} width={48} height={48}></img></Link></li>
  <li><SearchBar /></li>
  <li><Link to='/users/profile'><UserIcon className='cursor-pointer' /></Link></li>
  <li><Link to='/users/cart'><CartIcon /></Link></li> 
  </ul></nav>
  </div>}
  </>
}


// <li>{!user && <Link to='/register'>Register</Link>}</li>
// <li>{!user && <Link to='/login'>Login</Link>}</li>
{/* <li>{user && <p style={{cursor: 'pointer'}} onClick={() => {userLogout()}}> Logout </p>}</li> */}

//  <li>{user && <Link to='/products/add'>Add Product</Link>}</li>