import React, { useEffect } from 'react'
import useProyecto from '../hooks/useProyecto'
import PreviewProyecto from '../components/PreviewProyecto'


const Proyectos = ({ message }) => {

  const { proyectos, setProyecto } = useProyecto()
  useEffect(() => {
    setProyecto({})
  }, [])


  return (
    <>

      {message ? null : (
        <h1
          className='text-4xl font-bold font-black'
        >Proyectos</h1>
      )}


      <div

        className={`${message ? 'mt-0' : 'mt-5' } bg-white rounded`}
      
      >
        {proyectos?.length > 0 ?
          (
            proyectos.map((proyecto) => {
              return (
                <PreviewProyecto
                  proyecto={proyecto}
                  key={proyecto._id}
                  message={message}
                />
              )
            })


          ) : <p>No hay Proyectos</p>}
      </div>
    </>
  )
}

export default Proyectos