import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotifications, approveUser } from '../api';
import './Notifications.css';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState([]);
  const [clinicalAlerts, setClinicalAlerts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const userRole = localStorage.getItem('user_role');
  const isAdmin = userRole === 'adminastrator';

  React.useEffect(() => {
    if (isAdmin) {
      fetchNotifications();
    } else {
      fetchClinicalAlerts();
    }
  }, [isAdmin]);

  const fetchClinicalAlerts = async () => {
    try {
      const { getRecentAlerts } = await import('../api');
      const data = await getRecentAlerts();
      setClinicalAlerts(data);
    } catch (err) {
      console.error('Failed to fetch clinical alerts:', err);
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
    } finally {
      setLoading(false);
    }
  };

  const handleApproveNotif = async (userId, notifId) => {
    try {
      await approveUser(userId);
      alert('Approved! This account has been successfully approved, mawa.');
      fetchNotifications();
    } catch (err) {
      alert('Failed to approve user: ' + err.message);
    }
  };

  const getIcon = (title) => {
    if (title.includes('Signup')) return '👤';
    if (title.includes('Patient')) return '🏥';
    if (title.includes('Ventilator')) return '📈';
    return '🔔';
  };

  return (
    <div className="notifications-page">
      <header className="details-header" onClick={() => navigate(-1)}>
        <span className="back-arrow">‹</span>
        <h1>Notifications</h1>
      </header>

      <div className="notifications-content">
        <div className="notifications-list">
          {loading ? (
            <div className="loading">Loading notifications...</div>
          ) : isAdmin ? (
            notifications.length > 0 ? (
              notifications.map(notif => (
                <div key={notif.id} className={`notif-card ${notif.is_read ? '' : 'unread'}`}>
                  <div className="notif-left">
                    <div className="notif-icon-circle blue">
                      {getIcon(notif.title)}
                    </div>
                    <div className="notif-text">
                      <h3>{notif.title}</h3>
                      <p>{notif.message}</p>
                      {notif.title === 'New User Signup' && notif.target_user_id && !notif.is_read && (
                        <button 
                          className="page-notif-approve-btn"
                          onClick={() => handleApproveNotif(notif.target_user_id, notif.id)}
                        >
                          Approve User
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="notif-right">
                    <span className="notif-time">{new Date(notif.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notif">No notifications yet.</div>
            )
          ) : (
            clinicalAlerts.length > 0 ? (
              clinicalAlerts.map((alert, i) => (
                <div key={i} className="notif-card unread clinical" onClick={() => navigate('/alert-details', { state: { alert } })}>
                  <div className="notif-left">
                    <div className={`notif-icon-circle ${alert.alert_type === 'Critical' ? 'red' : 'orange'}`}>
                      {alert.alert_type === 'Critical' ? '🚨' : '⚠️'}
                    </div>
                    <div className="notif-text">
                      <h3>{alert.alert_type} Alert</h3>
                      <p>{alert.patient_name}: {alert.description}</p>
                      <small>Bed: {alert.bed_number}</small>
                    </div>
                  </div>
                  <div className="notif-right">
                    <span className="notif-time">{new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notif">No clinical alerts yet.</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
