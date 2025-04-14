import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('userEmail'); // Obtener el email del usuario
        const response = await axios.get(`/getInfo${email ? `?email=${email}` : ''}`);
        setData(response.data);
      } catch (err) {
        setError('Error al obtener los datos');
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail'); // Limpiar el email al cerrar sesión
    navigate('/');
  };

  return (
    <div className="home-container">
      <h2>Bienvenido/a</h2>

      {error && <p className="error-message">{error}</p>}

      {data ? (
        <>
          {/* Información del Estudiante */}
          <div className="info-card">
            <h3>Información del Estudiante</h3>
            <p>
              <strong>Nombre:</strong> {data.student.name}
            </p>
            <p>
              <strong>Grupo:</strong> {data.student.group}
            </p>
            <p>
              <strong>Versión de Node:</strong> {data.nodeVersion}
            </p>
          </div>

          {/* Información del Profesor */}
          <div className="info-card">
            <h3>Información del Profesor</h3>
            <p>
              <strong>Nombre:</strong> M.C.C Emmanuel Martínez Hernández
            </p>
          </div>

          {/* Información del Usuario Logueado */}
          {data.user ? (
            <div className="info-card">
              <h3>Información del Usuario</h3>
              <p>
                <strong>Nombre:</strong> {data.user.username}
              </p>
              <p>
                <strong>Grado:</strong> {data.user.grado}
              </p>
              <p>
                <strong>Grupo:</strong> {data.user.grupo}
              </p>
            </div>
          ) : (
            <p className="error-message">No se encontraron datos del usuario.</p>
          )}

          <div className="button-group">
            <button onClick={() => navigate('/logs')}>Ver Logs</button>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Home;