import 'sweetalert2/dist/sweetalert2.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import { ProyectoProvider } from "./context/ProyectoProvider"
import { TareaProvider } from './context/TareaProvider'
import { MessageProvider } from './context/MessageProvider'
import RutaPrivada from "./layout/RutaPrivada"
import Authlayout from './layout/Authlayout'


import { lazy, Suspense } from 'react'

import { rutasAuth, rutasProyecto, rutasMessage } from './services/routes'

let componentsAuth = rutasAuth.map(rutas => lazy(() => import(/* @vite-ignore */ rutas.route)))
let componentsProyecto = rutasProyecto.map(rutas => lazy(() => import(/* @vite-ignore */ rutas.route)))
let componentsMessages = rutasMessage.map(rutas => lazy(() => import(/* @vite-ignore */ rutas.route)))


const [Login, OlvidePassword, CambiarPassword, Confirmar, Registro] = componentsAuth;
const [Proyectos, NuevoProyecto, Proyecto, EditarProyecto, NuevoColaborador] = componentsProyecto;
const [Messages] = componentsMessages;

function App() {



  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <ProyectoProvider>
            <TareaProvider>
              <MessageProvider>

                <Routes>

                  <Route path="/" element={<Authlayout />}>
                    <Route index element={<Login />} />
                    <Route path="registrar" element={<Registro />} />
                    <Route path="olvide-password" element={<OlvidePassword />} />
                    <Route path="olvide-password/:token" element={<CambiarPassword />} />
                    <Route path="confirmar/:id" element={<Confirmar />} />
                  </Route>

                  <Route path="/main" element={<RutaPrivada />}>
                    <Route path="proyectos" element={<Proyectos />} />
                    <Route path="proyectos/crear-proyecto" element={<NuevoProyecto />} />
                    <Route path="proyectos/agregar-colaborador/:id" element={<NuevoColaborador />} />
                    <Route path="proyectos/:id" element={<Proyecto />} />
                    <Route path="proyectos/editar/:id" element={<EditarProyecto />} />

                    <Route path="messages" element={<Messages />} />

                  </Route>
                </Routes>

              </MessageProvider>
            </TareaProvider>
          </ProyectoProvider>
        </AuthProvider>
      </Suspense>
    </BrowserRouter >

  )
}

export default App
