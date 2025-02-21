import React from 'react';
import dades_tiquets from './localStorage/tickets';
import dades_usuaris from './localStorage/usuarios';

//convertir array al string y guardarlo en una variable
//localStorage.setItem('dades_tiquets', JSON.stringify(dades_tiquets));
//localStorage.setItem('dades_usuaris', JSON.stringify(dades_usuaris));

//sacarlos del string
const tiquetsJSON = localStorage.getItem("dades_tiquets");
const usuarisJSON = localStorage.getItem("dades_usuaris");
//console.log(tiquetsJSON)

//convertirlo a un objeto¿
const dades_tiquets_obj = JSON.parse(tiquetsJSON);
 const dades_usuaris_obj = JSON.parse(usuarisJSON);
//console.log(dades_tiquets_obj);


const noResueltos = dades_tiquets_obj.filter(ticket => ticket.estado == "no resuelto");
const resueltos = dades_tiquets_obj.filter(ticket => ticket.estado == "resuelto");
console.log(dades_usuaris_obj);
console.log(noResueltos)
console.log(resueltos)



function Panel() {
  return (
    <>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>

        <h2 className="mt-5">Tickets pendientes</h2>
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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {noResueltos.map(ticket => (
              <tr key={ticket.codigo}>
                <td>{ticket.codigo}</td>
                <td>{ticket.fecha}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grupo}</td>
                <td>{ticket.ordenador}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.alumno}</td>
                <td><button className="btn btn-success" title="Resolver ticket">Resolver</button></td>
                <td><button className="btn btn-warning" title="Añadir comentario"><i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button></td>
                <td><button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button></td>
                <td><button className="btn btn-danger" title="Eliminar ticket"><i className="bi bi-trash3"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="mt-5">Tickets resueltos</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Fecha resuelto</th>
              <th>Aula</th>
              <th>Grupo</th>
              <th>Ordenador</th>
              <th>Descripción</th>
              <th>Alumno</th>
            </tr>
          </thead>
          <tbody>
            {resueltos.map(ticket => {
              return (
                <tr key={ticket.codigo}>
                  <td>{ticket.codigo}</td>
                  <td>{ticket.fecha}</td>
                  <td>{ticket.fechaResolucion}</td>
                  <td>{ticket.aula}</td>
                  <td>{ticket.grupo}</td>
                  <td>{ticket.ordenador}</td>
                  <td>{ticket.descripcion}</td>
                  <td>{ticket.alumno}</td>
                  <td><button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button></td>
                  <td><button className="btn btn-danger" title="Eliminar ticket"><i className="bi bi-trash3"></i></button></td>
                </tr>
              );
            })}
          </tbody>

        </table>

      </main>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Observaciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Código incidencia: <span>123546</span></p>
              <label htmlFor="comentario" className="form-label">Comentario:</label>
              <input className="form-control" defaultValue="Este es un comentario sobre esta incidencia" />
              <p className="small text-end">Autor: <span>Pepe Loco</span></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

export default Panel;
