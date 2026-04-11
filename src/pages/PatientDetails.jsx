import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getPatientDetails, deletePatient } from '../api';
import './Clinical.css';

const PatientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [patient, setPatient] = useState(location.state?.patient || null);
  const [vitals, setVitals] = useState(null);
  const [deviceSettings, setDeviceSettings] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFullData = async () => {
      // If we don't have an ID from location state, we can't fetch.
      // In a real app we might get the ID from URL params.
      if (!patient?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getPatientDetails(patient.id);
        // data contains { patient, vitals, device_settings, risk_assessment }
        if (data.patient) {
          setPatient(prev => ({ ...prev, ...data.patient, age: data.patient.age_display || prev.age }));
        }
        setVitals(data.vitals);
        setDeviceSettings(data.device_settings);
        setRiskAssessment(data.risk_assessment);
      } catch (err) {
        console.error("Failed to fetch patient details:", err);
        setError("Could not load latest clinical data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFullData();
  }, [patient?.id]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to permanently delete ${patient.full_name || patient.name}'s record? This cannot be undone.`)) {
      try {
        await deletePatient(patient.id);
        navigate('/patients');
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete patient record. Please try again.");
      }
    }
  };

  if (loading && !patient) {
    return <div className="loading-container">Loading patient profile...</div>;
  }

  if (!patient) {
    return <div className="error-container">Patient not found.</div>;
  }

  return (
    <div className="patient-profile-page">
      <header className="profile-header-row">
        <div className="profile-title">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <h1>Patient Profile</h1>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '8px' }}>
          <button className="edit-btn">✏️</button>
          <button className="delete-btn" onClick={handleDelete} style={{ background: '#fee2e2', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
        </div>
      </header>

      <div className="patient-main-info-card">
        <div className="profile-name-id">
          <div className="name-section">
            <h2>{patient.full_name || patient.name}</h2>
            <p>{patient.formatted_details || `ID: ${patient.patient_id || patient.idNum} • ${patient.age_display || patient.age} • ${patient.gender}`}</p>
          </div>
          <div className={`severity-pill ${(patient.status || 'Normal').toLowerCase()}`}>
            <span className="severity-dot"></span>
            {patient.status}
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="profile-info-item">
            <label>DIAGNOSIS</label>
            <span>{patient.primary_diagnosis || patient.diagnosis || 'Unknown'}</span>
          </div>
          <div className="profile-info-item">
            <label>BED</label>
            <span>{patient.formatted_bed || (patient.bed_number || patient.bed)}</span>
          </div>
          <div className="profile-info-item">
            <label>ADMISSION</label>
            <span>{patient.admission_date || patient.admitted}</span>
          </div>
          <div className="profile-info-item">
            <label>PHYSICIAN</label>
            <span>{patient.attending_physician || patient.physician}</span>
          </div>
        </div>
      </div>

      <div className="ai-assessment-card">
        <div className="assessment-content">
          <h4>AI-POWERED ASSESSMENT</h4>
          <h2>{riskAssessment?.status || (parseInt(riskAssessment?.score || patient.riskScore) > 70 ? 'High Risk Patient' : parseInt(riskAssessment?.score || patient.riskScore) > 40 ? 'Moderate Risk Patient' : 'Low Risk Patient')}</h2>
          <div className="risk-tags">
            {(patient.tags || ['Respiratory Monitoring', 'Stable Vitals']).map((tag, i) => (
              <span key={i} className="risk-tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="score-container">
          <div className="score-circle-white" style={{ borderColor: parseInt(riskAssessment?.score || patient.riskScore) > 70 ? '#ef4444' : parseInt(riskAssessment?.score || patient.riskScore) > 40 ? '#f59e0b' : '#10b981' }}>
            {riskAssessment?.score || patient.riskScore || '--'}
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
            <span className={`vital-trend ${patient.hrTrend?.includes('↑') ? 'up' : 'down'}`}>{patient.hrTrend || 'Stable'}</span>
          </div>
          <div className="vital-value-box">
            <h3>{vitals?.heart_rate ? `${Math.round(vitals.heart_rate)} bpm` : patient.hr || '--'}</h3>
            <p>Heart Rate</p>
          </div>
        </div>

        <div className="vital-metric-card spo2">
          <div className="vital-metric-header">
            <div className="vital-icon-box">🌬️</div>
            <span className={`vital-trend ${patient.spo2Trend?.includes('↑') ? 'up' : 'down'}`}>{patient.spo2Trend || 'Stable'}</span>
          </div>
          <div className="vital-value-box">
            <h3>{vitals?.spo2 ? `${Math.round(vitals.spo2)}%` : patient.spo2 || '--'}</h3>
            <p>SpO2</p>
          </div>
        </div>
      </div>

      <h3 className="section-label-small">Ventilator Status</h3>
      <div className="ventilator-status-card">
        <div className="vent-card-header">
          <span className="ac-vc-badge">{deviceSettings?.mode || 'AC/VC Mode'}</span>
        </div>
        <div className="vent-metrics-row-large">
          <div className="vent-metric-item-large">
            <label>PEEP</label>
            <span>{deviceSettings?.peep || patient.peep || '--'}</span>
          </div>
          <div className="vent-metric-item-large">
            <label>FiO2</label>
            <span>{deviceSettings?.fio2 || patient.fio2 || '--'}</span>
          </div>
          <div className="vent-metric-item-large">
            <label>RR</label>
            <span>{deviceSettings?.rr || patient.rr || '--'}</span>
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
