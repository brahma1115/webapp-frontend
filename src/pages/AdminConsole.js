import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../api';
import './AdminConsole.css';

const AdminConsole = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const data = await getNotifications();
      setUnreadCount(data.filter(n => !n.is_read).length);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const kpis = [
    { id: 1, label: 'Total Users', value: '142', icon: '👥', trend: '+ 12%', trendUp: true, color: 'blue' },
    { id: 2, label: 'Active Devices', value: '48', icon: '📈', trend: '- 98%', trendUp: false, color: 'green' },
    { id: 3, label: 'Hospitals', value: '3', icon: '🏢', color: 'purple' },
    { id: 4, label: 'System Health', value: '99.9%', icon: '🛡️', color: 'green-solid' }
  ];

  const actions = [
    { title: 'Manage Users', icon: '👥', color: 'blue', path: '/user-management' },
    { title: 'Devices', icon: '📈', color: 'green', path: '/device-management' },
    { title: 'Hospitals', icon: '🏢', color: 'purple', path: '/hospital-management' },
    { title: 'Audit Logs', icon: '📋', color: 'orange', path: '/audit-logs' }
  ];

  const alerts = [
    { id: 1, type: 'Warning', title: 'High Server Load', desc: 'Server US-East-1 at 85% capacity', time: '10 mins ago', color: 'warning' },
    { id: 2, type: 'Info', title: 'Scheduled Maintenance', desc: 'Planned for Feb 05, 02:00 AM UTC', time: '2 hours ago', color: 'info' }
  ];

  return (
    <div className="admin-console-container">
      <header className="admin-header">
        <h1>Admin Console</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <div className="notification-wrapper">
            <button className="icon-btn" onClick={() => navigate('/notifications')}>
              🔔
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
          </div>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="admin-grid">
        <section className="kpi-row">
          {kpis.map(kpi => (
            <div key={kpi.id} className="admin-kpi-card">
              <div className="kpi-top">
                <div className={`kpi-icon-bg ${kpi.color}`}>{kpi.icon}</div>
                {kpi.trend && (
                  <span className={`kpi-trend ${kpi.trendUp ? 'up' : 'down'}`}>
                    {kpi.trend}
                  </span>
                )}
              </div>
              <div className="kpi-body">
                <span className="kpi-val">{kpi.value}</span>
                <span className="kpi-lab">{kpi.label}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="admin-section">
          <h2>Quick Actions</h2>
          <div className="admin-actions-grid">
            {actions.map((action, i) => (
              <div key={i} className="admin-action-card" onClick={() => navigate(action.path)}>
                <div className={`action-icon-circle ${action.color}`}>{action.icon}</div>
                <p>{action.title}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="access-settings-bar" onClick={() => navigate('/access-control')}>
          <div className="bar-left">
            <span className="shield-icon">🛡️</span>
            <span>Access Control Settings</span>
          </div>
          <span className="gear-icon">⚙️</span>
        </div>

        <section className="admin-section">
          <h2>System Alerts</h2>
          <div className="system-alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className="system-alert-item">
                <div className={`alert-badge ${alert.color}`}>
                  <span className="dot"></span> {alert.type}
                </div>
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.desc}</p>
                  <span className="alert-time">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminConsole;
