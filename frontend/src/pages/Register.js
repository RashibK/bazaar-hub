import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Register = () => {

    const { userRegister, getTokens } = useContext(AuthContext);

    const onSubmit = (event) => {
        event.preventDefault();
        userRegister(event);
    }

  return (
    <div className="max-w-7xl m-auto  px-8">
      <div className="border border-zinc-200 w-4/12 mx-auto flex flex-col justify-center items-center gap-y-6 rounded-lg">
      <div className="w-6/12 ">
      <p className="text-3xl font-bold mt-4 text-slate-950" >Sign Up</p>
      </div>
        <div className="w-full">
        <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
            <label for='full_name' className="border-transparent">
              <input type='text' className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative focus:outline-none focus:ring focus:ring-gray-200 focus:ring-offset-0 focus:ring-0 text-slate-500' id='full_name' placeholder="Full Name" name="full_name" autoFocus/>
              </label>
            <label for='username'><input type='text' className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative focus:outline-none focus:ring focus:ring-gray-200 focus:ring-offset-0 focus:ring-0 text-slate-500' id='username' placeholder="Username" name="username"/></label>
            <label for='email'><input type='email' className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative focus:outline-none focus:ring focus:ring-gray-200 focus:ring-offset-0 focus:ring-0 text-slate-500' id='email'placeholder="Email" name="email"/></label>
            <label for='password'><input type="password" className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative focus:outline-none focus:ring focus:ring-gray-200 focus:ring-offset-0 focus:ring-0 text-slate-500' id='password' placeholder="Password" name="password" /></label>
            <label for='password2'><input type="password" className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative focus:outline-none focus:ring focus:ring-gray-200 focus:ring-offset-0 focus:ring-0 text-slate-500' id='password2' placeholder="Retype Password" name="password2"/></label>
            <button className="bg-blue-700 w-6/12 my-0 mx-auto h-10 font-bold rounded-lg hover:bg-blue-600 mt-6 text-white"> Register </button>
        </form>
        <p className="text-sm mb-1 mt-1.5">Already have an account?<a href="/login" className="text-blue-700 hover:text-blue-600 mt-6 font-semibold"> Log In</a></p>
        </div>
        
      </div>
    </div>
  )
}

export default Register