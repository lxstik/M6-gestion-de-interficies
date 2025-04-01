import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import TicketsPendientes from './localStorage/TicketsPendientes'; // Importación correcta
import TicketsResueltos from './localStorage/TicketsResueltos'; // Importación correcta

function Panel() {
  //por defecto el usuario actual es null
  const [usuarioActual, setUsuarioActual] = useState(null);

  //obtener el usuario actual desde localStorage
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    //establecerlo en el estado
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
              <h1>Привет, {usuarioActual.nombre}</h1>
            </>
          )}
        </div>


        <TicketsPendientes />
        <TicketsResueltos />
      </main>  
    </>
  );
}

export default Panel;