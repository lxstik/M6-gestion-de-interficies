import dades_tiquets from './tickets';
import dades_usuaris from './usuarios';

let noResueltos = [];
let resueltos = [];
let usuarioActual = null;
let fotoUsuarioActual = null;

export default function localStorageFunction() {
    // Convertir array al string y guardarlo en una variable
    if (!localStorage.getItem("dades_tiquets") || !localStorage.getItem("dades_usuaris")) {
        // Convertir arrays a strings y guardarlos en localStorage solo si no existen
        localStorage.setItem("dades_tiquets", JSON.stringify(dades_tiquets));
        localStorage.setItem("dades_usuaris", JSON.stringify(dades_usuaris));
    }
    // Sacarlos del string
    const tiquetsJSON = localStorage.getItem("dades_tiquets");
    const usuarisJSON = localStorage.getItem("dades_usuaris");

    // Convertirlo a un objeto
    const dades_tiquets_obj = JSON.parse(tiquetsJSON);
    const dades_usuaris_obj = JSON.parse(usuarisJSON);

    noResueltos = dades_tiquets_obj.filter(ticket => ticket.estado == "no resuelto");
    resueltos = dades_tiquets_obj.filter(ticket => ticket.estado == "resuelto");

    console.log(dades_usuaris_obj);
    console.log(noResueltos);
    console.log(resueltos);
}

export function ComprobarUsuario(email, password, setUsuarioActual) {
    //comprobar si el usuario existe en el array dades_usuaris, antes creo una variable usuario
    let usuario;
    for (let i = 0; i < dades_usuaris.length; i++) {
        const user = dades_usuaris[i];
        if (user.correo == email && user.contrasenya == password) {
            usuario = user;
        }
    }

    if (usuario) {
        usuarioActual = usuario.nombre;
        fotoUsuarioActual = usuario.imagen;
        alert('Inicio de sesión exitoso');
        setUsuarioActual(usuarioActual);
        // Guardar la información del usuario en localStorage
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        return usuarioActual;
    } else {
        alert('Correo electrónico o contraseña incorrectos');
    }
}

export function RecuperarUsuario(setUsuarioActual) {
    const usuario = localStorage.getItem('usuarioActual');
    if (usuario) {
        const usuarioObj = JSON.parse(usuario);
        setUsuarioActual(usuarioObj.nombre);
    }
}

export { noResueltos, resueltos, usuarioActual, fotoUsuarioActual };