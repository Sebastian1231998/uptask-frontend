import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyecto"
import Alerta from "./Alerta"
const FormularioColaborador = () => {

    const { buscarColaborador, mostrarAlerta, alerta, obtenerProyecto } = useProyecto()
    const [email, setEmail] = useState('')
    const { id } = useParams()

    useEffect(() => {
        obtenerProyecto(id)
    }, [])
    const handleColaborador = (e) => {


        e.preventDefault()

        if (email === '') {
            mostrarAlerta({
                msg: 'El Email es obligatorio',
                error: true
            })
            return
        }

        buscarColaborador(id, email)
    }


    const { msg } = alerta
    return (

        <>
            <form
                className="px-5 py-10 bg-white md:w-1/2 rounded-lg shadow mt-3"
                onSubmit={handleColaborador}
            > <div>

                    {msg && <Alerta alerta={alerta} />}
                    <label
                        className="text-gray-600 font-bold uppercase text-sm font-black"
                        htmlFor="nombre"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        className="w-full border p-2 rounded-lg mb-3 mt-3"
                        placeholder="Email Colaborador"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value='Buscar Colaborador'
                    className="w-full bg-sky-600 p-2 text-white font-bold uppercase cursor-pointer hover:bg-sky-400 transition-colors mt-3"
                />
            </form>
        </>


    )
}

export default FormularioColaborador