import { useEffect, useState } from 'react'
import useTarea from '../hooks/useTarea'
import useProyecto from '../hooks/useProyecto'
import Alerta from './Alerta'
import Swal from 'sweetalert2'
import { formatearFecha } from '../helpers'

const FormularioTarea = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [prioridad, setPrioridad] = useState('')
    const [ValidaEditar, setValidaEditar] = useState(false)

    const { alerta, mostrarAlerta, crearTarea, tarea , actualizarTarea} = useTarea()
    const { proyecto, setModal } = useProyecto()

    useEffect(()=>{

        if(Object.keys(tarea).length > 0){
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setFechaEntrega(tarea.fechaEntrega)
            setPrioridad(tarea.prioridad)
            setValidaEditar(true)
        }else{
            setValidaEditar(false)
        }

    },[])
    const handleCrearTarea = async (e) => {

        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        mostrarAlerta({})

        if(ValidaEditar){
             await actualizarTarea(tarea._id, false , {
                nombre,
                descripcion,
                fechaEntrega,
                prioridad
             })
             Swal.fire({
                title: 'Tarea Actualizada Correctamente',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }else{
            await crearTarea({
                nombre,
                descripcion,
                fechaEntrega,
                prioridad,
                proyecto: proyecto._id
            })

            Swal.fire({
                title: 'Tarea Creada Correctamente',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }
        
        

        setTimeout(()=>{
            setModal(false)
        },1000)

    }

    const { msg } = alerta

    return (

        <>

        <h2 className='text-4xl text-center text-sky-600 mb-5'>{Object.keys(tarea).length > 0 ? 'Editando Tarea': 'Crear Nueva Tarea'}</h2>
        <form
            className="bg-white mb-4"
            onSubmit={handleCrearTarea}
        >

            {msg && (
                <Alerta alerta={alerta} />
            )}
            <div>
                <label
                    className='block uppercase text-gray-600 text-sm mt-3 font-bold mb-2'
                    htmlFor='nombre'
                >
                    Nombre Tarea
                </label>
                <input
                    id='nombre'
                    type="text"
                    className='w-full border rounded p-1'
                    placeholder='Nombre Tarea'
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}

                />
            </div>
            <div>
                <label
                    className='block uppercase text-gray-600 text-sm mt-3 font-bold mb-2'
                    htmlFor='descripcion'
                >
                    Descripción Tarea
                </label>
                <textarea
                    id='descripcion'
                    type="text"
                    className='w-full border rounded p-1'
                    placeholder='Descripcion Tarea'
                    onChange={(e) => setDescripcion(e.target.value)}
                    value={descripcion}

                />
            </div>
            <div>
                <label
                    className='block uppercase text-gray-600 text-sm mt-3 font-bold mb-2'
                    htmlFor='fecha-entrega'
                >
                    Fecha Entrega
                </label>
                <input
                    id='fecha-entrega'
                    type="date"
                    className='w-full border rounded p-1'
                    onChange={(e) => setFechaEntrega(e.target.value)}
                    value={fechaEntrega}
                />
            </div>
            <div>
                <label
                    className='block uppercase text-gray-600 text-sm mt-3 font-bold mb-2'
                >
                    Prioridad
                </label>
                <select

                    className='w-full border rounded p-1'
                    onChange={(e) => setPrioridad(e.target.value)}
                    value={prioridad}
                >
                    <option value="">-- Seleccione -- </option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
            </div>

            <input
                type='submit'
                value={Object.keys(tarea).length > 0 ? "Editar Tarea" : "Agregar Tarea"}
                className='w-full bg-sky-600 mt-6 p-2 rounded text-white uppercase font-bold hover:bg-sky-400 transition-colors'
            />


        </form>
        </>
    )
}

export default FormularioTarea