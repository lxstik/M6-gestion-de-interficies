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
    // Obtener los usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('dades_usuaris')) || [];
    // Comprobar si el usuario existe en el array de usuarios
    const usuario = usuarios.find(user => user.correo === email && user.contrasenya === password);

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

export function RegistrarUsuario(nombre, email, password, imagen) {
    const usuarios = JSON.parse(localStorage.getItem('dades_usuaris')) || [];

    // Calcular la última ID disponible
    const ultimaId = usuarios.length > 0 ? Math.max(...usuarios.map(user => parseInt(user.id))) : 0;
    const nuevaId = (ultimaId + 1).toString();

    // Crear un objeto con los datos del usuario
    const usuario = {
        id: nuevaId,
        nombre: nombre,
        correo: email,
        contrasenya: password,
        imagen: imagen,
        rol: "alumno" // Asignar rol por defecto
    };

    // Añadir el usuario al array de usuarios
    usuarios.push(usuario);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('dades_usuaris', JSON.stringify(usuarios));
    alert('Usuario registrado con éxito');
}

export function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('dades_usuaris')) || [];
}

export function RecuperarUsuario(setUsuarioActual) {
    const usuario = localStorage.getItem('usuarioActual');
    if (usuario) {
        const usuarioObj = JSON.parse(usuario);
        setUsuarioActual(usuarioObj.nombre);
    }
}


export { noResueltos, resueltos, usuarioActual, fotoUsuarioActual };