import React from 'react'
import { formatearParrafo, obtieneIniciales } from '../../helpers'
import Avatar from './Avatar'
import useAuth from '../../hooks/useAuth'
import { getMinutesBetweenDates } from '../../helpers'
import { useState, useEffect } from 'react'
import useMessage from '../../hooks/useMessage'




const PreviewMessage = ({
    conversacion
}) => {

    const {
        setActivaRemitente,
        message,
        messages,
        actualizarMessage,
        actualizarConversacion,
        setValidaBuscar


    } = useMessage()
    const { auth } = useAuth()
    const [fecha, setFecha] = useState('')
    let usuarioRemitente = conversacion.usuarios_vinculados.filter(usuario => usuario._id !== auth._id)
    let parrafo = conversacion.ultimo_mensaje


    useEffect(() => {
        setFecha(getMinutesBetweenDates(new Date(conversacion.updatedAt), new Date()))
            let progress = document.querySelector('.conversacion_e')
            progress.classList.add('animate-pulse')
            progress.classList.add('bg-stone-200')
            setTimeout(() => {
                progress.classList.remove('animate-pulse')

            }, 4000)
        
    }, [conversacion])

    useEffect(() => {

        if (auth._id === conversacion.usuario_recibe._id) {
            if (messages.length > 0) {
                let mensajes_recibidos = messages.filter(message => {
                    if (message.usuario_recibe == auth.email) {
                        if (message.estado === 'No Visto') {
                            message.estado = "Visto"
                            return message
                        }
                    }
                })



                mensajes_recibidos.forEach((message) => {
                    message.conversacion = conversacion._id
                    actualizarMessage(message)
                })
            }
        }
    }, [messages])


    const cambiaConversacion = (e) => {


        setActivaRemitente({
            usuarios_vinculados: [usuarioRemitente[0], auth],
            active: true
        })

        let elemento = e.nativeEvent.path.filter(path => {
            if (path.classList !== undefined) {
                if (path.classList.contains('conversacion_e')) {
                    return path
                }
            }
        })

        document.querySelectorAll('.conversacion_e').forEach(conversacion => {
            if (conversacion.classList.contains('bg-stone-200')) {
                conversacion.classList.remove('bg-stone-200')
            }
        })

        elemento[0].classList.add('bg-stone-200')

        setValidaBuscar(true)


        if (auth._id === conversacion.usuario_recibe._id && conversacion.estado == "No Visto") {
            conversacion.estado = "Visto"
            actualizarConversacion(conversacion, false)
        }

    }

    return (
        <>
            <div
            >
                <div onClick={e => cambiaConversacion(e)} className={`
                ${conversacion.estado === 'No Visto' && auth._id === conversacion.usuario_recibe._id ?

                        'bg-sky-200 animate-pulse' :

                        'bg-white '
                    }
                
                
                p-3 border-b-2 
                border-gray-300 
                shadow conversacion_e 
                hover:bg-stone-200 
                transition-colors`

                }
                >
                    <div>
                        <div className='flex justify-center'>
                            <Avatar
                                iniciales={obtieneIniciales(usuarioRemitente[0].nombre)}
                                width={'5rem'}
                                height={'5rem'}
                                margin_top={'2.7rem'}
                            />
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div
                                        className='flex flex-col lg:items-center mt-5 flex-wrap'
                                    >
                                        <h4 className={conversacion.estado === 'No Visto' && auth.email === message.usuario_recibe ? 'font-semibold' : null}>{usuarioRemitente[0].nombre}</h4>
                                        <div className='text-center mt-3'>
                                            <span className='bg-sky-600 h-mixed h-auto	font-bold text-slate-100 rounded-lg p-1 '>Visitante</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-2 mt-5'>
                                    <div>

                                        {auth._id === conversacion.usuario_recibe ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                            </svg>) : <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                        </svg>}
                                    </div>
                                    <p className={conversacion.estado === 'No Visto' && auth._id === conversacion.usuario_recibe._id ? 'font-semibold' : null}>{formatearParrafo(parrafo)}</p>
                                </div>
                                <div className='flex flex-col items-end mt-3 mx-3'>
                                    <span>{fecha}</span>
                                    <div className='my-3 flex gap-2'>

                                        <span className={conversacion.estado === 'No Visto' && auth._id === conversacion.usuario_recibe._id ? 'font-semibold' : null}> inbox</span>

                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>


                                    </div>

                                    {conversacion.estado === 'No Visto' && auth._id === conversacion.usuario_recibe._id ? <p>No visto</p> : null}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default PreviewMessage