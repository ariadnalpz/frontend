import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Logs from './components/Logs';
import RecoverPassword from './components/RecoverPassword';
import ProtectedRoute from './components/ProtectedRoute'; // Importamos ProtectedRoute
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;