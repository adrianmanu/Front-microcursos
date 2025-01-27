import React from "react";

const ErrorAlert = ({ message }) => {
  if (!message) return null;
  return <div className="alert alert-danger">{message}</div>;
};

export default ErrorAlert;
