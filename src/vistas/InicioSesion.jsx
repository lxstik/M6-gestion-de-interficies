import localStorageFunction from './localStorage/functions';
import dades_usuaris from './localStorage/usuarios';

localStorageFunction();

function ComprobarUsuario() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Comprobar si el usuario existe en el array dades_usuaris
  const usuario = dades_usuaris.find(user => user.correo === email && user.contrasenya.toString() === password);

  if (usuario) {
    alert('Inicio de sesión exitoso');
  } else {
    alert('Correo electrónico o contraseña incorrectos');
  }
}

function InicioSesion() {
  return (
    <>
      <main className="container mt-5">
        <h1>Inicio de Sesión</h1>
        <div className="mt-4">
          <form onSubmit={(e) => { e.preventDefault(); ComprobarUsuario(); }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <input type="submit" className="mt-4 w-100 btn btn-primary" value="Entrar" id="enviar" />
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