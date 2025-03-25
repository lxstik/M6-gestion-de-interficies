import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import TicketsPendientes from './localStorage/TicketsPendientes'; // Importación correcta
import TicketsResueltos from './localStorage/TicketsResueltos'; // Importación correcta

function Panel() {
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    // Obtener el usuario actual desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    setUsuarioActual(usuario);
  }, []);

  return (
    <>
      <main className="container mt-5">
        <div className="d-flex align-items-center mb-4">
          {usuarioActual && (
            <>
              <img
                src={usuarioActual.imagen}
                alt="Foto del usuario"
                className="rounded-circle me-3"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
              <h1>Bienvenido, {usuarioActual.nombre}</h1>
            </>
          )}
        </div>

        {/* Componente para tickets pendientes */}
        <TicketsPendientes />

        {/* Componente para tickets resueltos */}
        <TicketsResueltos />
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
    </>
  );
}

export default Panel;