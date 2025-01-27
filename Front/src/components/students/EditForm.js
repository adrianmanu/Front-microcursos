import React, { useState, useEffect } from "react";

const EditForm = ({ student, onSubmit, onClose }) => {
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

    // Validation checks
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
      if (error.response && error.response.data) {
        // Si el error es del backend (por correo duplicado)
        if (error.response.data === "El correo electrónico ya está en uso") {
          setErrors({ ...newErrors, email: "Este correo ya está registrado" });
        } else {
          alert("Hubo un error al actualizar el estudiante");
        }
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2>Editar Estudiante</h2>
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
            Actualizar Estudiante
          </button>
        </form>

        {/* Botón para cerrar el formulario de edición */}
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default EditForm;
