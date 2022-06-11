import React from 'react'
import useProyecto from './useProyecto'
import useAuth from './useAuth'

const useAdmin = () => {

    const {auth} = useAuth()
    const {proyecto} = useProyecto()

    
  return auth._id === proyecto.creador
  
}

export default useAdmin