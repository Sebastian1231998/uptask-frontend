import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import SidebarMessage from "../components/messages/SidebarMessage"
import { useEffect,useState } from "react"



const RutaPrivada = () => {

  const { auth, cargando } = useAuth()
  const { pathname } = useLocation()

  const [isMessage, setMessage] = useState(false)

  useEffect(() => {

    if (pathname === '/main/messages') {
      setMessage(true)
    } else {
      setMessage(false)
    }
  }, [pathname])

  if (cargando) return "Cargando..."

  return (


    <div>

      {auth.email ? (
        <div
          className="bg-gray-100"
        >

          <Header />
          <div
            className="md:flex min-h-heigth"
          >
            {isMessage ? <SidebarMessage /> : <Sidebar />}


            <main
              className={isMessage ? "flex-1" : "flex-1 p-10"}
            >
              <Outlet />
            </main>

          </div>
        </div>
      ) : <Navigate to="/" />}
    </div>
  )
}

export default RutaPrivada