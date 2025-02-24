import dades_tiquets from './tickets';
import dades_usuaris from './usuarios';

let noResueltos = [];
let resueltos = [];

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

    noResueltos = dades_tiquets_obj.filter(ticket => ticket.estado === "no resuelto");
    resueltos = dades_tiquets_obj.filter(ticket => ticket.estado === "resuelto");

    console.log(dades_usuaris_obj);
    console.log(noResueltos);
    console.log(resueltos);
}

export { noResueltos, resueltos };