import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from '../api/axios';
import '../styles.css';

// Registra componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Logs = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState({ 
    server1: { info: 0, error: 0 }, 
    server2: { info: 0, error: 0 } 
  });

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

  // Datos para la gráfica (estilo minimalista)
  const chartData = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Servidor 1',
        data: [logs.server1.info, logs.server1.error],
        backgroundColor: '#4e73df',  // Azul similar al estilo antiguo
        borderColor: '#2e59d9',
        borderWidth: 1,
      },
      {
        label: 'Servidor 2',
        data: [logs.server2.info, logs.server2.error],
        backgroundColor: '#1cc88a',  // Verde similar al estilo antiguo
        borderColor: '#17a673',
        borderWidth: 1,
      },
    ],
  };

  // Opciones de la gráfica (simple, como el estilo antiguo)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',  // Texto oscuro como en la versión antigua
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#555',
        },
      },
      x: {
        ticks: {
          color: '#555',
        },
      },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="logs-container">
      <h2>Logs de Servidores</h2>

      {/* Gráfica (manteniendo funcionalidad nueva) */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Tarjetas de información (estilo antiguo) */}
      <div className="info-cards">
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
      </div>

      {/* Botón de cerrar sesión (estilo antiguo) */}
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Logs;