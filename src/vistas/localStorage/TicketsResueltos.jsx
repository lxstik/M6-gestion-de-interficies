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

//funcion para mostrar los tickets resueltos
const TicketsResueltos = () => {
    //defino el estado de los tickets resueltos
    const [ticketsResueltos, setTicketsResueltos] = useState([]);

    //obtengo los tickets resueltos
    useEffect(() => {
        const tickets = obtenerTiquets().filter(ticket => ticket.estado === 'resuelto');
        //actualizo el estado de los tickets resueltos
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
                                <Link to={`../comentarios/${ticket.codigo}`}>
                                    <button
                                        className="btn btn-info btn-sm"
                                        title="Ver comentarios"
                                    >
                                        Ver comentarios
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
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