import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Bar } from 'react-chartjs-2';
import { db, collection, getDocs } from '../config/firebase';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Logs = () => {
  const navigate = useNavigate(); // Hook para navegar
  const [logs, setLogs] = useState({ server1: {}, server2: {} });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsRef = collection(db, 'logs');
        const snapshot = await getDocs(logsRef);

        const server1Logs = { info: 0, error: 0 };
        const server2Logs = { info: 0, error: 0 };

        snapshot.forEach(doc => {
          const { server, level } = doc.data();
          if (server === 'Servidor 1') server1Logs[level]++;
          else if (server === 'Servidor 2') server2Logs[level]++;
        });

        setLogs({ server1: server1Logs, server2: server2Logs });
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

  return (
    <div className="logs-container">
      <h2>Logs de Servidores</h2>
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
      <button onClick={() => navigate('/home')}>Regresar a Home</button>
    </div>
  );
};

export default Logs;