import React from 'react'
import Proyectos from '../../paginas/Proyectos'
import Avatar from './Avatar'
import useMessage from '../../hooks/useMessage'
import ModalUser from './modals/ModalUsers'
import useAuth from '../../hooks/useAuth'
import { obtieneIniciales } from '../../helpers'

const SidebarProyectos = () => {

    const { modal, setModal } = useMessage();
    const { auth } = useAuth()

    return (

        <>
            <div className='flex-1 bg-stone-100 h-full'>
                <div className='bg-sky-600 p-5'>
                    <div className='flex justify-center'>
                        <Avatar
                            iniciales={obtieneIniciales(auth.nombre)}
                            width={'5rem'}
                            height={'5rem'}
                            margin_top={'2.7rem'}
                        />
                    </div>
                    <p className='font-bold text-white text-center mt-3'>{auth.nombre}</p>
                </div>

                <Proyectos
                    message={true}
                />
            </div>
            <ModalUser
                modal={modal}
                setModal={setModal}
            />
        </>
    )
}

export default SidebarProyectos