import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios"
import { AuthContext } from "../context/authContext";
import TinyUserIcon from "../assets/TinyUserIcon";
import GlobeIcon from '../assets/GlobeIcon';
import MessageIcon from '../assets/MessageIcon';
import LanguageIcon from '../assets/LanguageIcon';

function UserProfile() {
  const { user, userLogout } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [fullname, setFullname] = useState(user.full_name);
  
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [newpassword2, setNewpassword2] = useState('');

  

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


    // this function is responsible for sending the new user's profile data and updating it in the backend.

    function onSubmit (event) {
      event.preventDefault();

      const full_name = event.target.full_name.value;
      const email = event.target.email.value;
      const username = event.target.username.value;
      const old_password = event.target.old_password.value;
      const new_password = event.target.new_password.value;
      const new_password2 = event.target.new_password2.value;


      async function updateData() {
        try {
          const response = await api.put(`/users/update/${user.user_id}`, {
            full_name,
            email,
            username,
            old_password,
            new_password,
            new_password2
          })
          if (response.status === 202) {
            alert('Success! Profile Updated')
            return getProfile();
          
          }
        }

        catch(err) {
          alert(err.response.data.password)
        }
      }

      updateData();

    }

    
  return (<>
     {userProfile ? 
   <div className="max-w-screen-lg  my-0 mx-auto ">
    <div className="mx-2  p-6">
    <div className="flex flex-col mx-px gap-2">
      <div className="flex justify-between p-2">
        <p className="font-bold text-lg">StoreStream Account</p>
        <button className="font-bold bg-red-600 text-white min-h-7 rounded-md w-24 hover:bg-red-700" onClick={() => {userLogout()}}>Sign Out</button>
      </div>
      <hr className="border-black border-none h-0.5 bg-zinc-300 opacity-50"></hr>
      <div className="flex gap-x-32 mt-8">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2.5 items-start">
            <img className="rounded-full w-36 h-36" src={`http://localhost:8000${userProfile.image}`}></img>
              <div>
              <p className="font-semibold text-lg">{user.full_name}</p>
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

