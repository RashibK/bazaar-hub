import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { instance } from "../utils/instanceAxios";

const Login = () => {
    const  { userLogin } = useContext(AuthContext);


    const onSubmit = async (event) => {
        event.preventDefault();
        userLogin(event);
        
        // const response = await instance.post('/users/', {"name" : "Rashib"});
        // console.log(response.data);

    }
    return (

    <div><form onSubmit={onSubmit}>       
    <label for='email'><input id='email'placeholder="Email" name='email' /></label><br></br>
    <label for='password'><input id='password' placeholder="Password" name='password' /></label><br></br>
    <button> Login </button>
</form>
<p>New here? <a href="/register">Click here</a> to register</p>

</div>
  )
}

export default Login