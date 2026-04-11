import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SelectHospital = () => {
  const navigate = useNavigate();
  const hospitals = [
    { id: 1, name: 'City Central Hospital', location: 'London' },
    { id: 2, name: 'St. Mary\'s Medical Center', location: 'Manchester' },
    { id: 3, name: 'Green Valley Clinic', location: 'Birmingham' }
  ];

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <h1>Select Hospital</h1>
        <p>Select the facility you are currently working in</p>

        <div className="grid-list">
          {hospitals.map(h => (
            <div key={h.id} className="grid-item glass-card" onClick={() => navigate('/select-department')}>
              <div className="grid-info">
                <h3>{h.name}</h3>
                <p>{h.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectHospital;
