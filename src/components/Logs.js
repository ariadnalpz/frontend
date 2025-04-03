import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from '../api/axios'; // Importa axios para hacer solicitudes al backend
import '../styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Logs = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState({ server1: { info: 0, error: 0 }, server2: { info: 0, error: 0 } });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('/logs'); // Consulta los logs desde el backend
        setLogs(res.data);
      } catch (error) {
        console.error('Error al obtener logs:', error);
      }
    };
    fetchLogs();
  }, []);

  const data = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Servidor 1 (Rate Limit)',
        data: [logs.server1.info || 0, logs.server1.error || 0],
        backgroundColor: '#00d4ff',
        borderColor: '#00b0cc',
        borderWidth: 2,
      },
      {
        label: 'Servidor 2 (Sin Rate Limit)',
        data: [logs.server2.info || 0, logs.server2.error || 0],
        backgroundColor: '#ff4081',
        borderColor: '#d81b60',
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
            size: 16,
          },
          color: '#ffffff',
        },
      },
      title: {
        display: true,
        text: 'Logs de Actividad por Servidor',
        color: '#00d4ff',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 14,
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
            size: 14,
          },
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
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
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
      <div className="button-group">
        <button onClick={() => navigate('/home')}>Regresar a Home</button>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Logs;