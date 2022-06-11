import React from 'react'
import FormularioProyecto from '../components/FormularioProyecto'
const NuevoProyecto = () => {
    return (
        <div>
            <h1
                className="text-4xl font-black font-bold text-center"
            >
                Crear Proyecto
            </h1>

            <div
                className='flex justify-center mt-5'
            >
                <FormularioProyecto />
            </div>
        </div>
    )
}

export default NuevoProyecto