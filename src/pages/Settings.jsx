import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const userFullName = localStorage.getItem('user_full_name') || 'Dr. Sarah Williams';
  const userRole = localStorage.getItem('user_role') || 'Administrator';

  const menuItems = [
    { title: 'Profile Settings', icon: '👤', color: '#eff6ff', textColor: '#3b82f6', path: '/profile-settings' },
    { title: 'Notifications', icon: '🔔', color: '#fff7ed', textColor: '#f97316', path: '/notifications' },
    { title: 'Security & Privacy', icon: '🛡️', color: '#f0fdf4', textColor: '#22c55e', path: '/security-privacy' },
    { title: 'Appearance', icon: '🌙', color: '#faf5ff', textColor: '#a855f7', path: '/appearance' },
    { title: 'Help & Support', icon: '❓', color: '#f0f9ff', textColor: '#0ea5e9', path: '/help-support' },
    { title: 'About VentGuard', icon: 'ℹ️', color: '#f8fafc', textColor: '#64748b', path: '/about' }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Settings <small style={{fontSize: '10px', color: '#ccc'}}>vREDESIGN</small></h1>
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
        <section className="user-profile-card glass-card clickable" onClick={() => navigate('/profile-settings')}>
          <div className="profile-icon-circle blue">
            <span>👤</span>
          </div>
          <div className="profile-info">
            <h2>{userFullName}</h2>
            <p className="role-text">{userRole}</p>
          </div>
          <span className="chevron-right">›</span>
        </section>

        <div className="settings-grid">
          {menuItems.map((item, i) => (
            <div key={i} className="setting-card-premium glass-card" onClick={() => navigate(item.path)}>
              <div className="setting-card-left">
                <div className="setting-icon-circle" style={{ backgroundColor: item.color, color: item.textColor }}>
                  {item.icon}
                </div>
                <span className="setting-title">{item.title}</span>
              </div>
              <span className="chevron-right">›</span>
            </div>
          ))}
        </div>

        <button className="logout-btn-premium" onClick={handleLogout}>
          <span>↪️</span> Log Out
        </button>

        {userRole !== 'Administrator' && (
          <button 
            className="logout-btn-premium" 
            style={{backgroundColor: '#fee2e2', color: '#dc2626', marginTop: '12px'}}
            onClick={() => {
              if(window.confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) {
                fetch('https://fdcbbgdj-8000.inc1.devtunnels.ms/api/login/delete_account/', {
                  method: 'DELETE',
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                  }
                }).then(res => {
                  if(res.ok) {
                    alert("Account deleted successfully.");
                    handleLogout();
                  } else {
                    alert("Failed to delete account.");
                  }
                }).catch(err => alert("Error deleting account: " + err.message));
              }
            }}
          >
            <span>🗑️</span> Delete Account
          </button>
        )}

        <footer className="settings-footer">
          <p>VentGuard Pro v2.4.1</p>
        </footer>
      </div>
    </div>
  );
};

export default Settings;
