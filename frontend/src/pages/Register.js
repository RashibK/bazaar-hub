import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Register = () => {

    const { userRegister, getTokens } = useContext(AuthContext);

    const onSubmit = (event) => {
        event.preventDefault();
        userRegister(event);
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <label for='full_name'><input id='full_name' placeholder="Full Name" name="full_name" /></label><br></br>
            <label for='username'><input id='username' placeholder="Username" name="username"/></label><br></br>
            <label for='email'><input id='email'placeholder="Email" name="email"/></label><br></br>
            <label for='password'><input id='password' placeholder="Password" name="password" /></label><br></br>
            <label for='password2'><input id='password2' placeholder="Retype Password" name="password2"/></label><br></br>
            <button> Register </button>
        </form>
        <p>Already a user? <a href="/login">Click here</a> to login</p>
    </div>
  )
}

export default Register