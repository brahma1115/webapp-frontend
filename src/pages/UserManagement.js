import React, { useState, useEffect } from 'react';
import { getUsers, approveUser, deactivateUser } from '../api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const tabs = ['All', 'Doctors', 'Nurses', 'RTs', 'Admins'];

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers(activeTab);
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      fetchUsers(); // Refresh list
      alert('User approved successfully!');
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

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role_display.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'active' ? 'status-active' : 'status-pending';
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
                {user.status === 'Active' && (
                  <button className="deactivate-btn" onClick={() => handleDeactivate(user.id)}>
                    Deactivate
                  </button>
                )}
                <button className="edit-btn">✏️</button>
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
