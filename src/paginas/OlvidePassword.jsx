
import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})
  

  const handleSubmit = async(e)=>{
     

    e.preventDefault()
    if(email === ""){

      setAlerta({
        msg:"El email es obligatorio",
        error:true
      })
      return
    }

    try {
        const { data } = await clienteAxios.post('/usuarios/olvide-password', {email})

        setAlerta({
          msg:data.msg,
          error:false
        })

        setEmail('')
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
            type="email"
            className="w-full bg-gray-100 my-3 rounded-lg p-3"
            placeholder="Ingresa tu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>
      
        <input 
           type="submit"
           className="w-full bg-sky-600 white p-3 rounded text-white uppercase font-bold hover:bg-sky-800 hover:cursor-pointer transition" 
           value="Enviar instrucciones"

        />
      </form>

      <nav
      className="lg:flex lg:justify-between"
      >
          <Link
            to="/registrar"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
               ¿Aun no tienes una cuenta? Registrate
          </Link>

          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
              ¿Ya tienes una cuenta? Inicia Sesión
          </Link>

      </nav>
      </>
  )
}

export default OlvidePassword