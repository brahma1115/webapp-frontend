import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const userRole = localStorage.getItem('user_role'); // e.g., 'adminastrator', 'doctor', 'nurse'
  const userName = localStorage.getItem('user_full_name') || 'User';

  const sections = [
    {
      title: 'MAIN',
      items: [
        { name: 'Dashboard', icon: '🏠', path: '/dashboard' },
        { name: 'Live Monitor', icon: '📈', path: '/icu-monitoring' },
        { name: 'ICU Monitoring', icon: '🫁', path: '/monitor' },

      ]
    },
    {
      title: 'PATIENTS',
      items: [
        { name: 'Patient List', icon: '👥', path: '/patients' },
        { name: 'Patient Summary', icon: '📋', path: '/patient-summary' },
        { name: 'Add Patient', icon: '➕', path: '/add-patient' },
      ]
    },
    {
      title: 'ALERTS',
      items: [
        { name: 'Alerts Overview', icon: '🔔', path: '/alerts-overview' },
        { name: 'Active Alerts', icon: '⚠️', path: '/alerts' },
        { name: 'Notifications', icon: '✉️', path: '/notifications' },
      ]
    },
    {
      title: 'AI FEATURES',
      items: [
        { name: 'AI Predictions', icon: '🧠', path: '/predictive-analytics' },
        { name: 'Smart Alarm AI', icon: '🛡️', path: '/smart-alarm' },
        { name: 'Risk Assessment', icon: '📈', path: '/risk-assessment' },
        { name: 'Anomaly Detection', icon: '📉', path: '/anomaly-detection' },
      ]
    },
    // Only show ADMIN section for administrators
    ...(userRole === 'adminastrator' ? [{
      title: 'ADMIN',
      items: [
        { name: 'Admin Console', icon: '🛡️', path: '/admin-console' },
        { name: 'User Management', icon: '👥', path: '/user-management' },
        { name: 'Device Management', icon: '📉', path: '/device-management' },
        { name: 'Hospital Management', icon: '🏢', path: '/hospital-management' },
        { name: 'Audit Logs', icon: '📋', path: '/audit-logs' },
        { name: 'Access Control', icon: '🔐', path: '/access-control' },
      ]
    }] : []),
    {
      title: 'SETTINGS',
      items: [
        { name: 'App Settings', icon: '⚙️', path: '/settings' },
        { name: 'Profile', icon: '👤', path: '/profile' },
        { name: 'Security', icon: '🛡️', path: '/security-privacy' },
        { name: 'Help', icon: '❓', path: '/help-support' },
        { name: 'About', icon: 'ℹ️', path: '/about' },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">⚡</span>
        <span className="brand-name">VentGuard</span>
      </div>

      <nav className="sidebar-nav">
        {sections.map((section, idx) => (
          <div key={idx} className="nav-section">
            <h4 className="section-title">{section.title}</h4>
            {section.items.map((item, i) => (
              <NavLink 
                key={i} 
                to={item.path} 
                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{userName.charAt(0)}</div>
          <div className="user-details">
            <p className="user-name">{userName}</p>
            <p className="user-role">{userRole === 'adminastrator' ? 'Administrator' : userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>
          <span className="logout-icon">↪️</span>
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
