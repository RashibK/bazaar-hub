import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios"
import { AuthContext } from "../context/authContext";

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
     <div className="bg-stone-300  max-w-7xl m-auto flex gap-4">
        <div>
          <h1>Your Profile</h1>
       
        <img className='rounded-full' src={`http://localhost:8000${userProfile.image}`} width={150} height={150}></img>
        </div>
        <div>
          <h1>Your Information</h1>
          <form onSubmit={onSubmit}>
          <p>Name: <input type="text" value={fullname} onChange={(event) => {setFullname(event.target.value)}} name="full_name"></input></p>
          <p>Email: <input type="text" value={email} onChange={(event) => {setEmail(event.target.value)}} name="email"></input></p>
          <p>Username: <input type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} name="username"></input></p>
          <p>Current Password: <input type="text" onChange={(event) => {setOldpassword(event.target.value)}} name="old_password"></input></p>
          <p>New Password: <input type="text" onChange={(event) => {setNewpassword(event.target.value)}} name="new_password"></input></p>
          <p>Retype New Password: <input type="text" onChange={(event) => {setNewpassword2(event.target.value)}} name="new_password2"></input></p>
          <button>Update</button>
          </form>
        </div>
     </div>
     : <p>Loading...</p>}
  </>)
}

export default UserProfile

{/* <p>{userProfile.bio}</p> */}
{/* <img src={`http://localhost:8000${userProfile.image}`}></img>
<li>{user && <p style={{cursor: 'pointer'}} onClick={() => {userLogout()}}> Logout </p>}</li> */}
