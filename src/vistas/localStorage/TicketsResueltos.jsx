import React, { useEffect, useState } from 'react';

// Función para obtener los tickets desde localStorage
const obtenerTickets = () => {
    return JSON.parse(localStorage.getItem('dades_tiquets')) || [];
};

// Función para eliminar un ticket
const eliminarTicket = (codigo, setTicketsResueltos) => {
    const tickets = obtenerTickets();
    const ticketsActualizados = tickets.filter(ticket => ticket.codigo !== codigo);
    localStorage.setItem('dades_tiquets', JSON.stringify(ticketsActualizados));
    setTicketsResueltos(ticketsActualizados.filter(ticket => ticket.estado === 'resuelto'));
};

const TicketsResueltos = () => {
    const [ticketsResueltos, setTicketsResueltos] = useState([]);

    useEffect(() => {
        const tickets = obtenerTickets().filter(ticket => ticket.estado === 'resuelto');
        setTicketsResueltos(tickets);
    }, []);

    return (
        <div>
            <h2>Tickets Resueltos</h2>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha</th>
                        <th>Fecha Resolución</th>
                        <th>Aula</th>
                        <th>Grupo</th>
                        <th>Ordenador</th>
                        <th>Descripción</th>
                        <th>Alumno</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketsResueltos.map(ticket => (
                        <tr key={ticket.codigo}>
                            <td>{ticket.codigo}</td>
                            <td>{ticket.fecha}</td>
                            <td>{ticket.fechaResolucion}</td>
                            <td>{ticket.aula}</td>
                            <td>{ticket.grupo}</td>
                            <td>{ticket.ordenador}</td>
                            <td>{ticket.descripcion}</td>
                            <td>{ticket.alumno}</td>
                            <td>
                                
                                {/* Botón para eliminar el ticket */}
                                <button
                                    className="btn btn-danger"
                                    onClick={() => eliminarTicket(ticket.codigo, setTicketsResueltos)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketsResueltos;