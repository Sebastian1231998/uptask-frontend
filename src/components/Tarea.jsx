import React from 'react'
import useTarea from '../hooks/useTarea'
import useProyecto from '../hooks/useProyecto'
import Swal from 'sweetalert2'
import useAdmin from '../hooks/useAdmin'

const Tarea = ({ tarea }) => {

    const { nombre, descripcion, fechaEntrega, prioridad, _id, estado, completado } = tarea
    const { actualizarTarea, setTarea, eliminarTareaApi } = useTarea()
    const { setModal } = useProyecto()

    const cambiaEstado = (id) => {
        actualizarTarea(id, true)
    }
    const eliminarTarea = () => {
        Swal.fire({
            title: '¿Deseas eliminar esta Tarea?',
            text: "Esta Tarea no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borralo!'
        }).then((result) => {
            if (result.isConfirmed) {

                eliminarTareaApi(_id)
                Swal.fire(
                    'Eliminado!',
                    'Tu Tarea ha sido eliminada',
                    'success'
                )
            }
        })

    }

    const admin = useAdmin()
    return (
        <div className='flex items-center justify-between border p-5'>
            <div>
                <h3
                    className='text-1xl font-bold'
                >{nombre}</h3>
                <p
                    className='text-gray-400 uppercase'
                >{descripcion}</p>
                <span
                    className='text-sm font-semibold'
                >{fechaEntrega}</span>
                <p
                    className='text-gray-600 font-semibold'
                ><span>Prioridad: </span> {prioridad} </p>

                {estado ? (
                    <p
                        className=' bg-green-400 p-1 text-sm font-bold uppercase text-white rounded'
                    ><span>Completada por: </span> {completado?.nombre} </p>
                ) : (
                    <p
                        className=' bg-gray-400 p-1 text-sm font-bold uppercase text-white rounded'
                    ><span>Desompletada por: </span> {completado?.nombre ? completado?.nombre : "Admin"} </p>
                )}

            </div>
            <div>
                <div
                    className='flex gap-2'
                >

                    {admin && (
                        <button
                            type='button'
                            className='bg-sky-600 px-2 py-1 rounded text-white font-bold cursor-pointer'
                            onClick={() => {
                                setModal(true)
                                setTarea(tarea)
                            }}
                        >
                            Editar
                        </button>
                    )}

                    <button
                        onClick={() => cambiaEstado(_id)}
                        className={`${estado ? 'bg-lime-400	' : 'bg-amber-400'} px-2 py-1 rounded text-white font-bold cursor-pointer`}
                    >
                        {estado ? 'Completa' : 'Incompleta'}
                    </button>
                    {admin && (
                        <button
                            onClick={() => eliminarTarea(_id)}
                            className='bg-red-500 px-2 py-1 rounded text-white font-bold cursor-pointer'
                        >
                            Eliminar
                        </button>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Tarea