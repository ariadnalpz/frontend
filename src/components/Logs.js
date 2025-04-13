import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from '../api/axios';
import '../styles.css';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Logs = () => {
  const [logs, setLogs] = useState({ server1: { info: 0, error: 0 }, server2: { info: 0, error: 0 } });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('/logs');
        setLogs(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error al obtener los logs');
      }
    };

    fetchLogs();
  }, []);

  // Datos para la gráfica de Servidor 1
  const server1Data = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Servidor 1',
        data: [logs.server1.info, logs.server1.error],
        backgroundColor: ['#00ff00', '#ff3333'],
        borderColor: ['#00cc00', '#cc0000'],
        borderWidth: 1,
      },
    ],
  };

  // Datos para la gráfica de Servidor 2
  const server2Data = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Servidor 2',
        data: [logs.server2.info, logs.server2.error],
        backgroundColor: ['#00ff00', '#ff3333'],
        borderColor: ['#00cc00', '#cc0000'],
        borderWidth: 1,
      },
    ],
  };

  // Datos para la gráfica combinada
  const combinedData = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Servidor 1',
        data: [logs.server1.info, logs.server1.error],
        backgroundColor: '#ea8bff', // Usamos tu color --primary
        borderColor: '#b66dc6', // Usamos tu color --primary-hover
        borderWidth: 1,
      },
      {
        label: 'Servidor 2',
        data: [logs.server2.info, logs.server2.error],
        backgroundColor: '#aaaaaa', // Usamos tu color --text-muted
        borderColor: '#888888',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff', // Color del texto de la leyenda
        },
      },
      title: {
        display: true,
        color: '#ffffff', // Color del título
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // Color de las etiquetas del eje X
        },
        grid: {
          color: '#3a3a3a', // Color de las líneas de la cuadrícula
        },
      },
      y: {
        ticks: {
          color: '#ffffff', // Color de las etiquetas del eje Y
          beginAtZero: true,
        },
        grid: {
          color: '#3a3a3a', // Color de las líneas de la cuadrícula
        },
      },
    },
  };

  return (
    <div className="logs-container">
      <h2>Logs de los Servidores</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="chart">
        <h3>Logs del Servidor 1</h3>
        <Bar
          data={server1Data}
          options={{
            ...options,
            plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Logs del Servidor 1' } },
          }}
        />
      </div>

      <div className="chart">
        <h3>Logs del Servidor 2</h3>
        <Bar
          data={server2Data}
          options={{
            ...options,
            plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Logs del Servidor 2' } },
          }}
        />
      </div>

      <div className="chart">
        <h3>Logs Combinados</h3>
        <Bar
          data={combinedData}
          options={{
            ...options,
            plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Logs Combinados' } },
          }}
        />
      </div>

      <div className="button-group">
        <button onClick={() => window.location.href = '/home'}>Regresar al Inicio</button>
      </div>
    </div>
  );
};

export default Logs;