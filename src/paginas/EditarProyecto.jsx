
import FormularioProyecto from '../components/FormularioProyecto'
import useProyecto from '../hooks/useProyecto'
import Swal from 'sweetalert2'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
const EditarProyecto = () => {

  const { proyecto, eliminarProyecto, obtenerProyecto } = useProyecto()
  const {id} = useParams()

  useEffect(()=>{
    obtenerProyecto(id)
  },[])


  const handleSubmit = () => {

    Swal.fire({
      title: '¿Deseas eliminar este proyecto?',
      text: "Este Proyecto no se puede eliminar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        eliminarProyecto(proyecto._id)
        Swal.fire(
          'Eliminado!',
          'Tu proyecto ha sido eliminado',
          'success'
        )
      }
    })

  }


  return (
    <div>
      <div className='flex justify-between items-center'>

        <div className='flex items-center'>

          <Link
            to={`/main/proyectos/${proyecto._id}`}
            className='flex gap-2 items-center'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
            <p>Regresar</p>
          </Link>

        </div>
        <h1
          className="text-4xl font-black font-bold"
        >
          Editar Proyecto: {proyecto.nombre}
        </h1>


        <button type='button' className='flex' onClick={() => handleSubmit()}>
          <span className='text-gray-400 font-bold hover:text-gray-600'>Eliminar</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

      </div>

      <div
        className='flex justify-center mt-5'
      >
        <FormularioProyecto />
      </div>
    </div>
  )
}

export default EditarProyecto
