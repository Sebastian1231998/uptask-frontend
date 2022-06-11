import sonidosBeep from '../assets/message.mp3'

export function crearConversacionNueva(crearConversacion, nuevaConversacion, value) {

    let { usuario_recibe: {correo} , usuario_envia:{email} } = nuevaConversacion;

    crearConversacion(nuevaConversacion, {
        contenido: value,
        conversacion: nuevaConversacion,
        usuario_recibe: correo,
        usuario_envia: email,
    })
}

export function crearMessageNueva(crearMessage, nuevaConversacion, value){

    let { usuario_recibe: {correo} , usuario_envia:{email} } = nuevaConversacion;
    crearMessage({
        usuario_recibe: correo,
        usuario_envia: email,
        contenido: value,
        conversacion: nuevaConversacion
    }, true)
}

export function activarSonido() {
    let sonidos = document.querySelector('.sonido-message')

    sonidos.innerHTML += `<audio id="audio-play" src=${sonidosBeep} type="audio/mp3" autoplay></audio>`

    setTimeout(() => {
        if (document.querySelector('#audio-play')) {
            document.querySelector('#audio-play').remove()
        }
    }, 1000)
}