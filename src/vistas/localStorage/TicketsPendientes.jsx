import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerTiquets } from './functions';

//funcion que me permite eliminar un ticket
const eliminarTicket = (codigo, setTicketsResueltos) => {
    //obtengo los tickets
    const tickets = obtenerTiquets();
    //filtro los tickets para que no me muestre el ticket que quiero eliminar
    const ticketsActualizados = tickets.filter(ticket => ticket.codigo !== codigo);
    //guardo los tickets actualizados en localStorage
    localStorage.setItem('dades_tiquets', JSON.stringify(ticketsActualizados));
    //actualizo el estado de los tickets
    setTicketsResueltos(ticketsActualizados.filter(ticket => ticket.estado === 'resuelto'));
};

//funcion para resolver un ticket
const resolverTicket = (codigo, setTicketsPendientes) => {
    //obtengo los tickets
    const tickets = obtenerTiquets();
    //actualizo el estado del ticket a resuelto y guardo la fecha de resolución en el ticket
    const ticketsActualizados = tickets.map(ticket =>
        ticket.codigo === codigo ? { ...ticket, estado: 'resuelto', fechaResolucion: new Date().toLocaleDateString() } : ticket
    );
    localStorage.setItem('dades_tiquets', JSON.stringify(ticketsActualizados));
    setTicketsPendientes(ticketsActualizados.filter(ticket => ticket.estado === 'no resuelto'));
};

//funcion para mostrar los tickets pendientes
const TicketsPendientes = () => {
    //por defecto el estado de los tickets pendientes esta vacio
    const [ticketsPendientes, setTicketsPendientes] = useState([]);

    //obtengo los tickets pendientes
    useEffect(() => {
        //parseo los tickets para que se muestren en la tabla
        const tickets = obtenerTiquets().filter(ticket => ticket.estado === 'no resuelto');
        //actualizo el estado de los tickets pendientes
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
                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => resolverTicket(ticket.codigo, setTicketsPendientes)}
                                    >
                                        Resolver
                                    </button>
                                    <Link to={`../comentarios/${ticket.codigo}`}>
                                        <button
                                            className="btn btn-info btn-sm"
                                            title="Ver comentarios"
                                            style={{ margin: '0px 7px 0px 0px'
                                             }}
                                        >
                                            Ver comentarios
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => eliminarTicket(ticket.codigo, setTicketsPendientes)}
                                    >
                                        Eliminar
                                    </button>
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