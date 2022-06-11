import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useTarea from '../hooks/useTarea'
import useProyecto from '../hooks/useProyecto'
import { Link } from 'react-router-dom'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ListadoTareas from '../components/ListadoTareas'
import Spinner from '../components/spinner/Spinner'
import Alerta from '../components/Alerta'
import ListadoColaboradores from '../components/ListadoColaboradores'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import useAdmin from '../hooks/useAdmin'
import io from 'socket.io-client'

let socket;
const Proyecto = () => {

    const admin = useAdmin()
    const { obtenerProyecto, proyecto, modal, setModal, modalEliminarColaborador, setModalEliminarColaborador, alerta } = useProyecto()
    const { obtenerTareas, tareas, cargando, setTarea, agregarTareaSocket, actualizarTareasSocket } = useTarea()
    const { id } = useParams()

    useEffect(() => {

        obtenerProyecto(id)
        obtenerTareas(id)

    }, [])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit("Obtener Proyecto", id)
    }, [])

    useEffect(() => {

        socket.on("tarea agregada", (tarea) => {
            agregarTareaSocket(tarea)
        })

        socket.on('tarea actualizada', (tarea_actualizada) => {
            actualizarTareasSocket(tarea_actualizada)
        })

    })

    useEffect(() => {
        if (!modal) {
            setTimeout(() => {
                setTarea({})
            }, 300)
        }
    }, [modal])




 


    const { nombre, colaboradores } = proyecto
    const { msg } = alerta

    return (


        <>
            {msg ? <Alerta alerta={alerta} /> : (
                <>
                    <div className='flex justify-between'>
                        <h2
                            className="font-bold  text-4xl"
                        >{nombre}</h2>

                        {admin && (

                            <div className='flex '>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <Link to={`main/proyectos/editar/${id}`} className='text-gray-400 font-bold hover:text-gray-600'>Editar</Link>
                            </div>

                        )}

                    </div>

                    {admin && (
                        <button
                            type="button"
                            onClick={() => setModal(true)}
                            className='flex gap-1 items-center mt-3 bg-sky-400 py-2 px-5 rounded w-full md:w-auto text-center text-white uppercase font-bold hover:bg-sky-600'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            Nueva Tarea
                        </button>
                    )}
                    <div>
                        <h2
                            className='text-2xl font-bold my-8'
                        >Tareas del proyecto</h2>


                        {cargando ?
                            <Spinner />
                            :

                            tareas?.length > 0 ?
                                <>
                                    <ListadoTareas
                                        tareas={tareas}

                                    />
                                </>
                                : (
                                    <div className='bg-white rounded-lg p-10'>
                                        <p
                                            className='text-center text-gray-400'
                                        >No hay Tareas</p>
                                    </div>
                                )

                        }
                    </div>

                    {admin && (
                        <div>
                            <div className='flex justify-between mt-10'>
                                <h2
                                    className="font-bold  text-2xl mb-10"
                                >Colaboradores del Proyecto</h2>

                                <div className='flex '>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <Link to={`/main/proyectos/agregar-colaborador/${id}`} className='text-gray-400 font-bold hover:text-gray-600'>Añadir</Link>
                                </div>
                            </div>
                            <div>
                                {cargando ?
                                    <Spinner />
                                    :

                                    proyecto.colaboradores?.length > 0 ?
                                        <>
                                            <ListadoColaboradores
                                                colaboradores={colaboradores}
                                            />
                                        </>
                                        : (
                                            <div className='bg-white rounded-lg p-10'>
                                                <p
                                                    className='text-center text-gray-400'
                                                >No hay Colaboradores en este proyecto</p>
                                            </div>
                                        )

                                }
                            </div>
                        </div>
                    )}

                    <ModalFormularioTarea
                        modal={modal}
                        setModal={setModal}
                    />
                    <ModalEliminarColaborador
                        modalEliminarColaborador={modalEliminarColaborador}
                        setModalEliminarColaborador={setModalEliminarColaborador}
                    />
                </>
            )}

        </>


    )
}

export default Proyecto