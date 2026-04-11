import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentAlerts } from '../api';
import './ViewAlerts.css';

const ViewAlerts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Active');

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRecentAlerts(); 
      const filtered = data.filter(a => {
        if (activeTab === 'Active') return a.status === 'Active';
        if (activeTab === 'History') return a.status === 'Acknowledged' || a.status === 'Resolved';
        if (activeTab === 'Escalated') return a.status === 'Escalated';
        return true;
      });
      setAlerts(filtered);
    } catch (err) {
      setError(err.message || 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return (
    <div className="active-alerts-container">
      <header className="alerts-main-header">
        <h1>Active Alerts</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="alerts-sub-header">
        <div className="search-box">
          <span>🔍</span>
          <input type="text" placeholder="Search alerts..." />
        </div>

        <div className="alerts-controls">
          <div className="tab-pill-group">
            {['Active', 'History', 'Escalated'].map(tab => (
              <button 
                key={tab} 
                className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="acknowledge-all-btn">
            <span className="check-icon">✓</span> Acknowledge All
          </button>
        </div>
      </div>

      <div className="alerts-grid-view">
        {loading ? (
          <div className="loading-placeholder">Loading alerts...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : alerts.length > 0 ? (
          alerts.map(alert => (
            <div key={alert.id} className={`alert-card-premium ${(alert.alert_type || '').toLowerCase()}`}>
              <div className="alert-card-top">
                <div className="alert-title-group">
                  <h3>{alert.alert_type}</h3>
                  <span className="alert-timestamp">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="alert-patient-info">
                  {alert.patient_name} • {alert.bed_number}
                </div>
                <p className="alert-description">{alert.description}</p>
              </div>
              
              <div className="alert-card-bottom">
                <div className={`severity-pill-large ${(alert.alert_type || '').toLowerCase()}`}>
                  • {alert.alert_type}
                </div>
                <button 
                  className="view-details-inline-btn" 
                  onClick={() => {
                    if (alert.alert_type === 'Critical') {
                      navigate('/critical-alert', { state: { alert } });
                    } else {
                      navigate('/alert-details', { state: { alert } });
                    }
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-alerts-msg">No alerts found in this section.</div>
        )}
      </div>
    </div>
  );
};

export default ViewAlerts;
