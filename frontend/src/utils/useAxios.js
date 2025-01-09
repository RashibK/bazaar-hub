import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from  'dayjs';

const baseURL = 'http://127.0.0.1:8000'

function useAxios() {
    // (jwtDecode(localStorage.getItem('authTokens'))
    const { authTokens, setAuthTokens, setUser } = useContext(AuthContext);



    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${authTokens?.access}`
          },
        
      });

      axiosInstance.interceptors.request.use(async (request) => {

        const user = jwtDecode(authTokens.access);

        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return request

        const response = await axios.post(`${baseURL}/users/api/token/refresh/`, {
            "refresh": authTokens.refresh
        })

        if (response.status === 200) {
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
    
            request.headers.Authorization = `Bearer ${response.data.access}`
    
        }


        return request
      })

  return  axiosInstance
}

export default useAxios;