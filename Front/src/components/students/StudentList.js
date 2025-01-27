import React from "react";
import StudentItem from "./StudentItem";

const StudentList = ({ students, onDelete, onEdit }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Fecha de Nacimiento</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentItem
                key={student.id}
                student={student}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
