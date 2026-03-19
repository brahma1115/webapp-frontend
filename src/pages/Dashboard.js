import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getNotifications, getDashboardStats, approveUser } from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const extraPatientsCount = JSON.parse(localStorage.getItem('extra_patients') || '[]').length;
  const initialCount = 15;
  const totalPatients = initialCount + extraPatientsCount;

  const [statsData, setStatsData] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const userRole = localStorage.getItem('user_role');
  const isAdmin = userRole === 'adminastrator';

  useEffect(() => {
    fetchDashboardData();
    if (isAdmin) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await getDashboardStats();
      setStatsData(data);
      setRecentAlerts(data.recent_alerts || []);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const handleApproveNotif = async (userId, notifId) => {
    try {
      await approveUser(userId);
      alert('User approved successfully!');
      fetchNotifications();
    } catch (err) {
      alert('Failed to approve user: ' + err.message);
    }
  };

  const clinicalUnreadCount = recentAlerts.length;
  const unreadCount = isAdmin ? notifications.filter(n => !n.is_read).length : clinicalUnreadCount;
  const userFullName = localStorage.getItem('user_full_name') || 'Administrator';
  const selectedDept = localStorage.getItem('selected_department') || 'General Ward';

  const quickActions = [
    { title: 'Patients', icon: '👤', color: '#E3F2FD', textColor: '#2196F3', path: '/patients' },
    { title: 'Monitor', icon: '📈', color: '#E8F5E9', textColor: '#4CAF50', path: '/monitor' },
    { title: 'Alerts', icon: '⚠️', color: '#FFEBEE', textColor: '#F44336', path: '/alerts' },
    { title: 'Analytics', icon: '📊', color: '#F3E5F5', textColor: '#6A1B9A', path: '/analytics' },
    // Only show User Management for Admins
    ...(isAdmin ? [
      { title: 'Users', icon: '👥', color: '#FFF3E0', textColor: '#FF9800', path: '/user-management' }
    ] : [])
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Hello, {userFullName.split(' ')[0]} <span className="wave">👋</span></h1>
          <p>Welcome back to <strong>{selectedDept}</strong>. Here's what's happening today.</p>
        </div>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <div className="notification-wrapper">
            <button className="icon-btn" onClick={() => setShowNotifDropdown(!showNotifDropdown)}>
              🔔
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
            {showNotifDropdown && (
              <div className="notification-dropdown glass-card">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <Link to="/notifications" onClick={() => setShowNotifDropdown(false)}>View All</Link>
                </div>
                <div className="dropdown-body">
                  {isAdmin ? (
                    notifications.length > 0 ? (
                      notifications.slice(0, 5).map(notif => (
                        <div key={notif.id} className={`notif-item ${notif.is_read ? 'read' : 'unread'}`}>
                          <div className="notif-icon">🛡️</div>
                          <div className="notif-content">
                            <p className="notif-title">{notif.title}</p>
                            <p className="notif-msg">{notif.message}</p>
                            <div className="notif-actions">
                              <span className="notif-time">{new Date(notif.created_at).toLocaleTimeString()}</span>
                              {notif.title === 'New User Signup' && notif.target_user_id && !notif.is_read && (
                                <button 
                                  className="notif-approve-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApproveNotif(notif.target_user_id, notif.id);
                                  }}
                                >
                                  Approve
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-notif">No new notifications</p>
                    )
                  ) : (
                    recentAlerts.length > 0 ? (
                      recentAlerts.slice(0, 5).map((alert, i) => (
                        <div key={i} className="notif-item unread clinical" onClick={() => navigate('/alert-details', { state: { alert } })}>
                          <div className={`notif-icon clinical ${alert.alert_type.toLowerCase()}`}>
                            {alert.alert_type === 'Critical' ? '🚨' : '⚠️'}
                          </div>
                          <div className="notif-content">
                            <p className="notif-title clinical">{alert.alert_type} Alert</p>
                            <p className="notif-msg">{alert.patient_name}: {alert.description}</p>
                            <span className="notif-time">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-notif">No active alerts</p>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="dashboard-scroll">
        {/* Row 1: Stats */}
        <section className="stats-row">
          {loading ? (
            <div className="loading-placeholder">Loading stats...</div>
          ) : (
            <>
              {[
                { title: 'Active Patients', count: statsData?.stats.active_patients || 0, icon: '👥', color: '#2196F3', path: '/patients' },
                { title: 'Active Vents', count: statsData?.stats.active_vents || 0, icon: '📈', color: '#4CAF50', path: '/icu-monitoring' },
                { title: 'Active Alerts', count: statsData?.stats.active_alerts || 0, icon: '⚠️', color: '#F44336', path: '/alerts' },
                { title: 'Staff Online', count: statsData?.stats.staff_online || 0, icon: '⚕️', color: '#6A1B9A', path: '#' }
              ].map((stat, i) => (
                <div key={i} className="stat-card" onClick={() => navigate(stat.path)}>
                  <div className="stat-header">
                    <div className="stat-icon-bg" style={{ backgroundColor: stat.color + '15', color: stat.color }}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="stat-info">
                    <h3>{stat.count}</h3>
                    <p>{stat.title}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>

        {/* Row 2: Quick Actions */}
        <section className="dashboard-section">
          <h2>QUICK ACTIONS</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, i) => (
              <div key={i} className="action-card" onClick={() => navigate(action.path)}>
                <div className="action-icon-circle" style={{ backgroundColor: action.color, color: action.textColor }}>
                  {action.icon}
                </div>
                <p>{action.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Row 3: Insights & Alerts */}
        <div className="dashboard-row-split">
          <section className="insights-column">
            <h2><span className="purple-stars">✨</span> AI INSIGHTS</h2>
            <div className="insights-grid">
              <div className="insight-card purple" onClick={() => navigate('/predictive-analytics')}>
                <p>Predictive Alerts</p>
                <h3>{statsData?.ai_insights.predictive_alerts || 0} Events</h3>
                <small>Predicted in next 4h</small>
              </div>
              <div className="insight-card blue" onClick={() => navigate('/smart-alarm')}>
                <p>False Alarm Rate</p>
                <h3>{statsData?.ai_insights.false_alarm_rate || '0%'}</h3>
                <small>Reduced by AI</small>
              </div>
              <div className="insight-card large-blue" onClick={() => navigate('/risk-assessment')}>
                <p>High Risk</p>
                <h3>{statsData?.ai_insights.high_risk_patients || 0} Patients</h3>
                <small>Flagged for review</small>
              </div>
            </div>
          </section>

          <section className="alerts-column">
            <div className="section-header-row">
              <h2>RECENT ALERTS</h2>
              <Link to="/alerts" className="view-all">View All</Link>
            </div>
            <div className="recent-alerts-list">
              {recentAlerts.length > 0 ? (
                recentAlerts.map((alert, i) => (
                  <div key={i} className="alert-row-item" onClick={() => navigate('/alert-details', { state: { alert } })}>
                    <div className="alert-type-bar" style={{ backgroundColor: alert.alert_type === 'Critical' ? '#F44336' : '#FF9800' }}></div>
                    <div className="alert-main-content">
                      <div className="alert-patient">
                        <strong>{alert.patient_name}</strong>
                        <span className="bed-tag">| {alert.bed_number}</span>
                      </div>
                      <p className="alert-msg">{alert.description}</p>
                    </div>
                    <div className="alert-metadata">
                      <span className={`severity-badge ${alert.alert_type.toLowerCase()}`}>
                        • {alert.alert_type}
                      </span>
                      <span className="alert-time">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-alerts-msg">No active alerts</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
