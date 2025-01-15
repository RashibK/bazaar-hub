import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext';
import useAxios from '../utils/useAxios';


function UpdatePassword() {

    const { user, userLogout } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState();
    
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [fullname, setFullname] = useState(user.full_name);
    
    const [updatePassword, setUpdatePassword] = useState(false);

    
      const api = useAxios();
    
      useEffect(() => {
        getProfile();
      }, [user])
    
      const getProfile = async () => {
        const response = await api.get(`/users/profile/${user.user_id}`)
    
        if (response.status === 200)
        {
          setUserProfile(response.data);
        }
      }

      // submit the new values to backend for updating the user profile in db

  // this function is responsible for sending the new user's profile data and updating it in the backend.

  function onSubmit (event) {
    event.preventDefault();

    const full_name = event.target.full_name.value;
    const email = event.target.email.value;
    const username = event.target.username.value;

    try{
      var old_password = event.target.old_password.value;
      var new_password = event.target.new_password.value;
      var new_password2 = event.target.new_password2.value;
      updateData({
        full_name,
        email,
        username,
        old_password,
        new_password,
        new_password2
      })
    }

    catch(err) {
      updateData({
        full_name,
        email,
        username
      })
    }  
  }

  async function updateData(props) {
    try {
      const response = await api.put(`/users/update/${user.user_id}`, props)
      if (response.status === 202) {
        alert('Success! Profile Updated')
        userLogout();
      
      }
    }
    catch(err) {
      alert(err.response.data.password)
    }
  }

  
  return (<div className="max-w-7xl m-auto  px-8">
      <div className="border border-zinc-200 w-4/12 mx-auto flex flex-col justify-center items-center gap-y-6 rounded-lg max-lg:w-5/12 max-md:w-3/5 max-[600px]:w-10/12 max-[360px]:w-full">
      <div className="w-6/12 ">
    <p className="text-2xl font-bold mt-4 text-slate-950" >Update Profile</p>
    </div>
      <div className="w-full">
      <form  className="flex flex-col gap-y-3" onSubmit={onSubmit}>
      <label for='full_name' className="border-transparent">
              <input type='text' className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative text-slate-500' id='full_name' placeholder='Full Name' value={fullname} onChange={event => setFullname(event.target.value)} name="full_name" autoFocus/>
              </label>
      <label for='username'><input type='text' className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative text-slate-500' placeholder='Username' id='username' value={username} onChange={event => setUsername(event.target.value)} name="username"/></label>
      <label for='email'><input type='email' className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative text-slate-500' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}id='email' name="email"/></label>
    
  {updatePassword && <>
    <label for='old_password'><input type="password" className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative text-slate-500' id='old_password' placeholder="Current Password" name="old_password" /></label>  
      <label for='new_password'><input type="password" className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative text-slate-500' id='new_password' placeholder="New Password" name="new_password" /></label>  
          <label for='new_password2'><input type="password" className='w-2/3 h-8 rounded border border-zinc-200 p-px ps-2.5 inline-block relative text-slate-500' id='new_password2' placeholder="Retype New Password" name="new_password2" /></label>  
  </>}
  {!updatePassword ? <p className="text-sm mb-1 mt-1.5">Update Password too?<a onClick={() => setUpdatePassword(!updatePassword)} className="text-blue-700 hover:text-blue-600 mt-6 font-semibold cursor-pointer"> Click here!</a></p> : <p className="text-sm mb-1 mt-1.5">Don't wanna Update Password? <a onClick={() => setUpdatePassword(!updatePassword)} className="text-blue-700 hover:text-blue-600 mt-6 font-semibold ">Click here!</a></p>}
          <button className="bg-blue-700 w-6/12 my-0 mx-auto h-10 font-bold rounded-lg hover:bg-blue-600 mt-6 text-white"> Update </button>
      </form>
      <p className="text-sm mb-1 mt-1.5"><a href="/register" className="text-blue-700 hover:text-blue-600 mt-6 font-semibold"> Sign Up</a> |<a href="/login" className="text-blue-700 hover:text-blue-600 mt-6 font-semibold"> Log In</a></p>
      </div>
    </div>
    </div>
  )
}

export default UpdatePassword