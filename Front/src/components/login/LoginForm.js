import React, { useState } from "react";
import InputField from "./InputField";
import ErrorAlert from "./ErrorAlert";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8082/api/administradores/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        onLogin();
      } else {
        setError("Login failed! Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login! Please try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="card p-4 shadow" style={{ width: "24rem" }}>
      <h2 className="text-center mb-4">Admin Login</h2>
      <ErrorAlert message={error} />
      <InputField
        id="username"
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
