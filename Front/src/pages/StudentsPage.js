import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentList from "../components/students/StudentList";  // Corregir la ruta
import CreateForm from "../components/students/CreateForm";  // Corregir la ruta
import EditForm from "../components/students/EditForm";  // Corregir la ruta
import ErrorAlert from "../components/students/ErrorAlert";    // Corregir la ruta

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/estudiantes")
      .then((response) => setStudents(response.data))
      .catch((error) => {
        console.error("Error fetching students:", error);
        setError("Hubo un error al obtener los estudiantes.");
      });
  }, []);

  const handleCreate = (studentData) => {
    axios
      .post("http://localhost:8082/api/estudiantes", studentData)
      .then((response) => {
        setStudents([...students, response.data]);
        setShowCreateForm(false);
      })
      .catch((error) => {
        console.error("Error creating student:", error);
        setError("Hubo un error al crear el estudiante.");
      });
  };

  const handleUpdate = (studentData) => {
    axios
      .put(`http://localhost:8082/api/estudiantes/${editStudent.id}`, studentData)
      .then((response) => {
        setStudents(
          students.map((student) =>
            student.id === editStudent.id ? response.data : student
          )
        );
        setShowEditForm(false);
        setEditStudent(null);
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        setError("Hubo un error al actualizar el estudiante.");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8082/api/estudiantes/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        setError("Hubo un error al eliminar el estudiante.");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestión de Estudiantes</h1>
      <ErrorAlert message={error} />
      <StudentList students={students} onDelete={handleDelete} onEdit={setEditStudent} />
      
      {/* Botón para mostrar/ocultar formulario de creación */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => {
          setShowCreateForm(!showCreateForm);
          setShowEditForm(false); // Aseguramos que el formulario de edición se cierre al abrir el de creación
        }}
      >
        {showCreateForm ? "Cerrar Formulario Crear Estudiante" : "Crear Estudiante"}
      </button>
      
      {/* Mostrar formulario de creación */}
      {showCreateForm && (
        <CreateForm onSubmit={handleCreate} onClose={() => setShowCreateForm(false)} />
      )}
      
      {/* Mostrar formulario de edición si existe un estudiante a editar */}
      {editStudent && (
        <EditForm
          student={editStudent}
          onSubmit={handleUpdate}
          onClose={() => setEditStudent(null)}  // Cerrar el formulario de edición
        />
      )}
    </div>
  );
};

export default StudentsPage;
