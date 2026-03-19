import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <div className="onboarding-card glass-card">
        <div className="logo-section">
          <div className="logo-placeholder">🛡️</div>
          <h1>Welcome to VentGuard</h1>
          <p className="description">
            Advanced ventilator monitoring and intelligent alarm management for modern ICUs.
          </p>
        </div>

        <div className="action-section">
          <button className="btn btn-primary full-width" onClick={() => navigate('/onboarding1')}>
            Get Started
          </button>
          
          <div className="login-prompt">
            Already have an account? <span className="link" onClick={() => navigate('/login')}>Log in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
