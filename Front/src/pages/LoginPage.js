import React from "react";
import LoginForm from "../components/login/LoginForm";

function LoginPage({ onLogin }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
