import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PatientHistory.css';

const PatientHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || { name: 'Rajesh Kumar', idNum: 'P001' };

  const historyEvents = [
    { 
      time: '14:30 Today', 
      title: 'High Pressure Alert', 
      desc: 'Peak pressure exceeded 40 cmH2O', 
      type: 'alert', 
      color: '#ef4444' 
    },
    { 
      time: '12:00 Today', 
      title: 'Settings Adjusted', 
      desc: 'FiO2 increased to 60% by Dr. Wilson', 
      type: 'adjustment', 
      color: '#3b82f6' 
    },
    { 
      time: '08:00 Today', 
      title: 'Morning Rounds', 
      desc: 'Patient stable, sedation reduced.', 
      type: 'round', 
      color: '#94a3b8' 
    },
    { 
      time: '22:15 Yesterday', 
      title: 'SpO2 Drop', 
      desc: 'SpO2 dropped to 88% for 2 mins', 
      type: 'alert', 
      color: '#ef4444' 
    },
    { 
      time: '18:00 Yesterday', 
      title: 'Intubation', 
      desc: 'Patient intubated due to respiratory failure', 
      type: 'procedure', 
      color: '#a855f7' 
    }
  ];

  return (
    <div className="patient-history-container">
      <header className="history-header">
        <div className="header-left-group">
          <button className="back-btn-simple" onClick={() => navigate(-1)}>‹</button>
          <h1>Patient History</h1>
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
        Timeline for: <strong>{patient.name}</strong> ({patient.idNum})
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-line"></div>
        <div className="timeline-items-list">
          {historyEvents.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker" style={{ backgroundColor: event.color }}></div>
              <div className="timeline-content-group">
                <span className="timeline-time">{event.time}</span>
                <div className="timeline-card">
                  <div className="card-header-icon-row">
                    {event.type === 'alert' && <span className="warning-icon">⚠</span>}
                    {event.type === 'adjustment' && <span className="adj-icon">📉</span>}
                    {event.type === 'round' && <span className="round-icon">📋</span>}
                    <h3>{event.title}</h3>
                  </div>
                  <p>{event.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
