import { createContext, useContext, useState } from "react"
import { instance } from "../utils/instanceAxios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();



export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null);
    const [authTokens, setAuthTokens] = useState( localStorage.getItem('authTokens') ? JSON.parse((localStorage.getItem('authTokens'))) : null);

    let userLogin = async (event) => {

        const response = await instance.post('/users/api/token/', {
        "email": event.target.email.value,
        "password": event.target.password.value
        
        })
    
        if (response.status ===  200) {
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            setUser(jwtDecode(response.data.access))
            setAuthTokens(response.data)    
        }

    }
    
    let userRegister = async (event) => {
    
        const response = await instance.post('/users/api/register/', {
            "username": event.target.username.value, 
            "email": event.target.email.value,
            "full_name": event.target.full_name.value,
            "password": event.target.password.value,
            "password2": event.target.password2.value,
        })
        if (response.status ===  200) {
            console.log('Hey it worked')
    
        } else {
            console.log('Something went wrong....')
        }
        // console.log(response.data);
    
    }
    
    const getTokens = async (event) => {
    
        const response = await instance.post('/users/api/token/', {
            
            "email": event.target.email.value,
            "password": event.target.password.value,
        })
        console.log(response.data);
        // console.log(response.data);
    
    }
    


    let contextValues = {
        userLogin: userLogin,
        userRegister: userRegister,
        getTokens: getTokens,
        authTokens: authTokens,
        user: user
    }


    return (
    <AuthContext.Provider value={contextValues}>
        {children}
    </AuthContext.Provider>
    )
}