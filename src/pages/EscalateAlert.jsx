import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EscalateAlert.css';

const EscalateAlert = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { alert } = location.state || { alert: { title: 'High Pressure Alert', bed: 'Bed ICU-01' } };

  const professionals = [
    { id: 1, role: 'ON-CALL RESIDENT', name: 'Dr. Sarah Wilson', status: 'Available', color: 'green' },
    { id: 2, role: 'SENIOR NURSE', name: 'Nurse Jackie', status: 'Busy', color: 'orange' },
    { id: 3, role: 'RESPIRATORY THERAPIST', name: 'Mike Ross', status: 'Available', color: 'green' }
  ];

  return (
    <div className="escalate-alert-page">
      <header className="details-header" onClick={() => navigate(-1)}>
        <span className="back-arrow">‹</span>
        <h1>Escalate Alert</h1>
      </header>

      <div className="escalate-content">
        <div className="escalation-status-bar">
          Escalating: {alert.title} ({alert.bed})
        </div>

        <div className="professionals-list">
          {professionals.map(pro => (
            <div key={pro.id} className="pro-card">
              <div className="pro-left">
                <div className="pro-avatar">👤</div>
                <div className="pro-info">
                  <span className="pro-role">{pro.role}</span>
                  <h3 className="pro-name">{pro.name}</h3>
                  <span className={`pro-status ${pro.color}`}>
                    <span className="status-dot"></span> {pro.status}
                  </span>
                </div>
              </div>
              <div className="pro-actions">
                <button className="pro-action-btn chat">💬</button>
                <button className="pro-action-btn call">📞</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscalateAlert;
