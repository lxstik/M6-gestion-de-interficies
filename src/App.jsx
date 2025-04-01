import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Panel from './vistas/Panel';
import InicioSesion from './vistas/InicioSesion';
import Registro from './vistas/Registro';
import Comentarios from './vistas/Comentarios';
import PanelAdmin from './vistas/PanelAdmin';
import './styles/bootstrap.scss';
import { RecuperarUsuario } from './vistas/localStorage/functions';
import CrearTicket from './vistas/CrearTicket';

function App() {
  const [usuarioActual, setUsuarioActual] = useState({});

  // Al cargar la página se recupera el usuario actual del localStorage
  useEffect(() => {
    RecuperarUsuario(setUsuarioActual);
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    console.log("Usuario actual al cargar:", usuario);
  }, []);

  // Al cerrar la sesión se anula el usuario actual del localStorage
  function cerrarSesion() {
    setUsuarioActual(null);
    localStorage.removeItem('usuarioActual');
  }

  return (
    <>
      <Router>
        <header>
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
              <div>
                {usuarioActual ? (
                  <>
                    <Link to="/Panel" className="btn btn-secondary ms-2">PANEL</Link>
                    <Link to="/crear-ticket" className="btn btn-secondary ms-2">CREAR TICKET</Link>
                    {console.log("Usuario actual en render:", usuarioActual)}
                    {console.log("Rol del usuario:", usuarioActual?.rol?.toLowerCase())}
                    {usuarioActual?.rol?.toLowerCase() === "admin" && (
                      <Link to="/admin-panel" className="btn btn-danger ms-2">PANEL ADMIN</Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/InicioSesion" className="btn btn-secondary ms-2">LOGIN</Link>
                    <Link to="/Registro" className="btn btn-secondary ms-2">REGISTRO</Link>
                  </>
                )}
              </div>
              <div>
                {usuarioActual ? (
                  <>
                    <span>{usuarioActual.nombre}</span>
                    <button onClick={cerrarSesion} className="btn btn-secondary ms-2">Cerrar Sesión</button>
                  </>
                ) : (
                  <span>Incógnito</span>
                )}
              </div>
            </div>
          </nav>
        </header>
        <div className="container mt-4" style={{ padding: 0 }}>
          <Routes>
            <Route path="/Panel" element={usuarioActual ? <Panel /> : <InicioSesion setUsuarioActual={setUsuarioActual} />} />
            <Route path="/InicioSesion" element={!usuarioActual ? <InicioSesion setUsuarioActual={setUsuarioActual} /> : <Panel />} />
            <Route path="/Registro" element={!usuarioActual ? <Registro /> : <Panel />} />
            <Route path="/comentarios/:id" element={usuarioActual ? <Comentarios /> : <InicioSesion setUsuarioActual={setUsuarioActual} />} />
            <Route path="/crear-ticket" element={<CrearTicket />} />
            <Route path="/admin-panel" element={<PanelAdmin />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;