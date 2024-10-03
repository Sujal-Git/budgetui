import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="logo">
        BudgetUI
      </div>
      <div className="quote-container">
        <p className="quote">"Budget ui Money anytime Anywhere"</p> {/* Money-related quote */}
      </div>
      <div className="button-container">
        <button className="home-button" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="home-button" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>

      {/* Background decorative balls */}
      <div className="ball1"></div>
      <div className="ball2"></div>
      <div className="ball3"></div>

    </div>
  );
};

export default LandingPage;
