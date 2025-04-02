import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import QRCode from 'qrcode'; // Importa qrcode
import '../styles.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // Estado para la URL del QR

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', { email, username, password });
      if (res.data.message === 'Usuario registrado') {
        // Genera el código QR con la URL OTP
        const qrCode = await QRCode.toDataURL(res.data.otpauthUrl);
        setQrCodeUrl(qrCode);
        alert('Usuario registrado. Escanea el código QR con Google Authenticator.');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Error al registrar. Revisa la consola para más detalles.');
    }
  };

  return (
    <div className="container">
      <h2>Registrar</h2>
      {!qrCodeUrl ? (
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button type="submit">Registrar</button>
        </form>
      ) : (
        <div>
          <p>Escanea este código QR con Google Authenticator:</p>
          <img src={qrCodeUrl} alt="Código QR para Google Authenticator" />
          <p>Una vez escaneado, puedes iniciar sesión con tu código OTP.</p>
        </div>
      )}
    </div>
  );
};

export default Register;