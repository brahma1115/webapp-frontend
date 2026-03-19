import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../api';
import './Settings.css';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: localStorage.getItem('user_full_name') || 'Dr. Sarah Williams',
    email: localStorage.getItem('user_email') || 's.williams@hospital.org',
    phone: localStorage.getItem('user_phone') || '+1 (555) 123-4567',
    department: localStorage.getItem('selected_department') || 'Intensive Care Unit',
    employeeId: localStorage.getItem('user_employee_id') || 'MD-8492'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const userRole = localStorage.getItem('user_role') || 'Senior Pulmonologist';
  const userId = localStorage.getItem('user_id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const payload = {
        user_id: userId,
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        department: formData.department
      };

      await updateProfile(payload);
      
      // Update localStorage
      localStorage.setItem('user_full_name', formData.fullName);
      localStorage.setItem('user_email', formData.email);
      localStorage.setItem('user_phone', formData.phone);
      localStorage.setItem('selected_department', formData.department);

      setSuccess(true);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Profile Settings</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">{formData.fullName.split(' ').map(n => n[0]).join('')}</div>
        </div>
      </header>

      <div className="settings-scroll-content centered">
        <section className="profile-center-section">
          <div className="profile-large-avatar blue">
            <span>👤</span>
          </div>
          <h2 className="profile-main-name">{formData.fullName}</h2>
          <p className="profile-main-role">{userRole}</p>
          <button className="btn-link">Change Photo</button>
        </section>

        <form className="profile-grid-form" onSubmit={handleSubmit}>
          <div className="profile-input-grid">
            <div className="input-group-premium">
              <label>Full Name</label>
              <div className="input-with-icon">
                <span>👤</span>
                <input 
                  type="text" 
                  value={formData.fullName} 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="input-group-premium">
              <label>Email Address</label>
              <div className="input-with-icon">
                <span>📧</span>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="input-group-premium">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <span>📞</span>
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="input-group-premium">
              <label>Department</label>
              <div className="input-with-icon">
                <span>🏢</span>
                <input 
                  type="text" 
                  value={formData.department} 
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="input-group-premium">
              <label>Employee ID</label>
              <div className="input-with-icon gray-bg">
                <span>#</span>
                <input type="text" value={formData.employeeId} readOnly />
              </div>
            </div>
          </div>

          <div className="profile-actions-bottom">
            <button type="button" className="btn-outline" onClick={() => navigate(-1)}>Back</button>
            <button type="submit" className="btn-solid-blue" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
