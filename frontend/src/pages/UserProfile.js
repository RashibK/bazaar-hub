import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios"
import { AuthContext } from "../context/authContext";

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
     {userProfile ? <>
      <p>{userProfile.bio}</p>
      <img src={`http://localhost:8000${userProfile.image}`}></img>
      <li>{user && <p style={{cursor: 'pointer'}} onClick={() => {userLogout()}}> Logout </p>}</li>

     </> : <p>Loading...</p>}
  </>)
}

export default UserProfile