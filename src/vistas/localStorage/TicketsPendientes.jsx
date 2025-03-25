import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Función para obtener los tickets desde localStorage
const obtenerTickets = () => {
    return JSON.parse(localStorage.getItem('dades_tiquets')) || [];
};

// Función para eliminar un ticket
const eliminarTicket = (codigo, setTicketsPendientes) => {
    const tickets = obtenerTickets();
    const ticketsActualizados = tickets.filter(ticket => ticket.codigo !== codigo);
    localStorage.setItem('dades_tiquets', JSON.stringify(ticketsActualizados));
    setTicketsPendientes(ticketsActualizados.filter(ticket => ticket.estado === 'no resuelto'));
};

// Función para resolver un ticket
const resolverTicket = (codigo, setTicketsPendientes) => {
    const tickets = obtenerTickets();
    const ticketsActualizados = tickets.map(ticket =>
        ticket.codigo === codigo ? { ...ticket, estado: 'resuelto', fechaResolucion: new Date().toLocaleDateString() } : ticket
    );
    localStorage.setItem('dades_tiquets', JSON.stringify(ticketsActualizados));
    setTicketsPendientes(ticketsActualizados.filter(ticket => ticket.estado === 'no resuelto'));
};

const TicketsPendientes = () => {
    const [ticketsPendientes, setTicketsPendientes] = useState([]);

    useEffect(() => {
        const tickets = obtenerTickets().filter(ticket => ticket.estado === 'no resuelto');
        setTicketsPendientes(tickets);
    }, []);

    return (
        <div>
            <h2>Tickets Pendientes</h2>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha</th>
                        <th>Aula</th>
                        <th>Grupo</th>
                        <th>Ordenador</th>
                        <th>Descripción</th>
                        <th>Alumno</th>
                        <th>Acciones</th>
                        <th>Comentarios</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketsPendientes.map(ticket => (
                        <tr key={ticket.codigo}>
                            <td>{ticket.codigo}</td>
                            <td>{ticket.fecha}</td>
                            <td>{ticket.aula}</td>
                            <td>{ticket.grupo}</td>
                            <td>{ticket.ordenador}</td>
                            <td>{ticket.descripcion}</td>
                            <td>{ticket.alumno}</td>
                            <td>
                                <div className="d-flex">
                                    {/* Botón para resolver el ticket */}
                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => resolverTicket(ticket.codigo, setTicketsPendientes)}
                                    >
                                        Resolver
                                    </button>
                                    {/* Botón para eliminar el ticket */}
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => eliminarTicket(ticket.codigo, setTicketsPendientes)}
                                    >
                                        Eliminar
                                    </button>
                                    {/* Botón para añadir comentario */}
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        title="Añadir comentario"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Añadir comentario
                                    </button>
                                    {/* Botón para ver comentarios */}
                                    <Link to={`../comentarios/${ticket.codigo}`}>
                                        <button
                                            className="btn btn-info btn-sm"
                                            title="Ver comentarios"
                                        >
                                            Ver comentarios
                                        </button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketsPendientes;