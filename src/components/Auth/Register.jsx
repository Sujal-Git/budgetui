import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const success = registerUser(email, password);
    if (success) {
      setError('');
      navigate('/login');
    } else {
      setError('Email already exists');
    }
  };

  return (
    // Register.jsx
<div className="register-container">
  <div className="register-form">
    <h1>Register</h1>
    <input
      type="email"
      className="register-input"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      className="register-input"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className="register-button" onClick={handleRegister}>Register</button>
    {error && <p className="error">{error}</p>}
  </div>
</div>

  );
};

export default Register;
