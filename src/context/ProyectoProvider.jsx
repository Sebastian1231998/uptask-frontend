import { useEffect, useState, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"


const ProyectoContext = createContext()

const ProyectoProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [modal, setModal] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [modalBuscador, setModalBuscador] = useState(false)

    const navigate = useNavigate()

    const mostrarAlerta = (alerta) => {
        setAlerta(alerta)
    }

    useEffect(() => {

        const obtenerProyectos = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }

            let config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/proyectos', config);
            setProyectos(data)
        }

        obtenerProyectos()

    }, [])

    const handleCrearProyecto = async (proyecto) => {


        const token = localStorage.getItem('token')
        if (!token) {
            return
        }

        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {

            const { data } = await clienteAxios.post('/proyectos', proyecto, config);

            setProyectos([...proyectos, data
            ])

            mostrarAlerta({
                msg: "Proyecto Creador Correctamente",
                error: false
            })
            setTimeout(() => {
                navigate("/main/proyectos")
                setAlerta({})
            }, 2000)
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const obtenerProyecto = async (id) => {

        const token = localStorage.getItem('token')
        if (!token) {
            return
        }

        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        try {
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })

            setTimeout(() => {
                navigate('/main/proyectos')
                mostrarAlerta({})
            }, 2000)
        }
    }

    const editar = async (proyectoEditado, id) => {

        const token = localStorage.getItem('token')
        if (!token) {
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {


            const { data } = await clienteAxios.put(`/proyectos/${id}`, proyectoEditado, config)

            const proyectoActualizado = proyectos.map(proyecto => proyecto._id.toString() === data._id.toString() ? proyecto = data : proyecto)
            mostrarAlerta({
                msg: 'Actualizado Correctamente',
                error: false
            })
            setProyectos(proyectoActualizado)
            setTimeout(() => {
                navigate('/main/proyectos')
            }, 1000)
        } catch (error) {

            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const eliminarProyecto = async (id) => {

        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
            const proyectoEliminado = proyectos.filter(proyecto => proyecto._id !== id)
            setProyectos(proyectoEliminado)
            setTimeout(() => {
                navigate('/main/proyectos')
            }, 1500)
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const buscarColaborador = async (id, email) => {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post(`/proyectos/colaborador/${id}`, { email }, config)
            setColaborador(data)
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const agregarColaborador = async (id, email) => {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post(`/proyectos/agregar-colaborador/${id}`, { email }, config)
            navigate(`/main/proyectos/${proyecto._id}`)
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <ProyectoContext.Provider
            value={{
                mostrarAlerta,
                alerta,
                handleCrearProyecto,
                proyectos,
                proyecto,
                obtenerProyecto,
                setProyecto,
                editar,
                eliminarProyecto,
                modal,
                setModal,
                buscarColaborador,
                colaborador,
                agregarColaborador,
                modalEliminarColaborador,
                setModalEliminarColaborador,
                setModalBuscador,
                modalBuscador


            }}
        >
            {children}
        </ProyectoContext.Provider>
    )
}

export {
    ProyectoProvider
}

export default ProyectoContext; 