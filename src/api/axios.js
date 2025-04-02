import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://servidor1-r4cq.onrender.com/api', // Cambia a 3002 si pruebas Servidor 2
});

export default instance;