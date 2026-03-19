import React, { useState } from 'react';
import './Settings.css';

const About = () => {
  const [updateMsg, setUpdateMsg] = useState('');
  const userFullName = localStorage.getItem('user_full_name') || 'Dr. Sarah Williams';

  const handleCheckUpdates = () => {
    setUpdateMsg('✅ You are on the latest version!');
    setTimeout(() => setUpdateMsg(''), 3000);
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>About</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">{userFullName.split(' ').map(n => n[0]).join('')}</div>
        </div>
      </header>

      <div className="settings-scroll-content about-scroll-content">
        {/* App Logo & Name */}
        <div className="about-logo-section">
          <div className="about-logo-box">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <polyline points="4,24 14,12 22,32 28,20 36,28 44,16" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <h2 className="about-app-name">VentGuard Pro</h2>
          <p className="about-app-tagline">Automated Ventilator Alarm Management</p>
        </div>

        {/* Version Info Card */}
        <div className="about-info-card">
          <div className="about-info-row">
            <span className="about-info-label">Version</span>
            <span className="about-info-value">2.4.1</span>
          </div>
          <div className="about-divider" />
          <div className="about-info-row">
            <span className="about-info-label">Build</span>
            <span className="about-info-value">2025.01.20</span>
          </div>
          <div className="about-divider" />
          <div className="about-info-row">
            <span className="about-info-label">License</span>
            <span className="about-info-value about-info-bold">Enterprise</span>
          </div>
        </div>

        {/* Check for Updates */}
        <button className="about-update-btn" onClick={handleCheckUpdates}>
          Check for Updates
        </button>
        {updateMsg && <p className="about-update-msg">{updateMsg}</p>}

        {/* Legal Links */}
        <div className="about-legal-links">
          <div className="about-legal-row">
            <span>Terms of Service</span>
            <span className="about-ext-icon">↗</span>
          </div>
          <div className="about-legal-row">
            <span>Privacy Policy</span>
            <span className="about-ext-icon">↗</span>
          </div>
          <div className="about-legal-row">
            <span>Third-Party Licenses</span>
            <span className="about-ext-icon">↗</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="about-footer">
          <p>© 2025 MedTech Solutions Inc.</p>
          <p>All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
