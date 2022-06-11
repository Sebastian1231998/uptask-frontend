import {useState} from 'react'
import Tarea from './Tarea'
import ProgressBar from './progress/ProgressBar'
const ListadoTareas = ({ tareas }) => {

    
    return (
        <>
            <div>
                <ul>
                    <li className='bg-white'>
                        {tareas.map(tarea => (
                            <Tarea
                                key={tarea._id}
                                tarea={tarea}
                            />
                        ))}
                    </li>
                </ul>
            </div>

            <ProgressBar
            />
        </>
    )
}

export default ListadoTareas