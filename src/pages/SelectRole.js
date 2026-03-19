import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SelectRole = () => {
  const navigate = useNavigate();
  const roles = [
    { id: 'doctor', title: 'Doctor', icon: '👨‍⚕️', description: 'Manage patients and monitor vitals' },
    { id: 'nurse', title: 'Nurse', icon: '👩‍⚕️', description: 'Monitor alarms and bedside care' },
    { id: 'admin', title: 'Admin', icon: '🏢', description: 'Manage hospital and staff' }
  ];

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <h1>Select Your Role</h1>
        <p>Choose the role that best describes you</p>

        <div className="grid-list">
          {roles.map(role => (
            <div key={role.id} className="grid-item glass-card" onClick={() => navigate('/select-hospital')}>
              <span className="grid-icon">{role.icon}</span>
              <div className="grid-info">
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
