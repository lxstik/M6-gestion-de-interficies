import dades_tiquets from './tickets';

const  dades_usuaris = [
    {
        id: "1",
        nombre: "Ana Martínez",
        correo: "ana.martinez@correo.com",
        contrasenya: "12345",
        imagen: "https://randomuser.me/api/portraits/women/1.jpg",
        rol: "alumno"
    },
    {
        id: "2",
        nombre: "Pedro Gómez",
        correo: "pedro.gomez@correo.com",
        contrasenya: "12345",
        imagen: "https://randomuser.me/api/portraits/men/2.jpg",
        rol: "alumno"
    },
    {
        id: "3",
        nombre: "Sofía Fernández",
        correo: "sofia.fernandez@correo.com",
        contrasenya: "12345",
        imagen: "https://randomuser.me/api/portraits/women/3.jpg",
        rol: "alumno"
    },
    {
        id: "4",
        nombre: "Luis Torres",
        correo: "luis.torres@correo.com",
        contrasenya: "12345",
        imagen: "https://randomuser.me/api/portraits/men/4.jpg",
        rol: "alumno"
    },
    {
        id: "5",
        nombre: "Carolina Ramírez",
        correo: "carolina.ramirez@correo.com",
        contrasenya: "12345",
        imagen: "https://randomuser.me/api/portraits/women/5.jpg",
        rol: "alumno"
    },
    {
        id: "6",
        nombre: "Maria López",
        correo: "maria.lopez@correo.com",
        contrasenya: "12345",
        imagen: "https://randomuser.me/api/portraits/women/6.jpg",
        rol: "alumno"
    },
    {
        id: "7",
        nombre: "Juan Rodríguez",
        correo: "juan.rodriguez@correo.com",
        contrasenya: "12345",
        imagen: "https://randomuser.me/api/portraits/men/7.jpg",
        rol: "alumno"
    },
    {
        id: "8",
        nombre: "Ana Martínez",
        correo: "ana.martinez2@correo.com",
        contrasenya: "12345",
        imagen: "https://randomuser.me/api/portraits/women/8.jpg",
        rol: "alumno"
    },
    {
        id: "12",
        nombre: "YehorAdmin",
        correo: "falego@ipm.cat",
        contrasenya: "12345",
        imagen: "https://img.png",
        rol: "admin"
    },
];

if (!localStorage.getItem('dades_usuaris')) {
    localStorage.setItem('dades_usuaris', JSON.stringify(dades_usuaris));
}
if (!localStorage.getItem('dades_tiquets')) {
    localStorage.setItem('dades_tiquets', JSON.stringify(dades_tiquets));
}

export default dades_usuaris;