export const formatearFecha = fecha => {

    let data = new Date(fecha)
    let year = data.getFullYear()
    let month = data.getMonth() + 2
    let day = data.getDate()

    if (day < 10) {
        day = `0${day}`
    }
    let format = `${year}-0${month}-${day}`;

    if (month > 9) {
        format = `${year}-${month}-${day}`;
    }

    return format
}

export const calculaColorPorcentaje = (porcentaje) => {

    let tamano;

    if (porcentaje <= 25 && porcentaje > 0) {
        tamano = 'width-25'
    } else if (porcentaje >= 25 && porcentaje < 50) {
        tamano = 'width-40'
    } else if (porcentaje > 50 && porcentaje <= 80) {
        tamano = 'width-80'
    } else if (porcentaje == 50) {
        tamano = 'width-50'
    } else if (porcentaje == 100) {
        tamano = 'width-100'
    } else if (porcentaje == 0) {
        tamano = 'width-0'
    }

    return tamano
}

export const updateProprertie = (obj, obj_actualizar) => {

    Object.entries(obj).forEach(tarea_obj => {
        if (Object.keys(obj_actualizar).includes(tarea_obj[0]) &&
            !Object.values(obj_actualizar).includes(tarea_obj[1])) {
            obj[tarea_obj[0]] = obj_actualizar[tarea_obj[0]]
        }
    })

    return obj
}

export const formatearParrafo = parrafo => {

    let recortado = parrafo.substring(0, 70)
    let puntos = "..."

    recortado = recortado.concat(puntos)

    return recortado
}

export function obtieneIniciales(nombre) {
    if (nombre !== undefined) {
        let exp = /(^\w)\w+\s+(\w)/;
        let iniciales = exp.exec(nombre);
        let concatenaIniciales = `${iniciales[1]}${iniciales[2]}`;
        return concatenaIniciales;
    } else {
        return null;
    }
}

export function validaToken() {
    const token = localStorage.getItem('token')
    if (!token) {
        return
    }

    let config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    return config
}

export function filtrar_conversacion(conversaciones, activaRemitente, setConversacion, auth) {

    let validar;
    setConversacion({})
    for (let i = 0; i < conversaciones.length; i++) {
        if (validar) {
            break;
        }
        for (let j = 0; j < conversaciones[i].usuarios_vinculados.length; j++) {
            if (conversaciones[i].usuarios_vinculados[j]._id !== auth._id) {
                if (activaRemitente.usuarios_vinculados.some(usuario => usuario._id === conversaciones[i].usuarios_vinculados[j]._id)) {
                    setConversacion(conversaciones[i])
                    validar = true;
                    break;
                } else {
                    validar = false;
                }
            }
        }
    }

    return validar
}

export function scroll_message() {

    let liUltimate = document.querySelector(".barra-gris");
    liUltimate.lastChild.scrollIntoView({
        block: "end",
    });

}

export function getMinutesBetweenDates(startDate, endDate) {

    let differene = ''
    var diff = endDate.getTime() - startDate.getTime();

    if(diff / (1000 * 60 * 60 * 24) >= 1){
        differene = `Hace ${Math.trunc(diff / (1000 * 60 * 60 * 24)).toString()}  días`
    }else if(diff / (1000 * 60 * 60) >= 1 ){
        differene = `Hace ${Math.trunc(diff / (1000 * 60 * 60)).toString()}  horas`
    }else if(diff / (1000 * 60 * 60) <= 1){
        differene = `Hace ${Math.trunc(diff / (1000 * 60)).toString()}  minutos`
    }

    return differene;
}
