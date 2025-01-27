import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentsPage from "./pages/StudentsPage";
import CursoPage from "./pages/CursoPage";
import MatriculaPage from "./pages/MatriculaPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  // Lógica para manejar el login (puedes conectarlo con la API)
  const handleLogin = () => {
    setIsAuthenticated(true); // Después de que el usuario inicie sesión
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Cuando el usuario cierre sesión
  };

  return (
    <Router>
      <div className="d-flex">
        {/* Solo muestra el Sidebar si está autenticado */}
        {isAuthenticated && (
          <div
            className="sidebar bg-dark text-white p-3"
            style={{ width: "250px", height: "100vh" }}
          >
            <h2>Dashboard</h2>
            <ul className="list-unstyled">
              <li>
                <Link to="/students" className="text-white">Gestión de Estudiantes</Link>
              </li>
              <li>
                <Link to="/cursos" className="text-white">Gestión de Cursos</Link>
              </li>
              <li>
                <Link to="/matricula" className="text-white">Matriculación</Link>
              </li>
            </ul>
            <button onClick={handleLogout} className="btn btn-danger w-100">
              Logout
            </button>
          </div>
        )}

        {/* Contenido principal */}
        <div className="content p-4" style={{ width: "100%" }}>
          <Routes>
            {/* Si no está autenticado, renderiza LoginPage */}
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/students" /> : <LoginPage onLogin={handleLogin} />}
            />

            {/* Rutas solo accesibles cuando el usuario está autenticado */}
            {isAuthenticated && (
              <>
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/cursos" element={<CursoPage />} />
                <Route path="/matricula" element={<MatriculaPage />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
