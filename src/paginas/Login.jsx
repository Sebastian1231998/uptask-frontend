import { useState,useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"
const Login = () => {

  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const [alerta, setAlerta] = useState({})
  const {setAuth, auth} = useAuth()

  const navigate = useNavigate()


  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    if([email,password].includes('')){
      setAlerta({
        msg:"todos los campos son obligatorios",
        error:true
      })
      return
    }
    try {

      const {data} = await clienteAxios.post('/usuarios/login', {email,password})
      setAlerta({})
      setAuth(data)
      localStorage.setItem('token', data.token)
      navigate('/main/proyectos')
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  }

  const {msg} = alerta
  return (
    <>
      <h1
        className="text-sky-600 font-black text-6xl "
      >
        Inicia Sesión Y Administra Tus <span
          className="text-slate-700"
        >Proyectos</span>
      </h1>
 
      {msg && (
        <Alerta 
          alerta={alerta}
        />
      )}
      <form
        className="mt-10 bg-white p-10 shadow rounded-lg mb-5"
        onSubmit={handleSubmit}
      >
        <div
          className="my-5"
        >
          <label
            className="text-slate-600 uppercase block font-bold text-xl"
            htmlFor="email"
          >
            Email:
          </label>

          <input
            id="email"
            type="text"
            className="w-full bg-gray-100 my-3 rounded-lg p-3"
            placeholder="Ingresa tu Email"
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />

        </div>
        <div
          className="my-5"
        >
          <label
            className="text-slate-600 uppercase block font-bold text-xl"
            htmlFor="password"
          >
            Password:
          </label>

          <input
            id="password"
            type="password"
            className="w-full bg-gray-100 my-3 rounded-lg p-3 mb-5"
            placeholder="Ingresa tu Password"
            value={password}
            onChange={ e => setPassword(e.target.value)}
          />
        </div>

        <input 
           type="submit"
           className="w-full bg-sky-600 white p-3 rounded text-white uppercase font-bold hover:bg-sky-800 hover:cursor-pointer transition" 
           value="iniciar sesion"

        />
      </form>

      <nav
      className="lg:flex lg:justify-between"
      >
          <Link
            to="registrar"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
               ¿Aun no tienes una cuenta? Registrate
          </Link>

          <Link
            to="olvide-password"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
               Olvide Mi Password
          </Link>

      </nav>
    </>
  )
}

export default Login