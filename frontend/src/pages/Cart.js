import { useContext } from "react"
import { AuthContext } from "../context/authContext"

function Cart() {
    const { user } = useContext(AuthContext);
    const first_name = user.full_name.split(' ')[0]
    return (
    <div>{first_name}'s Cart</div>
  )
}

export default Cart