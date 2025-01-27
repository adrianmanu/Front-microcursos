import React, { useState, useEffect } from "react";

const CreateForm = ({ student, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    telefono: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    telefono: "",
    fechaNacimiento: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        nombre: student.nombre,
        apellido: student.apellido,
        email: student.email,
        fechaNacimiento: student.fechaNacimiento,
        telefono: student.telefono,
      });
    }
  }, [student]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateTelefono = (telefono) => {
    const telefonoRegex = /^09\d{8}$/;
    return telefonoRegex.test(telefono);
  };

  const validateFechaNacimiento = (fechaNacimiento) => {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    return birthDate <= today;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset errors when the user modifies the fields
    setErrors({
      email: "",
      telefono: "",
      fechaNacimiento: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de campos
    let valid = true;
    let newErrors = {
      email: "",
      telefono: "",
      fechaNacimiento: "",
    };
  
    if (!validateEmail(formData.email)) {
      newErrors.email = "Correo en uso o inválido";
      valid = false;
    }
  
    if (!validateTelefono(formData.telefono)) {
      newErrors.telefono = "El teléfono debe empezar con 09 y ser de 10 dígitos";
      valid = false;
    }
  
    if (!validateFechaNacimiento(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = "La fecha de nacimiento no puede ser futura";
      valid = false;
    }
  
    if (!valid) {
      setErrors(newErrors);
      return;
    }
  
    try {
      // Intentar enviar los datos al backend
      await onSubmit(formData);
      onClose();
    } catch (error) {
      // Manejo de errores específicos
      if (error.response && error.response.data) {
        // Si el error es debido a correo duplicado
        if (error.response.data.includes("violación de restricción de unicidad")) {
          setErrors({ ...newErrors, email: "Este correo ya está registrado" });
        } else {
          alert("Hubo un error al crear el estudiante: " + error.message);
        }
      } else {
        alert("Hubo un error al conectar con el servidor.");
      }
    }
  };
  

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2>Crear Estudiante</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
            />
            {errors.fechaNacimiento && (
              <div className="text-danger">{errors.fechaNacimiento}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
            {errors.telefono && (
              <div className="text-danger">{errors.telefono}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Crear Estudiante
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
