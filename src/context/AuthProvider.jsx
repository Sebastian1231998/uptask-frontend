import {useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import { io } from "socket.io-client"
const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [config, setConfig] = useState({})
    const [cargando, setCargando ] = useState(true)
    const [socket, setSocket ] = useState('')

    useEffect(()=>{

        const autenticacion = async()=> {

        
        const token = localStorage.getItem('token')

        if(!token){
             setCargando(false)
            return
        }
        

        import('../helpers/index').then(helper => {
            setConfig(helper.validaToken())
          })

        const config = {
            headers:{
                "Content-Type":"application-json",
                Authorization:`Bearer ${token}`
            }
        }
     
        try {
            const {data} = await clienteAxios('/usuarios/perfil', config)
            setAuth(data)
            setSocket(io(import.meta.env.VITE_BACKEND_URL))

            
        } catch (error) {
            setAuth({})
        }finally{
            setCargando(false)
        }
    }
    autenticacion()
    },[])

    return (
        <AuthContext.Provider
        value={{
            setAuth,
            auth,
            cargando,
            config,
            socket
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext

