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

<div className="max-w-7xl m-auto  px-8">
<div className="border border-zinc-200 w-4/12 mx-auto flex flex-col justify-center items-center gap-y-6 rounded-lg">
<div className="w-6/12 ">
<p className="text-3xl font-bold mt-4 text-slate-950" >Log In</p>
</div>
  <div className="w-full">
  <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
      <label for='email'><input type='email' className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative text-slate-500' id='email'placeholder="Email" name="email" autoFocus/></label>
      <label for='password'><input type="password" className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative text-slate-500' id='password' placeholder="Password" name="password" /></label>  
      <button className="bg-blue-700 w-6/12 my-0 mx-auto h-10 font-bold rounded-lg hover:bg-blue-600 mt-6 text-white"> LogIn </button>
  </form>
  <p className="text-sm mb-1 mt-1.5">New here?<a href="/register" className="text-blue-700 hover:text-blue-600 mt-6 font-semibold"> Sign Up</a></p>
  </div>
  
</div>
</div>
  )
}

export default Login


