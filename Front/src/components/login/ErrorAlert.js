import React from "react";

function ErrorAlert({ message }) {
  if (!message) return null; // Si no hay mensaje, no renderiza nada
  return <div className="alert alert-danger">{message}</div>;
}

export default ErrorAlert;
