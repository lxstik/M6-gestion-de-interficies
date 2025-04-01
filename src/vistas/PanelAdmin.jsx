import React, { useState, useEffect } from 'react';
import Panel from './Panel';

const PanelAdmin = () => {
    // obtengo el usuario actual desde localStorage
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || {};

    // verifico si el usuario no tiene rol de "admin"
    if (usuarioActual.rol !== "admin") {
        // renderizo el componente Panel si no es administrador
        return <Panel />;
    }

    // defino el estado para almacenar la lista de usuarios
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // cargo los usuarios desde localStorage al montar el componente
        const datosUsuarios = JSON.parse(localStorage.getItem("dades_usuaris")) || [];
        // actualizo el estado con los usuarios cargados
        setUsuarios(datosUsuarios);
    }, []);

    // función para manejar el cambio de rol de un usuario
    const cambiarRolUsuarios = (id, nuevoRol) => {
        // actualizo el rol del usuario con el id recibido
        const usuariosActualizados = usuarios.map(usuario => {
            if (usuario.id === id) {
                return { ...usuario, rol: nuevoRol };
            }
            return usuario;
        });

        // actualizo el estado con la lista de usuarios actualizada
        setUsuarios(usuariosActualizados);
        // guardo la lista actualizada en localStorage
        localStorage.setItem("dades_usuaris", JSON.stringify(usuariosActualizados));
    };

    // funcion para eliminar un usuario por su ID
    const eliminarUsuario = (id) => {
        // filtro los usuarios para excluir al usuario con el id recibido
        const usuariosActualizados = usuarios.filter(usuario => usuario.id !== id);
    
        // actualizo el estado con la lista de usuarios actualizada
        setUsuarios(usuariosActualizados);
    
        // guardo la lista actualizada en localStorage
        localStorage.setItem("dades_usuaris", JSON.stringify(usuariosActualizados));
    };

    return (
        <div className="container mt-5">
            <h1>Panel de Administración</h1>
            <p>Bienvenido al panel de administración. Aquí puedes gestionar los usuarios de la aplicación.</p>

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.correo}</td>
                            <td>
                                <select
                                    value={usuario.rol}
                                    onChange={(e) => cambiarRolUsuarios(usuario.id, e.target.value)}
                                    className="form-select"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="alumno">Alumno</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarUsuario(usuario.id)}
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

export default PanelAdmin;