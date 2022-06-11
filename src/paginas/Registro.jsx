import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Registro = () => {
   const [nombre, setNombre] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [repetirPassword, setRepetirPassword] = useState('')
   const [alerta, setAlerta ] = useState({})

   const handleSubmit = async(e)=>{

    e.preventDefault()

     if([nombre,email,password, repetirPassword].includes('')){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error:true
      })

      return; 
     }

     if(password !== repetirPassword){
       setAlerta({
         msg:'Los Passwords no son iguales',
         error:true
       })

       return;
     }

     if(password.length < 6){
       setAlerta({
         msg:'El password debe ser mayor a 6 caracteres',
         error:true
       })
       return; 
     }


     try {

      
      const {data}  = await clienteAxios.post(`/usuarios`,{nombre,email,password})
       setAlerta({
         msg:data.msg,
         error:false
       })
     } catch (error) {


      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
     }

     setNombre('')
     setEmail('')
     setPassword('')
     setRepetirPassword('')

   }


   const {msg } = alerta 

  return (
    <>
      <h1
        className="text-sky-600 font-black text-6xl "
      >
        Crea Tu Cuenta Y Administra Tus <span
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
            htmlFor="nombre"
          >
            Nombre:
          </label>

          <input
            id="nombre"
            type="text"
            className="w-full bg-gray-100 my-3 rounded-lg p-3"
            placeholder="Ingresa tu Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />

        </div>
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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div
          className="my-5"
        >
          <label
            className="text-slate-600 uppercase block font-bold text-xl"
            htmlFor="password2"
          >
            Repite Password:
          </label>

          <input
            id="password2"
            type="password"
            className="w-full bg-gray-100 my-3 rounded-lg p-3 mb-5"
            placeholder="Confirma tu Password"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="w-full bg-sky-600 white p-3 rounded text-white uppercase font-bold hover:bg-sky-800 hover:cursor-pointer transition"
          value="crear cuenta"

        />
      </form>

      <nav
        className="lg:flex lg:justify-between"
      >
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>

        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide Mi Password
        </Link>

      </nav>

    </>
  )
}

export default Registro