import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const CambiarPassword = () => {

  const [tokenvalido, setTokenValido] = useState(false);
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [sesion, setSesion] = useState(false)
  const params = useParams();
  const { token } = params;


  useEffect(() => {

    const confirmarToken = async () => {

      try {

        const { data } = await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
        setAlerta({
          msg: data.msg,
          error: false
        })

      } catch (error) {
        setTokenValido(false)
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }


    }
    confirmarToken()
  }, [])


  const handleSubmit = async (e) => {

    e.preventDefault()

    if (password == "") {
      setAlerta({
        msg: "Password no puede ir vacio",
        error: true
      })
      return
    }
    if (password < 6) {
      setAlerta({
        msg: "Password no puede ser menor a 6 caracteres",
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setSesion(true)
      setPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  return (
    <>
      <h1
        className="text-sky-600 font-black text-6xl "
      >
        Inicia Sesión Y Administra Tus <span
          className="text-slate-700"
        >Proyectos</span>
      </h1>

      {tokenvalido ? (
        <>

          <form
            className="mt-10 bg-white p-10 shadow rounded-lg mb-5"
            onSubmit={handleSubmit}
          >
            <Alerta alerta={alerta} />
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
                placeholder="Ingresa tu Nuevo Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              className="w-full bg-sky-600 white p-3 rounded text-white uppercase font-bold hover:bg-sky-800 hover:cursor-pointer transition"
              value="Cambiar Password"


            />

          </form>

          {sesion && (
            <nav
              className="lg:flex lg:justify-between"
            >
              <Link
                to="/"
                className="block text-center my-5 text-slate-500 uppercase text-sm"
              >
                Password modificado ya puedes Iniciar Sesión
              </Link>

            </nav>
          )}

        </>

      ) : (

        <Alerta alerta={alerta} />

      )}




    </>
  )
}

export default CambiarPassword