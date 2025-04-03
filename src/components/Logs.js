import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  // Datos para el gráfico
  const data = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Servidor 1',
        data: [logs.server1.info || 0, logs.server1.error || 0],
        backgroundColor: '#b66dc6',
        borderColor: '#8e44ad',
        borderWidth: 2,
      },
      {
        label: 'Servidor 2',
        data: [logs.server2.info || 0, logs.server2.error || 0],
        backgroundColor: '#ff7eb9',
        borderColor: '#ff5d9e',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
          color: '#ffffff',
        },
      },
      title: {
        display: true,
        text: 'Logs de Actividad por Servidor',
        color: '#ea8bff',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 12,
          },
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const handleReturn = () => {
    navigate('/home');
  };

  return (
    <div className="logs-container">
      <h2>Logs</h2>
      
      {/* Gráfico de barras */}
      <div className="chart">
        <Bar data={data} options={options} />
      </div>

      {/* Tarjetas */}
      <div className="compact-cards-container">
        <div className="compact-card">
          <h3>Servidor 1</h3>
          <p><strong>Info:</strong> {logs.server1.info}</p>
          <p><strong>Error:</strong> {logs.server1.error}</p>
        </div>
        <div className="compact-card">
          <h3>Servidor 2</h3>
          <p><strong>Info:</strong> {logs.server2.info}</p>
          <p><strong>Error:</strong> {logs.server2.error}</p>
        </div>
      </div>

      <button onClick={handleReturn}>Regresar</button>
    </div>
  );
};

export default Logs;