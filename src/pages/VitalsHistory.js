import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Clinical.css';

const VitalsHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('24h');

  // Get patient data from state or use fallback
  const patient = location.state?.patient || {
    name: 'Rajesh Kumar',
    hr: '115 bpm',
    spo2: '88%',
    initials: 'RK'
  };

  const timeLabels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  // Heart Rate Chart Data (SVG Points)
  // Higher values for critical patients
  const hrPoints = patient.status === 'Critical' 
    ? "0,80 100,75 200,72 300,78 400,74 500,76" 
    : "0,100 100,95 200,98 300,102 400,97 500,95";

  // SpO2 Chart Data (SVG Points)
  const spo2Points = patient.status === 'Critical'
    ? "0,40 100,45 200,48 300,42 400,44 500,46"
    : "0,50 100,55 200,52 300,58 400,54 500,52";

  const bpLog = [
    { time: '14:00', sys: 120, dia: 80, map: 93 },
    { time: '13:00', sys: 118, dia: 78, map: 91 },
    { time: '12:00', sys: 122, dia: 82, map: 95 }
  ];

  return (
    <div className="vitals-history-page">
      <header className="profile-header-row">
        <div className="profile-title">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <h1>View Vitals</h1>
        </div>
      </header>

      <div className="filter-bar-container">
        <div className="filter-bar">
          {['4h', '12h', '24h', '7d'].map(f => (
            <button 
              key={f} 
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3>Heart Rate</h3>
          <div className="chart-current-value red">
            {patient.hr?.split(' ')[0] || '--'}
            <span className="chart-unit-small">bpm</span>
          </div>
        </div>
        <div className="chart-svg-container">
          <svg className="chart-svg" viewBox="0 0 500 150" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="30" x2="500" y2="30" className="chart-grid-line" />
            <line x1="0" y1="75" x2="500" y2="75" className="chart-grid-line" />
            <line x1="0" y1="120" x2="500" y2="120" className="chart-grid-line" />
            
            {/* Trend line */}
            <polyline
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={hrPoints}
            />
          </svg>
          <div className="chart-axis-labels">
            {timeLabels.map(t => <span key={t} className="chart-axis-label">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3>SpO2</h3>
          <div className="chart-current-value blue">
            {patient.spo2?.replace('%', '') || '--'}
            <span className="chart-unit-small">%</span>
          </div>
        </div>
        <div className="chart-svg-container">
          <svg className="chart-svg" viewBox="0 0 500 150" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="30" x2="500" y2="30" className="chart-grid-line" />
            <line x1="0" y1="75" x2="500" y2="75" className="chart-grid-line" />
            <line x1="0" y1="120" x2="500" y2="120" className="chart-grid-line" />
            
            {/* Trend line */}
            <polyline
              fill="none"
              stroke="#1976d2"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={spo2Points}
            />
          </svg>
          <div className="chart-axis-labels">
            {timeLabels.map(t => <span key={t} className="chart-axis-label">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="bp-log-card">
        <div className="bp-log-header">
          <h3>Blood Pressure Log</h3>
        </div>
        <div className="bp-log-list">
          {bpLog.map((log, i) => (
            <div key={i} className="bp-log-item">
              <span className="bp-time-label">{log.time}</span>
              <span className="bp-value-main">{log.sys}/{log.dia}</span>
              <span className="map-badge-small">MAP {log.map}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VitalsHistory;
