import React from 'react';
import { Form } from 'react-bootstrap';

const SelectUsuario = ({ usuarios, selectedUsuario, onUsuarioChange }) => {
  return (
    <Form.Group controlId="usuario" className="mb-3">
      <Form.Label>Selecciona un usuario</Form.Label>
      <Form.Control as="select" value={selectedUsuario} onChange={onUsuarioChange}>
        <option value="">Seleccione un usuario</option>
        {usuarios.map((usuario) => (
          <option key={usuario.id} value={usuario.id}>
            {usuario.nombre}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectUsuario;
