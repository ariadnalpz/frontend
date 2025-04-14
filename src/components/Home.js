import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ nodeVersion: '', student: { name: '', group: '' } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get('/getInfo');
        setInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la información');
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="home-container">
      <h2>Bienvenida al Home</h2>
      {loading ? (
        <p>Cargando información...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="info-card">
          <h3>Información del Estudiante</h3>
          <p>
            <strong>Nombre:</strong> {info.student.name}
          </p>
          <p>
            <strong>Grupo:</strong> {info.student.group}
          </p>
          <p>
            <strong>Versión de Node.js:</strong> {info.nodeVersion}
          </p>
        </div>
      )}
      <div className="button-group">
        <button onClick={() => navigate('/logs')}>Ver Logs</button>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Home;