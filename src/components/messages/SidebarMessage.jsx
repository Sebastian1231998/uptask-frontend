import React, { useEffect } from 'react'
import useMessage from '../../hooks/useMessage'
import PreviewMessage from './PreviewMessage'

import './css/previewMessage.css'
const SidebarMessage = () => {

    const { conversaciones, obtenerConversaciones } = useMessage()


    useEffect(() => {
        obtenerConversaciones()
    }, [])

    return (

        <>
            <div className='bg-slate-50 p-3 border-b-4 border-gray-300 font-bold text-sm'>
                Tus Mensajes
            </div>
            <aside className="md:w-90 lg:w-1/5 border-2 border-r-gray-300 barra-azul" style={{ height: '92vh' }}>


                {conversaciones.reverse().map(conversacion => (
                    <PreviewMessage
                        conversacion={conversacion}
                        key={conversacion._id}
                    />
                ))}

            </aside>
        </>
    )
}

export default SidebarMessage