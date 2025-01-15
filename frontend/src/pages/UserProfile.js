import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios"
import { AuthContext } from "../context/authContext";
import TinyUserIcon from "../assets/TinyUserIcon";
import GlobeIcon from '../assets/GlobeIcon';
import MessageIcon from '../assets/MessageIcon';
import LanguageIcon from '../assets/LanguageIcon';
import { Link } from "react-router-dom";
import StarIcon from '../assets/StarIcon';

function UserProfile() {
  const { user, userLogout } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState();
  
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


    
  return (<>
     {userProfile ? 
   <div className="max-w-screen-lg  my-0 mx-auto ">
    <div className="mx-2  p-6">
    <div className="flex flex-col mx-px gap-2">
      <div className="flex justify-between p-2">
        <p className="font-bold text-lg">StoreStream Account</p>
        <div className="flex gap-x-4 h-8">
        <Link to='/products/add' className="font-bold bg-yellow-600 text-white min-h-7 rounded-md w-32 hover:bg-yellow-500 flex justify-center items-center">Add Product</Link>
        <Link to='/users/update/password' className="font-bold bg-blue-700 text-white min-h-7 rounded-md w-32 hover:bg-blue-600 flex justify-center items-center">Update Profile</Link>
        <button className="font-bold bg-red-600 text-white min-h-7 rounded-md w-24 hover:bg-red-700" onClick={() => {userLogout()}}>Sign Out</button>
        </div>
      </div>
      <hr className="border-black border-none h-0.5 bg-zinc-300 opacity-50"></hr>
      <div className="flex gap-x-32 mt-8">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2.5 items-start">
            <img className="rounded-full w-36 h-36" src={`http://localhost:8000${userProfile.image}`}></img>
              <div>
                <div className="flex items-center gap-x-1">
                <p className="font-semibold text-lg">{user.full_name}</p>
                <StarIcon />
                </div>
              
              <p className="text-xs text-neutral-500">{user.email}</p>
              </div>
          </div>
        <div className="flex flex-col items-start gap-y-2">
        <p className="font-semibold text-orange-400 cursor-pointer">Personal Information</p>
          <p className="font-medium text-neutral-500 cursor-pointer">Billing & Payments</p>
          <p className="font-medium text-neutral-500 cursor-pointer">Order History</p>
        </div>
        </div>
        <div className="flex items-start flex-col gap-y-8">
          <div>
            <p className="font-bold text-4xl ">Personal Information</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 ">
            <div className="border-2 flex p-5  justify-between items-center rounded-lg gap-x-24 py-8">
              <div className="flex flex-col items-start"><p className="font-semibold text-base">Name</p>
              <p className="text-xs text-neutral-500">{user.full_name}</p></div>
              <div>
                <TinyUserIcon className=''/> </div>
            </div>
            <div className="border-2 flex p-5  justify-between items-center rounded-lg gap-x-24 py-8">
              <div className="flex flex-col items-start"><p className="font-semibold text-base">Country/Region</p>
              <p className="text-xs text-neutral-500">US</p></div>
              <div>
                <GlobeIcon /></div>
            </div>
            <div className="border-2 flex p-5  justify-between items-center rounded-lg gap-x-24 py-8">
              <div className="flex flex-col items-start"><p className="font-semibold text-base">Contact</p>
              <p className="text-xs text-neutral-500">{user.email}</p></div>
              <div>
                <MessageIcon /></div>
            </div>
            <div className="border-2 flex p-5  justify-between items-center rounded-lg gap-x-24 py-8">
              <div className="flex flex-col items-start"><p className="font-semibold text-base">Language</p>
              <p className="text-xs text-neutral-500" >English(US)</p></div>
              <div>
                <LanguageIcon /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   </div>
     : <p>Loading...</p>}
  </>)
}

export default UserProfile

