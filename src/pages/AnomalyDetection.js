import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AnomalyDetection.css';

const AnomalyDetection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || { name: 'Rajesh Kumar', idNum: 'P001', status: 'Normal' };

  // Dynamic data based on status
  const stats = patient.status === 'Critical' 
    ? { detected: 18, accuracy: '98%', patterns: '3.2k' }
    : patient.status === 'Warning'
    ? { detected: 7, accuracy: '94%', patterns: '2.5k' }
    : { detected: 2, accuracy: '96%', patterns: '2.8k' };

  const anomalies = patient.status === 'Normal' ? [
    { id: 1, title: 'Minor Baseline Drift', time: '14:20:05', desc: 'Slight fluctuation in baseline pressure detected.', confidence: '82%' }
  ] : [
    { id: 1, title: 'Waveform Irregularity', time: '10:42:15', desc: 'Unusual pressure spike detected during expiration phase.', confidence: '94%' },
    { id: 2, title: 'Flow Asynchrony', time: '10:38:22', desc: 'Patient effort detected before trigger threshold.', confidence: '88%' }
  ];

  const WaveformChart = () => (
    <div className="anomaly-waveform-card">
      <div className="waveform-header-row">
        <div className="monitoring-status">
          <span className="green-dot"></span> Monitoring
        </div>
        {anomalies.length > 0 && <div className="anomaly-tag-label">Anomaly Detected</div>}
      </div>
      
      <div className="waveform-svg-container">
        <svg viewBox="0 0 800 200" className="waveform-svg">
          {/* Highlighted Anomaly Area if critical/warning */}
          {patient.status !== 'Normal' && <rect x="450" y="20" width="120" height="150" fill="#fee2e2" />}
          
          {/* Waveform Line - vary based on status */}
          <path 
            d={patient.status === 'Normal' 
              ? "M0,130 Q50,110 100,120 T200,140 T300,110 T400,130 T500,120 T600,140 T700,110 T800,130"
              : "M0,130 Q50,110 100,120 T200,140 T300,110 T400,130 Q450,80 470,110 T490,90 T510,110 T530,95 T550,110 Q600,140 650,120 T800,130"
            }
            fill="none" 
            stroke="#fbbf24" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="anomaly-detection-container">
      <header className="anomaly-header">
        <div className="header-left-group">
          <button className="back-btn-simple" onClick={() => navigate(-1)}>‹</button>
          <h1>Anomaly Detection</h1>
        </div>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="patient-context-mini">
        Patient: <strong>{patient.name}</strong> ({patient.idNum}) • Status: <span className={patient.status.toLowerCase()}>{patient.status}</span>
      </div>

      <div className="anomaly-stats-row">
        <div className="stat-card-white">
          <h3>{stats.detected}</h3>
          <p>Detected Today</p>
        </div>
        <div className="stat-card-white">
          <h3>{stats.patterns}</h3>
          <p>Patterns Learned</p>
        </div>
        <div className="stat-card-white">
          <h3>{stats.accuracy}</h3>
          <p>Accuracy</p>
        </div>
      </div>

      <WaveformChart />

      <section className="detected-anomalies-section">
        <h2>Detected Anomalies</h2>
        
        <div className="anomaly-item-list">
          {anomalies.map(ano => (
            <div key={ano.id} className="anomaly-entry-card">
              <div className="anomaly-entry-header">
                <div className="anomaly-title-group">
                  <span className="anomaly-icon-purple">ⓘ</span>
                  <h3>{ano.title}</h3>
                </div>
                <span className="anomaly-time-stamp">{ano.time}</span>
              </div>
              <p className="anomaly-desc">{ano.desc}</p>
              <div className="anomaly-entry-footer">
                <span className="confidence-label">AI Confidence: <strong>{ano.confidence}</strong></span>
                <button className="analyze-dropdown-btn">Analyze <span>∨</span></button>
              </div>
            </div>
          ))}
          {anomalies.length === 0 && <p className="no-anomalies">No anomalies detected for this patient today.</p>}
        </div>
      </section>

      <footer className="anomaly-sticky-footer">
        <button className="mark-reviewed-btn" onClick={() => navigate(-1)}>
          <span className="check-icon-blue">✓</span> Mark All as Reviewed
        </button>
      </footer>
    </div>
  );
};

export default AnomalyDetection;
