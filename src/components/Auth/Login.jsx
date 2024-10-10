import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const success = loginUser(email, password);
    if (success) {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    // Login.jsx
<div className="login-container">
  <div className="login-form">
    <h1>Login</h1>
    <input
      type="email"
      className="login-input"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      className="login-input"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className="login-button" onClick={handleLogin}>Login</button>
    {error && <p className="error">{error}</p>}
  </div>
</div>

  );
};

export default Login;
