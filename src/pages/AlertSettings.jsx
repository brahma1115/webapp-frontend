import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const AlertSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h1>Alert Settings</h1>
      </header>

      <div className="settings-list glass-card" style={{ padding: '24px' }}>
        <div className="setting-item" style={{ marginBottom: '24px' }}>
          <label>High Pressure Threshold (cmH2O)</label>
          <input type="number" defaultValue="30" style={{ width: '100%', padding: '8px', marginTop: '8px' }} />
        </div>
        <div className="setting-item" style={{ marginBottom: '24px' }}>
          <label>Low SpO2 Threshold (%)</label>
          <input type="number" defaultValue="90" style={{ width: '100%', padding: '8px', marginTop: '8px' }} />
        </div>
        <div className="setting-item" style={{ marginBottom: '24px' }}>
          <label>Max Breath Rate (bpm)</label>
          <input type="number" defaultValue="35" style={{ width: '100%', padding: '8px', marginTop: '8px' }} />
        </div>
        <button className="btn btn-primary full-width">Save Thresholds</button>
      </div>
    </div>
  );
};

export default AlertSettings;
