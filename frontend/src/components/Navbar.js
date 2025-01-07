import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
    </div>
  )
}
