import { createContext } from "react"
import { instance } from "../utils/instanceAxios";

export const AuthContext = createContext();



export const AuthProvider = ({children}) => {


    // let userLogin = async (event) => {

    //     const response = await instance.post('/users/api/token/', {
    //     "email": event.target.email.value,
    //     "password": event.target.email.password
        
    //     })
    
    //     if (response.status ===  200) {
    //         console.log('Hey it worked')
    
    //     }
    
    // }
    

    let userLogin = async (event) => {

        const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value,
            }),
        });
    
        if (!response.ok) {
            console.error('Login failed:', response.statusText);
            return;
        }
    
        const data = await response.json();
        console.log('Login successful:', data);
    };
    
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
        getTokens: getTokens
    }


    return (
    <AuthContext.Provider value={contextValues}>
        {children}
    </AuthContext.Provider>
    )
}