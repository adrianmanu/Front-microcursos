import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import SelectCurso from '../components/matricula/SelectCurso';
import SelectUsuario from '../components/matricula/SelectUsuario';
import MatricularButton from '../components/matricula/MatricularButton';
import UsuariosMatriculadosTable from '../components/matricula/UsuariosMatriculadosTable';
import MessageAlert from '../components/matricula/MessageAlert';

const MatriculaPage = () => {
  const [cursos, setCursos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [matriculados, setMatriculados] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    // Obtener cursos y usuarios desde sus respectivos endpoints
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/cursos');
        setCursos(response.data);
      } catch (error) {
        console.error('Error al obtener los cursos', error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/estudiantes');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios', error);
      }
    };

    fetchCursos();
    fetchUsuarios();
  }, []);

  useEffect(() => {
    // Cargar usuarios matriculados cuando se selecciona un curso
    if (selectedCurso) {
      fetchMatriculados();
    }
  }, [selectedCurso]); // Este useEffect se ejecuta cada vez que cambia selectedCurso

  const handleMatricular = async () => {
    if (!selectedCurso || !selectedUsuario) {
      setMessageType('danger');
      setMessage('Por favor, selecciona un curso y un usuario.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8083/api/cursos/${selectedCurso}/matricular/${selectedUsuario}`);
      setMessageType('success');
      setMessage(response.data); // Mostrar mensaje del servidor
      fetchMatriculados(); // Actualizar lista de matriculados
    } catch (error) {
      setMessageType('danger');
      setMessage('Error al matricular al usuario.');
      console.error(error);
    }
  };

  const fetchMatriculados = async () => {
    if (selectedCurso) {
      try {
        const response = await axios.get(`http://localhost:8083/api/cursos/${selectedCurso}/usuarios`);
        setMatriculados(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios matriculados', error);
      }
    }
  };

  const handleDesmatricular = async (usuarioId) => {
    if (!selectedCurso) {
      setMessageType('danger');
      setMessage('Por favor, selecciona un curso.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8083/api/cursos/${selectedCurso}/desmatricular/${usuarioId}`);
      setMessageType('success');
      setMessage(response.data);
      fetchMatriculados(); // Actualizar lista de matriculados
    } catch (error) {
      setMessageType('danger');
      setMessage('Error al desmatricular al usuario.');
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Gestión de Matriculas</h2>

          {/* Mensajes de respuesta */}
          <MessageAlert message={message} messageType={messageType} onClose={() => setMessage('')} />

          {/* Formulario de matriculación */}
          <Form>
            <SelectCurso cursos={cursos} selectedCurso={selectedCurso} onCursoChange={(e) => setSelectedCurso(e.target.value)} />
            <SelectUsuario usuarios={usuarios} selectedUsuario={selectedUsuario} onUsuarioChange={(e) => setSelectedUsuario(e.target.value)} />
            <MatricularButton onClick={handleMatricular} />
          </Form>

          {/* Tabla de usuarios matriculados */}
          {selectedCurso && matriculados.length > 0 && (
            <UsuariosMatriculadosTable matriculados={matriculados} onDesmatricular={handleDesmatricular} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MatriculaPage;
