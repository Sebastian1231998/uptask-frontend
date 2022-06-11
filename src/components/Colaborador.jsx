
import useProyecto from "../hooks/useProyecto"
import useAuth from "../hooks/useAuth"
import useMessage from "../hooks/useMessage"
const Colaborador = ({ colaborador, message }) => {

    const { setModalEliminarColaborador } = useProyecto()
    const { setActivaRemitente, setModal } = useMessage()
    const { auth } = useAuth()
    const handleEliminarColaborador = () => {
        setModalEliminarColaborador(true)
    }


    const handleChatear = () => {
        setActivaRemitente({
            usuarios_vinculados: [colaborador, auth],
            active: true
        })
        setModal(false)
    }
    return (
        <div className='flex items-center justify-between border p-5'>
            <div>
                <h3
                    className='text-1xl font-bold'
                >{colaborador.nombre}</h3>
                <p
                    className='text-gray-400 uppercase'
                >{colaborador.email}</p>
            </div>
            <div>
                <div
                    className='flex gap-2'
                >
                    {!message &&
                        <button
                            onClick={handleEliminarColaborador}
                            className='bg-red-500 px-2 py-1 rounded text-white font-bold cursor-pointer'
                        >
                            Eliminar
                        </button>
                    }

                    {message &&
                        <button
                            className='bg-sky-500 px-2 py-1 rounded text-white font-bold cursor-pointer'
                            onClick={() => handleChatear()}
                        >
                            Chatear
                        </button>
                    }


                </div>
            </div>
        </div>
    )
}

export default Colaborador