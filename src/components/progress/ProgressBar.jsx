import React, { useEffect, useState } from 'react'
import { calculaColorPorcentaje } from '../../helpers'
import useTarea from '../../hooks/useTarea'
import Swal from 'sweetalert2'
import './ProgressBar.css'



const ProgressBar = () => {
    const [tamanoClase, setTamano] = useState('')
    const { tareas } = useTarea()
    const [porcentajeprogress, setPorcentaje] = useState(0)

    useEffect(() => {
        const calcular = tareas.reduce((total, tarea) => {
            if (tarea.estado) {
                return total += 1
            }
            return total
        }, 0)
        const porcentaje = (100 * calcular) / tareas.length
        setPorcentaje(parseInt(porcentaje))
        let tamano = calculaColorPorcentaje(porcentajeprogress)
        setTamano(tamano)


    }, [porcentajeprogress, tareas])

    useEffect(() => {
        if (porcentajeprogress == 100) {
            Swal.fire({
                position: 'top-start',
                icon: 'success',
                title: 'Completaste tu Proyecto!',
                showConfirmButton: false,
                timer: 30000
            })
        }

        if (document.querySelector('.progress')) {
            let progress = document.querySelector('.progress')
            progress.classList.add('animate-pulse')

            setTimeout(() => {
                progress.classList.remove('animate-pulse')
            }, 1500)
        }
    }, [porcentajeprogress])

    return (
        <>
            <h2
                className='text-2xl mt-3 font-semibold'
            >Progreso Proyecto</h2>
            <div
                className='bg-gray-400 mt-4 rounded progress text-center font-bold shadow'
            >
                <p className='bg-stone-200'>{porcentajeprogress}%</p>

                <div
                    className={`py-5 px-2  ${tamanoClase} `}
                >
                </div>
            </div>
        </>
    )
}

export default ProgressBar