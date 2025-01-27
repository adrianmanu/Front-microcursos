import React from 'react';
import { Table, Button } from 'react-bootstrap';

const UsuariosMatriculadosTable = ({ matriculados, onDesmatricular }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {matriculados.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.nombre}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => onDesmatricular(usuario.id)}>
                Desmatricular
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsuariosMatriculadosTable;
