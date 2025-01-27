// CursoPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CursoList from "../components/curso/CursoList";
import CreateForm from "../components/curso/CreateForm";
import EditForm from "../components/curso/EditForm";

const CursoPage = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoForm, setCursoForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    creditos: "",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Obtener lista de cursos
  useEffect(() => {
    axios
      .get("http://localhost:8083/api/cursos")
      .then((response) => {
        setCursos(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los cursos:", error);
      });
  }, []);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCursoForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Crear o actualizar curso
  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, nombre, descripcion, creditos } = cursoForm;

    if (!nombre || !descripcion || !creditos) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const url = id
      ? `http://localhost:8083/api/cursos/${id}`
      : "http://localhost:8083/api/cursos";

    const method = id ? "put" : "post";

    axios[method](url, cursoForm)
      .then((response) => {
        if (id) {
          setCursos(
            cursos.map((curso) =>
              curso.id === id ? response.data : curso
            )
          );
        } else {
          setCursos([...cursos, response.data]);
        }
        setCursoForm({ id: null, nombre: "", descripcion: "", creditos: "" });
        setShowCreateForm(false);
        setShowEditForm(false);
      })
      .catch((error) => {
        console.error(`Hubo un error al ${id ? "actualizar" : "crear"} el curso:`, error);
      });
  };

  // Eliminar curso
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8083/api/cursos/${id}`)
      .then(() => {
        setCursos(cursos.filter((curso) => curso.id !== id));
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el curso:", error);
      });
  };

  const handleEdit = (curso) => {
    setCursoForm(curso);
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestión de Cursos</h1>

      {/* Lista de cursos */}
      <h2>Lista de Cursos</h2>
      <CursoList cursos={cursos} handleDelete={handleDelete} handleEdit={handleEdit} />

      {/* Botón para mostrar el formulario de creación */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => {
          setShowCreateForm(!showCreateForm);
          setShowEditForm(false); // Ocultar el formulario de edición si está abierto
        }}
      >
        {showCreateForm ? "Cerrar Formulario Crear Curso" : "Crear Curso"}
      </button>

      {/* Formulario de creación y edición (común para ambos) */}
      {showCreateForm && <CreateForm cursoForm={cursoForm} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />}
      {showEditForm && <EditForm cursoForm={cursoForm} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default CursoPage;
