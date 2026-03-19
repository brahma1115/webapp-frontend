import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Onboarding1 = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <div className="onboarding-card glass-card">
        <div className="skip-link" onClick={() => navigate('/login')}>Skip</div>
        
        <div className="content-section">
          <div className="illustration-placeholder">📈</div>
          <h2>Real-Time Monitoring</h2>
          <p className="description">
            Track patient vitals and ventilator parameters in real-time from anywhere in the hospital.
          </p>
        </div>

        <div className="footer-section">
          <div className="dots">
            <div className="dot active"></div>
            <div className="dot"></div>
          </div>
          <button className="btn btn-primary full-width" onClick={() => navigate('/onboarding2')}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding1;
