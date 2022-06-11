import React from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyecto from '../hooks/useProyecto'
import {useNavigate} from 'react-router-dom'

const NuevoColaborador = () => {

    const { proyecto, colaborador,agregarColaborador } = useProyecto()
    const navigate = useNavigate()

    const handleAgregarColaborador = async()=>{
        await agregarColaborador(proyecto._id, colaborador.email)
    }
    return (

        <>
            <div>
                <h2
                    className='text-3xl font-black'
                >Agregar Nuevo Colaborador(a): {proyecto.nombre}</h2>

                <div
                    className='justify-center flex mt-5'
                >
                    <FormularioColaborador />
                </div>
            </div>

            {
                colaborador?.nombre &&
                <div className='justify-center flex mt-5'>
                    <div className="px-5 py-10 bg-white md:w-1/2 rounded-lg shadow mt-3 flex justify-between">
                        <div className="">
                            <p className='text-sm font-black'><span className='mx-2'>Colaborador:</span>{colaborador.nombre}</p>
                            <p className='text-sm font-black'><span className='mx-2'>Email Colaborador:</span>{colaborador.email}</p>
                        </div>
                        <div className="">
                           <button 
                               className='bg-sky-400 p-3 rounded text-white font-bold hover:bg-sky-600'
                               type='button'
                               onClick={()=> handleAgregarColaborador()}
                           >Añadir Colaborador</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default NuevoColaborador