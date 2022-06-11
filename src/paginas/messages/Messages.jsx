import React, { useEffect } from 'react'
import SidebarProyectos from '../../components/messages/SidebarProyectos'
import FormMessage from '../../components/messages/FormMessage'
import useMessage from '../../hooks/useMessage'
import io from "socket.io-client"

let socket;

const Messages = () => {

    const { socketActualizaConversacion, socketActualizaMessage, conversaciones, conversacion } = useMessage()

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit("Obtener Conversaciones", conversacion, response => {
            console.log(response)
        })
    }, [conversacion])

    useEffect(() => {

        socket.on("conversacion actualizada", (conversacion) => {
            console.log("conversacion", conversacion)
            socketActualizaConversacion(conversacion)
        })

        socket.on("message agregado", (message) => {
            console.log("conversacion", message)
            socketActualizaMessage(message)
        })
    })

    return (
        <>
            <div className='flex bg-stone-200' style={{ height: '100%' }}>
                <FormMessage />
                <SidebarProyectos />
            </div>
        </>
    )
}

export default Messages