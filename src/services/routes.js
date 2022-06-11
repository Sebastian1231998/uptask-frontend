export const rutasAuth = [

    { id: 1, route: import.meta.env.VITE_LOGIN_ROUTE, type: "auth_user", name: "Login" },
    { id: 2, route: import.meta.env.VITE_OLVIDEPASSWORD_ROUTE, type: "auth_user", name: "OlvidePassword" },
    { id: 3, route: import.meta.env.VITE_CAMBIARPASSWORD_ROUTE, type: "auth_user", name: "CambiarPassword" },
    { id: 4, route: import.meta.env.VITE_CONFIRMAR_ROUTE, type: "auth_user", name: "Confirmar" },
    { id: 5, route: import.meta.env.VITE_REGISTRO_ROUTE, type: "auth_user", name: "Registro" },

]

export const rutasProyecto = [

    { id: 1, route: import.meta.env.VITE_PROYECTOS_ROUTE, type: "proyecto_user", name: "Proyectos" },
    { id: 2, route: import.meta.env.VITE_NUEVOPROYECTO_ROUTE, type: "proyecto_user", name: "NuevoProyecto" },
    { id: 3, route: import.meta.env.VITE_PROYECTO_ROUTE, type: "proyecto_user", name: "Proyecto" },
    { id: 4, route: import.meta.env.VITE_EDITARPROYECTO_ROUTE, type: "proyecto_user", name: "EditarProyecto" },
    { id: 5, route: import.meta.env.VITE_NUEVOCOLABORADOR_ROUTE, type: "proyecto_user", name: "NuevoColaborador" },

]

export const rutasMessage = [

    { id: 1, route: import.meta.env.VITE_MESSAGES_ROUTE, type: "message_user", name: "Messages" },
 
]