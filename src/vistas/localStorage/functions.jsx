import dades_tiquets from './tickets';
import dades_usuaris from './usuarios';

//defino las variables, por defecto son vacias
let noResueltos = [];
let resueltos = [];
let usuarioActual = null;
let fotoUsuarioActual = null;

//funcion para guardar los datos en localStorage
export default function localStorageFunction() {
    // si no existen los datos en localStorage, los guardo
    if (!localStorage.getItem("dades_tiquets") || !localStorage.getItem("dades_usuaris")) {
        localStorage.setItem("dades_tiquets", JSON.stringify(dades_tiquets));
        localStorage.setItem("dades_usuaris", JSON.stringify(dades_usuaris));
    }

    //saco los datos de localStorage y los asigno a las variables
    const tiquetsJSON = localStorage.getItem("dades_tiquets");
    const usuarisJSON = localStorage.getItem("dades_usuaris");

    //los convierto en objetos
    const dades_tiquets_obj = JSON.parse(tiquetsJSON);
    const dades_usuaris_obj = JSON.parse(usuarisJSON);

    //filtro los tickets por sus estados
    noResueltos = dades_tiquets_obj.filter(ticket => ticket.estado == "no resuelto");
    resueltos = dades_tiquets_obj.filter(ticket => ticket.estado == "resuelto");

    //saco por consola para las comprobaciones
    console.log(dades_usuaris_obj);
    console.log(noResueltos);
    console.log(resueltos);
}


export function ComprobarUsuario(email, password, setUsuarioActual) {
    //saco los datos de usuarios de localStorage
    const usuarios = JSON.parse(localStorage.getItem('dades_usuaris')) || [];
    //compruebo por si el usuario introducido existe
    const usuario = usuarios.find(user => user.correo === email && user.contrasenya === password);
    //si existe, guardo el nombre y la foto en las variables para sacarlas por pantalla
    if (usuario) {
        usuarioActual = usuario.nombre;
        fotoUsuarioActual = usuario.imagen;
        alert('Inicio de sesión exitoso');
        setUsuarioActual(usuarioActual);
        //tambien guardo la informacion del usuario en localStorage
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        return usuarioActual;
    } else {
        alert('Correo electrónico o contraseña incorrectos');
    }
}

export function RegistrarUsuario(nombre, email, password, imagen) {
    const usuarios = JSON.parse(localStorage.getItem('dades_usuaris')) || [];

    // asigno una nueva id al usuario registrado
    const ultimaId = usuarios.length > 0 ? Math.max(...usuarios.map(user => parseInt(user.id))) : 0;
    const nuevaId = (ultimaId + 1).toString();

    // creo un objeto con los datos del nuevo usuario
    const usuario = {
        id: nuevaId,
        nombre: nombre,
        correo: email,
        contrasenya: password,
        imagen: imagen,
        rol: "alumno"
    };

    // meto el nuevo usuario en el array de usuarios
    usuarios.push(usuario);

    // guardo los usuarios en localStorage
    localStorage.setItem('dades_usuaris', JSON.stringify(usuarios));
    alert('Usuario registrado con éxito');
}


export function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('dades_usuaris')) || [];
}

//funcion para mantener el usuario actual "pendiente"
export function RecuperarUsuario(setUsuarioActual) {
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    if (usuario) {
        setUsuarioActual(usuario);
    }
}

export { noResueltos, resueltos, usuarioActual, fotoUsuarioActual };