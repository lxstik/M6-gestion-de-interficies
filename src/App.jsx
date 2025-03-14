import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Panel from './vistas/Panel';
import InicioSesion from './vistas/InicioSesion';
import Registro from './vistas/Registro';
import './styles/bootstrap.scss';
import { RecuperarUsuario } from './vistas/localStorage/functions';

function App() {
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    RecuperarUsuario(setUsuarioActual);
  }, []);

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
                <Link to="/Panel" className="btn btn-secondary ms-2">PANEL</Link>
                <Link to="/InicioSesion" className="btn btn-secondary ms-2">LOGIN</Link>
                <Link to="/Registro" className="btn btn-secondary ms-2">REGISTRO</Link>
              </div>
              <div>
                {(() => {
                  if (usuarioActual) {
                    return (
                      <div>
                        <span>{usuarioActual}</span>
                        <button onClick={cerrarSesion} className="btn btn-secondary ms-2">Cerrar Sesión</button>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <span>Incógnito</span>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </nav>
        </header>
        <div className="container mt-4" style={{ padding: 0 }}>
          <Routes>
            <Route path="/Panel" element={<Panel />} />
            <Route path="/InicioSesion" element={<InicioSesion setUsuarioActual={setUsuarioActual} />} />
            <Route path="/Registro" element={<Registro />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;