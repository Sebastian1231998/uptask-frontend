import Colaborador from "./Colaborador"
const ListadoColaboradores = ({colaboradores, message}) => {

  return (
    <div>
    <ul>
      {message && colaboradores.length == 0 ? 
        <li className='bg-white'>
             No hay Colaboradores
        </li>
      : 
      
      <li className='bg-white'>
            {colaboradores.map(colaborador => (
                <Colaborador
                    key={colaborador._id}
                    colaborador={colaborador}
                    message={message}
                />
            ))}
           
        </li>
      }
        
    </ul>
</div>
  )
}

export default ListadoColaboradores