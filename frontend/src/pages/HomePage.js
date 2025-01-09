import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios"


function HomePage() {

  let api = useAxios();


  const [allusers, setAllusers] = useState([]);


   useEffect(() => {
    fetchData();
   }, [])

  const fetchData = async () => {
    const response = await api.get('/users');
    
    if (response.status === 200) {
      setAllusers(response.data);
    }
  }  

    return (
    <div><p>Hey this is the homepage for ecommerce site backend</p>
    <p>Below are all the users in db</p>
      {allusers && allusers.map((user, index) => {
        return <p id={index}>Hey,  {user.username}, with email {user.email}</p>
      })}
    </div>
  )
}

export default HomePage