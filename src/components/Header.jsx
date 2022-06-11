import { Link } from "react-router-dom"
import useProyecto from "../hooks/useProyecto"
import Busqueda from "./Busqueda"
const Header = () => {

  const { setModalBuscador } = useProyecto()

  return (
    <>
      <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
          <Link
            to="/main/proyectos"
            className="text-4xl text-sky-600 font-black text-center"
          >UpTask</Link>

          <div
            className="flex items-center gap-2 hover:text-gray-400"
            onClick={() => setModalBuscador(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button>Buscar Proyecto</button>
          </div>
          <div
            className="flex items-center gap-4"
          >
            <Link
              to="proyectos"
              className="font-bold uppercase"
            >Proyectos</Link>

            <Link to="/main/messages"
              className="font-bold uppercase"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </Link>

            <button
              className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            >
              Cerrar Sesión
            </button>

          </div>
        </div>
      </header>

      <Busqueda />

    </>
  )
}

export default Header