import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CriticalAlert.css';

const CriticalAlert = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { alert } = location.state || { 
    alert: { 
      alert_type: 'HIGH PRESSURE', 
      description: 'Airway obstruction or kinked tube suspected.', 
      current_value: '48', 
      limit_value: 'cmH2O', 
      label: 'PEAK PRESSURE' 
    }
  };

  return (
    <div className="fullscreen-critical-container">
      <header className="critical-page-header">
        <h1>CRITICAL ALERT</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <main className="critical-main-banner">
        <div className="back-nav-red" onClick={() => navigate(-1)}>
          <span>‹</span> CRITICAL ALERT
        </div>

        <div className="alert-hero-section">
          <div className="octagon-icon">
            <div className="inner-octagon">!</div>
          </div>
          <h2 className="hero-title">{alert.alert_type}</h2>
          <p className="hero-subtitle">{alert.description}</p>
          <p className="hero-patient">{alert.patient_name} • {alert.bed_number}</p>
        </div>

        <div className="critical-data-card">
          <span className="data-label">PEAK PRESSURE</span>
          <div className="data-value-group">
            <span className="data-number">{alert.current_value}</span>
            <span className="data-unit">cmH2O</span>
          </div>
        </div>

        <div className="critical-actions-footer">
          <button className="critical-action-btn silence">
            <span className="btn-icon">🔇</span> Silence Alarm (2 min)
          </button>
          <button className="critical-action-btn escalate" onClick={() => navigate('/escalate-alert', { state: { alert } })}>
            <span className="btn-icon">📞</span> Escalate / Call Code
          </button>
        </div>
      </main>
    </div>
  );
};

export default CriticalAlert;
