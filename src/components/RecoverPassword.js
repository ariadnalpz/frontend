import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../styles.css';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Ingresar correo, 2: Ingresar OTP y nueva contraseña
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('/recover-password', { email });
      setMessage(res.data.message);
      setStep(2); // Pasa al siguiente paso: ingresar OTP y nueva contraseña
    } catch (err) {
      setError(err.response?.data?.error || 'Error al procesar la solicitud');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('/reset-password', { email, otp, newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate('/'), 2000); // Redirige al login después de 2 segundos
    } catch (err) {
      setError(err.response?.data?.error || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div className="login-container">
      <h2>Recuperar Contraseña</h2>

      {step === 1 ? (
        <form onSubmit={handleRecoverPassword}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Solicitar Recuperación</button>
          <button type="button" onClick={() => navigate('/')}>
            Regresar al Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="otp">Código OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Restablecer Contraseña</button>
          <button type="button" onClick={() => navigate('/')}>
            Regresar al Login
          </button>
        </form>
      )}
    </div>
  );
};

export default RecoverPassword;