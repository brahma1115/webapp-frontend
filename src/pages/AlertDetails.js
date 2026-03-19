import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AlertDetails.css';

const AlertDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { alert } = location.state || {
    alert: {
      alert_type: 'High Respiratory Rate',
      patient_name: 'Jane Smith',
      bed_number: 'ICU-02',
      timestamp: new Date().toISOString(),
      current_value: '35 bpm',
      limit_value: '30 bpm',
      ai_confidence: 87,
      probable_cause: 'Patient agitation or pain likely causing tachypnea. Check sedation levels.',
      suggested_action: 'Assess patient comfort\nCheck for secretions\nVerify trigger sensitivity'
    }
  };

  const actions = alert.suggested_action ? alert.suggested_action.split('\n') : ['Assess patient comfort', 'Check for secretions', 'Verify trigger sensitivity'];

  return (
    <div className="alert-details-page">
      <header className="details-header" onClick={() => navigate(-1)}>
        <span className="back-arrow">‹</span>
        <h1>Alert Details</h1>
      </header>

      <div className="details-content">
        <div className="warning-banner">
          <div className="warning-icon-wrapper">
            <span className="warning-icon">⚠️</span>
          </div>
          <h2 className="alert-title">{alert.alert_type}</h2>
          <p className="patient-context">Patient: {alert.patient_name} ({alert.bed_number})</p>
          <p className="time-context">Triggered: {new Date(alert.timestamp).toLocaleString()}</p>
        </div>

        <section className="parameter-context-card secondary-card">
          <h3>Parameter Context</h3>
          <div className="context-row">
            <span className="context-label">Current Value</span>
            <span className="context-value red-text">{alert.current_value || '35 bpm'}</span>
          </div>
          <div className="context-row">
            <span className="context-label">Limit Set</span>
            <span className="context-value">{alert.limit_value || '30 bpm'}</span>
          </div>
          <div className="threshold-bar-wrapper">
            <div className="threshold-bar-bg">
              <div className="threshold-bar-fill red" style={{ width: '90%' }}></div>
            </div>
          </div>
        </section>

        <section className="ai-analysis-card secondary-card purple-theme">
          <div className="ai-header">
            <div className="ai-header-left">
              <span className="sparkle-icon">✨</span>
              <h3>AI Analysis</h3>
            </div>
            <span className="ai-version-tag">VentGuard Neural v2.4</span>
          </div>
          
          <div className="confidence-area">
            <div className="confidence-label">AI Confidence <span className="conf-value">{alert.ai_confidence || '87'}%</span></div>
            <div className="confidence-bar-bg">
              <div className="confidence-bar-fill purple" style={{ width: (alert.ai_confidence || 87) + '%' }}></div>
            </div>
          </div>

          <div className="probable-cause-area">
            <h4>Probable Cause:</h4>
            <p>{alert.probable_cause || 'Patient agitation or pain likely causing tachypnea. Check sedation levels.'}</p>
          </div>

          <div className="suggested-actions-area">
            <h4>SUGGESTED ACTION</h4>
            <ul>
              {actions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>

          <button className="view-full-ai-btn" onClick={() => navigate('/smart-alarm')}>
            View Full AI Details →
          </button>
        </section>

        <div className="details-actions">
          <button 
            className="btn-solid-blue" 
            onClick={() => navigate('/alerts-overview')}
          >
            Acknowledge Alert
          </button>
          <button className="btn-outline-blue" onClick={() => navigate('/escalate-alert', { state: { alert } })}>
            Escalate to Physician
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;
