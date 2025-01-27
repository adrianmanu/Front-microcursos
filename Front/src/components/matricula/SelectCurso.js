import React from 'react';
import { Form } from 'react-bootstrap';

const SelectCurso = ({ cursos, selectedCurso, onCursoChange }) => {
  return (
    <Form.Group controlId="curso" className="mb-3">
      <Form.Label>Selecciona un curso</Form.Label>
      <Form.Control as="select" value={selectedCurso} onChange={onCursoChange}>
        <option value="">Seleccione un curso</option>
        {cursos.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.nombre}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectCurso;
