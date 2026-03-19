import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Onboarding2 = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <div className="onboarding-card glass-card">
        <div className="skip-link" onClick={() => navigate('/login')}>Skip</div>
        
        <div className="content-section">
          <div className="illustration-placeholder">🔔</div>
          <h2>Smart Alarm Management</h2>
          <p className="description">
            Intelligent filtering reduces alarm fatigue by prioritizing critical alerts that need attention.
          </p>
        </div>

        <div className="footer-section">
          <div className="dots">
            <div className="dot"></div>
            <div className="dot active"></div>
          </div>
          <button className="btn btn-primary full-width" onClick={() => navigate('/login')}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding2;
