import { createContext } from "react";
import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client"
import useProyecto from "../hooks/useProyecto";


const TareaContext = createContext()

let socket;
const TareaProvider = ({ children }) => {

    const [alerta, setAlerta] = useState({})
    const [tareas, setTareas] = useState([])
    const [tarea, setTarea] = useState({})
    const [cargando, setCargando] = useState(true)
    const { proyecto } = useProyecto()


    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    const { auth } = useAuth()



    const mostrarAlerta = (alerta) => {
        setAlerta(alerta)
    }

    const crearTarea = async (tarea) => {

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
            const { data } = await clienteAxios.post('/tareas', tarea, config)
            socket.emit('Nueva Tarea', tarea)

        } catch (error) {
            console.log(error)

        }
    }

    const obtenerTareas = async (id) => {
        setCargando(true)
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
            const { data } = await clienteAxios.get(`/tareas/${id}`, config)
            let dataUpdate = []
            import("../helpers/index").then(helper => {

                dataUpdate = data.map(info =>
                    info._id ?
                        {
                            ...info,
                            fechaEntrega: helper.formatearFecha(data[0].fechaEntrega)
                        }
                        : info
                )
                setTareas(dataUpdate)
            })
        } catch (error) {
            setAlerta({
                msg: 'Error al cargar las tareas',
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const actualizarTarea = async (id, estado, tareaActualizar) => {
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
            let tareaProvisional;
            let tareaActualizada = [];
            if (estado) {
                tareaActualizada = tareas.filter(tarea => {
                    if (tarea._id == id) {
                        tarea.completado = auth
                        tarea.estado = !tarea.estado
                        tareaProvisional = tarea

                        return tarea
                    }
                    return tarea
                })
            } else {
                tareaActualizada = tareas.filter(tarea => {
                    
                    if (tarea._id == id) {
                        import("../helpers/index").then(helper => {
                             tarea = helper.updateProprertie(tarea,tareaActualizar)
                        })
                    } 
                      return tarea  
                })

            }
              socket.emit('cambiar estado tarea', {tareaActualizada, id: proyecto._id})
              const url = `/tareas/${id}`
              await clienteAxios.put(url, tareaProvisional, config)
            
        } catch (error) {
            console.log(error)
            mostrarAlerta({
                msg: 'Error al cambiar estado Tarea',
                error: true
            })
            setTimeout(() => {
                mostrarAlerta({})
            }, 2000);
        }
    }
    const eliminarTareaApi = async (id) => {
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
            await clienteAxios.delete(`/tareas/${id}`, config)

            const tareaActualizada = tareas.filter(tarea => tarea._id !== id)

            socket.emit('cambiar estado tarea', { tareaActualizada, id: proyecto._id })

        } catch (error) {
            console.log(error)
            mostrarAlerta({
                msg: 'No se pudo eliminar la Tarea',
                error: true
            })
            setTimeout(() => {
                mostrarAlerta({})
            }, 2000);
        }
    }

    const agregarTareaSocket = (tareaNueva) => {
        setTareas([...tareas, tareaNueva])
    }

    const actualizarTareasSocket = (tarea_actualizada) => {
        setTareas(tarea_actualizada)
    }

    return (
        <TareaContext.Provider
            value={{
                alerta,
                mostrarAlerta,
                crearTarea,
                obtenerTareas,
                tareas,
                cargando,
                setTareas,
                actualizarTarea,
                setTarea,
                tarea,
                eliminarTareaApi,
                agregarTareaSocket,
                actualizarTareasSocket
            }}
        >

            {children}
        </TareaContext.Provider>
    )



}

export {
    TareaProvider
}
export default TareaContext; 