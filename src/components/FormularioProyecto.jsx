
import { useState, useEffect } from "react"
import useProyecto from "../hooks/useProyecto"
import Alerta from "./Alerta"
import { useParams, useLocation } from "react-router-dom"
import { formatearFecha } from "../helpers"
const FormularioProyecto = () => {


  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')
  const { alerta, mostrarAlerta, handleCrearProyecto,editar, proyecto } = useProyecto()
  const [validaEditar, setValidaEditar] = useState(false)
  const { pathname } = useLocation()

  const {id} = useParams()




  useEffect(() => {
    const comprobacion = pathname.split('/')
   

    if (comprobacion.includes('editar')) {

      let format = formatearFecha(proyecto.fechaEntrega)

      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(format)
      setCliente(proyecto.cliente)
      setValidaEditar(true)
    } else {
      setValidaEditar(false)
    }
  }, [proyecto])





  const submitProyecto = async (e) => {

    e.preventDefault()

    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })

      return
    }

    if (validaEditar) {
        await editar({
          nombre,
          descripcion,
          fechaEntrega,
          cliente
        }, id)
    } else {
      await handleCrearProyecto({
        nombre,
        descripcion,
        fechaEntrega,
        cliente
      })
    }
  }

  let msgNuevo;
  if (alerta) {
    const { msg } = alerta;
    msgNuevo = msg
  }


  return (
    <form
      className="px-5 py-10 bg-white md:w-1/2 rounded-lg shadow mt-3"
      onSubmit={submitProyecto}
    >

      {msgNuevo && (
        <Alerta alerta={alerta} />
      )}
      <div>
        <label
          className="text-gray-600 font-bold uppercase text-sm font-black"
          htmlFor="nombre"
        >
          Nombre
        </label>

        <input
          id="nombre"
          type="text"
          className="w-full border p-2 rounded-lg mb-3 mt-3"
          placeholder="Nombre Proyecto"
          value={nombre ?? ''}
          onChange={(e) => setNombre(e.target.value)}

        />
      </div>
      <div>
        <label
          className="text-gray-600 font-bold uppercase text-sm font-black "
          htmlFor="descripcion"
        >
          Descripcion
        </label>

        <textarea
          id="descripcion"
          className="w-full border p-2 rounded-lg mb-3 mt-3"
          placeholder="Descripcion Proyecto"
          value={descripcion ?? ''}
          onChange={(e) => setDescripcion(e.target.value)}


        />
      </div>

      <div>
        <label
          className="text-gray-600 font-bold uppercase text-sm font-black"
          htmlFor="fecha-entrega"
        >
          Fecha Entrega
        </label>

        <input
          id="fecha-entrega"
          type="date"
          className="w-full border p-2 rounded-lg mb-3 mt-3"
          value={fechaEntrega ?? ''}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>
      <div>
        <label
          className="text-gray-600 font-bold uppercase text-sm font-black"
          htmlFor="cliente"
        >
          Cliente
        </label>

        <input
          id="cliente"
          type="text"
          className="w-full border p-2 rounded-lg mb-3 mt-3"
          placeholder="Nombre Cliente"
          value={cliente ?? ''}
          onChange={(e) => setCliente(e.target.value)}

        />
      </div>

      <input
        type="submit"
        className="w-full bg-sky-600 p-2 text-white font-bold uppercase cursor-pointer hover:bg-sky-400 transition-colors mt-3"
      />


    </form>
  )
}

export default FormularioProyecto