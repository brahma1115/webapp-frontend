import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PredictiveAnalytics.css';

const PredictiveAnalytics = () => {
  const navigate = useNavigate();

  const predictions = [
    { 
      id: 1, 
      type: 'High Peak Pressure', 
      patient: 'Rajesh Kumar', 
      bed: 'Bed ICU-01', 
      time: 'in 2 hours', 
      conf: '87%', 
      recommendation: 'Check for secretion buildup' 
    },
    { 
      id: 2, 
      type: 'Desaturation < 90%', 
      patient: 'Priya Sharma', 
      bed: 'Bed ICU-02', 
      time: 'in 4 hours', 
      conf: '72%', 
      recommendation: 'Consider increasing FiO2' 
    },
    { 
      id: 3, 
      type: 'Rapid Shallow Breathing', 
      patient: 'Arjun Deshmukh', 
      bed: 'Bed ICU-03', 
      time: 'in 6 hours', 
      conf: '65%', 
      recommendation: 'Assess for weaning readiness' 
    },
    { 
      id: 4, 
      type: 'Low Tidal Volume', 
      patient: 'Ananya Rao', 
      bed: 'Bed ICU-04', 
      time: 'in 8 hours', 
      conf: '58%', 
      recommendation: 'Check for leaks in circuit' 
    }
  ];

  return (
    <div className="predictive-container">
      <header className="predictive-header">
        <h1>AI Predictive Analytics</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="predictive-grid">
        <div className="forecast-overview-card">
          <div className="overview-header">
            <span className="brain-icon">🧠</span>
            <h2>Forecast Overview</h2>
          </div>
          <p className="overview-sub">AI predicts 3 potential critical events in the next 6 hours based on current patient trends.</p>
          
          <div className="overview-metrics">
            <div className="metric-box">
              <span className="metric-val">87%</span>
              <span className="metric-label">MAX CONFIDENCE</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">3</span>
              <span className="metric-label">PREDICTED EVENTS</span>
            </div>
          </div>
        </div>

        <div className="forecast-main-row">
          <div className="forecast-chart-card">
            <div className="card-header">
              <div className="header-left">
                <span className="chart-icon">📈</span>
                <h3>Aggregate Risk Forecast</h3>
              </div>
              <span className="time-badge">Next 6 Hours</span>
            </div>
            
            <div className="chart-area">
              <svg viewBox="0 0 400 150" className="risk-chart">
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#805ad5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#805ad5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,130 Q50,110 100,80 T200,50 T300,100 T400,80 L400,150 L0,150 Z" 
                  fill="url(#purpleGrad)" 
                />
                <path 
                  d="M0,130 Q50,110 100,80 T200,50 T300,100 T400,80" 
                  fill="none" 
                  stroke="#805ad5" 
                  strokeWidth="3" 
                />
              </svg>
              <div className="chart-labels">
                <span>+1h</span>
                <span>+2h</span>
                <span>+3h</span>
                <span>+4h</span>
                <span>+5h</span>
                <span>+6h</span>
              </div>
            </div>
          </div>

          <div className="predicted-events-card">
            <h3>Predicted Events</h3>
            <div className="events-list">
              {predictions.map(pred => (
                  <div 
                    className="prediction-item" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      // Create a patient object to pass to details
                      const patientObj = {
                        name: pred.patient,
                        bed: pred.bed,
                        status: 'Normal', // Default or could be based on prediction
                        diagnosis: pred.type,
                        initials: pred.patient.split(' ').map(n => n[0]).join(''),
                        physician: 'Dr. Wilson',
                        idNum: `P0${pred.id + 10}`
                      };
                      navigate('/patient-details', { state: { patient: patientObj } });
                    }}
                  >
                  <div className="item-top">
                    <div className="item-title-group">
                      <h4>{pred.type}</h4>
                      <p className="item-patient">{pred.patient} • {pred.bed}</p>
                    </div>
                    <span className="time-in">in {pred.time.split(' ')[1]} {pred.time.split(' ')[2]}</span>
                  </div>
                  
                  <div className="conf-area">
                    <div className="conf-label">AI Confidence <span className="conf-val">{pred.conf}</span></div>
                    <div className="conf-bar-bg">
                      <div className="conf-bar-fill" style={{ width: pred.conf }}></div>
                    </div>
                  </div>

                  <div className="recommendation-bar">
                    <span className="rec-icon">⚠️</span>
                    <p>Recommendation: {pred.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
