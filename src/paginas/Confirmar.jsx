import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
const Confirmar= () => {

  const params = useParams()
  const { id } = params
  const [alerta, setAlerta] = useState({})
  const [validaConfirmarCuenta, setValidaConfirmarCuenta ] = useState(false)

  useEffect(() => {

    const confirmarCuenta = async () => {

      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios(url);
        setAlerta({
          msg: data.msg,
          error: false
        })

        setValidaConfirmarCuenta(true)
      } catch (error) {

              setAlerta({
                msg:error.response.data.msg,
                error:true
              })
      }

    }

    confirmarCuenta();

  }, [])

  const { msg } = alerta;
  return (
    <div>
      <h1
        className="text-sky-600 font-black text-6xl mb-20"
      >
        Confirma Tu Cuenta y Comienza Administrar Tus <span
          className="text-slate-700"
        >Proyectos</span>
      </h1>

      <div
        className="mt-20 md:mt-5 rounded-xl shadow px-5 py-10 bg-white"
      >
        {msg && (
          <Alerta
            alerta={alerta}
          />
        )}

        {validaConfirmarCuenta && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Inicia Sesión
          </Link>
        )}

      </div>

    </div>
  )
}

export default Confirmar