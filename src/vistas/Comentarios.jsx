import React, { useEffect, useState } from 'react';
import { Comentario } from './Comentario';
import { useParams, useNavigate } from 'react-router-dom';

export const Comentarios = () => {
    const { id } = useParams(); // Obtiene el ID del ticket desde la URL
    const navigate = useNavigate(); // Para manejar la navegación (botón "Volver")
    const [comentarios, setComentarios] = useState([]);
    const [ticket, setTicket] = useState(null); // Almacena el ticket actual

    useEffect(() => {
        // Cargar los tickets desde localStorage
        const ticketsGuardados = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
        const ticketEntrado = ticketsGuardados.find(ticket => String(ticket.codigo) === String(id)); // Comparación como strings

        if (ticketEntrado) {
            setTicket(ticketEntrado);
            setComentarios(ticketEntrado.comentarios || []);
        } else {
            console.error(`Ticket con código ${id} no encontrado.`);
        }
    }, [id]);

    const actualizarComentarios = (nuevoComentario) => {
        const comentariosActualizados = [...comentarios, nuevoComentario];
        setComentarios(comentariosActualizados);
    
        // Actualizar el ticket en localStorage
        const ticketsGuardados = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
        const ticketsActualizados = ticketsGuardados.map(ticket =>
            String(ticket.codigo) === String(id) ? { ...ticket, comentarios: comentariosActualizados } : ticket
        );
        localStorage.setItem("dades_tiquets", JSON.stringify(ticketsActualizados));
    
        // Actualizar el ticket actual en el estado
        const ticketActualizado = ticketsActualizados.find(ticket => String(ticket.codigo) === String(id));
        setTicket(ticketActualizado);
    };

    if (!ticket) {
        return (
            <div className="container mt-5">
                <h1>Ticket no encontrado</h1>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Volver
                </button>
            </div>
        );
    }

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