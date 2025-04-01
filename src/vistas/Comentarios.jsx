import React, { useEffect, useState } from 'react';
import { Comentario } from './Comentario';
import { useParams, useNavigate } from 'react-router-dom';

export const Comentarios = () => {
    //obtengo la id del ticket a través del enlace
    const { id } = useParams();
    //hago que el boton de volver sea funcional
    const navigate = useNavigate();
    //defino los estados para los comentarios y el ticket
    const [comentarios, setComentarios] = useState([]);
    //almaceno el ticket actual
    const [ticket, setTicket] = useState(null);
    //obtengo el usuario actual del localStorage
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || { rol: "Usuario" };

    useEffect(() => {
        // voy cargando los tickets guardados en localStorage
        const ticketsGuardados = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
        //busco el ticket con el id que me ha llegado por parámetro y lo guardo en ticketEntrado
        const ticketEntrado = ticketsGuardados.find(ticket => String(ticket.codigo) === String(id));

        //en el caso de que el ticket exista, lo guardo en el estado
        if (ticketEntrado) {
            setTicket(ticketEntrado);
            //si el ticket tiene comentarios, los guardo en el estado también
            setComentarios(ticketEntrado.comentarios || []);
        }
    }, [id]);

    

    //la función para actualizar los comentarios
    const actualizarComentarios = (nuevoComentario) => {
        // agrego el nuevo comentario al array de comentarios
        const comentariosActualizados = [...comentarios, nuevoComentario];
        //actualizo los comentarios en el estado
        setComentarios(comentariosActualizados);
    
        // ahora actualizo los comentarios en el ticket
        const ticketsGuardados = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
        //busco el ticket con el id que me ha pasado y lo guardo en ticketIndex
        const ticketIndex = ticketsGuardados.findIndex(ticket => String(ticket.codigo) === String(id));
    
        //en el caso de que el ticket exista, actualizo los comentarios, guardo los cambios en localStorage y actualizo el estado
        if (ticketIndex !== -1) {
            ticketsGuardados[ticketIndex].comentarios = comentariosActualizados;
            localStorage.setItem("dades_tiquets", JSON.stringify(ticketsGuardados));
            setTicket(ticketsGuardados[ticketIndex]);
        }
    };

    //la función para borrar un comentario
    const borrarComentario = (index) => {
        //elimino el comentario del array
        const comentariosActualizados = comentarios.filter((_, i) => i !== index);
        setComentarios(comentariosActualizados);

        //actualizo los comentarios en el ticket
        const ticketsGuardados = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
        const ticketIndex = ticketsGuardados.findIndex(ticket => String(ticket.codigo) === String(id));

        if (ticketIndex !== -1) {
            ticketsGuardados[ticketIndex].comentarios = comentariosActualizados;
            localStorage.setItem("dades_tiquets", JSON.stringify(ticketsGuardados));
            setTicket(ticketsGuardados[ticketIndex]);
        }
    };

    return (
        <>
            <main className="container mt-5">
                <div className="d-flex">
                    <h1>Comentarios</h1>
                    <button className="btn btn-link ms-auto" onClick={() => navigate(-1)}>
                        Volver
                    </button>
                </div>

                <h2 className="my-4">Código ticket: <span>{id}</span></h2>
                <div>
                    <Comentario onSubmit={actualizarComentarios}></Comentario>
                    <div className="mt-4">
                        <h1>Comentarios</h1>
                        {comentarios.length > 0 ? (
                            comentarios.map((comentario, index) => (
                                <div key={index} className="card mb-3">
                                    <div className="card-body">
                                        <p>{comentario.coment}</p>
                                        <p className="small text-end">Fecha: {comentario.fechaActual}</p>
                                        {usuarioActual.rol === "admin" && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => borrarComentario(index)}
                                            >
                                                Borrar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay comentarios para este ticket.</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Comentarios;