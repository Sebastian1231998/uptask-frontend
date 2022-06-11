import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";
import io from "socket.io-client"


const MessageContext = createContext();
let socket;

const MessageProvider = ({ children }) => {

  let [modal, setModal] = useState(false)
  let [conversacion, setConversacion] = useState({})
  let [conversaciones, setConversaciones] = useState([])
  let [messages, setMessages] = useState([])
  let [message, setMessage] = useState({})
  let [cargando, setCargando] = useState(false)
  let [validaBuscar, setValidaBuscar] = useState(false)

  let { config } = useAuth()

  let [activaRemitente, setActivaRemitente] = useState({
    active: false
  })

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

  const obtenerConversaciones = async () => {
    try {
      const { data } = await clienteAxios.get('/conversacion', config);
      setConversaciones(data)
    } catch (error) {
    }
  }


  const crearConversacion = async (conversacion, messageInicial) => {
    try {
      const { data } = await clienteAxios.post('/conversacion', conversacion, config);

      messageInicial.conversacion._id = data._id
      crearMessage(messageInicial, false)
      setConversaciones([data, ...conversaciones])
      setConversacion(data)
    } catch (error) {

    }
  }

  const crearMessage = async (message, validaConversacion) => {

    try {
      const { data } = await clienteAxios.post('/message', message, config);
      if (validaConversacion) {
        message.conversacion.estado = "No Visto"
        actualizarConversacion(message.conversacion, true)
        setValidaBuscar(false)
      }
      socket.emit("Agregar Message", data)

    } catch (error) {
    }
  }
  const buscarMessage = async (conversacion) => {

    setCargando(true)

    try {
      const { data } = await clienteAxios.get(`/message/${conversacion._id}`, config);
      setMessages(data)
      setCargando(false)

    } catch (error) {
      console.log(error)
    }
  }

  const actualizarConversacion = async (conversacion, validarCambio) => {
    try {
      let { data } = await clienteAxios.put(`conversacion/${conversacion._id}`, conversacion, config);
      if (validarCambio) {
        socket.emit("Actualiza Conversacion", data)
      }
    } catch (error) {
      console.log(error)
    }

  }

  const actualizarMessage = async (message) => {
    try {
      await clienteAxios.put(`message/${message._id}`, message, config);
      //messages.forEach(message => message._id === data._id ? messageActualizado.unshift(data) : messageActualizado.push(message))
      //setConversaciones(messageActualizado)
    } catch (error) {
      console.log(error)
    }

  }

  const socketActualizaConversacion = data => {

    let conversacionActualizada = []
    conversaciones.forEach(conversacionFiltro => conversacionFiltro._id === data._id ? conversacionActualizada.unshift(data) : conversacionActualizada.push(conversacionFiltro))
    console.log("conversacionActualizada", conversacionActualizada)
    setConversaciones(conversacionActualizada) 
  }

  const socketActualizaMessage = data => {
    console.log(messages)
    setMessages([...messages, data])
  }


  return (

    <MessageContext.Provider
      value={{
        modal,
        setModal,
        setConversaciones,
        conversaciones,
        setActivaRemitente,
        activaRemitente,
        crearConversacion,
        conversacion,
        setConversacion,
        obtenerConversaciones,
        crearMessage,
        buscarMessage,
        messages,
        setMessages,
        actualizarConversacion,
        cargando,
        setMessage,
        message,
        actualizarMessage,
        validaBuscar,
        setValidaBuscar,
        socketActualizaConversacion,
        socketActualizaMessage


      }}
    >
      {children}
    </MessageContext.Provider>
  )

}


export default MessageContext;

export {
  MessageProvider
}