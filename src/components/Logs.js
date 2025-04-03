import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../styles.css';

const Logs = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState({ server1: { info: 0, error: 0 }, server2: { info: 0, error: 0 } });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('/logs');
        setLogs(res.data);
      } catch (error) {
        console.error('Error al obtener logs:', error);
      }
    };
    fetchLogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="logs-container">
      <h2>Logs</h2>
      <div className="info-card">
        <h3>Servidor 1</h3>
        <p><strong>Info:</strong> {logs.server1.info}</p>
        <p><strong>Error:</strong> {logs.server1.error}</p>
      </div>
      <div className="info-card">
        <h3>Servidor 2</h3>
        <p><strong>Info:</strong> {logs.server2.info}</p>
        <p><strong>Error:</strong> {logs.server2.error}</p>
      </div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Logs;