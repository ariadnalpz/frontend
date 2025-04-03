import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://servidor1-r4cq.onrender.com/api', // Cambia a 3002 si pruebas Servidor 2
});

// Interceptor para agregar el token a las solicitudes
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;