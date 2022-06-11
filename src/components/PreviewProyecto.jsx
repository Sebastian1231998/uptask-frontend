import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useProyecto from '../hooks/useProyecto'
import useAuth from '../hooks/useAuth'
import useMessage from '../hooks/useMessage'

const PreviewProyecto = ({ proyecto, message }) => {


    const { auth } = useAuth()
    const { nombre, _id, cliente } = proyecto
    const { proyectos, setProyecto } = useProyecto()
    const { setModal } = useMessage()
    const [colaborador, setColaborador] = useState(false)


    useEffect(() => {

        const { colaboradores } = proyecto
        let validar = colaboradores.some(colaborador => colaborador._id === auth._id)
        setColaborador(validar)

    }, [])

    return (
        <div className='border p-3 flex'>
            <div
                className='flex-1 flex items-center	'
            >
                <h2
                    className="font-bold mx-3 text-sm"
                >{nombre}</h2>

                {!message && (
                    <span
                        className="text-gray-400 uppercase"
                    >{cliente}</span>
                )}


                {colaborador && (
                    <span
                        className="text-white bg-green-400 uppercase mx-3 px-2 font-bold uppercase rounded"
                    >Colaborador</span>
                )}

            </div>

            {!message && (
             <Link
                to={_id}
                className="text-gray-600 font-bold uppercase text-sm"
            >
                Ver Proyecto
            </Link>
            )}

            {message && (
             <button
                to={_id}
                className="text-gray-600 font-bold uppercase text-sm"
                onClick={()=>{
                    setModal(true)
                    setProyecto(proyecto)
                }}
            >
                Ver Colaboradores
            </button>
            )}
          
        </div>
    )
}

export default PreviewProyecto