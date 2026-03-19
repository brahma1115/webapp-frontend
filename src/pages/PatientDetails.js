import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Clinical.css';

const PatientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get patient data from state or use fallback
  const patient = location.state?.patient || {
    name: 'Rajesh Kumar',
    bed: 'Bed ICU-01',
    status: 'Critical',
    diagnosis: 'Severe ARDS',
    age: '65 yrs',
    admitted: 'Oct 12, 2023',
    initials: 'RK',
    idNum: 'P001',
    gender: 'Male',
    physician: 'Dr. Wilson',
    hr: '115 bpm',
    spo2: '88%',
    peep: '12.0',
    fio2: '80%',
    rr: '28',
    riskScore: '88',
    hrTrend: '↑ 12%',
    spo2Trend: '↓ 5%',
    tags: ['Resp. Failure', 'Infection']
  };

  return (
    <div className="patient-profile-page">
      <header className="profile-header-row">
        <div className="profile-title">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <h1>Patient Profile</h1>
        </div>
        <button className="edit-btn">✏️</button>
      </header>

      <div className="patient-main-info-card">
        <div className="profile-name-id">
          <div className="name-section">
            <h2>{patient.name}</h2>
            <p>ID: {patient.idNum} • {patient.age} • {patient.gender}</p>
          </div>
          <div className={`severity-pill ${patient.status.toLowerCase()}`}>
            <span className="severity-dot"></span>
            {patient.status}
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="profile-info-item">
            <label>Diagnosis</label>
            <span>{patient.diagnosis}</span>
          </div>
          <div className="profile-info-item">
            <label>Bed</label>
            <span>{patient.bed}</span>
          </div>
          <div className="profile-info-item">
            <label>Admission</label>
            <span>{patient.admitted}</span>
          </div>
          <div className="profile-info-item">
            <label>Physician</label>
            <span>{patient.physician}</span>
          </div>
        </div>
      </div>

      <div className="ai-assessment-card">
        <div className="assessment-content">
          <h4>✨ AI-POWERED ASSESSMENT</h4>
          <h2>{parseInt(patient.riskScore) > 70 ? 'High Risk Patient' : parseInt(patient.riskScore) > 40 ? 'Moderate Risk Patient' : 'Low Risk Patient'}</h2>
          <div className="risk-tags">
            {patient.tags && patient.tags.map((tag, i) => (
              <span key={i} className="risk-tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="score-container">
          <div className="score-circle-white" style={{ borderColor: parseInt(patient.riskScore) > 70 ? '#ef4444' : parseInt(patient.riskScore) > 40 ? '#f59e0b' : '#10b981' }}>
            {patient.riskScore}
          </div>
          <p className="score-label">/100 Score</p>
        </div>
      </div>

      <div className="profile-actions-row">
        <Link to="/vitals-history" state={{ patient }} className="outline-btn-link">View Vitals</Link>
        <Link to="/ventilator-settings" state={{ patient }} className="outline-btn-link">Ventilator Settings</Link>
      </div>

      <h3 className="section-label-small">Current Vitals</h3>
      <div className="vitals-cards-grid">
        <div className="vital-metric-card hr">
          <div className="vital-metric-header">
            <div className="vital-icon-box">❤️</div>
            <span className={`vital-trend ${patient.hrTrend?.includes('↑') ? 'up' : 'down'}`}>{patient.hrTrend}</span>
          </div>
          <div className="vital-value-box">
            <h3>{patient.hr}</h3>
            <p>Heart Rate</p>
          </div>
        </div>

        <div className="vital-metric-card spo2">
          <div className="vital-metric-header">
            <div className="vital-icon-box">🌬️</div>
            <span className={`vital-trend ${patient.spo2Trend?.includes('↑') ? 'up' : 'down'}`}>{patient.spo2Trend}</span>
          </div>
          <div className="vital-value-box">
            <h3>{patient.spo2}</h3>
            <p>SpO2</p>
          </div>
        </div>
      </div>

      <h3 className="section-label-small">Ventilator Status</h3>
      <div className="ventilator-status-card">
        <div className="vent-card-header">
          <span className="ac-vc-badge">AC/VC Mode</span>
        </div>
        <div className="vent-metrics-row-large">
          <div className="vent-metric-item-large">
            <label>PEEP</label>
            <span>{patient.peep}</span>
          </div>
          <div className="vent-metric-item-large">
            <label>FiO2</label>
            <span>{patient.fio2}</span>
          </div>
          <div className="vent-metric-item-large">
            <label>RR</label>
            <span>{patient.rr}</span>
          </div>
        </div>
      </div>

      <div className="profile-action-list">
        <Link to="/anomaly-detection" state={{ patient }} className="profile-action-item">
          <div className="action-icon-circle-small ripple">🧠</div>
          <span className="action-label-text">AI Anomaly Detection</span>
          <span className="chevron-right">›</span>
        </Link>
        <Link to="/patient-history" state={{ patient }} className="profile-action-item">
          <div className="action-icon-circle-small">🕒</div>
          <span className="action-label-text">Patient History</span>
          <span className="chevron-right">›</span>
        </Link>
        <Link to="/reports" state={{ patient }} className="profile-action-item">
          <div className="action-icon-circle-small">📄</div>
          <span className="action-label-text">Reports & Notes</span>
          <span className="chevron-right">›</span>
        </Link>
      </div>
    </div>
  );
};

export default PatientDetails;
