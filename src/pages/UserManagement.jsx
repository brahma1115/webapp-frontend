import React, { useState, useEffect, useCallback } from 'react';
import { getUsers, approveUser, deactivateUser, deleteUser, makeAdmin, dismissAdmin } from '../api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUserId = parseInt(localStorage.getItem('user_id'));

  const tabs = ['All', 'Doctors', 'Nurses', 'RTs', 'Admins'];

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers(activeTab);
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchUsers();

    const intervalId = setInterval(() => {
      fetchUsers();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [fetchUsers]);

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      fetchUsers(); // Refresh list
      alert('Approved! This account has been successfully approved, Mawa.');
    } catch (err) {
      alert('Failed to approve user: ' + err.message);
    }
  };

  const handleDeactivate = async (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user? They will not be able to log in until re-approved.')) {
      try {
        await deactivateUser(userId);
        fetchUsers();
        alert('User deactivated successfully!');
      } catch (err) {
        alert('Failed to deactivate user: ' + err.message);
      }
    }
  };
  
  const handleMakeAdmin = async (userId) => {
    try {
      await makeAdmin(userId);
      fetchUsers();
      alert('User promoted to Admin successfully!');
    } catch (err) {
      alert('Failed to promote user: ' + err.message);
    }
  };

  const handleDismissAdmin = async (userId) => {
    if (window.confirm('Are you sure you want to dismiss this user as Admin? Their role will be changed back to Doctor.')) {
      try {
        await dismissAdmin(userId);
        fetchUsers();
        alert('User dismissed as Admin successfully!');
      } catch (err) {
        alert('Failed to dismiss admin: ' + err.message);
      }
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(userId);
        fetchUsers();
        alert('User deleted successfully!');
      } catch (err) {
        alert('Failed to delete user: ' + err.message);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role_display.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusClass = (status) => {
    const s = status.toLowerCase();
    if (s === 'approved' || s === 'active') return 'status-active';
    return 'status-pending';
  };

  return (
    <div className="user-management-container">
      <header className="um-header">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="add-user-btn">+</button>
      </header>

      <nav className="um-tabs">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="user-grid">
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user.id} className="user-card glass-card">
              <div className="user-info">
                <div className="user-avatar">👤</div>
                <div className="user-details">
                  <h3>{user.full_name}</h3>
                  <p>{user.role_display} • {user.department || 'General'}</p>
                </div>
              </div>
              <div className="user-actions">
                <span className={`status-badge ${getStatusClass(user.status)}`}>
                  • {user.status}
                </span>
                {user.status === 'Pending' && (
                  <button className="approve-btn" onClick={() => handleApprove(user.id)}>
                    Approve
                  </button>
                )}
                {(user.status === 'Approved' || user.status === 'Active') && (
                  <button className="deactivate-btn" onClick={() => handleDeactivate(user.id)}>
                    Deactivate
                  </button>
                )}
                {user.role !== 'adminastrator' && user.status === 'Approved' && (
                  <button className="make-admin-btn" onClick={() => handleMakeAdmin(user.id)} title="Make Admin">
                    👑
                  </button>
                )}
                {user.role === 'adminastrator' && user.id !== currentUserId && (
                  <button className="dismiss-admin-btn" onClick={() => handleDismissAdmin(user.id)} title="Dismiss Admin">
                    🚫
                  </button>
                )}
                <button className="edit-btn">✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)} title="Delete User">🗑️</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-users">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
