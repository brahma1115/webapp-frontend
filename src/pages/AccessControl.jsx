import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccessControl.css';

const AccessControl = () => {
  const navigate = useNavigate();
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const roles = [
    { id: 1, name: 'Administrator', permission: 'Full Access', color: 'purple' },
    { id: 2, name: 'Doctor', permission: 'Clinical + Write', color: 'blue' },
    { id: 3, name: 'Nurse', permission: 'Clinical + Read/Write', color: 'green' },
    { id: 4, name: 'Respiratory Therapist', permission: 'Ventilator + Read/Write', color: 'cyan' },
    { id: 5, name: 'Viewer', permission: 'Read Only', color: 'grey' }
  ];

  return (
    <div className="access-control-container">
      <header className="access-header">
        <h1>Access Control</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="access-content">
        <div className="global-settings-card">
          <div className="settings-header">
            <h3>Global Settings</h3>
            <span className="shield-icon">🛡️</span>
          </div>
          
          <div className="setting-row">
            <div className="setting-info">
              <h4>Require 2FA for all users</h4>
              <p>Enforce two-factor authentication</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={is2FAEnabled} 
                onChange={() => setIs2FAEnabled(!is2FAEnabled)} 
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="setting-row">
            <div className="setting-info">
              <h4>Session Timeout</h4>
              <p>Auto-logout duration</p>
            </div>
            <select className="timeout-select" defaultValue="15 mins">
              <option>5 mins</option>
              <option>15 mins</option>
              <option>30 mins</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>

        <div className="roles-list">
          {roles.map(role => (
            <div key={role.id} className="role-item">
              <div className="role-main">
                <h4>{role.name}</h4>
                <div className={`permission-badge ${role.color}`}>
                  {role.permission}
                </div>
              </div>
              <span className="arrow-icon">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
