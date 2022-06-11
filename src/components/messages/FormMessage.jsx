import React, { useEffect, useState } from 'react'
import useMessage from '../../hooks/useMessage'
import useAuth from '../../hooks/useAuth'
import { filtrar_conversacion } from '../../helpers'
import Messages from './Messages'
import ContentFormMessage from './form/ContentFormMessage'

const FormMessage = () => {

    const {
        conversacion,
        setConversacion,
        activaRemitente,
        conversaciones
    } = useMessage()
    
    const { auth } = useAuth();


    const [nombreRemitente, setNombre] = useState('')
    const [correoRemitente, setCorreo] = useState('')
    const [idRemitente, setId] = useState('')





    useEffect(() => {

        if (activaRemitente.active) {

            let info_usuario_destinatario = activaRemitente.usuarios_vinculados.filter(usuario => usuario._id !== auth._id)
            setNombre(info_usuario_destinatario[0].nombre)
            setCorreo(info_usuario_destinatario[0].email)
            setId(info_usuario_destinatario[0]._id)
            filtrar_conversacion(conversaciones, activaRemitente, setConversacion, auth)
           
        }
    }, [activaRemitente])


    return (

        <>
            <div className='flex flex-col basis-9/12 barra-azul justify-between' style={{ position: 'relative' }}>
                {activaRemitente.active ?
                    <div
                        className='bg-stone-100 p-5 shadow flex gap-2 justify-center'
                        style={{ zIndex: 3 }}
                    >  
                        <p
                            className='text-2xl semi-bold mt-3'><span className='text-sky-400  mr-3 text-2xl font-bold mt-8'>Correo Colaborador: </span>{correoRemitente}</p>
                    </div>

                    :
                    <p className='text-3xl semi-bold mt-3'>Selecciona Una Conversación</p>
                }

                {activaRemitente.active && (
                    <Messages
                    nombreRemitente={nombreRemitente}
                     />
                )}

                {Object.keys(conversacion).length === 0 && activaRemitente.active ? (
                    <p className='text-sm semi-bold mt-3 text-center'>No hay una conversación entre ustedes</p>
                ) : null}


            
    
                {activaRemitente.active &&
                   <ContentFormMessage 
                       nombreRemitente={nombreRemitente}
                       correoRemitente={correoRemitente}
                       idRemitente={idRemitente}
                   />
                }

            </div>


        </>
    )
}

export default FormMessage