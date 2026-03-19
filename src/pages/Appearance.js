import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Appearance = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState('light');
  
  const userFullName = localStorage.getItem('user_full_name') || 'Dr. Sarah Williams';

  const themes = [
    { id: 'light', name: 'Light Mode', icon: '☀️' },
    { id: 'dark', name: 'Dark Mode', icon: '🌙' },
    { id: 'system', name: 'System Default', icon: '💻' }
  ];

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Appearance</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">{userFullName.split(' ').map(n => n[0]).join('')}</div>
        </div>
      </header>

      <div className="settings-scroll-content">
        <section className="appearance-section">
          <h2 className="section-title-premium">Theme Preference</h2>
          
          <div className="theme-options-list">
            {themes.map(theme => (
              <div 
                key={theme.id} 
                className={`theme-card-option ${selectedTheme === theme.id ? 'active' : ''}`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className="theme-card-left">
                  <div className={`theme-card-icon-box ${theme.id}`}>
                    <span>{theme.icon}</span>
                  </div>
                  <span className="theme-name-text">{theme.name}</span>
                </div>
                {selectedTheme === theme.id && (
                  <div className="theme-selection-check">
                    <span>✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="appearance-warning-banner">
            <span className="warning-icon">Note:</span>
            <p className="warning-text">
              Dark mode is currently disabled in this prototype version. Full theme support will be available in the next release.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Appearance;
