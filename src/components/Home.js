import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles.css';

const Home = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get('/getInfo');
        setInfo(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error al obtener la información');
      }
    };

    fetchInfo();
  }, []);

  return (
    <div className="home-container">
      <h2>Bienvenido(a)</h2>
      {error && <p className="error-message">{error}</p>}
      {info ? (
        <>
          <div className="info-card">
            <h3>Información del Servidor</h3>
            <p><strong>Versión de Node.js:</strong> {info.nodeVersion}</p>
            <p><strong>Estudiante:</strong> {info.student.name}</p>
            <p><strong>Grupo:</strong> {info.student.group}</p>
          </div>
          <div className="button-group">
            <button onClick={() => window.location.href = '/logs'}>Ver Logs</button>
            <button onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}>
              Cerrar Sesión
            </button>
          </div>
        </>
      ) : (
        !error && <p>Cargando información...</p>
      )}
    </div>
  );
};

export default Home;