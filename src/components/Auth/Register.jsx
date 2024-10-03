import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css'; // Your CSS styling

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const success = registerUser(username, password);
    if (success) {
      setError('');
      navigate('/login');
    } else {
      setError('Username already exists');
    }
  };

  return (
    <div className="login-register-container">
      <div className="form-container">
        <h1>Register</h1>
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={handleRegister}>Register</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
