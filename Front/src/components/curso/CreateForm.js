// components/curso/CreateForm.js
import React from 'react';

const CreateForm = ({ cursoForm, handleInputChange, handleSubmit }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2>Crear Curso</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={cursoForm.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="descripcion"
              value={cursoForm.descripcion}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Créditos</label>
            <input
              type="number"
              className="form-control"
              name="creditos"
              value={cursoForm.creditos}
              onChange={handleInputChange}
              required
              min="0"
              max="24"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
