import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuditLogs.css';

const AuditLogs = () => {
  const navigate = useNavigate();

  const logs = [
    { 
      id: 1, 
      user: 'Dr. Sarah Williams', 
      action: 'Changed Ventilator Settings', 
      detail: 'Patient John Smith', 
      time: '10:42 AM', 
      icon: '⚙️', 
      color: 'blue' 
    },
    { 
      id: 2, 
      user: 'Nurse John Doe', 
      action: 'Acknowledged Alert', 
      detail: 'High Pressure Alert', 
      time: '10:30 AM', 
      icon: '⚠️', 
      color: 'yellow' 
    },
    { 
      id: 3, 
      user: 'System', 
      action: 'Auto-Escalation Triggered', 
      detail: 'Critical Alert #482', 
      time: '09:15 AM', 
      icon: '📄', 
      color: 'purple' 
    },
    { 
      id: 4, 
      user: 'Admin User', 
      action: 'Added New Device', 
      detail: 'PB840-05', 
      time: 'Yesterday', 
      icon: '👤', 
      color: 'blue' 
    },
    { 
      id: 5, 
      user: 'Dr. Emily Chen', 
      action: 'Discharged Patient', 
      detail: 'Patient Jane Doe', 
      time: 'Yesterday', 
      icon: '👤', 
      color: 'blue' 
    },
    { 
      id: 6, 
      user: 'System', 
      action: 'Firmware Update', 
      detail: 'All PB840 Devices', 
      time: 'Jan 24', 
      icon: '📄', 
      color: 'purple' 
    }
  ];

  return (
    <div className="audit-logs-container">
      <header className="audit-header">
        <h1>Audit Logs</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="audit-content">
        <div className="audit-list">
          {logs.map(log => (
            <div key={log.id} className="audit-item">
              <div className={`audit-icon-circle ${log.color}`}>
                {log.icon}
              </div>
              <div className="audit-main">
                <div className="audit-row-top">
                  <span className="audit-user">{log.user}</span>
                  <span className="audit-time">🕒 {log.time}</span>
                </div>
                <p className="audit-action">{log.action}</p>
                <p className="audit-detail">{log.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
