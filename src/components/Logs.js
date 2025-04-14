import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import axios from '../api/axios';
import '../styles.css';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Logs = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState({
    server1: { info: 0, error: 0 },
    server2: { info: 0, error: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/logs');
        setLogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los logs');
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Datos para la gráfica de barras
  const barData = {
    labels: ['Servidor 1', 'Servidor 2'],
    datasets: [
      {
        label: 'Logs de Info',
        data: [logs.server1.info, logs.server2.info],
        backgroundColor: '#ea8bff',
      },
      {
        label: 'Logs de Error',
        data: [logs.server1.error, logs.server2.error],
        backgroundColor: '#ff3333',
      },
    ],
  };

  // Datos para la gráfica de dona (Servidor 1)
  const doughnutData = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Servidor 1',
        data: [logs.server1.info, logs.server1.error],
        backgroundColor: ['#ea8bff', '#ff3333'],
        hoverOffset: 4,
      },
    ],
  };

  // Datos para la gráfica de pastel (Servidor 2)
  const pieData = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Servidor 2',
        data: [logs.server2.info, logs.server2.error],
        backgroundColor: ['#ea8bff', '#ff3333'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="logs-container">
      <h2>Consulta de Logs</h2>
      {loading ? (
        <p>Cargando logs...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="logs-content">
          <h3>Gráfica de Barras: Comparación de Logs</h3>
          <div className="chart">
            <Bar data={barData} options={chartOptions} />
          </div>

          <h3>Gráfica de Dona: Servidor 1</h3>
          <div className="chart">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>

          <h3>Gráfica de Pastel: Servidor 2</h3>
          <div className="chart">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      )}
      <div className="button-group">
        <button onClick={() => navigate('/home')}>Regresar al Home</button>
      </div>
    </div>
  );
};

export default Logs;