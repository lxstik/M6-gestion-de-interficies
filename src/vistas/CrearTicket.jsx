import React, { useState } from 'react';

const CrearTicket = () => {
    //defino los estados para los campos del formulario, por defecto están vacíos
    const [codigo, setCodigo] = useState('');
    const [aula, setAula] = useState('');
    const [grupo, setGrupo] = useState('');
    const [ordenador, setOrdenador] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [alumno, setAlumno] = useState('');

    const handleSubmit = (e) => {
        //evita que formulario me recargue la página
        e.preventDefault();

        //creo el nuevo ticket con los datos introducidos
        const nuevoTicket = {
            //parseo el código a numero entero
            codigo: parseInt(codigo),
            //obtengo la fecha
            fecha: new Date().toLocaleDateString(), 
            aula,
            grupo,
            ordenador,
            descripcion,
            alumno,
            //por defecto el estado es no resuelto
            estado: "no resuelto",
            //preparo el lugar para almacenar los comentarios
            comentarios: []
        };

        //creo la constante para guardar los tickets en localStorage
        const ticketsGuardados = JSON.parse(localStorage.getItem('dades_tiquets')) || [];

        //creo una constante mas para guardar los tickets actualizados
        const ticketsActualizados = [...ticketsGuardados, nuevoTicket];

        //ahora guardo los tickets actualizados en localStorage
        localStorage.setItem('dades_tiquets', JSON.stringify(ticketsActualizados));

        //al crear el ticket vacio los campos del formulario
        setCodigo('');
        setAula('');
        setGrupo('');
        setOrdenador('');
        setDescripcion('');
        setAlumno('');

        //aviso sobre la creación del ticket
        alert('Se ha creado el ticket!!!');
    };

    return (
        <div className="container mt-5">
            <h1>Crear Nuevo Ticket</h1>
            <form onSubmit={handleSubmit} className="form card p-3 shadow">
                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">Código:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="aula" className="form-label">Aula:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="aula"
                        value={aula}
                        onChange={(e) => setAula(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="grupo" className="form-label">Grupo:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="grupo"
                        value={grupo}
                        onChange={(e) => setGrupo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ordenador" className="form-label">Ordenador:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ordenador"
                        value={ordenador}
                        onChange={(e) => setOrdenador(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        rows="3"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="alumno" className="form-label">Alumno:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="alumno"
                        value={alumno}
                        onChange={(e) => setAlumno(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Ticket</button>
            </form>
        </div>
    );
};

export default CrearTicket;