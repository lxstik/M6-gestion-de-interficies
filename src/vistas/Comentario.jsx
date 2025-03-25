import React, { useEffect, useState } from 'react';

//la funcionalidad de los comentarios
export const Comentario = ({ onSubmit }) => {

    //por defecto el estado del comentario está vacío
    const [coment, setComentario] = useState()

    //función para enviar el comentario
    const handleSubmit = (e) => {
        //evito que formulario me recargue la página
        e.preventDefault()
        //obtengo la fecha
        const fechaActual = new Date().toGMTString();
            //creo la constante que sirve para guardar el nuevo comentario
        const nuevoComentario = {
            coment,
            fechaActual
        }
        //se envia el comentario
        onSubmit(nuevoComentario);
        
    }

    return (
        <form onSubmit={handleSubmit} className="form card p-3 shadow">
            <label htmlFor="comentario" className="form-label">Comentario: </label>
            <textarea className="form-control" cols="3" value={coment} onChange={(e) => setComentario(e.target.value)}></textarea>
            <div className="d-flex align-items-center mt-3">
                <button className="btn btn-success ms-auto">Añadir comentario</button>
            </div>
        </form>
    )
}