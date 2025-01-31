import {useState,useContext,createContext,useEffect} from 'react'
import axios from 'axios'
const AuthContext = createContext()



const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user : null,
        token : ""
    })

    //deafult axios
    axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(()=>{
        const data = localStorage.getItem('authorization')
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user : parseData.user,
                token : parseData.token,
                id : parseData.id,
                email : parseData.email
            })
        }
        //eslint disable next line
    },[])
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


//custom hook
const useAuth = () => useContext(AuthContext)

export {useAuth,AuthProvider}