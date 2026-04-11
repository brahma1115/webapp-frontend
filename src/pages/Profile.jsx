import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h1>My Profile</h1>
      </header>

      <div className="profile-card glass-card">
        <div className="profile-avatar">JD</div>
        <div className="profile-details">
          <h2>Dr. John Doe</h2>
          <p>Senior ICU Consultant</p>
          <small>City Central Hospital</small>
        </div>
      </div>

      <div className="settings-list">
        <div className="setting-row glass-card" onClick={() => navigate('/profile-settings')}>
          <div className="setting-info">
            <span className="setting-icon">✏️</span>
            <div className="setting-text">
              <h3>Edit Profile</h3>
            </div>
          </div>
        </div>
        <button className="btn btn-error full-width" style={{ marginTop: '24px' }}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
