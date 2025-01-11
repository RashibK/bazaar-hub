import { createContext, useContext, useEffect, useState } from "react"
import { instance } from "../utils/instanceAxios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();



export const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [authTokens, setAuthTokens] = useState( localStorage.getItem('authTokens') ? JSON.parse((localStorage.getItem('authTokens'))) : null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    let userLogin = async (event) => {

        try {
        const response = await instance.post('/users/api/token/', {
        "email": event.target.email.value,
        "password": event.target.password.value
        
        })
    
        if (response.status ===  200) {
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            setUser(jwtDecode(response.data.access))
            setAuthTokens(response.data) 
            navigate('/')   
            
        }

    } catch (err) {
        alert(err.message)
    }
}
    let userRegister = async (event) => {
    
        try {
        const response = await instance.post('/users/api/register/', {
            "username": event.target.username.value, 
            "email": event.target.email.value,
            "full_name": event.target.full_name.value,
            "password": event.target.password.value,
            "password2": event.target.password2.value,
        })

        if (response.status === 201) {
            navigate('/');
            alert('Welcome,', response.data.username);
        }
    }
        catch(err) {
            alert(err.message)
        }
        // console.log(response.data);
    
    }

    let userLogout =  () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }


    let fetchProducts = async () => {

        const response = await instance.get('/products/list');
        
        if (response.status === 200) {
            return response.data;
        }
        }  
    

    let contextValues = {
        authTokens: authTokens,
        user: user,
        search: search,
        userLogin: userLogin,
        userRegister: userRegister,
        userLogout: userLogout,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        setSearch: setSearch,
        fetchProducts: fetchProducts,
  
    }

    
    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false);

    }, [authTokens, loading])

    return (
    <AuthContext.Provider value={contextValues}>
        {loading ? null : children}
    </AuthContext.Provider>
    )
}