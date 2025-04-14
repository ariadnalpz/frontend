import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import '../styles.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('/login', { email, password });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response.data.error || 'Error al iniciar sesión');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userEmail', email); // Guardamos el email del usuario
      setMessage('Inicio de sesión exitoso');
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      setError(err.response.data.error || 'Error al verificar OTP');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      {step === 1 ? (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <div className="button-group">
            <button type="submit">Iniciar Sesión</button>
          </div>
          <p>
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
          <p>
            ¿Olvidaste tu contraseña? <Link to="/recover-password">Recupérala aquí</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div className="form-group">
            <label htmlFor="otp">Código OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Ingresa el código OTP"
              required
            />
          </div>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <div className="button-group">
            <button type="submit">Verificar OTP</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;