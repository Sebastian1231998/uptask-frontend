import { useState, memo } from 'react'
import useMessage from '../../../hooks/useMessage'
import { filtrar_conversacion } from '../../../helpers'
import { crearConversacionNueva, activarSonido, crearMessageNueva } from '../../../helpers/message'
import Picker from 'emoji-picker-react'
import useAuth from '../../../hooks/useAuth'

const ContentFormMessage = ({nombreRemitente, correoRemitente,idRemitente}) => {

    const {
        conversacion,
        setConversacion,
        activaRemitente,
        conversaciones,
        crearConversacion,
        crearMessage,
        setValidaBuscar,
    } = useMessage()

    const {auth} = useAuth()

    const [message, setMessage] = useState('')
    const [habilitaEmoji, setHabilitaEmoji] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState(null);
 

    const handleKeyMessage = (e) => {
        let validar = false;
        if (e.key === 'Enter') {

            e.preventDefault()
            if (message.trim() === "") return;
            validar = filtrar_conversacion(conversaciones, activaRemitente, setConversacion, auth)


            let nuevaConversacion = {
                usuario_recibe: { nombre: nombreRemitente, correo: correoRemitente, _id: idRemitente },
                ultimo_mensaje: e.target.value,
                usuario_envia: auth,
                _id: conversacion._id
            }

            if (validar) {
                crearMessageNueva(crearMessage, nuevaConversacion, e.target.value)
                setValidaBuscar(false)

            } else {
                crearConversacionNueva(crearConversacion, nuevaConversacion, e.target.value)
            }

            setMessage('')
            activarSonido()
        } else {
            return
        }
    }

        

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        let textoArea = document.querySelector('#text_message')
        textoArea.value = textoArea.value + emojiObject.emoji
        setMessage(textoArea.value)
    };


    return (

        <>
            {habilitaEmoji && (
                <Picker
                    pickerStyle={{
                        bottom: '6rem',
                        width: '40%',
                        right: '2rem',
                        position: 'absolute',
                        zIndex: 1

                    }}
                    onEmojiClick={onEmojiClick}
                />
            )}

            <form className='m-8'
                onKeyDown={handleKeyMessage}
            >

                <textarea
                    className='w-full h-auto p-4 border-2 border-gray-400 rounded-lg'
                    style={{ resize: 'none', height: '10vh' }}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un nuevo mensaje..."
                    value={message}
                    id="text_message"

                >
                </textarea>


                <div className="bg-white flex p-2 shadow rounded-lg">
                    <button type='button' onClick={() => setHabilitaEmoji(!habilitaEmoji)} style={{ width: '100%' }}>
                        <svg style={{ float: 'right', fontSize: '2rem', color: '#95952c', borderRadius: '5rem' }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <button className="bg-sky-400 text-white font-bold px-4 py-1 mx-3 hover:bg-sky-600" type='button'>Enviar</button>
                </div>

            </form>
        </>
    )
}

export default ContentFormMessage