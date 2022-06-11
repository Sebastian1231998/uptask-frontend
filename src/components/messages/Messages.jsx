import { useEffect } from "react"
import './css/previewMessage.css'
import useMessage from "../../hooks/useMessage"
import Message from "./Message"
import Spinner from "../spinner/Spinner"






const Messages = ({ nombreRemitente }) => {

    const {
        conversacion,
        activaRemitente,
        buscarMessage,
        messages,
        setMessages,
        cargando,
        validaBuscar,
    } = useMessage()
        
    useEffect(() => {

        if (activaRemitente.active) {

            if (Object.keys(conversacion).length > 0) {
                if (validaBuscar) {
                    if (!cargando) {
                        buscarMessage(conversacion)
                    }
                }
            } else {
                console.log("Aqui entrando identidicando se que es ")
                setMessages([])
            }
        }
    }, [conversacion])


    if (cargando) return <Spinner />


    return (

        <>
            <ul className='flex flex-col gap-5 barra-gris' style={{ padding: '5rem', width: '100%', left: '0', bottom: '18rem', overflow: 'auto', height: '57vh', position: 'absolute' }}>
                {
                    messages.map(message => (
                        <>
                            <Message
                                message={message}
                                key={message._id}
                                nombreRemitente={nombreRemitente}
                            />
                        </>
                    ))
                }

                <div className="sonido-message"></div>
            </ul>
        </>
    )
}

export default Messages