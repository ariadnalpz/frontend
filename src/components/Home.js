import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [server1Count, setServer1Count] = useState(0); // Contador para servidor-1
  const [server2Count, setServer2Count] = useState(0); // Contador para servidor-2

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getInfo');
        setData(response.data);
      } catch (err) {
        setError('Error al obtener los datos');
      }
    };

    const sendRequests = async () => {
      for (let i = 1; i <= 150; i++) {
        try {
          const response = await axios.get('/getInfo');
          // Revisamos la URL de la respuesta para contar en qué servidor se procesó
          if (response.config.baseURL.includes('servidor1')) {
            setServer1Count(prev => prev + 1);
          } else if (response.config.baseURL.includes('servidor2')) {
            setServer2Count(prev => prev + 1);
          }
          console.log(`Solicitud ${i} procesada en: ${response.config.baseURL}`);
        } catch (err) {
          console.error(`Error en solicitud ${i}:`, err.message);
        }
      }
    };

    fetchData(); // Carga inicial de datos
    sendRequests(); // Envía las 150 solicitudes
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
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

          {/* Mostrar conteo de solicitudes */}
          <div className="info-card">
            <h3>Conteo de Solicitudes</h3>
            <p>
              <strong>Solicitudes procesadas en Servidor 1:</strong> {server1Count}
            </p>
            <p>
              <strong>Solicitudes procesadas en Servidor 2:</strong> {server2Count}
            </p>
          </div>

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