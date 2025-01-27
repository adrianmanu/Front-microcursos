import React from "react";

const StudentItem = ({ student, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{student.nombre}</td>
      <td>{student.apellido}</td>
      <td>{student.email}</td>
      <td>{student.fechaNacimiento}</td>
      <td>{student.telefono}</td>
      <td>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => onEdit(student)}
        >
          Editar
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(student.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;
