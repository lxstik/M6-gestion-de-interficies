import React, { useState } from 'react';
import { ComprobarUsuario } from './localStorage/functions';

function InicioSesion({ setUsuarioActual }) {
  //definir los estados para los campos del formulario, por defecto están vacíos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //funcion para comprobar el usuario
  function handleLogin(event) {
    //evita que formulario me recargue la pagina
    event.preventDefault();
    //comprueba el usuario con los datos introducidos
    ComprobarUsuario(email, password, setUsuarioActual);
  }

  return (
    <>
      <main className="container mt-5">
        <h1>Inicio de Sesión</h1>
        <div className="mt-4">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="mt-4 w-100 btn btn-primary" id="enviar">
              Entrar
            </button>
          </form>
        </div>
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

export default InicioSesion;