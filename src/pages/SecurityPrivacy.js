import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSecuritySettings, getLoginHistory } from '../api';
import './Settings.css';

const SecurityPrivacy = () => {
  const navigate = useNavigate();
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    biometric: true
  });
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const userFullName = localStorage.getItem('user_full_name') || 'Dr. Sarah Williams';
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const settings = await getSecuritySettings(userId);
          const history = await getLoginHistory(userId);
          
          if (settings && settings.length > 0) {
            setSecuritySettings({
              twoFactor: settings[0].two_factor_enabled,
              biometric: settings[0].biometric_enabled
            });
          }
          setLoginHistory(history);
        }
      } catch (err) {
        console.error('Failed to fetch security data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // Mock data if empty for screenshot matching
  const displayHistory = loginHistory.length > 0 ? loginHistory : [
    { id: 1, event: 'New login from Mac OS', location: 'Hospital Network', time: 'Today, 08:42 AM' },
    { id: 2, event: 'Password changed', location: 'Hospital Network', time: 'Oct 15, 2023' },
    { id: 3, event: 'Login from new device', location: 'Hospital Wi-Fi', time: 'Oct 12, 2023' }
  ];

  const handleToggle = (key) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
    // In a real app, call API to update
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Security Settings</h1>
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
        <section className="security-banner">
          <div className="banner-icon">🛡️</div>
          <div className="banner-text">
            <h3>Account Protected</h3>
            <p>Your security settings meet hospital compliance standards.</p>
          </div>
        </section>

        <div className="security-content-grid">
          <section className="security-section">
            <h2>Authentication</h2>
            <div className="auth-list">
              <div className="auth-item">
                <div className="auth-item-left">
                  <div className="auth-icon-box">📱</div>
                  <div className="auth-info">
                    <h3>Two-Factor Auth</h3>
                    <p>SMS or Authenticator App</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={securitySettings.twoFactor} 
                    onChange={() => handleToggle('twoFactor')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="auth-item">
                <div className="auth-item-left">
                  <div className="auth-icon-box">🧬</div>
                  <div className="auth-info">
                    <h3>Biometric Login</h3>
                    <p>Face ID / Touch ID</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={securitySettings.biometric} 
                    onChange={() => handleToggle('biometric')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="auth-item">
                <div className="auth-item-left">
                  <div className="auth-icon-box">🔑</div>
                  <div className="auth-info">
                    <h3>Change Password</h3>
                    <p>Last changed 45 days ago</p>
                  </div>
                </div>
                <button className="btn-update-small" onClick={() => navigate('/reset-password')}>Update</button>
              </div>
            </div>
          </section>

          <section className="security-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {displayHistory.map((item, idx) => (
                <div key={item.id} className="activity-item">
                  <div className="activity-item-left">
                    <div className="activity-info">
                      <h3>{item.event || 'Login Activity'}</h3>
                      <p>{item.location || item.ip_address || 'Unknown Location'}</p>
                    </div>
                  </div>
                  <span className="activity-time">{item.time || new Date(item.login_time).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacy;
