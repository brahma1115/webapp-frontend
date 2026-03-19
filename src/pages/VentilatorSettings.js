import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './VentilatorSettings.css';

const VentilatorSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || { name: 'Rajesh Kumar', idNum: 'P001', peep: 8, fio2: 60, rr: 16 };
  
  // Load from localStorage or use defaults from patient
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(`ventSettings_${patient.idNum}`);
    if (saved) return JSON.parse(saved);
    
    // Fallback to patient's current values
    return {
      mode: 'AC/VC',
      tidalVolume: 450,
      respRate: parseInt(patient.rr) || 16,
      peep: parseInt(patient.peep) || 8,
      fio2: parseInt(patient.fio2) || 60,
      ieRatio: '1:2.0'
    };
  });

  const [mode, setMode] = useState(settings.mode);

  const updateSetting = (key, delta, min, max) => {
    setSettings(prev => {
      const newValue = prev[key] + delta;
      if (newValue < min || newValue > max) return prev;
      return { ...prev, [key]: newValue };
    });
  };

  const handleApply = () => {
    const finalSettings = { ...settings, mode };
    localStorage.setItem(`ventSettings_${patient.idNum}`, JSON.stringify(finalSettings));
    alert(`Settings for ${patient.name} Applied Successfully!`);
  };

  return (
    <div className="vent-settings-container">
      <header className="vent-settings-header">
        <h1>Ventilator Settings</h1>
        <div className="header-right" style={{marginLeft: 'auto'}}>
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="vent-settings-sub-header" onClick={() => navigate(-1)}>
        <span>‹</span> Ventilator Settings
      </div>

      <div className="vent-mode-section">
        <label className="section-label">Ventilation Mode</label>
        <div className="mode-tabs">
          {['AC/VC', 'SIMV', 'PSV'].map(m => (
            <button 
              key={m} 
              className={`mode-tab ${mode === m ? 'active' : ''}`}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="vent-params-list">
        {/* Tidal Volume */}
        <div className="param-card">
          <div className="param-info">
            <label>Tidal Volume (VT)</label>
            <span className="param-range">Range: 200-800</span>
          </div>
          <div className="param-controls">
            <button className="step-btn" onClick={() => updateSetting('tidalVolume', -10, 200, 800)}>–</button>
            <div className="param-value-display">
              <span className="param-val">{settings.tidalVolume}</span>
              <span className="param-unit">mL</span>
            </div>
            <button className="step-btn" onClick={() => updateSetting('tidalVolume', 10, 200, 800)}>+</button>
          </div>
        </div>

        {/* Resp Rate */}
        <div className="param-card">
          <div className="param-info">
            <label>Resp. Rate (RR)</label>
            <span className="param-range">Range: 4-40</span>
          </div>
          <div className="param-controls">
            <button className="step-btn" onClick={() => updateSetting('respRate', -1, 4, 40)}>–</button>
            <div className="param-value-display">
              <span className="param-val">{settings.respRate}</span>
              <span className="param-unit">bpm</span>
            </div>
            <button className="step-btn" onClick={() => updateSetting('respRate', 1, 4, 40)}>+</button>
          </div>
        </div>

        {/* PEEP */}
        <div className="param-card">
          <div className="param-info">
            <label>PEEP</label>
            <span className="param-range">Range: 0-20</span>
          </div>
          <div className="param-controls">
            <button className="step-btn" onClick={() => updateSetting('peep', -1, 0, 20)}>–</button>
            <div className="param-value-display">
              <span className="param-val">{settings.peep}</span>
              <span className="param-unit">cmH2O</span>
            </div>
            <button className="step-btn" onClick={() => updateSetting('peep', 1, 0, 20)}>+</button>
          </div>
        </div>

        {/* FiO2 */}
        <div className="param-card">
          <div className="param-info">
            <label>FiO2</label>
            <span className="param-range">Range: 21-100</span>
          </div>
          <div className="param-controls">
            <button className="step-btn" onClick={() => updateSetting('fio2', -1, 21, 100)}>–</button>
            <div className="param-value-display">
              <span className="param-val">{settings.fio2}</span>
              <span className="param-unit">%</span>
            </div>
            <button className="step-btn" onClick={() => updateSetting('fio2', 1, 21, 100)}>+</button>
          </div>
        </div>

        {/* I:E Ratio */}
        <div className="param-card">
          <div className="param-info">
            <label>I:E Ratio</label>
            <span className="param-range">Range: -</span>
          </div>
          <div className="param-controls">
            <div className="param-value-display no-buttons">
              <span className="param-val">{settings.ieRatio}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="vent-note-box">
        Note: Changes to ventilator settings require clinical authorization. All changes are logged.
      </div>

      <footer className="vent-footer">
        <button className="apply-settings-btn" onClick={handleApply}>
          Apply New Settings
        </button>
      </footer>
    </div>
  );
};

export default VentilatorSettings;
