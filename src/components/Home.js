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
        console.log('Respuesta de /getInfo:', res.data); // Para depurar
        setInfo(res.data);
      } catch (err) {
        console.error('Error al obtener /getInfo:', err);
        setError(err.response?.data?.error || 'Error al obtener la información');
      }
    };

    fetchInfo();
  }, []);

  // Log para depurar el renderizado
  console.log('Renderizando Home - Estado:', { info, error });

  return (
    <div className="home-container">
      <h2>Bienvenido(a)</h2>
      <p className="info-message">Este texto debería ser visible siempre</p> {/* Prueba estática */}
      {error && <p className="error-message">{error}</p>}
      {info && info.student ? (
        <div className="info-card">
          <h3>Información del Servidor</h3>
          <p><strong>Versión de Node.js:</strong> {info.nodeVersion || 'No disponible'}</p>
          <p><strong>Usuario:</strong> {info.student.name || 'No disponible'}</p>
          <p><strong>Grupo:</strong> {info.student.group || 'No disponible'}</p>
          <div className="button-group">
            <button onClick={() => window.location.href = '/logs'}>Ver Logs</button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      ) : (
        <p className="info-message">{error ? 'Error al cargar los datos' : 'Cargando información...'}</p>
      )}
    </div>
  );
};

export default Home;