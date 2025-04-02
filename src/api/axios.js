import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api', // Cambia a 3002 si pruebas Servidor 2
});

export default instance;